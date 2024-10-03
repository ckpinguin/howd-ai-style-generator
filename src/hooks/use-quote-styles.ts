import React from "react";

import type { Status } from "@/types";

export interface QuoteProperties {
  quote: string;
  colors: {
    text: string;
    background: string;
  };
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
      if (!json?.quote || !json?.colors) {
        throw new Error("Malformed response");
      }

      setQuoteProperties({
        quote: json.quote,
        colors: {
          text: json.colors.text,
          background: json.colors.background,
        },
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
