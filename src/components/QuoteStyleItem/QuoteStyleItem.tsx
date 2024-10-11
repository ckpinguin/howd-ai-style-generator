import React from "react";

import styles from "./QuoteStyleItem.module.css";

type QuoteStyleItemProps = {
  name: string;
  value: string;
};

export default function QuoteStyleItem({ name, value }: QuoteStyleItemProps) {
  return (
    <>
      <div className={styles.propertyTitle}>{name}</div>
      <div>{value}</div>
    </>
  );
}
