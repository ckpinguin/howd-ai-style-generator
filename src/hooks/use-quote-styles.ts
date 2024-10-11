import React from "react";

import type { Status } from "@/types";

export interface QuoteProperties {
  quote: string;
  description: string;
  colors: {
    background: string;
    text: string;
  };
  fontName: string;
}

function isValidJson(json: any): boolean {
  return (
    json?.quote &&
    json?.description &&
    json?.background_color &&
    json?.text_color &&
    json?.google_font_name
  );
}

function useQuoteStyles() {
  const [quoteProperties, setQuoteProperties] =
    React.useState<QuoteProperties>();
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string>();

  const fetchQuoteStyles = async () => {
    // reset error
    setError(undefined);

    try {
      // start request
      setStatus("loading");
      const response = await fetch("/api/get-quote-styles");
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      if (!isValidJson(json)) {
        throw new Error(`Malformed response: ${JSON.stringify(json)}`);
      }

      setQuoteProperties({
        quote: json.quote,
        description: json.description,
        colors: {
          background: json.background_color,
          text: json.text_color,
        },
        fontName: json.google_font_name,
      });
      setStatus("idle");
    } catch (error) {
      setError(error?.toString());
      setStatus("error");
    }
  };

  return { status, error, quoteProperties, fetchQuoteStyles };
}

export default useQuoteStyles;
