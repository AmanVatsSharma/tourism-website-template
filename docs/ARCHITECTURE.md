# Website Architecture Documentation

## 🏗️ Overview

This is a bilingual (English/Hindi) tourism website for **Shiv Yatra Tourism** - an Adi Kailash pilgrimage tour operator. The website is built with **Astro 4.0+** for optimal performance and SEO.

## 📐 Bilingual Architecture

### Design Pattern: Single Page, Multiple Languages

**KEY CONCEPT**: One page file handles both languages dynamically based on URL path.

```
ENGLISH ROUTES:
/                    → index.astro (locale: 'en')
/packages            → packages.astro (locale: 'en')
/contact             → contact.astro (locale: 'en')

HINDI ROUTES:
/hi                  → index.astro (locale: 'hi')
/hi/packages         → packages.astro (locale: 'hi')
/hi/contact          → contact.astro (locale: 'hi')
```

**How It Works:**
1. User visits URL (e.g., `/hi/packages`)
2. Astro's i18n routing maps it to `packages.astro`
3. Language helper detects `/hi/` prefix → locale = 'hi'
4. Translation function loads Hindi content
5. Page renders in Hindi

## 🔄 Language Detection Flow

```
┌─────────────────────────────────────────┐
│  User visits URL                        │
│  Example: /hi/packages                  │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  Astro i18n Routing                     │
│  - Detects /hi/ prefix                  │
│  - Sets Astro.currentLocale = 'hi'     │
│  - Routes to packages.astro             │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  BaseLayout.astro                       │
│  - Calls detectLanguage(Astro)         │
│  - Returns langContext.locale = 'hi'   │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  Page Component (packages.astro)        │
│  - Gets locale from langContext         │
│  - Calls useTranslation('hi')          │
│  - Loads Hindi translations             │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  Rendered Page                          │
│  - All content in Hindi                 │
│  - Navigation links have /hi/ prefix    │
│  - Language toggle points to English    │
└─────────────────────────────────────────┘
```

