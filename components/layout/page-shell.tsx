import type { PropsWithChildren } from 'react';

type PageShellProps = PropsWithChildren<{}>;

export function PageShell({ children }: PageShellProps) {
  return <div className="mx-auto max-w-7xl">{children}</div>;
}
