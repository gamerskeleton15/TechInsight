import React from 'react';

/**
 * Modern Code Block Container
 *
 * Sleek styling for code snippets:
 * - Extra-dark background (`code-bg` token)
 * - Monospace font (JetBrains Mono via `--font-mono` variable)
 * - Comfortable padding and rounded corners
 *
 * Usage:
 *   <CodeBlock code="const x = 1;" language="javascript" />
 */
export default function CodeBlock({
  code,
  language = 'javascript',
  className = '',
}: {
  code: string;
  language?: string;
  className?: string;
}) {
  return (
    <pre
      className={`
        bg-code-bg
        text-code-fg
        text-[var(--font-mono)]
        rounded-lg
        p-6
        text-sm
        overflow-x-auto
        border border-code-border
        ${className}
      `}
    >
      <code className="whitespace-pre">{code}</code>
    </pre>
  );
}