## 📁 File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.astro        ← Language-aware navigation
│   │   └── Footer.astro        ← Language-aware footer
│   ├── WhatsAppButton.astro    ← Translated messages
│   ├── SEO.astro               ← Bilingual meta tags
│   └── SchemaMarkup.astro      ← Schema with both languages
│
├── layouts/
│   └── BaseLayout.astro        ← Auto-detects locale from URL
│
├── pages/
│   ├── index.astro             ← Handles / and /hi
│   ├── packages.astro          ← Handles /packages and /hi/packages
│   ├── contact.astro           ← Handles /contact and /hi/contact
│   ├── about.astro             ← Handles /about and /hi/about
│   └── blog/
│       └── [slug].astro        ← Handles /blog/* and /hi/blog/*
│
├── utils/
│   ├── languageHelper.ts       ← Core language detection logic
│   ├── translations.ts         ← Translation utilities
│   ├── dataLoader.ts           ← CSV/JSON data loading
│   └── whatsapp.ts             ← WhatsApp integration
│
└── styles/
    └── global.css              ← Global styles with language support

public/
├── locales/
│   ├── en.json                 ← English translations
│   └── hi.json                 ← Hindi translations
│
└── images/                     ← Spiritual tourism images

data/
├── content.csv                 ← Page content (both languages)
├── itinerary_5day.json         ← Package data
├── meta_tags.json              ← SEO metadata
└── faq_schema.json             ← FAQ schema markup
```

## 🔧 Core Utilities

### 1. languageHelper.ts

**Purpose**: Centralized language detection and URL generation

**Key Functions**:
- `detectLanguage(Astro)` - Detects locale from URL path
- `getNavigationLinks(locale)` - Generates correct nav links
- `getLocalizedPath(path, locale)` - Converts path to localized version

**Example**:
```typescript
const langContext = detectLanguage(Astro);
// langContext = {
//   locale: 'hi',
//   basePath: '/packages',
//   fullPath: '/hi/packages',
//   alternatePath: '/packages',
//   isHindi: true
// }
```

### 2. translations.ts

**Purpose**: Load and use translations from JSON files

**Key Functions**:
- `useTranslation(locale)` - Returns translation function
- `getLocaleFromPath(pathname)` - Extract locale from path

**Example**:
```typescript
const t = useTranslation('hi');
const title = t('hero.title'); // Returns Hindi title
```

### 3. dataLoader.ts

**Purpose**: Load content from CSV/JSON data files

**Example**:
```typescript
const content = await loadContent();        // From content.csv
const itinerary = await loadJSON('itinerary_5day.json');
```

## 🎨 Component Architecture

### Page Component Pattern

Every page follows this pattern:

```astro
---
// 1. Import utilities
import { detectLanguage } from '../utils/languageHelper';
import { useTranslation } from '../utils/translations';

// 2. Detect language
const langContext = detectLanguage(Astro);
const locale = langContext.locale;

// 3. Get translation function
const t = useTranslation(locale);

// 4. Load data (optional)
const data = await loadContent();

// 5. Get translated content
const title = t('page.title', 'Default Title');
---

<BaseLayout title={title} description={...}>
  <!-- 6. Use translations in markup -->
  <h1>{t('page.heading')}</h1>
  <p>{t('page.description')}</p>
  
  <!-- 7. Generate localized links -->
  <a href={locale === 'en' ? '/contact' : '/hi/contact'}>
    {t('nav.contact')}
  </a>
</BaseLayout>
```

### Layout Components

**BaseLayout.astro**:
- Auto-detects locale from URL
- Passes locale to all child components
- Sets HTML `lang` attribute
- Adds hreflang alternate links for SEO

**Header.astro**:
- Receives locale from BaseLayout
- Generates navigation links with correct prefix
- Language toggle button switches between /path and /hi/path

**Footer.astro**:
- Receives locale from BaseLayout
- Displays translated content
- Shows localized links

## 🌐 Translation System

### Translation Files

**Location**: `public/locales/`

**Structure**:
```json
{
  "nav": {
    "home": "Home",
    "packages": "Tour Packages"
  },
  "hero": {
    "title": "Adi Kailash Yatra 2025",
    "subtitle": "Sacred Pilgrimage..."
  }
}
```

### Using Translations

```astro
---
const t = useTranslation(locale);
---

<!-- Method 1: Simple translation -->
<h1>{t('hero.title')}</h1>

<!-- Method 2: With fallback -->
<p>{t('hero.subtitle', 'Default subtitle')}</p>

<!-- Method 3: Nested keys -->
<a>{t('nav.contact')}</a>
```

## 🔗 Navigation & Linking

### Link Generation Rules

1. **Internal Links**: Use helper functions or conditionals
   ```astro
   <a href={locale === 'en' ? '/packages' : '/hi/packages'}>
   ```

2. **Language Toggle**: Switch between base path and /hi/ prefix
   ```astro
   const togglePath = locale === 'en' 
     ? `/hi${currentPath}` 
     : currentPath.replace('/hi', '');
   ```

3. **Active Link Detection**: Check both locales
   ```astro
   const isActive = currentPath === item.href || 
     (item.href !== '/' && currentPath.startsWith(item.href));
   ```

## 📊 SEO Strategy

### Hreflang Tags

Each page includes:
```html
<link rel="alternate" hreflang="en" href="/packages" />
<link rel="alternate" hreflang="hi" href="/hi/packages" />
<link rel="alternate" hreflang="x-default" href="/packages" />
```

### Meta Tags

- Dynamic based on locale
- Loaded from `meta_tags.json`
- OpenGraph tags for social sharing
- Twitter Card tags

### Sitemap

Generated automatically by Astro with both language versions:
```xml
<url>
  <loc>https://example.com/packages</loc>
</url>
<url>
  <loc>https://example.com/hi/packages</loc>
</url>
```

## 🖼️ Image Strategy

### Image Organization

```
public/images/
├── hero/                   ← Hero section images
├── gallery/                ← Gallery images
├── blog/                   ← Blog post images
├── adi-kailash-parvat.webp ← Main hero image
└── ...other images
```

### Image Usage

```astro
<img 
  src="/images/adi-kailash-parvat.webp"
  alt={t('hero.imageAlt', 'Adi Kailash Mountain')}
  loading="eager"  <!-- or "lazy" for below fold -->
/>
```

## 💬 WhatsApp Integration

### Configuration

**Phone Number**: +91-7302937532

### Message Templates

Messages are translated based on locale:
```typescript
const message = t('whatsapp.message');
const whatsappURL = `https://wa.me/917302937532?text=${encodeURIComponent(message)}`;
```

### Floating Button

- Always visible (bottom-right)
- Uses translated button text
- Sends pre-filled message in user's language

## 🚀 Performance Optimizations

1. **Static Site Generation**: All pages pre-rendered at build time
2. **Image Optimization**: WebP format, lazy loading
3. **Minimal JavaScript**: Only where needed
4. **CSS Minification**: Lightning CSS
5. **View Transitions**: Smooth page navigation

## 🧪 Testing Guidelines

### Test Checklist

For each page, test:
- [ ] English version loads (`/page`)
- [ ] Hindi version loads (`/hi/page`)
- [ ] All text translated correctly
- [ ] Images load properly
- [ ] Navigation links work
- [ ] Language toggle functions
- [ ] WhatsApp messages in correct language
- [ ] Meta tags correct for each language
- [ ] Mobile responsive

### Testing URLs

```
English:
- /
- /packages
- /contact
- /about
- /blog
- /faq

Hindi:
- /hi
- /hi/packages
- /hi/contact
- /hi/about
- /hi/blog
- /hi/faq
```

## 🐛 Debugging

### Console Logs

All modules include debug logging:
```
[LanguageHelper] Detecting language from Astro context
[LanguageHelper] Current pathname: /hi/packages
[LanguageHelper] ✓ Detected locale: hi
[HomePage] ========================================
[HomePage] Loading home page...
[HomePage] Detected locale: hi
[HomePage] ✓ Homepage ready to render
```

### Common Issues

**Issue**: Hindi page shows English content
**Solution**: Check `langContext.locale` is being passed correctly

**Issue**: Language toggle doesn't work
**Solution**: Verify toggle path generation in Header component

**Issue**: Images not loading
**Solution**: Check image paths are absolute (`/images/...`)

## 📈 Adding New Pages

1. Create single `.astro` file in `src/pages/`
2. Import language utilities
3. Detect locale with `detectLanguage(Astro)`
4. Use `useTranslation(locale)` for content
5. Add translations to `en.json` and `hi.json`
6. Test both `/page` and `/hi/page`

## 🎯 Best Practices

1. **Always use language helper**: Never hardcode locale detection
2. **Use translation function**: Don't embed text directly
3. **Generate links dynamically**: Account for both locales
4. **Add console logs**: For debugging and monitoring
5. **Handle errors gracefully**: Fallback to English if translation missing
6. **Test both languages**: Before deploying

## 📚 Further Reading

- [Astro i18n Documentation](https://docs.astro.build/en/guides/internationalization/)
- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Last Updated**: October 17, 2025
**Maintainer**: Development Team

