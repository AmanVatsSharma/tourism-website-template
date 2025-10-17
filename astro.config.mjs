// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

/**
 * Astro Configuration for Shiv Yatra Tourism Website
 * 
 * Features:
 * - Bilingual support (English/Hindi) with i18n routing
 * - Tailwind CSS for styling
 * - Sitemap generation for SEO
 * - React integration for interactive components
 * - View Transitions for smooth page navigation
 */

// https://astro.build/config
export default defineConfig({
  // Site URL - IMPORTANT: Update this with your actual domain before deployment
  site: 'https://shivyatratourism.com',
  
  // Integrations for enhanced functionality
  integrations: [
    tailwind({
      // Apply Tailwind base styles automatically
      applyBaseStyles: true,
    }),
    sitemap({
      // Generate sitemap with both English and Hindi pages
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          hi: 'hi',
        },
      },
    }),
    react(), // For interactive components like counters, forms
  ],
  
  // Internationalization (i18n) configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi'],
    routing: {
      // Don't prefix default locale (English) URLs
      prefixDefaultLocale: false,
      // Hindi pages will be at /hi/*
    },
  },
  
  // Image optimization settings
  image: {
    domains: ['shivyatratourism.com', 'images.unsplash.com', 'images.pexels.com'],
    // Allow images from Unsplash and Pexels for placeholders
  },
  
  // Vite configuration for optimizations
  vite: {
    build: {
      // Use Lightning CSS for faster builds
      cssMinify: 'lightningcss',
    },
    // Log data loading for debugging
    logLevel: 'info',
  },
  
  // Output configuration
  output: 'static', // Static site generation
  
  // Build configuration
  build: {
    // Inline stylesheets smaller than 2kb
    inlineStylesheets: 'auto',
  },
});
