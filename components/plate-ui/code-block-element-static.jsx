import { cn } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common/react';
import { CodeBlockCopyButton } from "./code-block-copy-button";
import { Prism } from "./code-block-combo-box";
import Chip from '@mui/material/Chip';
import CodeIcon from '@mui/icons-material/Code';

export const CodeBlockElementStatic = ({
  children,
  className,
  ...props
}) => {
  const { element } = props;

  const state = {
    className: element?.lang ? `${element.lang} language-${element.lang}` : '',
  };

  const html = Prism.highlight(element.value, Prism.languages[element.lang ?? "text"])

  return (
    <PlateElement className={cn(className, 'py-1')} {...props}>
      <div>
        <Chip label={element.lang ?? "Text"} icon={<CodeIcon />} size="small" />
        <div style={{ position: "relative" }} >
          <pre
            className={cn("overflow-x-auto rounded-md bg-muted px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2]", state.className)}
            style={{ maxHeight: 400, scrollbarWidth: "none", borderRadius: 5 }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div style={{ position: "absolute", top: 5, right: 5 }}>
            <CodeBlockCopyButton value={element.value} />
          </div>
        </div>
      </div>
    </PlateElement>
  );
};