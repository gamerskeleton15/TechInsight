import React from 'react';

/**
 * Global Layout Wrapper
 *
 * Enforces the site background (`bg-background`) and primary text color
 * (`text-foreground`), and smooth text rendering. Wrap any page or section
 * to inherit the design system.
 */
export default function GlobalWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-h-screen bg-background text-foreground antialiased ${className}`}
    >
      {children}
    </div>
  );
}