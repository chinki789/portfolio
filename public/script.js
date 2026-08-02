// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

/* ==================================================
   FETCH ALL PORTFOLIO DATA FROM THE BACKEND
================================================== */
async function loadPortfolio() {
  try {
    const res = await fetch('/api/portfolio');
    if (!res.ok) throw new Error('Request failed: ' + res.status);
    const data = await res.json();
    renderProfile(data.profile);
    renderExperience(data.experience);
    renderProjects(data.projects);
    renderSkills(data.skills);
    renderEducation(data.education);
    renderLeadership(data.leadership);
    renderCertifications(data.certifications);
    initScrollEffects();
    initHeroCanvas();
  } catch (err) {
    console.error('Failed to load portfolio data:', err);
    document.getElementById('heroName').textContent = 'Could not load data';
    const status = document.createElement('p');
    status.className = 'section-body';
    status.textContent = 'The backend API is unreachable. Make sure the server is running (npm start) and reload this page.';
    document.querySelector('.hero').appendChild(status);
  }
}

function renderProfile(profile) {
  document.getElementById('heroName').textContent = profile.name.toUpperCase();
  document.getElementById('heroRole').innerHTML =
    `${esc(profile.role.split('—')[0])}— <span class="accent-cyan">${esc(profile.role.split('—')[1] || '')}</span>`;
  document.getElementById('heroTagline').textContent = profile.tagline;

  const statsEl = document.getElementById('heroStats');
  statsEl.innerHTML = profile.stats.map((s, i) => `
    ${i > 0 ? '<div class="stat-div" aria-hidden="true"></div>' : ''}
    <div class="stat">
      <span class="stat-num" data-count="${s.value}" data-decimals="${s.decimals}" data-suffix="${esc(s.suffix)}">0</span>
      <span class="stat-label mono">${esc(s.label)}</span>
    </div>
  `).join('');

  const linksEl = document.getElementById('heroLinks');
  linksEl.innerHTML = `
    <a href="#projects" class="btn btn-primary">View projects</a>
    <a href="${esc(profile.links.leetcode)}" target="_blank" rel="noopener" class="btn btn-ghost">LeetCode</a>
    <a href="${esc(profile.links.linkedin)}" target="_blank" rel="noopener" class="btn btn-ghost">LinkedIn</a>
    <a href="${esc(profile.links.github)}" target="_blank" rel="noopener" class="btn btn-ghost">GitHub</a>
  `;

  document.getElementById('aboutTraits').innerHTML =
    profile.traits.map((t) => `<span class="trait-chip">${esc(t)}</span>`).join('');

  document.getElementById('contactLinks').innerHTML = `
    <a href="${esc(profile.links.github)}" target="_blank" rel="noopener" class="btn btn-ghost">GitHub</a>
    <a href="${esc(profile.links.linkedin)}" target="_blank" rel="noopener" class="btn btn-ghost">LinkedIn</a>
    <a href="${esc(profile.links.leetcode)}" target="_blank" rel="noopener" class="btn btn-ghost">LeetCode</a>
  `;
}

function renderExperience(list) {
  document.getElementById('experienceList').innerHTML = list.map((e) => `
    <div class="exp-card">
      <div class="exp-top">
        <h3>${esc(e.company)}</h3>
        <span class="mono exp-date">${esc(e.date)}</span>
      </div>
      <p class="exp-role">${esc(e.role)}</p>
      <p class="exp-desc">${esc(e.description)}</p>
    </div>
  `).join('');
}

const GRAPHICS = {
  bars: `<svg viewBox="0 0 200 100" class="project-graphic" aria-hidden="true">
    <line x1="10" y1="85" x2="190" y2="85" class="pg-axis"/>
    <rect x="20" y="55" width="18" height="30" class="pg-bar pg-bar-1"/>
    <rect x="50" y="35" width="18" height="50" class="pg-bar pg-bar-2"/>
    <rect x="80" y="20" width="18" height="65" class="pg-bar pg-bar-3"/>
    <rect x="110" y="45" width="18" height="40" class="pg-bar pg-bar-1"/>
    <rect x="140" y="10" width="18" height="75" class="pg-bar pg-bar-2"/>
    <path d="M20,50 L59,30 L89,15 L119,40 L149,5" class="pg-line"/>
  </svg>`,
  chain: `<svg viewBox="0 0 200 100" class="project-graphic" aria-hidden="true">
    <g class="pg-chain">
      <rect x="20" y="40" width="34" height="20" rx="10" class="pg-link"/>
      <rect x="46" y="40" width="34" height="20" rx="10" class="pg-link pg-link-b"/>
      <rect x="72" y="40" width="34" height="20" rx="10" class="pg-link"/>
      <rect x="98" y="40" width="34" height="20" rx="10" class="pg-link pg-link-b"/>
      <rect x="124" y="40" width="34" height="20" rx="10" class="pg-link"/>
      <rect x="150" y="40" width="34" height="20" rx="10" class="pg-link pg-link-b"/>
    </g>
  </svg>`
};

