const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const AUTOPLAY_MS = 6000;
const state = {
  data: null,
  journey: 0,
  projectFilter: 'All',
  projectIndex: 0,
  filteredProjects: [],
  projectPaused: false,
  projectTimer: null,
  journeyTimer: null,
};

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('portfolio-theme', theme);
}

const preferredTheme = localStorage.getItem('portfolio-theme') ||
  (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(preferredTheme);
$('#theme-toggle')?.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
});

function renderNav(items) {
  const nav = $('#main-nav');
  nav.innerHTML = items.map(item => `<a href="${item.href}">${item.label}</a>`).join('');
  nav.addEventListener('click', () => {
    nav.classList.remove('open');
    $('#menu-toggle')?.setAttribute('aria-expanded', 'false');
  });
}

$('#menu-toggle')?.addEventListener('click', () => {
  const nav = $('#main-nav');
  const open = nav.classList.toggle('open');
  $('#menu-toggle').setAttribute('aria-expanded', String(open));
});

function visibleProjectCount() {
  if (innerWidth < 720) return 1;
  return 2;
}

function maxProjectIndex() {
  return Math.max(0, state.filteredProjects.length - visibleProjectCount());
}

function updateProjectControls() {
  const max = maxProjectIndex();
  state.projectIndex = Math.min(state.projectIndex, max);
  const cards = $$('.project-card', $('#project-list'));
  const viewport = $('#project-viewport');
  const target = cards[state.projectIndex];
  if (target && viewport) {
    viewport.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
  }

  $('#project-prev').disabled = state.filteredProjects.length <= visibleProjectCount();
  $('#project-next').disabled = state.filteredProjects.length <= visibleProjectCount();
  $('#project-dots').innerHTML = Array.from({ length: max + 1 }, (_, index) =>
    `<button class="carousel-dot ${index === state.projectIndex ? 'active' : ''}" data-index="${index}" aria-label="Show project position ${index + 1}"></button>`
  ).join('');
  $$('.carousel-dot', $('#project-dots')).forEach(dot => {
    dot.addEventListener('click', () => {
      state.projectIndex = Number(dot.dataset.index);
      updateProjectControls();
      restartProjectAutoplay();
    });
  });
}

function renderProjects() {
  const projects = state.data.projects;
  const categories = ['All', ...new Set(projects.map(project => project.category))];
  $('#project-filters').innerHTML = categories.map(category =>
    `<button class="filter-button ${category === state.projectFilter ? 'active' : ''}" data-filter="${category}">${category}</button>`
  ).join('');

  state.filteredProjects = state.projectFilter === 'All'
    ? projects
    : projects.filter(project => project.category === state.projectFilter);
  state.projectIndex = 0;

  $('#project-list').innerHTML = state.filteredProjects.map(project => `
    <a class="project-card ${project.featured ? 'featured' : ''}" href="${project.link}" aria-label="Open case study: ${project.title}">
      <div class="project-image"><img src="${project.image}" alt="${project.title}" loading="lazy"></div>
      <div class="project-body">
        <span class="project-kicker">${project.kicker || `${project.category} · ${project.year}`}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">${(project.tags || []).map(tag => `<span>${tag}</span>`).join('')}</div>
      </div>
      <span class="project-arrow" aria-hidden="true">↗</span>
    </a>`).join('');

  $$('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
      state.projectFilter = button.dataset.filter;
      renderProjects();
      restartProjectAutoplay();
    });
  });

  requestAnimationFrame(updateProjectControls);
}

function moveProject(direction) {
  const max = maxProjectIndex();
  if (max === 0) return;
  state.projectIndex = direction > 0
    ? (state.projectIndex >= max ? 0 : state.projectIndex + 1)
    : (state.projectIndex <= 0 ? max : state.projectIndex - 1);
  updateProjectControls();
  restartProjectProgress();
}

