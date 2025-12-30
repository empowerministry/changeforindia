/**
 * Change for India - Main JavaScript
 * Minimal JS for mobile navigation and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');
  const body = document.body;

  function openMenu() {
    navMenu.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    body.style.overflow = 'hidden';
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.textContent = '\u00D7'; // × character
  }

  function closeMenu() {
    navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    body.style.overflow = '';
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.textContent = '\u2630'; // ☰ character
  }

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      if (navMenu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Close menu when clicking overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // Set active nav link based on current page
  const currentPath = window.location.pathname;
  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (currentPath === href ||
        (currentPath.endsWith('/') && href === '/') ||
        (currentPath.endsWith('index.html') && href === '/') ||
        currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });

  // Simple scroll animation for elements with observable classes
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document.querySelectorAll('.card, .feature-card, .gallery-item').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Lightbox functionality for gallery images using safe DOM methods
  const galleryItems = document.querySelectorAll('.gallery-item img');

  galleryItems.forEach(function(img) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      // Create lightbox container
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:2000;cursor:pointer;';

      // Create content container
      const content = document.createElement('div');
      content.className = 'lightbox-content';
      content.style.cssText = 'position:relative;max-width:90%;max-height:90%;';

      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'lightbox-close';
      closeBtn.textContent = '\u00D7'; // × character
      closeBtn.style.cssText = 'position:absolute;top:-40px;right:0;background:none;border:none;color:white;font-size:2rem;cursor:pointer;';

      // Create image element
      const lightboxImg = document.createElement('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightboxImg.style.cssText = 'max-width:100%;max-height:85vh;object-fit:contain;';

      // Assemble DOM structure
      content.appendChild(closeBtn);
      content.appendChild(lightboxImg);
      lightbox.appendChild(content);
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      // Close function
      function closeLightbox() {
        lightbox.remove();
        document.body.style.overflow = '';
      }

      // Event listeners
      lightbox.addEventListener('click', closeLightbox);
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeLightbox();
      });

      function escHandler(e) {
        if (e.key === 'Escape') {
          closeLightbox();
          document.removeEventListener('keydown', escHandler);
        }
      }
      document.addEventListener('keydown', escHandler);
    });
  });
});
