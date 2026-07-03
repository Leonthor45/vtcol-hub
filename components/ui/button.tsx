import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200';

  const variantStyles =
    variant === 'secondary'
      ? 'bg-white/5 text-slate-100 border border-white/10 hover:bg-white/10'
      : variant === 'ghost'
      ? 'bg-transparent text-slate-100 hover:bg-white/10'
      : 'bg-violet-600 text-white shadow-glow hover:bg-violet-500';

  return <button className={`${baseStyles} ${variantStyles} ${className}`} {...props} />;
}
