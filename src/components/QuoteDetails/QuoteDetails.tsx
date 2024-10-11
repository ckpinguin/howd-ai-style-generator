import { GoogleFontsStatus, useGoogleFonts } from "@flyyer/use-googlefonts";
import React from "react";

import type { QuoteProperties } from "@/hooks/use-quote-styles";

import Card from "../Card";
import QuoteStyleItem from "../QuoteStyleItem";
import styles from "./QuoteDetails.module.css";

export type QuoteDetailsProps = { quoteProperties: QuoteProperties };

export default function QuoteDetails({ quoteProperties }: QuoteDetailsProps) {
  const { quote, colors, fontName } = quoteProperties;
  const fontStyle = {
    fontFamily: fontName,
    fontWeight: 400,
  };
  const font = useGoogleFonts(
    quoteProperties
      ? [
          {
            family: quoteProperties.fontName,
            styles: [400],
          },
        ]
      : []
  );
  if (font.status === GoogleFontsStatus.FAILED) {
    console.error(font.error);
  }
  const textColor =
    font.status === GoogleFontsStatus.LOADING ? colors.background : colors.text;
  return (
    <div className={styles.wrapper}>
      <section className={styles.quoteCard}>
        <Card
          textColor={textColor}
          backgroundColor={colors.background}
          style={fontStyle}>
          {quote}
        </Card>
      </section>
      <section className={styles.quoteStyles}>
        <h2>Quote Properties</h2>
        <div className={styles.styleItemsGrid}>
          <QuoteStyleItem
            name="description"
            value={quoteProperties.description}
          />
          <QuoteStyleItem name="background" value={colors.background} />
          <QuoteStyleItem name="text" value={colors.text} />
        </div>
      </section>
    </div>
  );
}
