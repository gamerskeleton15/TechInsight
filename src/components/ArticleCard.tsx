import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
  /** Post metadata */
  title: string;
  description: string;
  coverImage: string;
  slug: string;
  author?: string;
  category?: string;
  date?: string;

  /** Takeaway from the author (TechInsight signature) */
  takeaway?: string;

  /** Optional custom excerpt */
  excerpt?: string;

  /** Class names to apply on the outermost container */
  className?: string;
}

/**
 * Modern Article Card – "Bento Grid" style
 *
 * Uses the design-system tokens defined in tailwind.config.ts:
 * - rounded-xl (0.75rem)
 * - border-border (1px hairline)
 * - bg-surface (raised panel)
 * - hover:scale-105 (hover lift effect)
 * - transition-transform duration-300 (smooth animation)
 *
 * Includes the TechInsight signature: a Key Takeaway box for the author’s
 * single most actionable sentence.
 */
export default function ArticleCard({
  title,
  description,
  coverImage,
  slug,
  author,
  category,
  date,
  takeaway,
  excerpt,
  className = '',
}: ArticleCardProps) {
  return (
    <article
      className={`
        group rounded-xl
        border-1 border-border
        bg-surface
        p-6
        transition-all duration-300
        hover:scale-105
        ${className}
      `}
    >
      {/* Cover Image */}
      <div className="mb-4 overflow-hidden rounded-lg">
        <Image
          src={coverImage}
          alt={title}
          width={400}
          height={200}
          className="h-auto w-full object-cover"
          priority={false}
        />
      </div>

      {/* Article Title */}
      <h3 className="mb-2 text-2xl font-semibold text-foreground">
        <Link href={`/blog/${slug}`} className="hover:text-accent transition-colors">
          {title}
        </Link>
      </h3>

      {/* Excerpt / Takeaway Preview */}
      <div className="mb-4">
        {excerpt && (
          <p className="line-clamp-3 text-sm text-muted">{excerpt}</p>
        )}
        {takeaway && !excerpt && (
          <div className="flex items-start gap-2">
            <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white text-xs font-medium">
              🔑
            </span>
            <p className="text-sm font-medium text-foreground">{takeaway}</p>
          </div>
        )}
      </div>

      {/* Category and Metadata */}
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        {category && (
          <span className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
            {category}
          </span>
        )}
        {author && (
          <>
            <span>·</span>
            <span>{author}</span>
          </>
        )}
        {date && (
          <>
            <span>·</span>
            <span>{date}</span>
          </>
        )}
      </div>

      {/* Read More Link */}
      <Link
        href={`/blog/${slug}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:underline"
      >
        Read article →
      </Link>
    </article>
  );
}