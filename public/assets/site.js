// Shared site behaviour: theme toggle + meteors + email obfuscation
(function () {
  // ---------- 日夜主题切换 ----------
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initial = saved || (prefersLight ? "light" : "dark");
  if (initial === "light") root.setAttribute("data-theme", "light");
  if (btn) {
    btn.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", isLight ? "dark" : "light");
    });
  }

  // ---------- 防爬邮箱 ----------
  const el = document.getElementById("email-link");
  if (el) {
    const addr = el.dataset.user + String.fromCharCode(64) + el.dataset.domain;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "mailto:" + addr;
    });
  }

  // ---------- 流星（仅夜晚）----------
  const sky = document.getElementById("sky");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function isNight() {
    return root.getAttribute("data-theme") !== "light";
  }
  function spawnMeteor() {
    if (!sky) return;
    const m = document.createElement("div");
    m.className = "meteor";
    m.style.top = Math.random() * 45 + "%";
    m.style.left = Math.random() * 80 + "%";
    const dur = 0.8 + Math.random() * 0.8;
    m.style.animation = `shoot ${dur}s linear forwards`;
    sky.appendChild(m);
    setTimeout(() => m.remove(), dur * 1000 + 100);
  }
  if (!reduceMotion && sky) {
    setInterval(() => { if (isNight() && Math.random() > 0.35) spawnMeteor(); }, 2600);
    setTimeout(() => { if (isNight()) spawnMeteor(); }, 1200);
  }
})();
