/* ==========================================================================
   Logique du site — normalement tu n'as pas besoin de modifier ce fichier.
   Tout le contenu vient de js/data.js
   ========================================================================== */
(() => {
  const D = PORTFOLIO;
  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Profil ---------- */
  const p = D.profil;
  const fullName = `${p.prenom} ${p.nom}`;
  $("#heroName").innerHTML = `${esc(p.prenom)} <span class="gradient-text">${esc(p.nom)}</span>`;
  $("#heroPitch").textContent = p.accroche;
  $("#footerName").textContent = fullName;
  $("#year").textContent = new Date().getFullYear();
  const initials = (p.prenom[0] + p.nom[0]).toUpperCase();
  $("#navLogo").textContent = initials;
  $("#avatar").innerHTML = p.photo
    ? `<img src="${esc(p.photo)}" alt="Photo de ${esc(fullName)}" />`
    : `<div><span class="gradient-text">${initials}</span></div>`;

  /* ---------- Texte qui s'écrit tout seul ---------- */
  const typed = $("#typed");
  let ti = 0, ci = 0, deleting = false;
  (function type() {
    const word = D.profil.titres[ti];
    typed.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) ci++;
    else if (deleting && ci > 0) ci--;
    else if (!deleting) { deleting = true; return setTimeout(type, 1800); }
    else { deleting = false; ti = (ti + 1) % D.profil.titres.length; }
    setTimeout(type, deleting ? 40 : 85);
  })();

  /* ---------- À propos ---------- */
  D.aPropos.forEach((t) => $("#aboutText").appendChild(el("p", "", esc(t))));
  D.chiffres.forEach((c) => {
    const s = el("div", "stat card");
    s.innerHTML = `<div class="stat__num gradient-text" data-count="${c.valeur}" data-suffix="${esc(c.suffixe)}">0</div>
                   <div class="stat__label">${esc(c.label)}</div>`;
    $("#stats").appendChild(s);
  });
  D.qualites.forEach((q) => $("#qualites").appendChild(el("span", "chip", esc(q))));
  D.interets.forEach((q) => $("#interets").appendChild(el("span", "chip", esc(q))));

  /* ---------- Parcours ---------- */
  D.parcours.forEach((e) => {
    const it = el("article", "tl-item card reveal");
    it.dataset.icon = e.type === "formation" ? "🎓" : "💼";
    it.innerHTML = `<div class="tl-item__period">${esc(e.periode)}</div>
      <h3>${esc(e.titre)}</h3>
      <div class="tl-item__place">${esc(e.lieu)}</div>
      <p>${esc(e.description)}</p>`;
    $("#timeline").appendChild(it);
  });

  /* ---------- Projets + barre de filtres ---------- */
  const bar = $("#filterBar");
  const pill = $("#filterPill");
  const grid = $("#projects");
  let currentCat = "Tous";
  let query = "";

  const cats = ["Tous", ...D.categories];
  cats.forEach((cat) => {
    const n = cat === "Tous" ? D.projets.length : D.projets.filter((pr) => pr.categorie === cat).length;
    const b = el("button", "filter-btn" + (cat === "Tous" ? " active" : ""), `${esc(cat)}<small>${n}</small>`);
    b.dataset.cat = cat;
    b.setAttribute("role", "tab");
    b.addEventListener("click", () => {
      currentCat = cat;
      bar.querySelectorAll(".filter-btn").forEach((x) => x.classList.toggle("active", x === b));
      movePill(b);
      renderProjects();
    });
    bar.appendChild(b);
  });

  function movePill(btn) {
    pill.style.left = btn.offsetLeft + "px";
    pill.style.width = btn.offsetWidth + "px";
  }
  window.addEventListener("resize", () => movePill(bar.querySelector(".filter-btn.active")));
  document.fonts.ready.then(() => movePill(bar.querySelector(".filter-btn.active")));

  $("#search").addEventListener("input", (e) => {
    query = e.target.value.trim().toLowerCase();
    renderProjects();
  });

  const sorted = [...D.projets].sort((a, b) => b.annee - a.annee);

  function renderProjects() {
    const list = sorted.filter((pr) => {
      const okCat = currentCat === "Tous" || pr.categorie === currentCat;
      const hay = [pr.titre, pr.resume, pr.description, ...(pr.competences || [])].join(" ").toLowerCase();
      return okCat && (!query || hay.includes(query));
    });
    grid.innerHTML = "";
    $("#projectsCount").textContent = `${list.length} projet${list.length > 1 ? "s" : ""} affiché${list.length > 1 ? "s" : ""}`;
    if (!list.length) {
      grid.appendChild(el("p", "empty", "Aucun projet ne correspond à ta recherche 🤔"));
      return;
    }
    list.forEach((pr, i) => {
      const c = el("article", "project card animate-in");
      c.style.animationDelay = i * 70 + "ms";
      c.innerHTML = `
        <div class="project__top">
          <div class="project__emoji">${esc(pr.emoji || "✦")}</div>
          <div class="project__meta"><span class="project__cat">${esc(pr.categorie)}</span><br>${esc(pr.annee)}</div>
        </div>
        <h3>${esc(pr.titre)}</h3>
        <p>${esc(pr.resume)}</p>
        <div class="tags">${(pr.competences || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        <span class="project__more">En savoir plus</span>`;
      c.addEventListener("click", () => openModal(pr));
      addTilt(c);
      grid.appendChild(c);
    });
  }
  renderProjects();

  /* Effet 3D au survol des cartes */
  function addTilt(card) {
    if (matchMedia("(hover: none)").matches) return;
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  }

  /* ---------- Fenêtre de détail ---------- */
  const modal = $("#modal");
  function openModal(pr) {
    $("#modalContent").innerHTML = `
      <div class="project__emoji">${esc(pr.emoji || "✦")}</div>
      <h3>${esc(pr.titre)}</h3>
      <div class="project__meta" style="text-align:left"><span class="project__cat">${esc(pr.categorie)}</span> · ${esc(pr.annee)}</div>
      <p>${esc(pr.description)}</p>
      <div class="tags">${(pr.competences || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      ${pr.lien ? `<p><a class="btn btn--primary" href="${esc(pr.lien)}" target="_blank" rel="noopener">Voir le projet</a></p>` : ""}`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  modal.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());

  /* ---------- Compétences ---------- */
  D.competences.forEach((g) => {
    const box = el("div", "skill-group card reveal");
    box.innerHTML = `<h3>${esc(g.groupe)}</h3>` + g.items.map((s) => `
      <div class="skill">
        <div class="skill__head"><span>${esc(s.nom)}</span><span>${s.niveau}%</span></div>
        <div class="skill__bar"><div class="skill__fill" data-level="${s.niveau}"></div></div>
      </div>`).join("");
    $("#skills").appendChild(box);
  });

  /* ---------- Contact ---------- */
  const links = [
    p.email && { label: "✉️ Email", href: `mailto:${p.email}`, primary: true },
    p.linkedin && { label: "in LinkedIn", href: p.linkedin },
    p.github && { label: "⌘ GitHub", href: p.github },
    p.cv && { label: "📄 Télécharger mon CV", href: p.cv },
  ].filter(Boolean);
  links.forEach((l) => {
    const a = el("a", "btn " + (l.primary ? "btn--primary" : "btn--ghost"), esc(l.label));
    a.href = l.href;
    if (!l.href.startsWith("mailto")) { a.target = "_blank"; a.rel = "noopener"; }
    $("#contactLinks").appendChild(a);
  });

  /* ---------- Animations au défilement ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const t = en.target;
      t.classList.add("visible");
      t.querySelectorAll(".skill__fill").forEach((f) => (f.style.width = f.dataset.level + "%"));
      t.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(t);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((r, i) => {
    if (r.closest(".hero")) r.style.transitionDelay = i * 120 + "ms";
    io.observe(r);
  });

  function countUp(node) {
    const target = +node.dataset.count, suffix = node.dataset.suffix || "";
    const start = performance.now(), dur = 1500;
    (function step(now) {
      const k = Math.min((now - start) / dur, 1);
      node.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suffix;
      if (k < 1) requestAnimationFrame(step);
    })(start);
  }

  /* ---------- Navigation, progression, halo ---------- */
  const nav = $("#nav");
  const navLinks = document.querySelectorAll(".nav__links a");
  const sections = [...document.querySelectorAll("main section")];
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    $("#scrollProgress").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
    nav.classList.toggle("scrolled", h.scrollTop > 30);
    const cur = sections.filter((s) => s.getBoundingClientRect().top < 150).pop();
    navLinks.forEach((a) => a.classList.toggle("active", cur && a.getAttribute("href") === "#" + cur.id));
  }, { passive: true });

  const glow = $("#cursorGlow");
  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });

  $("#burger").addEventListener("click", () => $("#navLinks").classList.toggle("open"));
  navLinks.forEach((a) => a.addEventListener("click", () => $("#navLinks").classList.remove("open")));

  /* ---------- Thème clair / sombre ---------- */
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved) root.dataset.theme = saved;
  $("#themeToggle").addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();
