import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { getRandomQuote } from "@/helpers/random-quotes";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `You will be provided with a random quotation, and your task is to generate:
1) The same quotation but with correct spelling, grammar,
punctuation and capitalization.
2) three adjectives that describe the quote, to be
returned with the key "description". For example,
"bold, calm, professional"
3) A hex color code that matches the mood of the quotation
4) A contrasting color to the hex color code that matches the mood. The
contrasting color should be "black" or "white" whichever has the higher
WCAG contrast ration compared to the color that matches the mood.
5) An appropriate Google font name for the quotation. This should be
returned in the form of a valid font name. Avoid common fonts
like "Lato" and "Roboto". Try to pick a more unusual font.
Examples of less common fonts: "Playfair Display",
"Marck Script", "Oswald", "Salsa"

Write your output in json with these keys:
  "corrected_quote"
  "description"
  "hex_color"
  "text_color"
  "google_font_name"
`;
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  let quote = searchParams.get("quote");

  if (quote) {
    quote = decodeURIComponent(quote); // Decode the URL-encoded quote
  } else {
    quote = getRandomQuote(); // Fallback if no quote is provided
  }

  try {
    const styles = await getStyles(quote);
    return NextResponse.json(styles);
  } catch (error) {
    return NextResponse.error();
  }
}

async function getStyles(quote: string) {
  const messages = [
    {
      role: "system" as const,
      content: systemPrompt,
    },
    {
      role: "user" as const,
      content: quote,
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
      quote: quote,
    });
  }
  const {
    corrected_quote,
    description,
    hex_color,
    text_color,
    google_font_name,
  } = JSON.parse(rawStyles);

  console.log("====ORIGINAL QUOTE====", quote);
  console.log("====OPENAI RESPONSE====", {
    corrected_quote,
    description,
    hex_color,
    text_color,
    google_font_name,
  });

  return {
    quote: corrected_quote,
    description,
    background_color: hex_color,
    text_color,
    google_font_name,
  };
}
