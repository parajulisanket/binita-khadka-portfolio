(function () {
  const track = document.getElementById("blogTrack");
  const prev = document.getElementById("blogPrev");
  const next = document.getElementById("blogNext");

  if (!track || !prev || !next) return;

  function step() {
    const card = track.querySelector("article");
    if (!card) return 340;

    const gap = parseFloat(getComputedStyle(track).gap || "16");
    const w = card.getBoundingClientRect().width;
    return w + gap;
  }

  next.addEventListener("click", () => {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });
})();
