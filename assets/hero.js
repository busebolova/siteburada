(() => {
  const showcase = document.querySelector('.hero-showcase');
  if (!showcase) return;
  const projects = [
    { image: './assets/ref-architecture-color.png', alt: 'Minimal mimarlık web sitesinin dizüstü bilgisayarda görünümü', category: '01 / MİMARLIK', name: 'MONO HOUSE', service: 'WEB TASARIM' },
    { image: './assets/ref-dining-color.png', alt: 'Noir Table restoranı için mobil web sitesi tasarımı', category: '02 / GASTRONOMİ', name: 'NOIR TABLE', service: 'MOBİL DENEYİM' },
    { image: './assets/ref-interiors-color.png', alt: 'Form Studio için mobilya ve iç mekân web sitesi tasarımı', category: '03 / MOBİLYA', name: 'FORM STUDIO', service: 'E-TİCARET' }
  ];
  const image = showcase.querySelector('.hero-project-image');
  const metadata = showcase.querySelector('.hero-project-bottom');
  const buttons = [...showcase.querySelectorAll('[data-project]')];
  metadata.setAttribute('aria-live', 'polite');
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    const project = projects[index];
    image.src = project.image;
    image.alt = project.alt;
    metadata.querySelector('div > span').textContent = project.category;
    metadata.querySelector('strong').textContent = project.name;
    metadata.querySelector('.hero-project-tag').textContent = project.service;
    showcase.querySelector('.hero-project-count').textContent = `0${index + 1} — 03`;
    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      image.animate([{ opacity: .35 }, { opacity: 1 }], { duration: 450, easing: 'ease-out' });
    }
  }));
})();
