# Utils Module Documentation

This directory contains utility functions and helpers for the Shiv Yatra Tourism website.

## 📁 Files Overview

### 1. `languageHelper.ts` 🌐
**Primary language detection and URL generation utility**

#### Key Functions

##### `detectLanguage(Astro): LanguageContext`
Detects current language from URL path and returns complete context.

**Usage**:
```typescript
import { detectLanguage } from '../utils/languageHelper';

const langContext = detectLanguage(Astro);
// Returns: { locale: 'en'|'hi', basePath, fullPath, alternatePath, ... }
```

**Return Object**:
```typescript
{
  locale: 'en' | 'hi',           // Current language
  basePath: '/packages',         // Path without language prefix
  fullPath: '/hi/packages',      // Full current path
  alternateLocale: 'en',         // Other language
  alternatePath: '/packages',    // Path in other language
  isHindi: true,                 // Boolean helpers
  isEnglish: false
}
```

**How It Works**:
```
URL: /hi/packages
  ↓
Check for /hi prefix
  ↓
locale = 'hi'
  ↓
Calculate basePath = /packages (remove /hi)
  ↓
Calculate alternatePath = /packages (English version)
  ↓
Return complete context object
```

##### `getLocalizedPath(basePath, locale): string`
Generates localized URL path for given locale.

**Usage**:
```typescript
getLocalizedPath('/packages', 'en');  // → '/packages'
getLocalizedPath('/packages', 'hi');  // → '/hi/packages'
getLocalizedPath('/', 'hi');          // → '/hi'
```

##### `getNavigationLinks(locale): object`
Generates complete set of navigation links with correct language prefix.

**Usage**:
```typescript
const navLinks = getNavigationLinks('hi');
// Returns:
// {
//   home: '/hi',
//   packages: '/hi/packages',
//   contact: '/hi/contact',
//   ...
// }
```

#### Error Handling

All functions include try-catch blocks and fallback to safe defaults:

```typescript
try {
  // Detect language
} catch (error) {
  console.error('[LanguageHelper] Error:', error);
  // Return English as fallback
  return { locale: 'en', ... };
}
```

#### Console Logging

Every function logs its activity for debugging:

```typescript
console.log('[LanguageHelper] Detecting language from Astro context');
console.log(`[LanguageHelper] Current pathname: ${pathname}`);
console.log(`[LanguageHelper] ✓ Detected locale: ${locale}`);
```

---

### 2. `translations.ts` 📝
**Translation loading and usage utilities**

#### Key Functions

##### `useTranslation(locale): function`
Returns a translation function for the specified locale.

**Usage**:
```typescript
import { useTranslation } from '../utils/translations';

const t = useTranslation('hi');
const title = t('hero.title');           // Gets Hindi title
const fallback = t('missing.key', 'Default');  // With fallback
```

**How It Works**:
```
Call useTranslation('hi')
  ↓
Load translations from hi.json
  ↓
Return function that:
  1. Takes key (e.g., 'hero.title')
  2. Navigates nested object with dot notation
  3. Returns translated string
  4. Falls back to English if missing
  5. Returns key if both missing
```

##### `getLocaleFromPath(pathname): 'en'|'hi'`
Simple locale detection from pathname.

**Usage**:
```typescript
getLocaleFromPath('/hi/packages');  // → 'hi'
getLocaleFromPath('/packages');     // → 'en'
```

##### `formatDate(date, locale, options?): string`
Formats date according to locale.

**Usage**:
```typescript
formatDate(new Date(), 'hi');
// → "१७ अक्तूबर २०२५" (Hindi numerals)

formatDate(new Date(), 'en', { month: 'short' });
// → "Oct 17, 2025"
```

##### `formatNumber(num, locale, options?): string`
Formats numbers according to locale.

**Usage**:
```typescript
formatNumber(15000, 'en');  // → "15,000"
formatNumber(15000, 'hi');  // → "१५,०००"

formatNumber(15000, 'en', { style: 'currency', currency: 'INR' });
// → "₹15,000"
```

#### Translation File Structure

**Location**: `/public/locales/`

**Files**:
- `en.json` - English translations
- `hi.json` - Hindi translations

