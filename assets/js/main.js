(() => {
  const cfg = window.CC_CONFIG || {};

  /* ---------- Enlaces de contacto (se ocultan si falta el dato) ---------- */
  const wa = (text) => `https://wa.me/${cfg.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
  document.querySelectorAll("[data-whatsapp]").forEach((a) => {
    if (!cfg.whatsapp) return a.remove();
    a.href = wa(a.dataset.whatsapp);
    a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-email]").forEach((a) => {
    if (!cfg.email) return a.remove();
    a.href = "mailto:" + cfg.email;
    const t = a.querySelector("[data-email-text]");
    if (t) t.textContent = cfg.email;
  });
  document.querySelectorAll("[data-instagram]").forEach((a) => {
    if (!cfg.instagram) return a.remove();
    a.href = cfg.instagram; a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-github]").forEach((a) => {
    if (!cfg.github) return a.remove();
    a.href = "https://github.com/" + cfg.github; a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-linkedin]").forEach((a) => {
    if (!cfg.linkedin) return a.remove();
    a.href = cfg.linkedin; a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-year]").forEach((s) => (s.textContent = new Date().getFullYear()));

  /* ---------- Header y menú móvil ---------- */
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", nav.classList.toggle("is-open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false");
  }));

  /* ---------- Animación al hacer scroll ---------- */
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  }), { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------- Terminal del hero (se escribe sola) ---------- */
  const term = document.getElementById("terminal");
  if (term) {
    const lines = [
      '<span class="t-c">// ¿Qué necesita tu negocio?</span>',
      '<span class="t-k">const</span> proyecto = {',
      '  cliente: <span class="t-s">"tu negocio"</span>,',
      '  pais: <span class="t-s">"cualquiera 🌎"</span>,',
      '  necesita: [<span class="t-s">"web"</span>, <span class="t-s">"tienda"</span>, <span class="t-s">"sistema"</span>],',
      '};',
      '',
      '<span class="t-p">carloscode</span>.<span class="t-n">construir</span>(proyecto);',
      '<span class="t-c">// ✓ diseño  ✓ desarrollo  ✓ publicación</span>',
      '<span class="t-c">// ✓ soporte después de entregar</span>'
    ];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      term.innerHTML = lines.map((l) => `<div class="t-line">${l}</div>`).join("") + '<span class="t-cursor"></span>';
    } else {
      let i = 0;
      const cursor = '<span class="t-cursor"></span>';
      const tick = () => {
        i++;
        term.innerHTML = lines.slice(0, i).map((l) => `<div class="t-line">${l}</div>`).join("") + cursor;
        if (i < lines.length) setTimeout(tick, 260);
      };
      setTimeout(tick, 500);
    }
  }
})();
