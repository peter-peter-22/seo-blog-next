"use client";

import { useEffect } from "react";
import { Prism } from "./code-block-combo-box";

export default function PrismLoader() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return <div className="hidden"></div>;
}