**Structure**:
```json
{
  "nav": {
    "home": "Home",
    "packages": "Tour Packages",
    "contact": "Contact Us"
  },
  "hero": {
    "title": "Adi Kailash Yatra 2025",
    "subtitle": "Sacred Pilgrimage to Lord Shiva's Abode",
    "cta": "Explore Packages"
  },
  "whatsapp": {
    "button": "Chat on WhatsApp",
    "message": "Hi, I'm interested in Adi Kailash packages..."
  }
}
```

#### Fallback Logic

```typescript
Key lookup flow:
1. Check Hindi translation
2. If missing → Check English translation
3. If missing → Return fallback parameter
4. If no fallback → Return key itself

Example:
t('new.feature', 'Coming Soon')
  → Hindi: (missing)
  → English: (missing)
  → Fallback: 'Coming Soon' ✓
```

---

### 3. `dataLoader.ts` 📂
**CSV and JSON data file loading utilities**

#### Key Functions

##### `loadCSV(filename): Promise<any[]>`
Loads and parses CSV file from `/data/` directory.

**Usage**:
```typescript
import { loadCSV } from '../utils/dataLoader';

const data = await loadCSV('keywords.csv');
// Returns array of objects with headers as keys
```

**Under the Hood**:
- Uses PapaParse for CSV parsing
- Automatically detects headers
- Skips empty lines
- Returns array of objects

##### `loadJSON(filename): Promise<any>`
Loads JSON file from `/data/` directory.

**Usage**:
```typescript
const itinerary = await loadJSON('itinerary_5day.json');
console.log(itinerary.package_name);
console.log(itinerary.duration.days);
```

##### `loadContent(): Promise<object>`
Special function that loads `content.csv` and transforms it into nested object.

**Usage**:
```typescript
const content = await loadContent();
// Returns:
// {
//   home: {
//     hero: {
//       h1: "Adi Kailash Yatra 2025",
//       subtitle: "..."
//     }
//   },
//   packages: { ... },
//   contact: { ... }
// }
```

**CSV Structure**:
```csv
page,section,key,copy
home,hero,h1,Adi Kailash Yatra 2025
home,hero,subtitle,Sacred Pilgrimage...
packages,header,h1,Tour Packages
```

**Transformation**:
```
CSV Row: { page: 'home', section: 'hero', key: 'h1', copy: 'Title' }
  ↓
Grouped by page and section
  ↓
Object: { home: { hero: { h1: 'Title' } } }
```

#### Error Handling

All functions include comprehensive error handling:

```typescript
try {
  const data = await loadJSON('file.json');
  console.log('[DataLoader] ✓ Loaded file.json');
  return data;
} catch (error) {
  console.error('[DataLoader] ✗ Error loading file:', error);
  return null; // Graceful degradation
}
```

---

### 4. `whatsapp.ts` 💬
**WhatsApp integration utilities**

#### Configuration

```typescript
const PHONE_NUMBER = '917302937532';  // +91-7302937532
const PHONE_NUMBER_DISPLAY = '+91-7302937532';
```

#### Key Functions

##### `getWhatsAppUrl(options): string`
Generates WhatsApp click-to-chat URL with pre-filled message.

**Usage**:
```typescript
import { getWhatsAppUrl } from '../utils/whatsapp';

const url = getWhatsAppUrl({ 
  message: 'Hi, interested in 5-day package' 
});
// → https://wa.me/917302937532?text=Hi%2C%20interested...
```

##### `getPackageInquiryURL(packageName, price, duration): string`
Generates WhatsApp URL with package-specific message.

**Usage**:
```typescript
const url = getPackageInquiryURL(
  '5-Day Adi Kailash Trek',
  '₹15,000-₹20,000',
  '5 Days / 4 Nights'
);
// Sends pre-filled message with package details
```

##### `getQuickMessageOptions(): array`
Returns array of quick message templates for contact page.

**Usage**:
```typescript
const messages = getQuickMessageOptions();
// [
//   { label: 'General Inquiry', url: 'https://wa.me/...' },
//   { label: 'Package Details', url: 'https://wa.me/...' },
//   ...
// ]
```

#### Message Templates

All messages are URL-encoded and formatted:

```typescript
const message = `
Hi Shiv Yatra Tourism,