$('#project-next')?.addEventListener('click', () => {
  moveProject(1);
  restartProjectAutoplay();
});
$('#project-prev')?.addEventListener('click', () => {
  moveProject(-1);
  restartProjectAutoplay();
});
$('#project-viewport')?.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    moveProject(1);
    restartProjectAutoplay();
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    moveProject(-1);
    restartProjectAutoplay();
  }
});

function restartProjectProgress() {
  const bar = $('#project-progress');
  if (!bar) return;
  bar.classList.remove('running');
  void bar.offsetWidth;
  if (!state.projectPaused && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bar.classList.add('running');
  }
}

function restartProjectAutoplay() {
  clearInterval(state.projectTimer);
  restartProjectProgress();
  if (state.projectPaused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  state.projectTimer = setInterval(() => moveProject(1), AUTOPLAY_MS);
}

$('#project-autoplay')?.addEventListener('click', () => {
  state.projectPaused = !state.projectPaused;
  $('#project-autoplay').textContent = state.projectPaused ? 'Resume autoplay' : 'Pause autoplay';
  $('#project-autoplay').setAttribute('aria-label', state.projectPaused ? 'Resume project autoplay' : 'Pause project autoplay');
  restartProjectAutoplay();
});

function renderJourney(animated = true) {
  const list = state.data.journey;
  const item = list[state.journey];
  const stage = $('#journey-stage');
  const applyContent = () => {
    const image = $('#journey-image');
    image.src = item.image;
    image.alt = item.title;
    $('#journey-year').textContent = item.year;
    $('#journey-index').textContent = `${String(state.journey + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`;
    $('#journey-title').textContent = item.title;
    $('#journey-short').textContent = item.short;
    $('#journey-dots').innerHTML = list.map((_, index) =>
      `<button aria-label="Show journey item ${index + 1}" class="journey-dot ${index === state.journey ? 'active' : ''}" data-index="${index}"></button>`
    ).join('');
    $$('.journey-dot').forEach(dot => dot.addEventListener('click', () => {
      state.journey = Number(dot.dataset.index);
      renderJourney();
      restartJourneyAutoplay();
    }));
  };

  if (!animated || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyContent();
  } else {
    stage.classList.add('is-changing');
    setTimeout(() => {
      applyContent();
      stage.classList.remove('is-changing');
      stage.classList.add('is-entering');
      setTimeout(() => stage.classList.remove('is-entering'), 500);
    }, 180);
  }
  restartJourneyProgress();
}

function moveJourney(direction) {
  const length = state.data.journey.length;
  state.journey = (state.journey + direction + length) % length;
  renderJourney();
}

$('#journey-next')?.addEventListener('click', () => {
  moveJourney(1);
  restartJourneyAutoplay();
});
$('#journey-prev')?.addEventListener('click', () => {
  moveJourney(-1);
  restartJourneyAutoplay();
});

function restartJourneyProgress() {
  const bar = $('#journey-progress');
  if (!bar) return;
  bar.classList.remove('running');
  void bar.offsetWidth;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) bar.classList.add('running');
}

function restartJourneyAutoplay() {
  clearInterval(state.journeyTimer);
  restartJourneyProgress();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  state.journeyTimer = setInterval(() => moveJourney(1), AUTOPLAY_MS);
}

let observer;
function initReveal() {
  observer ||= new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  $$('.reveal:not(.visible)').forEach(element => observer.observe(element));
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function renderContact() {
  $('#contact-text').textContent = state.data.contact.text;
  const links = state.data.contact.links.map(link =>
    `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label} ↗</a>`
  ).join('');
  $('#contact-links').innerHTML = `${links}<button class="copy-email" id="copy-email">Copy email</button>`;
  $('#copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('egahqusayf.d@gmail.com');
      showToast('Email address copied');
    } catch {
      showToast('Email: egahqusayf.d@gmail.com');
    }
  });
}

