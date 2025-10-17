/**
 * Data Loader Utilities for Shiv Yatra Tourism Website
 * 
 * This module provides functions to load and parse CSV and JSON files
 * from the /data directory. All content is loaded dynamically at build time.
 * 
 * Key Features:
 * - CSV parsing with PapaParse
 * - JSON file loading
 * - Content structure transformation
 * - Error handling with detailed logging
 * - Type-safe data access
 * 
 * @module dataLoader
 */

import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

// Type definitions for better type safety
export interface ContentRow {
  page: string;
  section: string;
  key: string;
  copy: string;
  cta_text?: string;
  cta_link?: string;
}

export interface StructuredContent {
  [page: string]: {
    [section: string]: {
      [key: string]: string | { text: string; cta?: string; link?: string };
    };
  };
}

/**
 * Load and parse CSV file
 * 
 * @param filename - Name of the CSV file in /data directory
 * @returns Parsed CSV data as array of objects
 * @throws Error if file not found or parsing fails
 * 
 * @example
 * const content = await loadCSV('content.csv');
 * console.log('Loaded rows:', content.length);
 */
export async function loadCSV(filename: string): Promise<any[]> {
  console.log(`[DataLoader] Loading CSV file: ${filename}`);
  
  try {
    // Construct file path - data is in project root /data folder
    const filePath = path.join(process.cwd(), 'data', filename);
    
    console.log(`[DataLoader] Reading from path: ${filePath}`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`CSV file not found: ${filePath}`);
    }
    
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log(`[DataLoader] File read successfully, size: ${fileContent.length} bytes`);
    
    // Parse CSV with PapaParse
    return new Promise((resolve, reject) => {
      Papa.parse(fileContent, {
        header: true, // First row contains headers
        skipEmptyLines: true, // Ignore empty lines
        dynamicTyping: true, // Auto-convert numbers
        complete: (results) => {
          console.log(`[DataLoader] ✓ CSV parsed successfully: ${results.data.length} rows`);
          
          // Log any parsing errors
          if (results.errors.length > 0) {
            console.warn(`[DataLoader] Parsing warnings:`, results.errors);
          }
          
          resolve(results.data);
        },
        error: (error) => {
          console.error(`[DataLoader] ✗ CSV parsing error:`, error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error(`[DataLoader] ✗ Failed to load CSV file ${filename}:`, error);
    throw error;
  }
}

/**
 * Load and parse JSON file
 * 
 * @param filename - Name of the JSON file in /data directory
 * @returns Parsed JSON data
 * @throws Error if file not found or parsing fails
 * 
 * @example
 * const itinerary = await loadJSON('itinerary_5day.json');
 * console.log('Package:', itinerary.package_name);
 */
export async function loadJSON<T = any>(filename: string): Promise<T> {
  console.log(`[DataLoader] Loading JSON file: ${filename}`);
  
  try {
    // Construct file path - data is in project root /data folder
    const filePath = path.join(process.cwd(), 'data', filename);
    
    console.log(`[DataLoader] Reading from path: ${filePath}`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`JSON file not found: ${filePath}`);
    }
    
    // Read and parse JSON file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    console.log(`[DataLoader] ✓ JSON loaded successfully:`, Object.keys(data).slice(0, 5));
    
    return data;
  } catch (error) {
    console.error(`[DataLoader] ✗ Failed to load JSON file ${filename}:`, error);
    throw error;
  }
}

/**
 * Load and structure content from content.csv
 * 
 * Transforms flat CSV structure into nested object for easy access:
 * content[page][section][key] = value
 * 
 * @returns Structured content object
 * 
 * @example
 * const content = await loadContent();
 * const heroTitle = content.home.hero.h1;
 * console.log('Hero title:', heroTitle);
 */
export async function loadContent(): Promise<StructuredContent> {
  console.log(`[DataLoader] Loading and structuring content.csv`);
  
  try {
    const data: ContentRow[] = await loadCSV('content.csv');
    
    // Transform flat structure to nested object
    const structured: StructuredContent = {};
    
    data.forEach((row, index) => {
      try {
        // Validate required fields
        if (!row.page || !row.section || !row.key) {
          console.warn(`[DataLoader] Skipping incomplete row ${index + 1}:`, row);
          return;
        }
        
        // Initialize nested structure if needed
        if (!structured[row.page]) {
          structured[row.page] = {};
        }
        if (!structured[row.page][row.section]) {
          structured[row.page][row.section] = {};
        }
        
        // Store content with CTA if available
        if (row.cta_text && row.cta_link) {
          structured[row.page][row.section][row.key] = {
            text: row.copy || '',
            cta: row.cta_text,
            link: row.cta_link,
          };
        } else {
          structured[row.page][row.section][row.key] = row.copy || '';
        }
      } catch (error) {
        console.error(`[DataLoader] Error processing row ${index + 1}:`, error);
      }
    });
    
    const pageCount = Object.keys(structured).length;
    console.log(`[DataLoader] ✓ Content structured successfully: ${pageCount} pages`);
    console.log(`[DataLoader] Available pages:`, Object.keys(structured));
    
    return structured;
  } catch (error) {
    console.error(`[DataLoader] ✗ Failed to structure content:`, error);
    throw error;
  }
}

/**
 * Load keywords from keywords.csv
 * 
 * @returns Array of keyword objects
 * 
 * @example
 * const keywords = await loadKeywords();
 * const primaryKeywords = keywords.filter(k => k.priority === 'Primary');
 */
export async function loadKeywords(): Promise<any[]> {
  console.log(`[DataLoader] Loading keywords.csv`);
  
  try {
    const keywords = await loadCSV('keywords.csv');
    console.log(`[DataLoader] ✓ Loaded ${keywords.length} keywords`);
    return keywords;
  } catch (error) {
    console.error(`[DataLoader] ✗ Failed to load keywords:`, error);
    return [];
  }
}

/**
 * Load image manifest from image_manifest.csv
 * 
 * @returns Array of image specifications
 * 
 * @example
 * const images = await loadImageManifest();
 * const heroImages = images.filter(img => img.filename.includes('hero'));
 */
export async function loadImageManifest(): Promise<any[]> {
  console.log(`[DataLoader] Loading image_manifest.csv`);
  
  try {
    const manifest = await loadCSV('image_manifest.csv');
    console.log(`[DataLoader] ✓ Loaded ${manifest.length} image specifications`);
    return manifest;
  } catch (error) {
    console.error(`[DataLoader] ✗ Failed to load image manifest:`, error);
    return [];
  }
}

/**
 * Get content for a specific page and section
 * 
 * @param page - Page name (e.g., 'home', 'packages')
 * @param section - Section name (e.g., 'hero', 'features')
 * @returns Section content object or null if not found
 * 
 * @example
 * const heroContent = await getPageSection('home', 'hero');
 * console.log('Hero title:', heroContent.h1);
 */
export async function getPageSection(page: string, section: string): Promise<any> {
  console.log(`[DataLoader] Getting content for ${page} > ${section}`);
  
  try {
    const content = await loadContent();
    
    if (!content[page]) {
      console.warn(`[DataLoader] Page '${page}' not found in content`);
      return null;
    }
    
    if (!content[page][section]) {
      console.warn(`[DataLoader] Section '${section}' not found in page '${page}'`);
      return null;
    }
    
    console.log(`[DataLoader] ✓ Found content for ${page} > ${section}`);
    return content[page][section];
  } catch (error) {
    console.error(`[DataLoader] ✗ Failed to get page section:`, error);
    return null;
  }
}

/**
 * Validate that all required data files exist
 * 
 * @returns Object with validation results
 * 
 * @example
 * const validation = validateDataFiles();
 * if (!validation.allPresent) {
 *   console.error('Missing files:', validation.missing);
 * }
 */
export function validateDataFiles(): { allPresent: boolean; missing: string[]; present: string[] } {
  console.log(`[DataLoader] Validating data files...`);
  
  const requiredFiles = [
    'content.csv',
    'keywords.csv',
    'image_manifest.csv',
    'itinerary_5day.json',
    'buyer_personas.json',
    'blog_outlines.json',
    'faq_schema.json',
    'meta_tags.json',
    'sitemap.json',
    'organization_schema.json',
  ];
  
  const dataDir = path.join(process.cwd(), 'data');
  const present: string[] = [];
  const missing: string[] = [];
  
  requiredFiles.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
      present.push(file);
    } else {
      missing.push(file);
    }
  });
  
  console.log(`[DataLoader] Files present: ${present.length}/${requiredFiles.length}`);
  
  if (missing.length > 0) {
    console.warn(`[DataLoader] Missing files:`, missing);
  } else {
    console.log(`[DataLoader] ✓ All required data files present`);
  }
  
  return {
    allPresent: missing.length === 0,
    missing,
    present,
  };
}

// Export all functions for easy import
export default {
  loadCSV,
  loadJSON,
  loadContent,
  loadKeywords,
  loadImageManifest,
  getPageSection,
  validateDataFiles,
};

