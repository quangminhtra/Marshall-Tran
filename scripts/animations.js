document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const cards = document.querySelectorAll('.skill-block, .exp-block, .project-block');
  const revealTargets = [...sections, ...cards];
  const heroTargets = document.querySelectorAll('header > *');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  heroTargets.forEach((element) => element.classList.add('hero-stagger'));
  revealTargets.forEach((element) => element.classList.add('reveal'));

  if (prefersReducedMotion || isMobile || !('IntersectionObserver' in window)) {
    heroTargets.forEach((element) => element.classList.add('is-visible'));
    revealTargets.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  heroTargets.forEach((element, index) => {
    window.setTimeout(() => {
      element.classList.add('is-visible');
    }, 120 + index * 90);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -24px 0px',
    }
  );

  revealTargets.forEach((element) => observer.observe(element));
});
