import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../design-system";
import { QrCode, Menu, X, Search, Sparkles } from "lucide-react";

export interface HeaderLink {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface HeaderProps {
  brandName?: string;
  links?: HeaderLink[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onGetStarted?: () => void;
  rightContent?: React.ReactNode;
  className?: string;
}

export function Header({
  brandName = "EzQR",
  links = [],
  searchPlaceholder = "Search tools...",
  onSearch,
  onGetStarted,
  rightContent,
  className,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-[var(--ez-z-nav,50)]",
        "bg-[var(--ez-bg-primary)]/90 backdrop-blur-xl",
        "border-b border-[var(--ez-border-default)]",
        className
      )}
    >
      <div className="max-w-[1100px] mx-auto px-5 h-16 flex items-center gap-4">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-[var(--ez-text-dim)] hover:text-[var(--ez-text-primary)] hover:bg-[var(--ez-bg-elevated)] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ez-border-focus)]"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand */}
        <a href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--ez-accent-gradient)] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <QrCode className="w-5 h-5" />
          </div>
          <span className="font-[var(--ez-font-display)] font-extrabold text-[19px] tracking-tight text-[var(--ez-text-primary)]">
            {brandName.split("").map((ch, i) =>
              ch === ch.toUpperCase() && ch !== ch.toLowerCase() ? (
                <span key={i}>{ch}</span>
              ) : (
                <em key={i} className="font-normal not-italic text-[var(--ez-text-secondary)]">{ch}</em>
              )
            )}
          </span>
        </a>

        {/* Search */}
        {onSearch && (
          <div className="hidden sm:flex flex-1 max-w-xs relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ez-text-dim)]" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-[var(--ez-bg-surface)] border border-[var(--ez-border-default)] rounded-lg pl-9 pr-3 py-2 text-[var(--ez-text-sm)] text-[var(--ez-text-primary)] placeholder:text-[var(--ez-text-dim)] focus:outline-none focus:border-[var(--ez-border-focus)] transition-colors"
            />
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Desktop nav links */}
          {links.map((link) => {
            if (link.onClick) {
              return (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] bg-[var(--ez-bg-elevated)] border border-[var(--ez-border-strong)] text-[var(--ez-text-xs)] font-bold text-[var(--ez-text-secondary)] rounded-lg hover:text-[var(--ez-text-primary)] hover:border-[var(--ez-border-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ez-border-focus)] transition-all"
                >
                  {link.icon && <span>{link.icon}</span>}
                  {link.label}
                </button>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] bg-[var(--ez-bg-elevated)] border border-[var(--ez-border-strong)] text-[var(--ez-text-xs)] font-bold text-[var(--ez-text-secondary)] rounded-lg hover:text-[var(--ez-text-primary)] hover:border-[var(--ez-border-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ez-border-focus)] transition-all"
              >
                {link.icon && <span>{link.icon}</span>}
                {link.label}
              </a>
            );
          })}
          {rightContent}
          {onGetStarted && (
            <Button variant="gradient" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />} onClick={onGetStarted}>
              Get Started
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--ez-border-default)] bg-[var(--ez-bg-primary)] px-5 py-4 flex flex-col gap-3 animate-in fade-in">
          {onSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ez-text-dim)]" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-[var(--ez-bg-surface)] border border-[var(--ez-border-default)] rounded-lg pl-9 pr-3 py-2.5 text-[var(--ez-text-sm)] text-[var(--ez-text-primary)] placeholder:text-[var(--ez-text-dim)] focus:outline-none focus:border-[var(--ez-border-focus)] transition-colors"
              />
            </div>
          )}
          {links.map((link) => {
            if (link.onClick) {
              return (
                <button
                  key={link.label}
                  onClick={() => { link.onClick!(); setMobileOpen(false); }}
                  className="flex items-center gap-2 py-2 min-h-[44px] text-[var(--ez-text-sm)] font-bold text-[var(--ez-text-muted)] hover:text-[var(--ez-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ez-border-focus)] rounded text-left w-full"
                >
                  {link.icon && <span>{link.icon}</span>}
                  {link.label}
                </button>
              );
            }
            return (
              <a key={link.label} href={link.href} className="flex items-center gap-2 py-2 min-h-[44px] text-[var(--ez-text-sm)] font-bold text-[var(--ez-text-muted)] hover:text-[var(--ez-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ez-border-focus)] rounded">
                {link.icon && <span>{link.icon}</span>}
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
