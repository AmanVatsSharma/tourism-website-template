/**
 * Animation & Interaction Scripts
 * 
 * Handles scroll-triggered animations, parallax effects, and interactive elements.
 * Optimized for performance with Intersection Observer and RequestAnimationFrame.
 * 
 * Features:
 * - Scroll reveal animations
 * - Parallax scrolling effects
 * - Counter animations
 * - Smooth scroll handling
 * - Image lazy loading
 * 
 * @module animations
 */

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

/**
 * Initialize scroll reveal animations using Intersection Observer
 * More performant than scroll events
 */
function initScrollReveal(): void {
  console.log('[Animations] Initializing scroll reveal');
  
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -100px 0px', // Start animation 100px before element enters viewport
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'revealed');
        
        // Stop observing after animation to save resources
        observer.unobserve(entry.target);
        
        console.log('[Animations] ✓ Revealed element:', entry.target.classList);
      }
    });
  }, observerOptions);
  
  // Observe all elements with scroll animation classes
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, [data-scroll-reveal]'
  );
  
  animatedElements.forEach((el) => observer.observe(el));
  
  console.log(`[Animations] ✓ Observing ${animatedElements.length} elements for scroll reveal`);
}

// ============================================
// PARALLAX SCROLLING
// ============================================

/**
 * Initialize parallax scrolling effects
 * Uses requestAnimationFrame for smooth 60fps animations
 */
function initParallax(): void {
  console.log('[Animations] Initializing parallax effects');
  
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) {
    console.log('[Animations] No parallax elements found');
    return;
  }
  
  let ticking = false;
  
  function updateParallax(): void {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach((el) => {
      const element = el as HTMLElement;
      const speed = parseFloat(element.dataset.parallax || '0.5');
      const yPos = -(scrolled * speed);
      
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    
    ticking = false;
  }
  
  function requestTick(): void {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
  
  console.log(`[Animations] ✓ Initialized parallax for ${parallaxElements.length} elements`);
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

/**
 * Animate numbers counting up
 * Used for stats and metrics
 */
function initCounterAnimations(): void {
  console.log('[Animations] Initializing counter animations');
  
  const counterElements = document.querySelectorAll('[data-counter]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        const target = parseInt(element.dataset.counter || '0', 10);
        const duration = parseInt(element.dataset.duration || '2000', 10);
        
        animateCounter(element, target, duration);
        
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.5 });
  
  counterElements.forEach((el) => observer.observe(el));
  
  console.log(`[Animations] ✓ Initialized ${counterElements.length} counters`);
}

/**
 * Animate a single counter element
 */
function animateCounter(element: HTMLElement, target: number, duration: number): void {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    // Format number with commas
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// ============================================
// SMOOTH SCROLL
// ============================================

/**
 * Enhance smooth scrolling for anchor links
 */
function initSmoothScroll(): void {
  console.log('[Animations] Initializing smooth scroll');
  
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = (this as HTMLAnchorElement).getAttribute('href');
      
      // Skip if href is just "#" or empty
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        
        // Update URL without page jump
        history.pushState(null, '', href);
        
        console.log('[Animations] Smooth scrolled to:', href);
      }
    });
  });
  
  console.log('[Animations] ✓ Smooth scroll enabled');
}

// ============================================
// LAZY LOADING ENHANCEMENTS
// ============================================

/**
 * Enhanced lazy loading for images
 * Add fade-in animation when loaded
 */
function initLazyLoading(): void {
  console.log('[Animations] Initializing lazy loading enhancements');
  
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  lazyImages.forEach((img) => {
    img.addEventListener('load', () => {
      img.classList.add('loaded', 'animate-fade-in');
      console.log('[Animations] ✓ Image loaded:', (img as HTMLImageElement).src.substring(0, 50));
    });
  });
  
  console.log(`[Animations] ✓ Enhanced ${lazyImages.length} lazy images`);
}

// ============================================
// FLOATING ELEMENTS (Spiritual Design)
// ============================================

/**
 * Create floating animation for spiritual elements
 * Like lotus petals, Om symbols, etc.
 */
function initFloatingElements(): void {
  console.log('[Animations] Initializing floating elements');
  
  const floatingElements = document.querySelectorAll('[data-float]');
  
  floatingElements.forEach((el, index) => {
    const element = el as HTMLElement;
    const delay = index * 0.2; // Stagger animations
    
    element.style.animationDelay = `${delay}s`;
    element.classList.add('animate-float');
  });
  
  console.log(`[Animations] ✓ Animated ${floatingElements.length} floating elements`);
}

// ============================================
// HEADER SCROLL BEHAVIOR
// ============================================

/**
 * Add/remove shadow on header when scrolling
 */
function initHeaderScrollBehavior(): void {
  console.log('[Animations] Initializing header scroll behavior');
  
  const header = document.getElementById('site-header');
  
  if (!header) {
    console.log('[Animations] No header element found');
    return;
  }
  
  let lastScroll = 0;
  let ticking = false;
  
  function updateHeader(): void {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled', 'shadow-lg');
    } else {
      header.classList.remove('scrolled', 'shadow-lg');
    }
    
    // Optional: Hide header on scroll down, show on scroll up
    // if (currentScroll > lastScroll && currentScroll > 300) {
    //   header.style.transform = 'translateY(-100%)';
    // } else {
    //   header.style.transform = 'translateY(0)';
    // }
    
    lastScroll = currentScroll;
    ticking = false;
  }
  
  function requestTick(): void {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
  
  console.log('[Animations] ✓ Header scroll behavior enabled');
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all animations when DOM is ready
 */
function init(): void {
  console.log('[Animations] ═══════════════════════════════════');
  console.log('[Animations] Initializing animation system...');
  console.log('[Animations] ═══════════════════════════════════');
  
  // Check if animations are disabled (accessibility)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    console.log('[Animations] ⚠️  Reduced motion preferred - animations disabled');
    return;
  }
  
  // Initialize all animation systems
  initScrollReveal();
  initParallax();
  initCounterAnimations();
  initSmoothScroll();
  initLazyLoading();
  initFloatingElements();
  initHeaderScrollBehavior();
  
  console.log('[Animations] ═══════════════════════════════════');
  console.log('[Animations] ✓ All animations initialized!');
  console.log('[Animations] ═══════════════════════════════════');
}

// ============================================
// AUTO-INITIALIZE
// ============================================

// Run on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM already loaded
  init();
}

// Re-initialize on Astro page transitions
document.addEventListener('astro:page-load', () => {
  console.log('[Animations] Astro page-load event detected, re-initializing...');
  init();
});

document.addEventListener('astro:after-swap', () => {
  console.log('[Animations] Astro after-swap event detected');
});

// Export for manual initialization if needed
export {
  initScrollReveal,
  initParallax,
  initCounterAnimations,
  initSmoothScroll,
  initLazyLoading,
  initFloatingElements,
  initHeaderScrollBehavior,
  init as initAnimations,
};

