# Cursor AI Prompt: Build Adi Kailash Yatra Tourism Website with Astro

## 🎯 Project Overview

Build a complete, production-ready tourism website for **Shiv Yatra Tourism** - an Adi Kailash pilgrimage tour operator. Create a blazing-fast, animated, conversion-optimized website with bilingual support (English/Hindi) and seamless WhatsApp integration using **Astro 4.0+**.

---

## 📋 Project Requirements

### Core Features
1. **Bilingual Website** - English (default) + Hindi toggle button
2. **WhatsApp Integration** - One-click WhatsApp to +91-7302937532
3. **Beautiful Animations** - Smooth, modern, engaging UI with View Transitions
4. **Mobile-First Design** - Fully responsive
5. **Ultra-Fast Performance** - Lighthouse score 95+
6. **SEO Optimized** - Schema markup, meta tags, sitemap

### Brand Identity
- **Company Name:** Shiv Yatra Tourism
- **Tagline:** "Your Trusted Partner for Sacred Himalayan Pilgrimages"
- **Primary Color:** Saffron Orange (#FF6B35) - representing spiritual energy
- **Secondary Color:** Deep Blue (#2C3E50) - representing Himalayas
- **Accent Color:** Golden (#F39C12) - representing divinity
- **Font Style:** Modern yet traditional (Poppins + Noto Sans for Hindi)

---

## 📦 Data Files Integration

**IMPORTANT:** All content is pre-built in structured files located in `/src/data` folder:

```
/data/
├── content.csv              # All website text content
├── keywords.csv             # SEO keywords
├── image_manifest.csv       # Image requirements
├── itinerary_5day.json      # 5-day package data
├── buyer_personas.json      # Target audience profiles
├── blog_outlines.json       # Blog content plan
├── faq_schema.json          # 20 FAQs with JSON-LD
├── meta_tags.json           # SEO meta for all pages
├── sitemap.json             # Site structure
├── organization_schema.json # Company schema markup
└── README.md                # Implementation guide
```

**Load and use these files dynamically** - don't hardcode content!

---

## 🏗️ Tech Stack: Astro 4.0+

### Why Astro is Perfect for This Project
- ⚡ **Zero JS by default** - Fastest possible load times
- 🎨 **Component Islands** - Add interactivity only where needed
- 📄 **Static Site Generation** - SEO-friendly, blazing fast
- 🌐 **Multi-language support** - Built-in i18n routing
- 🖼️ **Image optimization** - Automatic WebP conversion
- 🔧 **Framework agnostic** - Use React/Vue/Svelte for interactive parts

### Project Setup
```bash
# Create Astro project
npm create astro@latest shiv-yatra-tourism
# Choose: Empty project, TypeScript (strict), Yes to install dependencies

cd shiv-yatra-tourism

# Install dependencies
npm install @astrojs/tailwind @astrojs/sitemap @astrojs/image
npm install motion alpinejs papaparse
npm install -D @astrojs/react react react-dom
```

### Astro Config
```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://shivyatratourism.com',
  integrations: [
    tailwind(),
    sitemap(),
    react()
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  image: {
    domains: ['shivyatratourism.com']
  },
  vite: {
    build: {
      cssMinify: 'lightningcss'
    }
  }
});
```

---

## 📁 Project Structure

```
shiv-yatra-tourism/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── AnimatedSection.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Packages.astro
│   │   │   └── Testimonials.astro
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Navigation.astro
│   │   ├── WhatsAppButton.astro
│   │   └── LanguageToggle.astro
│   ├── content/
│   │   ├── blog/
│   │   │   └── (blog posts in markdown)
│   │   └── config.ts
│   ├── data/
│   │   ├── content.csv
│   │   ├── keywords.csv
│   │   ├── itinerary_5day.json
│   │   ├── faq_schema.json
│   │   └── ... (all data files)
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogLayout.astro
│   ├── pages/
│   │   ├── index.astro              # Home
│   │   ├── about.astro              # About
│   │   ├── packages.astro           # Tour Packages
│   │   ├── itinerary.astro          # Itinerary
│   │   ├── permits.astro            # Permits
│   │   ├── how-to-reach.astro       # How to Reach
│   │   ├── accommodation.astro      # Accommodation
│   │   ├── preparation.astro        # Preparation Guide
│   │   ├── gallery.astro            # Gallery
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── faq.astro                # FAQ
│   │   ├── contact.astro            # Contact
│   │   ├── hi/                      # Hindi versions
│   │   │   ├── index.astro
│   │   │   ├── about.astro
│   │   │   └── ... (all pages)
│   │   └── sitemap.xml.js
│   ├── scripts/
│   │   └── animations.js
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── dataLoader.ts
│       └── translations.ts
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── gallery/
│   │   └── thumbnails/
│   ├── locales/
│   │   ├── en.json
│   │   └── hi.json
│   ├── favicon.ico
│   └── robots.txt
└── astro.config.mjs
```

---

## 🌐 Bilingual Implementation with Astro

### i18n Structure
```typescript
// src/utils/translations.ts
import en from '../../public/locales/en.json';
import hi from '../../public/locales/hi.json';

export const translations = { en, hi };

export function useTranslation(lang: 'en' | 'hi') {
  return (key: string) => {
    const keys = key.split('.');
    let value: any = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };
}
```

### Translation Files
```json
// public/locales/en.json
{
  "nav": {
    "home": "Home",
    "packages": "Tour Packages",
    "about": "About",
    "contact": "Contact Us"
  },
  "hero": {
    "title": "Adi Kailash Yatra 2025",
    "subtitle": "Sacred Pilgrimage to Lord Shiva's Abode",
    "cta": "Explore Packages"
  },
  "whatsapp": {
    "button": "Chat on WhatsApp",
    "message": "Hi Shiv Yatra Tourism, I'm interested in Adi Kailash Yatra packages."
  }
}

// public/locales/hi.json
{
  "nav": {
    "home": "होम",
    "packages": "टूर पैकेज",
    "about": "हमारे बारे में",
    "contact": "संपर्क करें"
  },
  "hero": {
    "title": "आदि कैलाश यात्रा 2025",
    "subtitle": "भगवान शिव के पवित्र धाम की तीर्थयात्रा",
    "cta": "पैकेज देखें"
  },
  "whatsapp": {
    "button": "व्हाट्सएप पर चैट करें",
    "message": "नमस्ते शिव यात्रा टूरिज्म, मुझे आदि कैलाश यात्रा पैकेज में रुचि है।"
  }
}
```

### Language Toggle Component
```astro
---
// src/components/LanguageToggle.astro
const currentLang = Astro.currentLocale || 'en';
const currentPath = Astro.url.pathname;

const toggleLang = currentLang === 'en' ? 'hi' : 'en';
const togglePath = currentLang === 'en' 
  ? `/hi${currentPath}` 
  : currentPath.replace('/hi', '');
---

<a 
  href={togglePath}
  class="language-toggle inline-flex items-center gap-2 px-4 py-2 
         bg-gradient-to-r from-orange-500 to-orange-600 text-white 
         rounded-full hover:shadow-lg transition-all duration-300
         hover:scale-105 font-semibold"
>
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"/>
  </svg>
  {currentLang === 'en' ? 'हिंदी' : 'English'}
</a>
```

### Page with Translations
```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import { useTranslation } from '../utils/translations';

const t = useTranslation('en');
const whatsappNumber = "917302937532";
---

<BaseLayout title={t('hero.title')} description={t('hero.subtitle')}>
  <section class="hero">
    <h1 class="animate-fade-in">{t('hero.title')}</h1>
    <p class="animate-fade-in-delay-1">{t('hero.subtitle')}</p>
    <a 
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t('whatsapp.message'))}`}
      class="btn-primary animate-fade-in-delay-2"
    >
      {t('hero.cta')}
    </a>
  </section>
</BaseLayout>
```

---

## 📱 WhatsApp Integration (Astro Components)

### Floating WhatsApp Button
```astro
---
// src/components/WhatsAppButton.astro
const phoneNumber = "917302937532";
const message = "Hi Shiv Yatra Tourism, I'm interested in Adi Kailash Yatra packages. Please share more details.";
const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
---

<a 
  href={whatsappURL}
  target="_blank"
  rel="noopener noreferrer"
  class="whatsapp-float fixed bottom-6 right-6 z-50 
         bg-[#25D366] hover:bg-[#1fb855] text-white 
         rounded-full p-4 shadow-2xl 
         transition-all duration-300 hover:scale-110
         flex items-center justify-center group"
  aria-label="Chat on WhatsApp"
  id="whatsapp-button"
>
  <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  
  <!-- Pulse animation -->
  <span class="animate-ping absolute inline-flex h-full w-full 
                rounded-full bg-[#25D366] opacity-75"></span>
</a>

<style>
  .whatsapp-float {
    animation: bounce-subtle 2s ease-in-out infinite;
  }
  
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
</style>

<script>
  // Add entrance animation
  const btn = document.getElementById('whatsapp-button');
  if (btn) {
    setTimeout(() => {
      btn.style.animation = 'slideInRight 0.5s ease-out forwards';
    }, 1000);
  }
</script>
```

### Click-to-Call Component
```astro
---
// src/components/PhoneLink.astro
const phoneNumber = "+91-7302937532";
const phoneDigits = "917302937532";
---

<div class="flex items-center gap-2">
  <a 
    href={`tel:${phoneDigits}`}
    class="flex items-center gap-2 text-orange-600 hover:text-orange-700 
           font-semibold transition-colors"
  >
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
    </svg>
    {phoneNumber}
  </a>
</div>
```

---

## 🎨 Animations with Astro View Transitions

### Base Layout with View Transitions
```astro
---
// src/layouts/BaseLayout.astro
import { ViewTransitions } from 'astro:transitions';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import WhatsAppButton from '../components/WhatsAppButton.astro';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Shiv Yatra Tourism</title>
  <meta name="description" content={description}>
  <ViewTransitions />
  <link rel="stylesheet" href="/styles/global.css">
</head>
<body>
  <Header />
  
  <main transition:animate="slide">
    <slot />
  </main>
  
  <Footer />
  <WhatsAppButton />
  
  <script>
    import '../scripts/animations.js';
  </script>
</body>
</html>
```

### Animated Sections with Intersection Observer
```astro
---
// src/components/ui/AnimatedSection.astro
interface Props {
  class?: string;
}

const { class: className } = Astro.props;
---

<div 
  class={`animated-section opacity-0 translate-y-10 transition-all duration-700 ${className || ''}`}
  data-animate
>
  <slot />
</div>

<script>
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-10');
        entry.target.classList.add('opacity-100', 'translate-y-0');
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
</script>
```

### Counter Animation (Alpine.js)
```astro
---
// src/components/sections/Stats.astro
---

<section class="stats py-20 bg-gradient-to-br from-orange-50 to-blue-50">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      
      <!-- Stat 1 -->
      <div x-data="{ count: 0 }" x-intersect="$el.querySelector('[x-text]') && animateCount(25000)">
        <div class="text-5xl font-bold text-orange-600 mb-2">
          <span x-text="count.toLocaleString()">0</span>+
        </div>
        <p class="text-gray-600 text-lg">Happy Pilgrims</p>
      </div>
      
      <!-- Stat 2 -->
      <div x-data="{ count: 0 }" x-intersect="animateCount(48)">
        <div class="text-5xl font-bold text-orange-600 mb-2">
          <span x-text="count">0</span>
        </div>
        <p class="text-gray-600 text-lg">Years Experience</p>
      </div>
      
      <!-- Stat 3 -->
      <div x-data="{ count: 0 }" x-intersect="animateCount(100)">
        <div class="text-5xl font-bold text-orange-600 mb-2">
          <span x-text="count">0</span>%
        </div>
        <p class="text-gray-600 text-lg">Customer Satisfaction</p>
      </div>
      
    </div>
  </div>
</section>

<script>
  import Alpine from 'alpinejs';
  import intersect from '@alpinejs/intersect';
  
  Alpine.plugin(intersect);
  
  window.animateCount = function(target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      this.count = Math.floor(current);
    }, 16);
  };
  
  Alpine.start();
</script>
```

### Hero Section with Parallax
```astro
---
// src/components/sections/Hero.astro
import { Image } from 'astro:assets';
import heroImage from '../../assets/images/hero/adi-kailash-peak-hero.jpg';
---

<section class="hero relative h-screen overflow-hidden">
  <!-- Background with parallax -->
  <div 
    class="absolute inset-0 z-0" 
    data-parallax
    style="transform: translateY(0)"
  >
    <Image 
      src={heroImage}
      alt="Adi Kailash mountain peak covered in snow"
      class="w-full h-full object-cover"
      loading="eager"
      format="webp"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
  </div>
  
  <!-- Content -->
  <div class="relative z-10 container mx-auto px-4 h-full flex items-center">
    <div class="text-white max-w-3xl">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
        Adi Kailash Yatra 2025
      </h1>
      <p class="text-xl md:text-2xl mb-8 animate-fade-in-delay-1">
        Sacred Pilgrimage to Lord Shiva's Himalayan Abode
      </p>
      <div class="flex flex-wrap gap-4 animate-fade-in-delay-2">
        <a 
          href="/packages"
          class="btn-primary bg-gradient-to-r from-orange-500 to-orange-600 
                 hover:from-orange-600 hover:to-orange-700
                 text-white px-8 py-4 rounded-full font-semibold text-lg
                 shadow-xl hover:shadow-2xl transform hover:scale-105 
                 transition-all duration-300"
        >
          Explore Packages
        </a>
        <a 
          href="https://wa.me/917302937532"
          class="btn-outline border-2 border-white text-white 
                 hover:bg-white hover:text-orange-600
                 px-8 py-4 rounded-full font-semibold text-lg
                 transition-all duration-300"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  </div>
</section>

<script>
  // Parallax effect
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(el => {
      const speed = 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
</script>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out forwards;
  }
  
  .animate-fade-in-delay-1 {
    opacity: 0;
    animation: fade-in 1s ease-out 0.3s forwards;
  }
  
  .animate-fade-in-delay-2 {
    opacity: 0;
    animation: fade-in 1s ease-out 0.6s forwards;
  }
</style>
```

---

## 📊 Loading Data from CSV/JSON

### Data Loader Utility
```typescript
// src/utils/dataLoader.ts
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

export async function loadCSV(filename: string) {
  const filePath = path.join(process.cwd(), 'src/data', filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error)
    });
  });
}

