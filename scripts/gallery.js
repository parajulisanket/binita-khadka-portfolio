document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const items = Array.from(grid.querySelectorAll("button[data-full]"));

  const lightbox = document.getElementById("lightbox");
  const imgEl = document.getElementById("lightboxImg");
  const captionEl = document.getElementById("lightboxCaption");
  const countEl = document.getElementById("lightboxCount");
  const thumbsEl = document.getElementById("lightboxThumbs");

  const btnClose = document.getElementById("lightboxClose");
  const btnPrev = document.getElementById("lightboxPrev");
  const btnNext = document.getElementById("lightboxNext");

  let current = 0;

  // Helper utility to find your website's main navigation container framework safely
  function getHeaderElement() {
    return (
      document.querySelector("header") ||
      document.querySelector("nav") ||
      document.querySelector(".fixed.top-0") ||
      document.querySelector(".sticky.top-0")
    );
  }

  function renderThumbs() {
    if (!thumbsEl) return;
    thumbsEl.innerHTML = "";

    items.forEach((btn, idx) => {
      const src = btn.querySelector("img")?.getAttribute("src");
      if (!src) return;

      const thumb = document.createElement("button");
      thumb.type = "button";
      thumb.className =
        "shrink-0 border rounded overflow-hidden " +
        (idx === current
          ? "border-white"
          : "border-white/30 hover:border-white/70");

      thumb.innerHTML = `<img src="${src}" alt="" class="h-12 w-20 object-cover">`;
      thumb.addEventListener("click", (e) => {
        e.stopPropagation();
        openAt(idx);
      });

      thumbsEl.appendChild(thumb);
    });
  }

  function openAt(index) {
    current = index;
    const btn = items[current];

    const full = btn.dataset.full || btn.querySelector("img")?.src || "";
    const cap = btn.dataset.caption || "";

    if (imgEl) {
      imgEl.src = full;
      imgEl.alt = btn.querySelector("img")?.alt || "Gallery image";
    }
    if (captionEl) captionEl.textContent = cap;

    // guard: only set if element exists
    if (countEl) countEl.textContent = `${current + 1} / ${items.length}`;

    renderThumbs();
  }

  function openLightbox(index) {
    if (!lightbox) return;

    // 1. Force the lightbox container to sit on the maximum layout layer possible
    lightbox.style.zIndex = "99999";
    lightbox.classList.remove("hidden");

    // 2. Lock underlying page scrollbars
    document.body.classList.add("overflow-hidden");

    // 3. Temporarily hide the top navigation bar so it cannot peak above the black overlay
    const header = getHeaderElement();
    if (header) {
      header.style.visibility = "hidden";
      header.style.opacity = "0";
      header.style.transition = "opacity 0.2s ease, visibility 0.2s ease";
    }

    openAt(index);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");

    // Restore the top navigation bar container layer back to visible action space
    const header = getHeaderElement();
    if (header) {
      header.style.visibility = "";
      header.style.opacity = "";
    }

    if (imgEl) imgEl.src = "";
  }

  function next() {
    openAt((current + 1) % items.length);
  }

  function prev() {
    openAt((current - 1 + items.length) % items.length);
  }

  // open on click
  items.forEach((btn, idx) => {
    btn.addEventListener("click", () => openLightbox(idx));
  });

  // controls
  if (btnClose)
    btnClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  if (btnNext)
    btnNext.addEventListener("click", (e) => {
      e.stopPropagation();
      next();
    });
  if (btnPrev)
    btnPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      prev();
    });

  // close when clicking the dark overlay
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      // Get the image element and thumbnail container to protect them from closing the modal
      const isClickInsideContent =
        imgEl?.contains(e.target) || thumbsEl?.contains(e.target);

      // If the click is NOT on the image/thumbnails, and NOT on the arrow buttons, close it
      if (
        !isClickInsideContent &&
        !btnNext?.contains(e.target) &&
        !btnPrev?.contains(e.target)
      ) {
        closeLightbox();
      }
    });
  }

  // keyboard support
  document.addEventListener("keydown", (e) => {
    if (!lightbox || lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
});
