/**
 * Mobile Menu Component - Shadcn Sheet Style
 * Beautiful sliding sidebar from right side
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface MobileMenuProps {
  currentLocale: 'en' | 'hi';
  navLinks: {
    home: string;
    about: string;
    packages: string;
    permits: string;
    howToReach: string;
    accommodation: string;
    preparation: string;
    gallery: string;
    blog: string;
    faq: string;
    contact: string;
  };
  currentPath: string;
  togglePath: string;
  translations: {
    home: string;
    about: string;
    packages: string;
    permits: string;
    howToReach: string;
    accommodation: string;
    preparation: string;
    gallery: string;
    blog: string;
    faq: string;
    contact: string;
    menu: string;
    close: string;
    switchLanguage: string;
  };
}

export default function MobileMenu({ currentLocale, navLinks, currentPath, togglePath, translations }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const scrollYRef = useRef<number>(0);
  const prevBodyStylesRef = useRef<{ overflow: string; touchAction: string; position: string; top: string; width: string } | null>(null);
  const prevHtmlOverscrollRef = useRef<string | null>(null);

  // Mount flag for portal (avoids SSR mismatches)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('[MobileMenu] ESC → closing');
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // Lock body scroll while menu open
  useEffect(() => {
    if (!isOpen) return;
    // Save previous styles
    prevBodyStylesRef.current = {
      overflow: document.body.style.overflow,
      touchAction: document.body.style.touchAction,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    prevHtmlOverscrollRef.current = (document.documentElement.style as any).overscrollBehaviorY || '';

    // Lock scroll (robust: prevent iOS page resize/jump)
    scrollYRef.current = window.scrollY;
    document.documentElement.style.setProperty('overscroll-behavior-y', 'none');
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = '100%';
    console.log('[MobileMenu] Body scroll locked at Y=', scrollYRef.current);

    const preventTouchScroll = (e: TouchEvent) => {
      if (!sheetRef.current) return;
      if (!sheetRef.current.contains(e.target as Node)) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventTouchScroll, { passive: false });

    return () => {
      // Restore styles
      const prev = prevBodyStylesRef.current;
      if (prev) {
        document.body.style.overflow = prev.overflow;
        document.body.style.touchAction = prev.touchAction;
        document.body.style.position = prev.position;
        document.body.style.top = prev.top;
        document.body.style.width = prev.width;
      } else {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
      }
      if (prevHtmlOverscrollRef.current !== null) {
        document.documentElement.style.setProperty('overscroll-behavior-y', prevHtmlOverscrollRef.current);
      } else {
        (document.documentElement.style as any).overscrollBehaviorY = '';
      }
      // Restore scroll position
      window.scrollTo(0, scrollYRef.current || 0);

      document.removeEventListener('touchmove', preventTouchScroll as any);
      console.log('[MobileMenu] Body scroll restored, scrolled back to Y=', scrollYRef.current);
    };
  }, [isOpen]);

  // Close if viewport becomes >= md (prevent stuck-open on rotate)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        console.log('[MobileMenu] Resize >= md → closing');
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const id = window.requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
        console.log('[MobileMenu] Focus set to first link');
      });
      return () => window.cancelAnimationFrame(id);
    } else {
      buttonRef.current?.focus();
    }
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === '/' || path === '/hi') {
      return currentPath === path || currentPath === `${path}/`;
    }
    return currentPath.startsWith(path);
  };

  const menuItems = [
    { href: navLinks.home, label: translations.home, icon: '🏠' },
    { href: navLinks.about, label: translations.about, icon: '📖' },
    { href: navLinks.packages, label: translations.packages, icon: '🏔️' },
    { href: navLinks.permits, label: translations.permits, icon: '📋' },
    { href: navLinks.howToReach, label: translations.howToReach, icon: '🚗' },
    { href: navLinks.accommodation, label: translations.accommodation, icon: '🏨' },
    { href: navLinks.preparation, label: translations.preparation, icon: '🎒' },
    { href: navLinks.gallery, label: translations.gallery, icon: '📸' },
    { href: navLinks.blog, label: translations.blog, icon: '✍️' },
    { href: navLinks.faq, label: translations.faq, icon: '❓' },
    { href: navLinks.contact, label: translations.contact, icon: '📞' },
  ];

  return (
    <>
      {/* Mobile Menu Button - Hamburger Icon */}
      <button
        ref={buttonRef}
        onClick={() => {
          console.log('[MobileMenu] Open click');
          setIsOpen(true);
        }}
        className="md:hidden relative z-50 p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-sheet"
        type="button"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay + Sheet rendered via portal to body for full-viewport coverage */}
      {isMounted && createPortal(
        <div className="fixed inset-0 z-[10001] md:hidden" style={{ height: '100dvh' }}>
          {isOpen && (
            <div
              className="absolute inset-0 bg-black/50 animate-fade-in pointer-events-auto"
              onClick={() => {
                console.log('[MobileMenu] Overlay click → closing');
                setIsOpen(false);
              }}
              aria-hidden="true"
              style={{ height: '100dvh' }}
            />
          )}

          <div
            ref={sheetRef}
            id="mobile-menu-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className={`
              absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl
              transform transition-transform duration-300 ease-in-out pointer-events-auto
              ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
            style={{ height: '100dvh' }}
          >
        {/* Sheet Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-blue-50">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🕉️</span>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Shiv Yatra Tourism
              </h2>
              <p className="text-xs text-gray-600">
                Sacred Himalayan Pilgrimages
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              console.log('[MobileMenu] Close click');
              setIsOpen(false);
            }}
            className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Close menu"
            type="button"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sheet Content - Scrollable Menu */}
        <div className="overflow-y-auto h-[calc(100%-140px)] p-4">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                ref={index === 0 ? firstLinkRef : undefined}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                  }
                `}
                onClick={() => {
                  console.log('[MobileMenu] Nav link click → closing');
                  setIsOpen(false);
                }}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {isActive(item.href) && (
                  <svg
                    className="w-5 h-5 ml-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Sheet Footer - Language Toggle */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <a
            href={togglePath}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all"
            onClick={() => {
              console.log('[MobileMenu] Language toggle click → closing');
              setIsOpen(false);
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              {currentLocale === 'en' ? '🇮🇳 हिंदी में बदलें' : '🇬🇧 Switch to English'}
            </span>
          </a>
        </div>
          </div>
        </div>, document.body)
      }

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}

