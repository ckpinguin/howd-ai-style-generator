import React from "react";

import { type QuoteProperties } from "@/hooks/use-quote-styles";
import type { Status } from "@/types";

import ErrorCard from "../ErrorCard";
import QuoteDetails from "../QuoteDetails";
import Spinner from "../Spinner";

export interface QuoteDisplayProps {
  status: Status;
  // optional, since may be undefined
  quoteProperties?: QuoteProperties;
  error?: string;
}

function QuoteDisplay({ status, quoteProperties, error }: QuoteDisplayProps) {
  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorCard error={error} />;
  }

  if (!quoteProperties) {
    return undefined;
  }

  return <QuoteDetails quoteProperties={quoteProperties} />;
}

export default QuoteDisplay;