I'm interested in: ${packageName}
Price Range: ${price}
Duration: ${duration}

Please share more details.
`;

return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
```

---

### 5. `images.ts` 🖼️
**Image optimization and loading utilities** *(if exists)*

Functions for handling image optimization, lazy loading, and fallback images.

---

## 🔄 Data Flow Example

### Complete Page Rendering Flow

```typescript
// 1. Page Component (src/pages/packages.astro)
import { detectLanguage } from '../utils/languageHelper';
import { useTranslation } from '../utils/translations';
import { loadJSON } from '../utils/dataLoader';
import { getWhatsAppUrl } from '../utils/whatsapp';

// 2. Detect Language
const langContext = detectLanguage(Astro);  // languageHelper.ts
const locale = langContext.locale;          // 'en' or 'hi'

// 3. Get Translation Function
const t = useTranslation(locale);           // translations.ts

// 4. Load Data
const itinerary = await loadJSON('itinerary_5day.json');  // dataLoader.ts

// 5. Generate WhatsApp URL
const whatsappURL = getWhatsAppUrl({        // whatsapp.ts
  message: t('whatsapp.message')
});

// 6. Use in Template
<h1>{t('packages.heading')}</h1>
<a href={whatsappURL}>{t('whatsapp.button')}</a>
```

---

## 🐛 Debugging Tips

### Enable Verbose Logging

All utilities log to console. Check browser console for:

```
[LanguageHelper] Detecting language from Astro context
[LanguageHelper] Current pathname: /hi/packages
[LanguageHelper] ✓ Detected locale: hi

[Translations] Loading translations for locale: hi
[Translations] ✓ Loaded translations for hi
[Translations] Available keys: ['nav', 'hero', 'packages', ...]

[DataLoader] Loading JSON: itinerary_5day.json
[DataLoader] ✓ Data loaded successfully
```

### Common Issues

**Issue**: Translation returns key instead of text
```typescript
// Check: Key exists in JSON file
// Check: No typos in key path
// Check: Locale is correct
console.log(t('hero.title', 'FALLBACK'));  // Use fallback to debug
```

**Issue**: Wrong language detected
```typescript
// Debug language detection
const langContext = detectLanguage(Astro);
console.log('Full path:', langContext.fullPath);
console.log('Detected:', langContext.locale);
console.log('Expected:', '/hi/...' should be 'hi', '/...' should be 'en');
```

**Issue**: Data not loading
```typescript
// Check file exists in /data/ folder
// Check filename is correct (case-sensitive)
// Check JSON is valid (no syntax errors)
try {
  const data = await loadJSON('file.json');
  console.log('Loaded:', data);
} catch (error) {
  console.error('Error:', error);
}
```

---

## ✅ Best Practices

### 1. Always Handle Errors
```typescript
try {
  const data = await loadJSON('file.json');
} catch (error) {
  console.error('[Module] Error:', error);
  // Provide fallback
  return defaultData;
}
```

### 2. Use Console Logs
```typescript
console.log('[Module] Starting process...');
console.log('[Module] ✓ Success');
console.error('[Module] ✗ Error:', error);
```

### 3. Provide Fallbacks
```typescript
const title = t('page.title', 'Default Title');
const data = await loadJSON('file.json') || {};
```

### 4. Type Safety
```typescript
// Use TypeScript interfaces
interface LanguageContext {
  locale: 'en' | 'hi';
  basePath: string;
  // ...
}
```

---

## 📚 Adding New Utilities

1. Create new file in `src/utils/`
2. Add JSDoc comments
3. Export functions
4. Include error handling
5. Add console logging
6. Document in this README
7. Update ARCHITECTURE.md

**Template**:
```typescript
/**
 * [Utility Name] - [Purpose]
 * 
 * [Description]
 * 
 * @module utilityName
 */

/**
 * [Function description]
 * 
 * @param param - Description
 * @returns Description
 * 
 * @example
 * const result = myFunction('value');
 */
export function myFunction(param: string): string {
  console.log('[Module] Starting...');
  
  try {
    // Implementation
    console.log('[Module] ✓ Success');
    return result;
  } catch (error) {
    console.error('[Module] ✗ Error:', error);
    return fallback;
  }
}
```

---

**Last Updated**: October 17, 2025

