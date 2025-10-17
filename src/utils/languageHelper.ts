/**
 * Language Helper Utility - Centralized Language Detection & URL Generation
 * 
 * This module provides a robust, centralized system for:
 * - Detecting the current language from URL paths
 * - Generating correct URLs for both English and Hindi versions
 * - Handling edge cases (home page, blog posts, nested routes)
 * - Ensuring consistent language behavior across the entire website
 * 
 * ARCHITECTURE:
 * - English pages: / /packages /about /contact etc.
 * - Hindi pages: /hi /hi/packages /hi/about /hi/contact etc.
 * 
 * HOW IT WORKS:
 * 1. URL path is analyzed to detect /hi/ prefix
 * 2. If /hi/ found → Hindi, else → English (default)
 * 3. All navigation links are generated with correct language prefix
 * 4. Language toggle creates alternate URL by adding/removing /hi/
 * 
 * @module languageHelper
 */

import type { AstroGlobal } from 'astro';

/**
 * Supported locales for the website
 */
export type SupportedLocale = 'en' | 'hi';

/**
 * Language detection result with metadata
 */
export interface LanguageContext {
  /** Current locale (en or hi) */
  locale: SupportedLocale;
  
  /** Current pathname without language prefix */
  basePath: string;
  
  /** Full current pathname */
  fullPath: string;
  
  /** Alternate language locale */
  alternateLocale: SupportedLocale;
  
  /** Alternate language URL path */
  alternatePath: string;
  
  /** Is this the Hindi version? */
  isHindi: boolean;
  
  /** Is this the English version? */
  isEnglish: boolean;
}

/**
 * Detect current language from Astro context
 * 
 * This is the PRIMARY function for language detection.
 * Use this in all Astro pages to get the current language.
 * 
 * DETECTION LOGIC:
 * - Check URL pathname for /hi/ prefix
 * - Falls back to Astro.currentLocale if available
 * - Default to 'en' if uncertain
 * 
 * @param Astro - Astro global context
 * @returns Complete language context object
 * 
 * @example
 * ```astro
 * ---
 * import { detectLanguage } from '../utils/languageHelper';
 * const langContext = detectLanguage(Astro);
 * const { locale, alternatePath } = langContext;
 * ---
 * <html lang={locale}>
 * ```
 */
export function detectLanguage(Astro: AstroGlobal): LanguageContext {
  console.log('[LanguageHelper] Detecting language from Astro context');
  
  try {
    // Get pathname from Astro URL
    const pathname = Astro.url.pathname;
    console.log(`[LanguageHelper] Current pathname: ${pathname}`);
    
    // Check if path starts with /hi or /hi/
    const isHindiPath = pathname === '/hi' || pathname.startsWith('/hi/');
    
    // Determine locale
    let locale: SupportedLocale;
    
    // Try Astro's built-in locale detection first
    if (Astro.currentLocale && (Astro.currentLocale === 'hi' || Astro.currentLocale === 'en')) {
      locale = Astro.currentLocale as SupportedLocale;
      console.log(`[LanguageHelper] Using Astro.currentLocale: ${locale}`);
    } else if (isHindiPath) {
      locale = 'hi';
      console.log(`[LanguageHelper] Detected Hindi from pathname`);
    } else {
      locale = 'en';
      console.log(`[LanguageHelper] Defaulting to English`);
    }
    
    // Calculate base path (without language prefix)
    let basePath: string;
    if (locale === 'hi') {
      // Remove /hi prefix
      basePath = pathname.replace(/^\/hi/, '') || '/';
    } else {
      basePath = pathname;
    }
    
    console.log(`[LanguageHelper] Base path: ${basePath}`);
    
    // Calculate alternate locale and path
    const alternateLocale: SupportedLocale = locale === 'en' ? 'hi' : 'en';
    let alternatePath: string;
    
    if (locale === 'en') {
      // Switch to Hindi: add /hi prefix
      alternatePath = basePath === '/' ? '/hi' : `/hi${basePath}`;
    } else {
      // Switch to English: remove /hi prefix
      alternatePath = basePath;
    }
    
    console.log(`[LanguageHelper] Alternate locale: ${alternateLocale}, path: ${alternatePath}`);
    
    // Build complete context object
    const context: LanguageContext = {
      locale,
      basePath,
      fullPath: pathname,
      alternateLocale,
      alternatePath,
      isHindi: locale === 'hi',
      isEnglish: locale === 'en',
    };
    
    console.log(`[LanguageHelper] ✓ Language context created:`, context);
    
    return context;
    
  } catch (error) {
    console.error('[LanguageHelper] ✗ Error detecting language:', error);
    
    // Return safe default (English)
    return {
      locale: 'en',
      basePath: '/',
      fullPath: '/',
      alternateLocale: 'hi',
      alternatePath: '/hi',
      isHindi: false,
      isEnglish: true,
    };
  }
}

