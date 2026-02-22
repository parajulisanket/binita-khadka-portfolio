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
    lightbox.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    openAt(index);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
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

  // close when clicking the dark overlay (backdrop)
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      // if click is on overlay/background area (not on image area/buttons)
      if (e.target === lightbox || e.target.classList.contains("bg-black/80")) {
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
