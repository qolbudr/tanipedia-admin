import React from 'react';

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

function CodeLine({ children, ...props }: Props) {
  return <code {...props}>{children}</code>;
}

CodeLine.defaultProps = {
  style: { fontSize: 12 },
} as Partial<Props>;

export default CodeLine;
