import React from 'react';

/**
 * Category Tag
 *
 * Cyber Cyan accent background with smooth hover transition.
 * Use for category labels, filter chips, and small badges.
 */
export default function Tag({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`
        inline-flex
        items-center
        px-2.5
        py-1
        rounded-md
        text-xs
        font-medium
        bg-accent
        text-white
        hover:bg-accent-soft
        transition-colors
        duration-200
        ${className}
      `}
    >
      {children}
    </span>
  );
}