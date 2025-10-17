/**
 * Translation Utilities for Bilingual Support (English/Hindi)
 * 
 * This module provides i18n (internationalization) functionality for the website.
 * Supports dynamic language switching between English and Hindi.
 * 
 * Key Features:
 * - Load translations from JSON files
 * - Nested key access with dot notation (e.g., 'nav.home')
 * - Fallback to English if Hindi translation missing
 * - Type-safe translation keys
 * - Language detection from URL
 * 
 * @module translations
 */

// Static imports for translations (available at build time)
import enTranslations from '../../public/locales/en.json';
import hiTranslations from '../../public/locales/hi.json';

/**
 * Supported languages
 */
export type SupportedLocale = 'en' | 'hi';

/**
 * Translation data structure
 */
export interface TranslationData {
  [key: string]: string | TranslationData;
}

/**
 * Pre-loaded translations (static imports)
 */
export const translations = {
  en: enTranslations as TranslationData,
  hi: hiTranslations as TranslationData,
};

/**
 * Load translations from JSON file
 * 
 * @param locale - Language code ('en' or 'hi')
 * @returns Translation data object
 * 
 * @example
 * const enTranslations = await loadTranslations('en');
 * console.log('English translations loaded:', Object.keys(enTranslations));
 */
export async function loadTranslations(locale: SupportedLocale): Promise<TranslationData> {
  console.log(`[Translations] Loading translations for locale: ${locale}`);
  
  // Return cached translations if available
  if (translationsCache[locale]) {
    console.log(`[Translations] ✓ Using cached translations for ${locale}`);
    return translationsCache[locale] as TranslationData;
  }
  
  try {
    // Dynamic import of translation file
    // Files should be in /public/locales/en.json and /public/locales/hi.json
    const translations = await import(`../../public/locales/${locale}.json`);
    
    // Cache the translations
    translationsCache[locale] = translations.default || translations;
    
    console.log(`[Translations] ✓ Loaded translations for ${locale}`);
    console.log(`[Translations] Available keys:`, Object.keys(translationsCache[locale] || {}).slice(0, 10));
    
    return translationsCache[locale] as TranslationData;
  } catch (error) {
    console.error(`[Translations] ✗ Failed to load translations for ${locale}:`, error);
    
    // Return empty object as fallback
    translationsCache[locale] = {};
    return {};
  }
}

/**
 * Get nested value from object using dot notation
 * 
 * @param obj - Source object
 * @param path - Dot-separated path (e.g., 'nav.home')
 * @returns Value at path or undefined
 * 
 * @example
 * const value = getNestedValue({ nav: { home: 'Home' } }, 'nav.home');
 * console.log(value); // 'Home'
 */
function getNestedValue(obj: any, path: string): string | undefined {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return typeof current === 'string' ? current : undefined;
}

/**
 * Create translation function for specific locale
 * 
 * Returns a function that translates keys to localized strings.
 * If key not found, returns the key itself as fallback.
 * 
 * @param locale - Language code ('en' or 'hi')
 * @returns Translation function
 * 
 * @example
 * const t = useTranslation('en');
 * const homeText = t('nav.home'); // Returns 'Home'
 * const missingKey = t('missing.key'); // Returns 'missing.key' (fallback)
 */
export function useTranslation(locale: SupportedLocale) {
  console.log(`[Translations] Creating translation function for ${locale}`);
  
  /**
   * Translate a key to localized string
   * 
   * @param key - Translation key (supports dot notation)
   * @param fallback - Optional fallback value if key not found
   * @returns Translated string or fallback
   */
  return (key: string, fallback?: string): string => {
    const localeTranslations = translations[locale];
    
    if (!localeTranslations) {
      console.warn(`[Translations] Translations not available for ${locale}, returning key`);
      return fallback || key;
    }
    
    const value = getNestedValue(localeTranslations, key);
    
    if (value === undefined) {
      // If Hindi translation missing, try English as fallback
      if (locale === 'hi' && translations.en) {
        const enValue = getNestedValue(translations.en, key);
        if (enValue) {
          console.warn(`[Translations] Key '${key}' not found in Hindi, using English fallback`);
          return enValue;
        }
      }
      
      console.warn(`[Translations] Key '${key}' not found in ${locale} translations`);
      return fallback || key;
    }
    
    return value;
  };
}

