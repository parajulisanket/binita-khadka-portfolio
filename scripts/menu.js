(function () {
  const heroNav = document.getElementById("heroNav");
  const navInner = document.getElementById("navInner");

  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  const body = document.body;

  function openMenu() {
    sideMenu.classList.remove("translate-x-full");
    menuOverlay.classList.remove("hidden");

    body.classList.add("overflow-hidden"); // stop background scroll
    body.classList.add("menu-open"); // hamburger animation
    menuBtn.setAttribute("aria-expanded", "true");
    sideMenu.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    sideMenu.classList.add("translate-x-full");
    menuOverlay.classList.add("hidden");

    body.classList.remove("overflow-hidden");
    body.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
    sideMenu.setAttribute("aria-hidden", "true");
  }

  // Toggle
  menuBtn.addEventListener("click", () => {
    const isOpen = !sideMenu.classList.contains("translate-x-full");
    isOpen ? closeMenu() : openMenu();
  });

  // Close actions
  closeBtn.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Close menu when clicking any link inside
  sideMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // ===== Scroll behavior: after ~100vh, white nav =====
  function onScroll() {
    const threshold = window.innerHeight; // ~100vh
    const scrolled = window.scrollY >= threshold;

    if (scrolled) {
      heroNav.classList.add("nav-scrolled");
      // white background + subtle border/shadow
      heroNav.classList.add("bg-white/95", "backdrop-blur", "shadow-sm");
      heroNav.classList.remove("bg-transparent");

      // text becomes dark
      navInner.querySelectorAll("a, span").forEach((el) => {
        el.classList.remove("text-white");
        el.classList.add("text-black");
      });

      // focus ring should look good on white bg
      menuBtn.classList.remove("focus:ring-white/50");
      menuBtn.classList.add("focus:ring-black/20");
    } else {
      heroNav.classList.remove("nav-scrolled");
      heroNav.classList.remove("bg-white/95", "backdrop-blur", "shadow-sm");
      heroNav.classList.add("bg-transparent");

      navInner.querySelectorAll("a, span").forEach((el) => {
        el.classList.remove("text-black");
        el.classList.add("text-white");
      });

      menuBtn.classList.remove("focus:ring-black/20");
      menuBtn.classList.add("focus:ring-white/50");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load
})();