/**
 * Generate localized URL path
 * 
 * Creates correct URL path for given locale and base path.
 * Handles edge cases like home page and nested routes.
 * 
 * @param basePath - Base path without language prefix (e.g., '/packages')
 * @param locale - Target locale
 * @returns Full path with language prefix if needed
 * 
 * @example
 * ```typescript
 * const enPath = getLocalizedPath('/packages', 'en');  // '/packages'
 * const hiPath = getLocalizedPath('/packages', 'hi');  // '/hi/packages'
 * const enHome = getLocalizedPath('/', 'en');          // '/'
 * const hiHome = getLocalizedPath('/', 'hi');          // '/hi'
 * ```
 */
export function getLocalizedPath(basePath: string, locale: SupportedLocale): string {
  console.log(`[LanguageHelper] Generating localized path for: ${basePath} (${locale})`);
  
  try {
    // Normalize base path
    let normalizedPath = basePath.trim();
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = '/' + normalizedPath;
    }
    
    // Generate localized path
    let localizedPath: string;
    
    if (locale === 'hi') {
      // Hindi: add /hi prefix
      localizedPath = normalizedPath === '/' ? '/hi' : `/hi${normalizedPath}`;
    } else {
      // English: use base path as-is
      localizedPath = normalizedPath;
    }
    
    console.log(`[LanguageHelper] ✓ Localized path: ${localizedPath}`);
    return localizedPath;
    
  } catch (error) {
    console.error('[LanguageHelper] ✗ Error generating localized path:', error);
    return basePath; // Fallback to original path
  }
}

/**
 * Generate navigation links for current locale
 * 
 * Creates a complete set of navigation links with correct language prefix.
 * Used by Header component to generate proper navigation.
 * 
 * @param locale - Current locale
 * @returns Object with all navigation links
 * 
 * @example
 * ```typescript
 * const links = getNavigationLinks('hi');
 * // links.home = '/hi'
 * // links.packages = '/hi/packages'
 * // links.about = '/hi/about'
 * ```
 */
export function getNavigationLinks(locale: SupportedLocale): Record<string, string> {
  console.log(`[LanguageHelper] Generating navigation links for locale: ${locale}`);
  
  try {
    const baseLinks = {
      home: '/',
      packages: '/packages',
      about: '/about',
      contact: '/contact',
      permits: '/permits',
      howToReach: '/how-to-reach',
      accommodation: '/accommodation',
      preparation: '/preparation',
      gallery: '/gallery',
      blog: '/blog',
      faq: '/faq',
    };
    
    // If Hindi, add /hi prefix to all links
    if (locale === 'hi') {
      const hindiLinks: Record<string, string> = {};
      
      for (const [key, path] of Object.entries(baseLinks)) {
        hindiLinks[key] = path === '/' ? '/hi' : `/hi${path}`;
      }
      
      console.log(`[LanguageHelper] ✓ Generated Hindi navigation links`);
      return hindiLinks;
    }
    
    // English: return base links as-is
    console.log(`[LanguageHelper] ✓ Generated English navigation links`);
    return baseLinks;
    
  } catch (error) {
    console.error('[LanguageHelper] ✗ Error generating navigation links:', error);
    // Return English links as fallback
    return {
      home: '/',
      packages: '/packages',
      about: '/about',
      contact: '/contact',
      permits: '/permits',
      howToReach: '/how-to-reach',
      accommodation: '/accommodation',
      preparation: '/preparation',
      gallery: '/gallery',
      blog: '/blog',
      faq: '/faq',
    };
  }
}