function renderProjects(list) {
  document.getElementById('projectGrid').innerHTML = list.map((p) => `
    <article class="project-card tilt-card">
      <div class="project-visual">${GRAPHICS[p.graphic] || ''}</div>
      <div class="project-top">
        <h3>${esc(p.name)}</h3>
        <span class="mono exp-date">${esc(p.date)}</span>
      </div>
      <p class="project-desc">${esc(p.description)}</p>
      <div class="tag-row">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <a href="${esc(p.link)}" class="project-link mono">View on GitHub ↗</a>
    </article>
  `).join('');
}

function renderSkills(skills) {
  document.getElementById('skillBars').innerHTML = skills.bars.map((b) => `
    <div class="skill-bar-item">
      <div class="skill-bar-label"><span>${esc(b.label)}</span><span class="mono skill-pct">${b.level}%</span></div>
      <div class="skill-bar-track"><div class="skill-bar-fill" data-level="${b.level}"></div></div>
    </div>
  `).join('');

  document.getElementById('skillGroups').innerHTML = skills.groups.map((g) => `
    <div class="skill-block">
      <h4 class="mono">${esc(g.label)}</h4>
      <div class="tag-row">${g.items.map((i) => `<span class="tag">${esc(i)}</span>`).join('')}</div>
    </div>
  `).join('');
}

function renderEducation(list) {
  document.getElementById('timeline').innerHTML = list.map((e) => `
    <li class="timeline-item">
      <span class="timeline-dot" aria-hidden="true"></span>
      <div>
        <div class="timeline-top">
          <h3>${esc(e.school)}</h3>
          <span class="mono exp-date">${esc(e.date)}</span>
        </div>
        <p class="timeline-sub">${esc(e.detail)}</p>
        <span class="tag">${esc(e.badge)}</span>
      </div>
    </li>
  `).join('');
}

function renderLeadership(list) {
  document.getElementById('leadershipList').innerHTML = list.map((i) => `<li>${esc(i)}</li>`).join('');
}

function renderCertifications(list) {
  document.getElementById('certList').innerHTML = list.map((i) => `<li>${esc(i)}</li>`).join('');
}

/* ==================================================
   CONTACT FORM — posts to the backend
================================================== */
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  statusEl.textContent = '';
  statusEl.className = 'form-status mono';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong.');

    statusEl.textContent = data.message || 'Message sent!';
    statusEl.classList.add('success');
    form.reset();
  } catch (err) {
    statusEl.textContent = err.message;
    statusEl.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send message';
  }
});

/* ==================================================
   SCROLL / VISUAL EFFECTS (rail, reveal, counters, tilt, timeline)
================================================== */
function initScrollEffects() {
  const traceFill = document.querySelector('.trace-fill');
  function updateTrace() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    traceFill.style.height = pct + '%';
  }
  window.addEventListener('scroll', updateTrace, { passive: true });
  updateTrace();

  document.querySelectorAll('.section').forEach((section) => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    obs.observe(section);
  });

  if (!reduceMotion) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.body.style.setProperty('--mx', x + '%');
      document.body.style.setProperty('--my', y + '%');
    }, { passive: true });
  }

  document.querySelectorAll('[data-count]').forEach((el) => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const suffix = el.dataset.suffix || '';
        const duration = reduceMotion ? 0 : 1400;
        const start = performance.now();
        function tick(now) {
          const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = (target * eased).toFixed(decimals) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.6 });
    obs.observe(el);
  });

  document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.level + '%';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(bar);
  });

  const timeline = document.getElementById('timeline');
  if (timeline) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timeline.classList.add('in-draw');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    obs.observe(timeline);
  }

  if (!reduceMotion) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -8;
        const rotateY = ((x / rect.width) - 0.5) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }
}

/* ==================================================
   NEURAL NETWORK CANVAS BACKGROUND (hero)
================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  let width, height, nodes;
  const NODE_COUNT = 46;
  const MAX_DIST = 130;
  const mouse = { x: null, y: null };

  function resize() {
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  }
  function makeNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 1
    }));
  }
  function step() {
    ctx.clearRect(0, 0, width, height);
    nodes.forEach((n) => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / MAX_DIST) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      if (mouse.x !== null) {
        const dx = nodes[i].x - mouse.x, dy = nodes[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / 160) * 0.5})`;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }
    nodes.forEach((n) => {
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(237, 239, 247, 0.75)'; ctx.fill();
    });
    if (!reduceMotion) requestAnimationFrame(step);
  }
  resize(); makeNodes(); step();
  window.addEventListener('resize', () => { resize(); makeNodes(); });
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
}

loadPortfolio();
