import React from 'react';

/**
 * Button
 *
 * Amber accent states with smooth transition speeds on hover.
 * Variants:
 * - primary:   Amber background, white text
 * - secondary: Surface background, foreground text
 */
export default function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}) {
  const baseClasses = `
    rounded-md
    font-medium
    px-4
    py-2
    transition-all
    duration-200
    hover:shadow-lg
    disabled:cursor-not-allowed
    disabled:opacity-50
  `;

  const variantClasses = {
    primary: `bg-accent text-white hover:bg-accent-soft`,
    secondary: `bg-surface text-foreground hover:bg-border`,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}