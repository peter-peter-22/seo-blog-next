"use client"

import "@/app/css/prism-vsc-dark-plus.css";
import { Prism } from "./code-block-combo-box";
import { cn } from '@udecode/cn';
import { CodeBlockCopyButton } from "./code-block-copy-button";
import { useEffect } from "react";
import { PlateElement } from '@udecode/plate-common/react';

export const CodeBlockElementStatic = ({
  children,
  className,
  ...props
}) => {
  const { element } = props;

  const state = {
    className: element?.lang ? `${element.lang} language-${element.lang}` : '',
  };

  useEffect(()=>{
    Prism.highlightAll()
  },[])

  return (
    <PlateElement className={cn(className, 'py-1', state.className)} {...props}>
      <div style={{ position: "relative" }} >
        <pre
          className="overflow-x-auto rounded-md bg-muted px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2]"
          style={{ maxHeight: 400, scrollbarWidth: "none", borderRadius:5}}
        >
          <code>{element.value}</code>
        </pre>
        <div style={{ position: "absolute", top: 5, right: 5 }}>
          <CodeBlockCopyButton value={element.value} />
        </div>
      </div>
    </PlateElement>
  );
};