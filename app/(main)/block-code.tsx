import { stegaClean } from "@sanity/client/stega";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import BlockCodeButton from "@/app/(main)/block-code-btn";

interface CodeProps {
  code: string;
  language?: string;
}

export default function BlockCode(props: CodeProps) {
  const { code, language } = stegaClean(props);

  const cleanCode = stegaClean(code);
  const cleanLanguage = stegaClean(language);

  return (
    <div className="relative">
      <BlockCodeButton code={cleanCode} />
      <SyntaxHighlighter
        language={cleanLanguage}
        style={vscDarkPlus}
        wrapLines
        showLineNumbers
      >
        {stegaClean(cleanCode)}
      </SyntaxHighlighter>
    </div>
  );
}