/**
 * Detect language from URL path
 * 
 * @param pathname - URL pathname (e.g., '/hi/about' or '/about')
 * @returns Detected locale ('en' or 'hi')
 * 
 * @example
 * const locale = getLocaleFromPath('/hi/packages');
 * console.log(locale); // 'hi'
 * 
 * const locale2 = getLocaleFromPath('/about');
 * console.log(locale2); // 'en'
 */
export function getLocaleFromPath(pathname: string): SupportedLocale {
  console.log(`[Translations] Detecting locale from path: ${pathname}`);
  
  // Check if path starts with /hi/
  if (pathname.startsWith('/hi') || pathname === '/hi') {
    console.log(`[Translations] ✓ Detected locale: hi`);
    return 'hi';
  }
  
  console.log(`[Translations] ✓ Detected locale: en (default)`);
  return 'en';
}

/**
 * Get alternate language URL
 * 
 * @param currentPath - Current URL path
 * @param currentLocale - Current locale
 * @returns Alternate language URL path
 * 
 * @example
 * const alternatePath = getAlternatePath('/about', 'en');
 * console.log(alternatePath); // '/hi/about'
 * 
 * const alternatePath2 = getAlternatePath('/hi/packages', 'hi');
 * console.log(alternatePath2); // '/packages'
 */
export function getAlternatePath(currentPath: string, currentLocale: SupportedLocale): string {
  console.log(`[Translations] Getting alternate path for: ${currentPath} (${currentLocale})`);
  
  if (currentLocale === 'en') {
    // Switch to Hindi: add /hi prefix
    const alternatePath = `/hi${currentPath}`;
    console.log(`[Translations] ✓ Alternate path (Hindi): ${alternatePath}`);
    return alternatePath;
  } else {
    // Switch to English: remove /hi prefix
    const alternatePath = currentPath.replace(/^\/hi/, '') || '/';
    console.log(`[Translations] ✓ Alternate path (English): ${alternatePath}`);
    return alternatePath;
  }
}

/**
 * Get language display name
 * 
 * @param locale - Language code
 * @param inLocale - Language to display name in
 * @returns Language display name
 * 
 * @example
 * const name = getLanguageName('en', 'hi');
 * console.log(name); // 'English'
 * 
 * const name2 = getLanguageName('hi', 'en');
 * console.log(name2); // 'हिंदी'
 */
export function getLanguageName(locale: SupportedLocale, inLocale?: SupportedLocale): string {
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
 * Format date based on locale
 * 
 * @param date - Date to format
 * @param locale - Language code
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 * 
 * @example
 * const formattedDate = formatDate(new Date(), 'hi');
 * console.log(formattedDate); // Date in Hindi format
 */
export function formatDate(
  date: Date,
  locale: SupportedLocale,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const localeCode = locale === 'hi' ? 'hi-IN' : 'en-IN';
  
  try {
    return new Intl.DateTimeFormat(localeCode, options || defaultOptions).format(date);
  } catch (error) {
    console.error(`[Translations] Date formatting error:`, error);
    return date.toLocaleDateString();
  }
}

/**
 * Format number based on locale
 * 
 * @param num - Number to format
 * @param locale - Language code
 * @param options - Intl.NumberFormat options
 * @returns Formatted number string
 * 
 * @example
 * const price = formatNumber(15000, 'en', { style: 'currency', currency: 'INR' });
 * console.log(price); // ₹15,000
 */
export function formatNumber(
  num: number,
  locale: SupportedLocale,
  options?: Intl.NumberFormatOptions
): string {
  const localeCode = locale === 'hi' ? 'hi-IN' : 'en-IN';
  
  try {
    return new Intl.NumberFormat(localeCode, options).format(num);
  } catch (error) {
    console.error(`[Translations] Number formatting error:`, error);
    return num.toString();
  }
}

/**
 * Initialize translations by preloading both languages
 * Call this during build time to ensure translations are available
 * 
 * @example
 * await initTranslations();
 * console.log('Translations initialized');
 */
export async function initTranslations(): Promise<void> {
  console.log(`[Translations] Initializing all translations...`);
  
  try {
    await Promise.all([
      loadTranslations('en'),
      loadTranslations('hi'),
    ]);
    
    console.log(`[Translations] ✓ All translations initialized successfully`);
  } catch (error) {
    console.error(`[Translations] ✗ Failed to initialize translations:`, error);
  }
}

// Export all for easy importing
export default {
  loadTranslations,
  useTranslation,
  getLocaleFromPath,
  getAlternatePath,
  getLanguageName,
  formatDate,
  formatNumber,
  initTranslations,
};

