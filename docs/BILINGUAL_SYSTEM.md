# 🌐 Bilingual System Documentation (English/Hindi)

## ✅ How It Works

The website now supports **English** (default) and **Hindi** using a **single-component architecture** with minimal wrapper pages.

### 🎯 URL Structure

```
English pages:
/              → Homepage
/about         → About
/packages      → Packages
/blog          → Blog
/contact       → Contact
... etc

Hindi pages:
/hi/           → Homepage (Hindi)
/hi/about      → About (Hindi)
/hi/packages   → Packages (Hindi)
/hi/blog       → Blog (Hindi)
/hi/contact    → Contact (Hindi)
... etc
```

### 🏗️ Architecture

#### **Main Pages (English)**
Location: `/src/pages/*.astro`

These are the **primary page components** that contain all the logic:
- Data loading
- Translation handling
- Component rendering
- SEO setup

Examples:
- `/src/pages/index.astro` - Homepage
- `/src/pages/about.astro` - About page
- `/src/pages/packages.astro` - Packages page
- `/src/pages/blog/[slug].astro` - Blog posts

#### **Hindi Wrapper Pages**
Location: `/src/pages/hi/*.astro`

These are **minimal wrapper pages** (4-10 lines each) that:
1. Import the main page component OR
2. Re-implement with Hindi-specific content

**Types of wrappers:**

**Type 1: Simple Import Wrapper** (for most pages)
```astro
---
// /src/pages/hi/about.astro
import AboutPage from '../about.astro';
---
<AboutPage />
```

**Type 2: Reimplemented** (for pages with special logic like blog)
```astro
---
// /src/pages/hi/blog/[slug].astro
import BaseLayout from '../../../layouts/BaseLayout.astro';
// ... same logic as English but with Hindi text
---
<BaseLayout ...>
  <!-- Hindi content -->
</BaseLayout>
```

### 🔧 Language Detection

The `languageHelper.ts` utility automatically detects the language from the URL:

```typescript
// src/utils/languageHelper.ts

export function detectLanguage(Astro: AstroGlobal) {
  const fullPath = Astro.url.pathname;
  const isHindi = fullPath.startsWith('/hi');
  const locale = isHindi ? 'hi' : 'en';
  
  return {
    locale,        // 'en' or 'hi'
    fullPath,      // '/hi/about'
    basePath,      // '/about'
    alternatePath  // '/hi/about' or '/about'
  };
}
```

### 📖 Translation System

Translations are stored in JSON files:
- `/public/locales/en.json` - English translations
- `/public/locales/hi.json` - Hindi translations

**Usage in components:**
```astro
---
import { useTranslation } from '../utils/translations';
import { detectLanguage } from '../utils/languageHelper';

const langContext = detectLanguage(Astro);
const t = useTranslation(langContext.locale);
---

<h1>{t('hero.title', 'Adi Kailash Yatra 2025')}</h1>
<p>{t('hero.subtitle', 'Sacred Pilgrimage to Lord Shiva')}</p>
```

### 🔄 Language Switching

The header component provides a language toggle:

```astro
<!-- English page: / -->
<a href="/hi/">Switch to Hindi</a>

<!-- Hindi page: /hi/ -->
<a href="/">Switch to English</a>
```

The mobile menu (Shadcn Sheet) also includes the language toggle at the bottom.

### 📄 Page Structure

#### Main Pages (`/src/pages/*.astro`)
```astro
---
// 1. Import utilities
import { detectLanguage } from '../utils/languageHelper';
import { useTranslation } from '../utils/translations';
import BaseLayout from '../layouts/BaseLayout.astro';

// 2. Detect language
const langContext = detectLanguage(Astro);
const locale = langContext.locale;

// 3. Get translation function
const t = useTranslation(locale);

// 4. Load data
const pageData = loadData();
---

<BaseLayout ...>
  <!-- Use t() for all text -->
  <h1>{t('page.title')}</h1>
  <p>{t('page.description')}</p>
</BaseLayout>
```

#### Hindi Wrappers (`/src/pages/hi/*.astro`)
```astro
---
/**
 * Hindi [Page Name] - Wrapper
 * Renders the main component with auto-detected Hindi language
 */
import MainPage from '../[page].astro';
---

<MainPage />
```

### 📁 File Structure

```
src/pages/
├── index.astro              # English homepage
├── about.astro              # English about
├── packages.astro           # English packages
├── blog/
│   ├── index.astro          # English blog index
│   └── [slug].astro         # English blog posts
└── hi/                      # Hindi pages
    ├── index.astro          # Hindi homepage wrapper
    ├── about.astro          # Hindi about wrapper
    ├── packages.astro       # Hindi packages wrapper
    └── blog/
        ├── index.astro      # Hindi blog index
        └── [slug].astro     # Hindi blog posts
```

### ✅ Benefits of This Architecture

1. **✅ NO CODE DUPLICATION** - Main logic in one place
2. **✅ Easy maintenance** - Update once, affects both languages
3. **✅ SEO friendly** - Separate URLs for each language
4. **✅ Works with Astro's routing** - File-based routing preserved
5. **✅ Fast builds** - Wrapper pages are lightweight
6. **✅ Proper hreflang tags** - Generated automatically
7. **✅ Works with static generation** - All pages pre-rendered

### 🎨 How Content is Translated

#### Method 1: JSON Translation Files (Recommended)
```json
// /public/locales/en.json
{
  "hero.title": "Adi Kailash Yatra 2025",
  "hero.subtitle": "Sacred Pilgrimage"
}

// /public/locales/hi.json
{
  "hero.title": "आदि कैलाश यात्रा 2025",
  "hero.subtitle": "पवित्र तीर्थयात्रा"
}
```

