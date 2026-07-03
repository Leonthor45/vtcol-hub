declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
    [key: string]: unknown;
  }
}

declare module 'next/link' {
  import type { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
  const Link: ({ href, children, ...props }: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & { href: string; children?: ReactNode }) => JSX.Element;
  export default Link;
}

declare module 'next/navigation' {
  export function notFound(): never;
}
