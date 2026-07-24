// City Splash — Carnival Warm Up Party landing page

document.addEventListener('DOMContentLoaded', () => {

  // Sticky header state
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle (full-screen takeover)
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const setNavOpen = (isOpen) => {
    mainNav.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-lock', isOpen);
  };
  navToggle.addEventListener('click', () => {
    setNavOpen(!mainNav.classList.contains('open'));
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setNavOpen(false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) setNavOpen(false);
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Gallery lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex = 0;

  const showImage = (index) => {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const btn = galleryItems[currentIndex];
    lightboxImg.src = btn.dataset.full;
    lightboxImg.alt = btn.querySelector('img').alt;
  };

  galleryItems.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      showImage(index);
      lightbox.classList.add('open');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  };
  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });
  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });
  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });

  // Hero video: start at 3.5s and loop back to 3.5s instead of 0
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    const HERO_START = 3.5;
    heroVideo.addEventListener('loadedmetadata', () => {
      heroVideo.currentTime = HERO_START;
    });
    heroVideo.addEventListener('ended', () => {
      heroVideo.currentTime = HERO_START;
      heroVideo.play().catch(() => {});
    });
  }

  // Pause hero video off-screen (saves battery/CPU on long scroll)
  if (heroVideo) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) heroVideo.play().catch(() => {});
        else heroVideo.pause();
      });
    }, { threshold: 0.1 });
    vio.observe(heroVideo);
  }
});
