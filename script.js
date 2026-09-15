const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add('loading');
let loaderStarted = false;

function initSite() {
  document.body.classList.remove('loading');
  if (!window.gsap || reduceMotion) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out' });

  gsap.utils.toArray('.split-text').forEach((heading) => {
    const words = heading.textContent.trim().split(/\s+/);
    heading.innerHTML = words.map((word) => `<span class="word"><span>${word}</span></span>`).join(' ');
    gsap.from(heading.querySelectorAll('.word > span'), {
      yPercent: 110,
      duration: 1,
      stagger: 0.045,
      scrollTrigger: { trigger: heading, start: 'top 82%', once: true }
    });
  });

  gsap.to('.hero-stamp', { rotate: 90, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.to('.marquee div', { xPercent: -35, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.from('.price-main', { yPercent: 16, opacity: 0, duration: 1.1, scrollTrigger: { trigger: '.price-section', start: 'top 66%', once: true } });
  gsap.from('.steps article', { y: 70, opacity: 0, duration: .9, stagger: .1, scrollTrigger: { trigger: '.steps', start: 'top 78%', once: true } });
  gsap.from('.reference-card', { y: 90, opacity: 0, duration: 1, stagger: .12, scrollTrigger: { trigger: '.reference-grid', start: 'top 75%', once: true } });
  gsap.from('.cta-section h2 span', { xPercent: -12, opacity: 0, duration: 1, scrollTrigger: { trigger: '.cta-section', start: 'top 60%', once: true } });
}

function runPreloader() {
  if (loaderStarted) return;
  loaderStarted = true;
  if (!window.gsap || reduceMotion) {
    document.querySelector('.preloader')?.remove();
    initSite();
    return;
  }
  const counter = { value: 0 };
  const tl = gsap.timeline({ onComplete: initSite });
  tl.to(counter, { value: 100, duration: 1.15, ease: 'power2.inOut', onUpdate: () => { document.querySelector('.load-count').textContent = String(Math.round(counter.value)).padStart(2, '0'); } })
    .to('.preloader-line span', { scaleX: 1, duration: 1.15, ease: 'power2.inOut' }, 0)
    .to('.preloader-mark img', { rotate: 0, scale: 1, duration: 1.1, ease: 'power3.out' }, 0)
    .to('.preloader', { yPercent: -100, duration: .9, ease: 'power4.inOut' })
    .from('.hero-line > span', { yPercent: 110, duration: 1, stagger: .08, ease: 'power4.out' }, '-=.35')
    .from('.reveal-row', { opacity: 0, y: 20, duration: .7, stagger: .1 }, '-=.55');
}

const cursor = document.querySelector('.cursor');
if (cursor && window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduceMotion) {
  let cursorX = 0, cursorY = 0;
  window.addEventListener('pointermove', (event) => {
    cursorX = event.clientX; cursorY = event.clientY;
    if (window.gsap) gsap.to(cursor, { x: cursorX, y: cursorY, duration: .35, ease: 'power3.out' });
  });
  document.querySelectorAll('[data-cursor]').forEach((el) => {
    el.addEventListener('pointerenter', () => { cursor.querySelector('span').textContent = el.dataset.cursor; gsap.to(cursor, { scale: 1, duration: .2 }); });
    el.addEventListener('pointerleave', () => gsap.to(cursor, { scale: 0, duration: .2 }));
  });
}

document.querySelectorAll('.magnetic').forEach((el) => {
  if (reduceMotion) return;
  el.addEventListener('pointermove', (event) => {
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * .18;
    const y = (event.clientY - rect.top - rect.height / 2) * .18;
    if (window.gsap) gsap.to(el, { x, y, duration: .5, ease: 'power3.out' });
  });
  el.addEventListener('pointerleave', () => { if (window.gsap) gsap.to(el, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1, .45)' }); });
});

window.addEventListener('load', runPreloader, { once: true });
setTimeout(() => { if (document.body.classList.contains('loading')) runPreloader(); }, 5000);
