/**
 * Mobile Menu Component - Shadcn Sheet Style
 * Beautiful sliding sidebar from right side
 */

import { useState } from 'react';

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
        onClick={() => setIsOpen(true)}
        className="md:hidden relative z-50 p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
        aria-label="Open menu"
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

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sheet - Sliding Sidebar from Right */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-[101]
          transform transition-transform duration-300 ease-in-out md:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
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
            onClick={() => setIsOpen(false)}
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
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                  }
                `}
                onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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

