(function () {
  const heroNav = document.getElementById("heroNav");
  const navInner = document.getElementById("navInner");

  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  const year = document.getElementById("year");
  const body = document.body;

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  function openMenu() {
    if (!sideMenu || !menuOverlay || !menuBtn) return;

    sideMenu.classList.remove("translate-x-full");
    menuOverlay.classList.remove("hidden");

    body.classList.add("overflow-hidden", "menu-open");

    menuBtn.setAttribute("aria-expanded", "true");
    sideMenu.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    if (!sideMenu || !menuOverlay || !menuBtn) return;

    sideMenu.classList.add("translate-x-full");
    menuOverlay.classList.add("hidden");

    body.classList.remove("overflow-hidden", "menu-open");

    menuBtn.setAttribute("aria-expanded", "false");
    sideMenu.setAttribute("aria-hidden", "true");
  }

  function handleNavbarScroll() {
    if (!heroNav || !navInner) return;

    if (window.scrollY > 60) {
      heroNav.classList.add("nav-scrolled");

      navInner.classList.remove("py-5");
      navInner.classList.add("py-3");
    } else {
      heroNav.classList.remove("nav-scrolled");

      navInner.classList.remove("py-3");
      navInner.classList.add("py-5");
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      if (!sideMenu) return;

      const isOpen = !sideMenu.classList.contains("translate-x-full");
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  if (sideMenu) {
    sideMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  window.addEventListener("scroll", handleNavbarScroll);
  window.addEventListener("resize", handleNavbarScroll);

  handleNavbarScroll();
})();
