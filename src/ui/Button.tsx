import React from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
  type: 'primary' | 'small' | 'secondary';
};

function Button({ children, disabled, to, type }: ButtonProps) {
  const base =
    'inline-block text-sm rounded-full bg-lime-700 font-semibold uppercase tracking-wide text-slate-200 transition-colors duration-300 hover:bg-lime-400 focus:bg-lime-400 focus:outline-none hover:text-stone-800 focus:text-stone-800  focus:ring focus:ring-lime-400 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-700 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-slate-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
