document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => observer.observe(el));
});

// scroll down mouse
document.getElementById("scrollDownBtn").addEventListener("click", function () {
  const nextSection = document.querySelector("#about");

  if (nextSection) {
    nextSection.scrollIntoView({
      behavior: "smooth",
    });
  }
});