export async function loadJSON(filename: string) {
  const filePath = path.join(process.cwd(), 'src/data', filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

// Transform content.csv into structured object
export async function loadContent() {
  const data: any = await loadCSV('content.csv');
  
  return data.reduce((acc: any, row: any) => {
    if (!acc[row.page]) acc[row.page] = {};
    if (!acc[row.page][row.section]) acc[row.page][row.section] = {};
    acc[row.page][row.section][row.key] = row.copy;
    return acc;
  }, {});
}
```

### Using Data in Pages
```astro
---
// src/pages/packages.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import { loadJSON, loadContent } from '../utils/dataLoader';

const itinerary = await loadJSON('itinerary_5day.json');
const content = await loadContent();
const pageContent = content.packages;
---

<BaseLayout title="Tour Packages" description="Adi Kailash tour packages">
  <section class="packages py-20">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold mb-12 text-center">
        {pageContent?.header?.h1 || 'Tour Packages'}
      </h1>
      
      <!-- 5-Day Package -->
      <div class="package-card bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 class="text-3xl font-bold text-orange-600 mb-4">
          {itinerary.package_name}
        </h2>
        <p class="text-gray-600 mb-4">
          <strong>Duration:</strong> {itinerary.duration.days} Days / {itinerary.duration.nights} Nights
        </p>
        <p class="text-2xl font-bold text-green-600 mb-6">
          ₹{itinerary.price_range.min_inr.toLocaleString()} - 
          ₹{itinerary.price_range.max_inr.toLocaleString()}
        </p>
        
        <!-- Day-by-day itinerary -->
        <div class="space-y-4">
          {itinerary.itinerary.map((day: any) => (
            <details class="group">
              <summary class="cursor-pointer font-semibold text-lg hover:text-orange-600 transition-colors">
                Day {day.day}: {day.title}
              </summary>
              <div class="mt-2 pl-4 text-gray-600">
                <p><strong>Altitude:</strong> {day.end_altitude_m}m</p>
                <p><strong>Activities:</strong></p>
                <ul class="list-disc pl-5">
                  {day.activities.map((activity: string) => (
                    <li>{activity}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
        
        <!-- Book Button -->
        <a 
          href={`https://wa.me/917302937532?text=${encodeURIComponent(`I'm interested in ${itinerary.package_name}`)}`}
          class="mt-8 inline-block bg-gradient-to-r from-orange-500 to-orange-600 
                 text-white px-8 py-4 rounded-full font-semibold text-lg
                 hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Book via WhatsApp
        </a>
      </div>
    </div>
  </section>
</BaseLayout>
```

---

## 📄 Content Collections for Blog

### Define Collection
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Shiv Yatra Tourism'),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

### Create Blog Post
```markdown
---
// src/content/blog/adi-kailash-guide-2025.md
title: "Complete Adi Kailash Yatra Guide 2025"
description: "Everything you need to know about planning your Adi Kailash pilgrimage"
pubDate: 2025-01-15
tags: ["guide", "preparation", "pilgrimage"]
image: "/images/blog/adi-kailash-guide.jpg"
---

## Introduction

Adi Kailash, also known as Chhota Kailash...

(Full blog content here)
```

### Blog Index Page
```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const blogPosts = await getCollection('blog');
const sortedPosts = blogPosts.sort((a, b) => 
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<BaseLayout title="Blog" description="Travel guides and tips">
  <div class="container mx-auto px-4 py-20">
    <h1 class="text-4xl font-bold mb-12">Blog & Travel Guides</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {sortedPosts.map((post) => (
        <a 
          href={`/blog/${post.slug}`}
          class="group block bg-white rounded-xl shadow-lg overflow-hidden
                 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          {post.data.image && (
            <img 
              src={post.data.image} 
              alt={post.data.title}
              class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
              {post.data.title}
            </h3>
            <p class="text-gray-600 text-sm mb-4">
              {post.data.pubDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p class="text-gray-700">{post.data.description}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
</BaseLayout>
```

---

## 🔍 SEO Implementation

### Meta Tags Component
```astro
---
// src/components/SEO.astro
import metaTagsData from '../data/meta_tags.json';

interface Props {
  page: string;
}

const { page } = Astro.props;
const metaTags = metaTagsData.pages.find(p => p.page_name === page);
const canonical = `${metaTagsData.global_settings.og_locale === 'en_US' ? '' : '/hi'}${metaTags?.url}`;
---

{metaTags && (
  <>
    <title>{metaTags.title}</title>
    <meta name="description" content={metaTags.description} />
    <meta name="keywords" content={metaTags.keywords} />
    <link rel="canonical" href={canonical} />
    
    <!-- Open Graph -->
    <meta property="og:title" content={metaTags.og_title || metaTags.title} />
    <meta property="og:description" content={metaTags.og_description || metaTags.description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content="/images/og-image.jpg" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={metaTags.title} />
    <meta name="twitter:description" content={metaTags.description} />
    <meta name="twitter:image" content="/images/og-image.jpg" />
  </>
)}
```

### Schema Markup Component
```astro
---
// src/components/SchemaMarkup.astro
import faqSchema from '../data/faq_schema.json';
import orgSchema from '../data/organization_schema.json';

interface Props {
  type: 'faq' | 'organization';
}

const { type } = Astro.props;
const schema = type === 'faq' ? faqSchema : orgSchema;
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### Sitemap Generation
```js
// src/pages/sitemap.xml.js
import sitemapData from '../data/sitemap.json';

export async function GET() {
  const baseUrl = 'https://shivyatratourism.com';
  
  const urls = sitemapData.pages.map(page => {
    return `
      <url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `;
  }).join('');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
```

---

## 🎨 Global Styles

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');

:root {
  --primary: #FF6B35;
  --secondary: #2C3E50;
  --accent: #F39C12;
  --success: #25D366;
  --text-dark: #1A1A1A;
  --text-light: #666666;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  line-height: 1.6;
}

html[lang="hi"] body {
  font-family: 'Noto Sans Devanagari', sans-serif;
}

/* Custom Components */
@layer components {
  .btn-primary {
    @apply bg-gradient-to-r from-orange-500 to-orange-600 
           text-white px-6 py-3 rounded-full font-semibold
           hover:shadow-xl transform hover:scale-105 
           transition-all duration-300 inline-block;
  }
  
  .btn-outline {
    @apply border-2 border-orange-500 text-orange-500
           hover:bg-orange-500 hover:text-white
           px-6 py-3 rounded-full font-semibold
           transition-all duration-300 inline-block;
  }
  
  .container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-lg p-6
           hover:shadow-2xl transform hover:-translate-y-2
           transition-all duration-300;
  }
}

/* Animations */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 107, 53, 0.8);
  }
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Selection */
::selection {
  background: var(--primary);
  color: white;
}
```

---

## 🚀 Build & Deploy

### Build Command
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify
```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## ✅ Pre-Launch Checklist

- [ ] All 11 data files copied to `/src/data/`
- [ ] Replace company info in `organization_schema.json`
- [ ] Add all 25 images to `/public/images/` per `image_manifest.csv`
- [ ] Test WhatsApp link (917302937532) on mobile & desktop
- [ ] Test English ↔ Hindi toggle on all pages
- [ ] Verify all internal links work
- [ ] Test contact form submission to WhatsApp
- [ ] Run Lighthouse audit (target: 95+ all categories)
- [ ] Validate schema markup (Google Rich Results Test)
- [ ] Test on real devices (iPhone, Android, iPad)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Add SSL certificate

---

## 🎯 Why Astro is Better Here

✅ **Ultra-Fast Performance** - Zero JS by default, loads in < 1s  
✅ **Perfect SEO** - Static HTML, crawlable by Google  
✅ **Easy i18n** - Built-in routing for /hi pages  
✅ **Image Optimization** - Automatic WebP conversion  
✅ **View Transitions** - Smooth page transitions without JS frameworks  
✅ **Component Islands** - Add React/Vue only where needed  
✅ **Simple Deployment** - Deploy anywhere as static HTML  

---

## 💡 Final Tips

1. Keep animations subtle for better performance
2. Use View Transitions for page navigation (built into Astro 3+)
3. Lazy load images below the fold
4. Compress all images to WebP format
5. Use Alpine.js for small interactive components
6. Keep WhatsApp button always visible (floating)
7. Test on 3G connection for real-world performance
8. Add loading skeletons for perceived performance
9. Implement error boundaries for graceful failures
10. Monitor Core Web Vitals in Google Search Console

---

## 🆘 Common Issues

**Build error with CSV:**
- Ensure `papaparse` is installed
- Check file path: `/src/data/content.csv`

**Images not optimizing:**
- Use `<Image>` component from `astro:assets`
- Place images in `src/assets/images/` for optimization

**WhatsApp not opening:**
- Use `https://wa.me/917302937532` format
- Test on actual mobile devices

**Hindi fonts not loading:**
- Verify Google Fonts import
- Check `html[lang="hi"]` CSS selector

---

## 📚 Resources

- [Astro Docs](https://docs.astro.build)
- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)
- [Alpine.js](https://alpinejs.dev/)
- [Tailwind CSS](https://tailwindcss.com)
- [WhatsApp Click to Chat](https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat)

---

## 🎉 Ready to Build!

This Astro setup will give you:
- ⚡ **Lightning-fast** page loads (< 1 second)
- 📱 **Mobile-optimized** responsive design
- 🌐 **Bilingual** English/Hindi support
- 💬 **WhatsApp** integration to 7302937532
- 🎨 **Beautiful animations** with View Transitions
- 🔍 **Perfect SEO** with 95+ Lighthouse score

**Start building with Astro and create an amazing tourism website for Shiv Yatra Tourism!** 🚀🙏
