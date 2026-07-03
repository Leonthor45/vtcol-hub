import type { AnchorHTMLAttributes } from 'react';

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'ghost';
}

export function LinkButton({ variant = 'ghost', className = '', ...props }: LinkButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200';

  const variantStyles =
    variant === 'primary'
      ? 'bg-violet-600 text-white shadow-glow hover:bg-violet-500'
      : 'bg-white/5 text-slate-100 hover:bg-white/10';

  return <a className={`${baseStyles} ${variantStyles} ${className}`} {...props} />;
}
