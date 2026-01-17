// Simple JavaScript interaction

console.log("Portfolio loaded 🚀");

// Highlight active section (optional)
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("text-primary");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-primary");
    }
  });
});