function commandItems() {
  return [
    ...state.data.navigation.map(item => ({ label: item.label, meta: 'Section', url: item.href })),
    ...state.data.projects.map(project => ({ label: project.title, meta: project.category, url: project.link })),
    { label: 'Email Egah', meta: 'Contact', url: 'mailto:egahqusayf.d@gmail.com' },
    { label: 'GitHub profile', meta: 'External', url: 'https://github.com/egahqusayf' },
  ];
}

function renderCommandResults(query = '') {
  const normalized = query.trim().toLowerCase();
  const items = commandItems().filter(item => `${item.label} ${item.meta}`.toLowerCase().includes(normalized));
  $('#command-results').innerHTML = items.length
    ? items.map((item, index) => `<a href="${item.url}" class="command-result ${index === 0 ? 'selected' : ''}"><span>${item.label}</span><small>${item.meta}</small></a>`).join('')
    : '<p class="command-empty">No matching section or project.</p>';
  $$('.command-result').forEach(item => item.addEventListener('click', closeCommandPalette));
}

function openCommandPalette() {
  const palette = $('#command-palette');
  palette.classList.add('open');
  palette.setAttribute('aria-hidden', 'false');
  renderCommandResults('');
  setTimeout(() => $('#command-input').focus(), 30);
}
function closeCommandPalette() {
  const palette = $('#command-palette');
  palette.classList.remove('open');
  palette.setAttribute('aria-hidden', 'true');
  $('#command-input').value = '';
}

$('#command-button')?.addEventListener('click', openCommandPalette);
$('#command-backdrop')?.addEventListener('click', closeCommandPalette);
$('#command-input')?.addEventListener('input', event => renderCommandResults(event.target.value));
addEventListener('keydown', event => {
  const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName);
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    $('#command-palette').classList.contains('open') ? closeCommandPalette() : openCommandPalette();
  } else if (event.key === '/' && !typing) {
    event.preventDefault();
    openCommandPalette();
  } else if (event.key === 'Escape') {
    closeCommandPalette();
  }
});

fetch('data/content.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => {
    state.data = data;
    document.title = data.site.title;
    renderNav(data.navigation);
    $('#hero-eyebrow').textContent = data.hero.eyebrow;
    $('#hero-title').textContent = data.hero.title;
    $('#hero-subtitle').textContent = data.hero.subtitle;
    $('#hero-tagline').append(data.hero.tagline);
    $('#about-text').textContent = data.about.text;
    $('#skill-cloud').innerHTML = data.about.skills.map(skill => `<span>${skill}</span>`).join('');
    $('#stats').innerHTML = data.stats.map(stat => `<div class="stat reveal"><strong>${stat.value}</strong><span>${stat.label}</span></div>`).join('');
    const ticker = [...data.about.skills, ...data.about.skills];
    $('#skill-ticker').innerHTML = ticker.map(skill => `<span class="ticker-item">${skill}</span>`).join('');
    renderProjects();
    renderJourney(false);
    renderContact();
    $('#footer-text').textContent = data.site.footer;
    initReveal();
    restartProjectAutoplay();
    restartJourneyAutoplay();
  })
  .catch(error => {
    console.error('Unable to load portfolio content', error);
    showToast('Portfolio content could not be loaded. Please use a local web server.');
  });

addEventListener('resize', () => {
  if (!state.data) return;
  state.projectIndex = Math.min(state.projectIndex, maxProjectIndex());
  updateProjectControls();
});

addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $('#scroll-progress').style.width = `${max ? scrollY / max * 100 : 0}%`;
  const sections = $$('main section[id]');
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 180) current = section.id;
  });
  $$('#main-nav a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  $('#floating-top').classList.toggle('show', scrollY > 700);
});

$('#floating-top')?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(state.projectTimer);
    clearInterval(state.journeyTimer);
  } else if (state.data) {
    restartProjectAutoplay();
    restartJourneyAutoplay();
  }
});