/**
 * Check if a path is a Hindi path
 * 
 * @param pathname - URL pathname to check
 * @returns True if path is Hindi
 * 
 * @example
 * ```typescript
 * isHindiPath('/hi/packages');  // true
 * isHindiPath('/packages');     // false
 * isHindiPath('/hi');           // true
 * ```
 */
export function isHindiPath(pathname: string): boolean {
  return pathname === '/hi' || pathname.startsWith('/hi/');
}

/**
 * Get locale from pathname
 * 
 * Simple utility to extract locale from any pathname.
 * 
 * @param pathname - URL pathname
 * @returns Detected locale
 * 
 * @example
 * ```typescript
 * getLocaleFromPath('/hi/packages');  // 'hi'
 * getLocaleFromPath('/packages');     // 'en'
 * ```
 */
export function getLocaleFromPath(pathname: string): SupportedLocale {
  return isHindiPath(pathname) ? 'hi' : 'en';
}

/**
 * Get base path from pathname (remove language prefix)
 * 
 * Removes /hi prefix if present, useful for canonical URLs.
 * 
 * @param pathname - Full pathname
 * @returns Base path without language prefix
 * 
 * @example
 * ```typescript
 * getBasePath('/hi/packages');  // '/packages'
 * getBasePath('/packages');     // '/packages'
 * getBasePath('/hi');           // '/'
 * ```
 */
export function getBasePath(pathname: string): string {
  if (isHindiPath(pathname)) {
    const base = pathname.replace(/^\/hi/, '') || '/';
    return base;
  }
  return pathname;
}

/**
 * Validate locale string
 * 
 * Type guard to check if a string is a valid locale.
 * 
 * @param locale - String to validate
 * @returns True if valid locale
 */
export function isValidLocale(locale: string): locale is SupportedLocale {
  return locale === 'en' || locale === 'hi';
}

/**
 * Get language display name
 * 
 * @param locale - Locale code
 * @param inLocale - Language to display name in (optional)
 * @returns Display name
 * 
 * @example
 * ```typescript
 * getLanguageDisplayName('en', 'en');  // 'English'
 * getLanguageDisplayName('hi', 'hi');  // 'हिंदी'
 * getLanguageDisplayName('en', 'hi');  // 'English'
 * ```
 */
export function getLanguageDisplayName(
  locale: SupportedLocale,
  inLocale?: SupportedLocale
): string {
  const names: Record<SupportedLocale, Record<SupportedLocale, string>> = {
    en: {
      en: 'English',
      hi: 'English',
    },
    hi: {
      en: 'Hindi',
      hi: 'हिंदी',
    },
  };
  
  const displayLocale = inLocale || locale;
  return names[locale][displayLocale] || locale.toUpperCase();
}

/**
 * DEBUGGING UTILITIES
 */

/**
 * Log language context (for debugging)
 * 
 * Pretty-prints language context to console.
 * 
 * @param context - Language context to log
 * @param label - Optional label for the log
 */
export function logLanguageContext(context: LanguageContext, label?: string): void {
  const prefix = label ? `[LanguageHelper:${label}]` : '[LanguageHelper]';
  console.log(`${prefix} Language Context:`);
  console.log(`  - Locale: ${context.locale}`);
  console.log(`  - Base Path: ${context.basePath}`);
  console.log(`  - Full Path: ${context.fullPath}`);
  console.log(`  - Alternate: ${context.alternateLocale} → ${context.alternatePath}`);
  console.log(`  - Is Hindi: ${context.isHindi}`);
  console.log(`  - Is English: ${context.isEnglish}`);
}

// Export all utilities as default for convenience
export default {
  detectLanguage,
  getLocalizedPath,
  getNavigationLinks,
  isHindiPath,
  getLocaleFromPath,
  getBasePath,
  isValidLocale,
  getLanguageDisplayName,
  logLanguageContext,
};

