import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

type Props = {
  children: string | string[];
};

SyntaxHighlighter.registerLanguage('jsx', jsx);

function CodeBlock({ children }: Props) {
  return (
    <SyntaxHighlighter
      language="typescript"
      style={vscDarkPlus}
      customStyle={{
        fontSize: 13,
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
}

export default CodeBlock;
