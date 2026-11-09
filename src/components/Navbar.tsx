'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { User } from '@/lib/auth';
import { logout } from '@/app/auth/actions';

export default function Navbar({ user }: { user?: User | null }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-surface/90 backdrop-blur-md border-b border-border sticky top-0 z-50 w-full max-w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full box-border">
        <div className="flex items-center justify-between w-full h-16 min-w-0">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center space-x-2.5">
              <img
                src="/techinsight-logo.svg"
                alt="TechInsight"
                className="h-7 w-auto shrink-0"
              />
              <span className="text-xl font-bold text-foreground hidden sm:block font-display tracking-tight">
                Tech<span className="text-accent">Insight</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - hidden on small screens */}
          <div className="hidden md:flex items-center space-x-1 shrink min-w-0">
            <Link
              href="/"
              className="px-3 lg:px-4 py-2 text-sm font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-all duration-200 shrink"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="px-3 lg:px-4 py-2 text-sm font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-all duration-200 shrink"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="px-3 lg:px-4 py-2 text-sm font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-all duration-200 shrink"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-3 lg:px-4 py-2 text-sm font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-all duration-200 shrink"
            >
              Contact
            </Link>

            {/* Dropdown for Legal Pages */}
            <div className="relative group shrink">
              <button className="px-3 lg:px-4 py-2 text-sm font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-all duration-200 flex items-center shrink">
                Legal
                <svg className="w-4 h-4 ml-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-surface rounded-xl shadow-lg border border-border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="/privacy-policy"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-accent-soft hover:text-accent"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-accent-soft hover:text-accent"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/disclaimer"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-accent-soft hover:text-accent"
                >
                  Disclaimer
                </Link>
              </div>
            </div>

            {user ? (
              <div className="ml-2 lg:ml-4 flex items-center space-x-2 lg:space-x-3 shrink-0">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 group shrink-0"
                  title="Your profile"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.name} avatar`}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-success text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {(user.name || 'U').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden sm:block text-sm text-muted max-w-[8rem] lg:max-w-[10rem] truncate group-hover:text-accent">
                    {user.name}
                  </span>
                </Link>
                <Link
                  href="/write"
                  className="px-3 lg:px-5 py-2 text-sm font-medium text-white bg-accent hover:opacity-90 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md shrink-0"
                >
                  Write
                </Link>
                <form action={logout} className="shrink-0">
                  <button
                    type="submit"
                    className="px-3 lg:px-4 py-2 text-sm font-medium text-muted border border-border hover:bg-accent-soft hover:text-red-400 rounded-lg transition-all duration-200 shrink-0"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden shrink-0">
            {user ? (
              <Link
                href="/write"
                className="mr-2 px-4 py-2 text-sm font-medium text-white bg-accent hover:opacity-90 rounded-lg transition-all duration-200"
              >
                Write
              </Link>
            ) : null}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent-soft transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-4 py-4 space-y-2 bg-surface border-t border-border">
          <Link
            href="/"
            className="block px-4 py-3 text-base font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="block px-4 py-3 text-base font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="block px-4 py-3 text-base font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block px-4 py-3 text-base font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>

          {/* Legal Pages in Mobile */}
          <div className="pt-2 border-t border-border">
            <p className="px-4 py-2 text-xs font-semibold text-muted uppercase tracking-wider">
              Legal
            </p>
            <Link
              href="/privacy-policy"
              className="block px-4 py-3 text-base font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="block px-4 py-3 text-base font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Terms of Service
            </Link>
            <Link
              href="/disclaimer"
              className="block px-4 py-3 text-base font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Disclaimer
            </Link>
          </div>

          {/* Auth in Mobile */}
          <div className="pt-4 space-y-2">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.name} avatar`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-success text-white flex items-center justify-center text-xs font-bold">
                      {(user.name || 'U').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-3 text-base font-medium text-muted hover:text-accent hover:bg-accent-soft rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/write"
                  className="block w-full px-4 py-3 text-center text-base font-medium text-white bg-accent hover:opacity-90 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Write
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    className="block w-full px-4 py-3 text-center text-base font-medium text-foreground border border-border hover:bg-accent-soft hover:text-red-400 rounded-lg transition-all duration-200"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}