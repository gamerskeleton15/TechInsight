import Link from 'next/link';
import type { Metadata } from 'next';
import { getSortedPostsData, PostData } from '@/lib/posts';
import NewsletterForm from '@/components/NewsletterForm';
import AdSlot from '@/components/AdSlot';
import ThreadCard from '@/components/ThreadCard';

export const metadata: Metadata = {
  title: 'TechInsight - Where engineers share what they\'ve learned',
  description:
    'Practical threads from working engineers: backend, platform, and ML. No fluff, no hype — just hard-won knowledge you can apply today.',
  openGraph: {
    title: 'TechInsight',
    description:
      'Practical threads from working engineers. No fluff, no hype — just hard-won knowledge you can apply today.',
    type: 'website',
    siteName: 'TechInsight',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechInsight',
    description:
      'Practical threads from working engineers. No fluff, no hype — just hard-won knowledge you can apply today.',
  },
};

/** All distinct categories across the thread, sorted alphabetically. */
function categories(posts: PostData[]): string[] {
  return Array.from(new Set(posts.map((p) => p.category))).sort();
}

/** Posts with at least one comment in the last 7 days (simulated by recency). */
function activeThreads(posts: PostData[]): PostData[] {
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return posts
    .filter((p) => new Date(p.date).getTime() > sevenDaysAgo)
    .slice(0, 3);
}

export default async function Home() {
  const allPosts = await getSortedPostsData();
  const cats = categories(allPosts);
  const active = activeThreads(allPosts);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Hero — editorial column: left accent rule, masthead line, headline */}
        <section className="mb-6 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 max-w-3xl sm:max-w-4xl">
            <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-3">
              <span className="w-px h-6 sm:h-14 bg-accent" aria-hidden="true" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted">
                TechInsight · Vol. 01
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-muted mb-2 sm:mb-4">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-success" />
                </span>
                <span>Backend · Platform · ML · Issue 04</span>
              </div>

              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-3 sm:mb-4">
                Where working engineers
                <span className="block text-accent">& what; they learned</span>
              </h1>

              <p className="text-sm sm:text-lg text-muted max-w-2xl mb-4 sm:mb-6 leading-relaxed">
                From backend system design to machine learning applications —
                practical solutions from engineers who actually built the
                technology you use every day.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <Link
                  href="/blog"
                  className="px-4 py-2 sm:px-8 sm:py-4 text-sm sm:text-base bg-accent text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg text-center sm:text-left"
                >
                  Browse All Threads
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 sm:px-8 sm:py-4 text-sm sm:text-base bg-surface border border-border text-foreground font-semibold rounded-lg hover:bg-accent-soft hover:text-accent transition-all duration-200 text-center sm:text-left"
                >
                  Learn More
                </Link>
                <span className="text-[10px] sm:text-xs text-muted font-mono text-center sm:text-left w-full sm:w-auto">
                  {allPosts.length} threads
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 h-px bg-border" />
        </section>

        {/* Main Content */}
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
          {/* Main stream */}
          <main>
            {/* Category filter bar */}
            <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted mr-1">Explore by category:</span>
              <Link
                href="/blog"
                className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-accent bg-accent-soft text-accent hover:bg-accent hover:text-white transition-all duration-200"
              >
                All threads
              </Link>
              {cats.map((c) => (
                <Link
                  key={c}
                  href={`/blog?category=${encodeURIComponent(c)}`}
                  className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-border bg-surface hover:border-accent hover:text-accent transition-all duration-200"
                >
                  {c}
                </Link>
              ))}
            </div>

            {/* Threaded stream */}
            <section className="divide-y divide-border border-t border-border">
              {allPosts.map((post) => (
                <ThreadCard key={post.id} post={post} />
              ))}
            </section>

            {allPosts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted text-lg">No threads yet. Check back soon.</p>
                <Link
                  href="/blog"
                  className="mt-3 inline-block px-5 py-2 text-sm font-medium text-accent hover:underline"
                >
                  Browse all categories →
                </Link>
              </div>
            )}

            {/* AdSense slot mid-stream */}
            <div className="mt-12 sm:mt-16">
              <div className="relative">
                <AdSlot className="w-full" />
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-surface px-3 text-xs text-muted">
                  Sponsored Content
                </div>
              </div>
            </div>

            {/* Community Contributions */}
            <section className="mt-12 sm:mt-16 bg-gradient-to-r from-accent-soft via-surface to-accent-soft rounded-3xl px-6 py-8 sm:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">Community Contributions</h2>
                <p className="text-muted max-w-2xl mx-auto">
                  Every week, working engineers share their hardest-won lessons. From debugging mysterious production issues to building scalable systems, discover what actually works in the real world.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-5 shadow-lg border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-success text-white flex items-center justify-center font-bold text-sm">
                      AB
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Abdul B.</h3>
                      <p className="text-sm text-muted">Backend Engineer</p>
                    </div>
                  </div>
                  <p className="text-muted">
                    I finally solved the retry logic for our microservice communication. This article explains exactly how we implemented exponential backoff and circuit breakers.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-lg border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-success text-white flex items-center justify-center font-bold text-sm">
                      RS
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Ravi S.</h3>
                      <p className="text-sm text-muted">ML Engineer</p>
                    </div>
                  </div>
                  <p className="text-muted">
                    I documented the transformer model fine-tuning process that saved our team 3 weeks of debugging. Includes exact code snippets and setup instructions.
                  </p>
                </div>
              </div>
            </section>

            {/* Weekly roundup CTA */}
            <section className="mt-12 sm:mt-16 bg-surface border border-border rounded-3xl px-6 py-8 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-accent uppercase tracking-wider mb-3">Weekly Thread Roundup</p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    The best threads of the week, distilled.
                  </h2>
                  <p className="text-muted max-w-xl leading-relaxed">
                    Get one actionable thread per day, five days a week. No filler, no fluff — just practical engineering wisdom from working professionals who actually built the systems you use every day.
                  </p>
                </div>
                <div className="lg:w-1/3">
                  <div className="bg-gradient-to-br from-accent/10 to-accent-soft rounded-2xl p-5 sm:p-6 border border-accent/20">
                    <NewsletterForm dark />
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Sidebar: Active discussions */}
          <aside className="hidden lg:block lg:mt-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-surface border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Active discussions
                  </h3>
                </div>
                <p className="text-sm text-muted mb-4">
                  Threads with fresh replies this week.
                </p>
                <ul className="space-y-4">
                  {active.map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group block"
                      >
                        <p className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          {post.category} · active now
                        </p>
                      </Link>
                    </li>
                  ))}
                  {active.length === 0 && (
                    <li className="text-sm text-muted">No active threads yet.</li>
                  )}
                </ul>
              </div>

              {/* Write for us CTA */}
              <div className="bg-accent-soft border border-accent/20 rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Write for TechInsight
                </h3>
                <p className="text-sm text-muted mb-4">
                  Got a hard-won lesson from the trenches? We publish it.
                </p>
                <Link
                  href="/write"
                  className="inline-block text-sm font-medium text-accent hover:underline"
                >
                  Share your thread →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}