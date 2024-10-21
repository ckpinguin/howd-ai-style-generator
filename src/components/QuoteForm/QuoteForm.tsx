import React, { useState } from "react";

import Button from "../Button";
import styles from "./QuoteForm.module.css";

type QuoteFormProps = {
  fetchQuoteStyles: (quote: string) => void;
  startOver: () => void;
};

export default function QuoteForm({
  fetchQuoteStyles,
  startOver,
}: QuoteFormProps) {
  const [quote, setQuote] = useState<string>("");

  function handleSubmit(e: any) {
    e.preventDefault();
    fetchQuoteStyles(quote);
  }

  function handleReset(e: any) {
    e.preventDefault();
    startOver();
    setQuote("");
  }

  return (
    <form className={styles.wrapper}>
      <label>
        <textarea
          className={styles["quote-input"]}
          onChange={(e) => setQuote(e.currentTarget.value)}
          placeholder="Enter a quote..."
          value={quote}
        />
      </label>
      <div className={styles.buttons}>
        <Button variant="outline" onClick={handleReset}>
          start over
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          {quote ? "generate styles" : "use random quote"}
        </Button>
      </div>
    </form>
  );
}