#### Method 2: Inline Hindi Text (For special pages)
```astro
---
const locale = detectLanguage(Astro).locale;
---

{locale === 'en' && <h1>Adi Kailash Yatra</h1>}
{locale === 'hi' && <h1>आदि कैलाश यात्रा</h1>}
```

### 🔍 SEO Implementation

The `BaseLayout.astro` automatically handles:

1. **Language attribute**: `<html lang="en">` or `<html lang="hi">`
2. **Hreflang tags**:
   ```html
   <link rel="alternate" hreflang="en" href="https://example.com/" />
   <link rel="alternate" hreflang="hi" href="https://example.com/hi/" />
   <link rel="alternate" hreflang="x-default" href="https://example.com/" />
   ```
3. **Canonical URLs**: Proper canonical for each language
4. **Meta descriptions**: Translated meta descriptions

### 📱 Mobile Menu (Shadcn Sheet)

The mobile menu is a React component (`/src/components/ui/MobileMenu.tsx`) that:
- Slides in from the right
- Shows all navigation links
- Highlights active page
- Includes language toggle at bottom
- Closes on link click or outside click

### 🚀 Adding New Pages

**Step 1**: Create the main English page
```bash
touch src/pages/new-page.astro
```

**Step 2**: Implement with language detection
```astro
---
import { detectLanguage } from '../utils/languageHelper';
import { useTranslation } from '../utils/translations';
import BaseLayout from '../layouts/BaseLayout.astro';

const langContext = detectLanguage(Astro);
const t = useTranslation(langContext.locale);
---

<BaseLayout ...>
  <h1>{t('newPage.title')}</h1>
</BaseLayout>
```

**Step 3**: Create Hindi wrapper
```bash
touch src/pages/hi/new-page.astro
```

```astro
---
import NewPage from '../new-page.astro';
---
<NewPage />
```

**Step 4**: Add translations
```json
// en.json
{
  "newPage.title": "New Page"
}

// hi.json
{
  "newPage.title": "नया पेज"
}
```

**Step 5**: Add to navigation
```typescript
// src/utils/languageHelper.ts
export function getNavigationLinks(locale: SupportedLocale) {
  const prefix = locale === 'hi' ? '/hi' : '';
  return {
    // ... existing links
    newPage: `${prefix}/new-page`,
  };
}
```

### ✅ Testing the Language System

1. **Visit English homepage**: `http://localhost:4321/`
2. **Click language toggle**: Should go to `http://localhost:4321/hi/`
3. **Verify Hindi content**: All text should be in Hindi
4. **Test navigation**: All links should work with `/hi/` prefix
5. **Test mobile menu**: Should show Hindi labels
6. **Switch back**: Should return to English

### 🎉 Result

- ✅ **Same page components** render both English and Hindi
- ✅ **NO code duplication** (wrappers are 4-10 lines)
- ✅ **SEO optimized** with proper hreflang tags
- ✅ **URL structure**: `/` for English, `/hi/` for Hindi
- ✅ **Easy to maintain** - update once, both languages update
- ✅ **Beautiful Shadcn Sheet** mobile menu
- ✅ **51 pages generated** (English + Hindi) in build

## 🔧 Files Modified

### Core System
- ✅ `src/utils/languageHelper.ts` - Language detection
- ✅ `src/utils/translations.ts` - Translation loading
- ✅ `src/layouts/BaseLayout.astro` - Auto language detection
- ✅ `src/components/layout/Header.astro` - Language-aware navigation
- ✅ `src/components/layout/Footer.astro` - Language-aware footer
- ✅ `src/components/ui/MobileMenu.tsx` - Shadcn Sheet mobile menu

### Main Pages (Updated with language detection)
- ✅ `src/pages/index.astro`
- ✅ `src/pages/about.astro`
- ✅ `src/pages/packages.astro`
- ✅ `src/pages/contact.astro`
- ✅ `src/pages/permits.astro`
- ✅ `src/pages/gallery.astro`
- ✅ `src/pages/faq.astro`
- ✅ `src/pages/preparation.astro`
- ✅ `src/pages/how-to-reach.astro`
- ✅ `src/pages/accommodation.astro`
- ✅ `src/pages/blog/index.astro`
- ✅ `src/pages/blog/[slug].astro`

### Hindi Wrappers (Minimal 4-10 line files)
- ✅ `src/pages/hi/index.astro`
- ✅ `src/pages/hi/about.astro`
- ✅ `src/pages/hi/packages.astro`
- ✅ `src/pages/hi/contact.astro`
- ✅ `src/pages/hi/permits.astro`
- ✅ `src/pages/hi/gallery.astro`
- ✅ `src/pages/hi/faq.astro`
- ✅ `src/pages/hi/preparation.astro`
- ✅ `src/pages/hi/how-to-reach.astro`
- ✅ `src/pages/hi/accommodation.astro`
- ✅ `src/pages/hi/blog/index.astro`
- ✅ `src/pages/hi/blog/[slug].astro`

## 🎓 Key Takeaway

**This is NOT separate Hindi pages from scratch!** 

The Hindi pages are **minimal 4-10 line wrappers** that import and render the main page components. All the logic, data loading, and rendering happens in the main pages which automatically detect and handle both languages. This is the proper Astro i18n pattern that maintains DRY principles while working with Astro's file-based routing.

---

**Built with ❤️ for Shiv Yatra Tourism** 🕉️

