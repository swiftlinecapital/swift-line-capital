// Universal tracking
(function() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "https://t.swiftlinecapital.com/v1/lst/universal-script?ph=c08ff61b2a7d38f14e311673db27ec88dbf29cb1a7950e5334b8feb18bbf6394&tag=!clicked&ref_url=" + encodeURIComponent(document.URL);
  document.head.appendChild(script);
})();

// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');
if (toggle && navUl) {
  toggle.addEventListener('click', () => navUl.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navUl.contains(e.target)) {
      navUl.classList.remove('open');
    }
  });
}

// Animate count-up numbers in hero stats
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    const val = target * eased;
    el.textContent = prefix + (Number.isInteger(target) ? Math.floor(val) : val.toFixed(1)) + suffix;
    if (elapsed < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCount);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.hero-stats, .stat-cards').forEach(el => observer.observe(el));

// Sticky header shadow on scroll
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(43,50,82,.15)'
      : '0 2px 12px rgba(43,50,82,.08)';
  }, { passive: true });
}
