import { NextResponse } from "next/server";
import OpenAI from "openai";

import { getRandomQuote } from "@/helpers/random-quotes";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `You will be provided with a random quotation, and your task is to generate:
1) A hex color code that matches the mood of the quotation
2) A contrasting color to the hex color code that matches the mood. The contrasting color should be "black" or "white" whichever has the higher WCAG
contrast ration compared to the color that matches the mood.

Write your output in json with these keys:
  "hex_color"
  "text_color"
`;

export async function GET() {
  const generatedQuote = getRandomQuote();

  const messages = [
    {
      role: "system" as const,
      content: systemPrompt,
    },
    {
      role: "user" as const,
      content: generatedQuote,
    },
  ];

  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 256,
  });

  const rawStyles = completion.choices[0].message.content;

  if (!rawStyles) {
    return NextResponse.json({
      quote: generatedQuote,
    });
  }
  try {
    const styles = JSON.parse(rawStyles);
    return NextResponse.json({
      quote: generatedQuote,
      colors: {
        background: styles.hex_color,
        text: styles.text_color,
      },
    });
  } catch (error) {
    return NextResponse.error();
  }
}
