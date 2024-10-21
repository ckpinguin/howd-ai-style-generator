"use client";

import QuoteDisplay from "@/components/QuoteDisplay";
import QuoteForm from "@/components/QuoteForm";
import Separator from "@/components/Separator";
import useQuoteStyles from "@/hooks/use-quote-styles";

export default function Home() {
  const { status, error, quoteProperties, fetchQuoteStyles } = useQuoteStyles();

  return (
    <main>
      <QuoteForm fetchQuoteStyles={fetchQuoteStyles} />
      <Separator />
      <QuoteDisplay
        status={status}
        quoteProperties={quoteProperties}
        error={error}
      />
    </main>
  );
}
