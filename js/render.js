fetch("data/content.json")
  .then(res => res.json())
  .then(data => {

    // Site
    document.getElementById("site-title").textContent = data.site.title;
    document.getElementById("footer-text").textContent = data.site.footer;

    // Navigation
    const nav = document.getElementById("nav-menu");
    data.navigation.forEach(item => {
      nav.innerHTML += `
        <li>
          <a href="${item.href}" class="hover:text-primary">${item.label}</a>
        </li>
      `;
    });

    // Hero
    document.getElementById("hero-title").textContent = data.hero.title;
    document.getElementById("hero-subtitle").innerHTML = data.hero.subtitle.replace(/\n/g, "<br>");
    document.getElementById("hero-tagline").textContent = data.hero.tagline;

    // About
    document.getElementById("about-text").textContent = data.about.text;

    // Journey
    const journey = document.getElementById("journey-list");
    data.journey.forEach(stage => {
      journey.innerHTML += `
        <div class="bg-surface p-8 rounded-xl border-l-4 border-primary">
          <h3 class="text-xl font-bold text-primary">${stage.year}</h3>
          <ul class="list-disc list-inside mt-2">
            ${stage.items.map(i => `<li>${i}</li>`).join("")}
          </ul>
        </div>
      `;
    });

    // Projects
    const projects = document.getElementById("project-list");
    data.projects.forEach(p => {
      projects.innerHTML += `
        <div class="bg-background p-8 rounded-xl">
          <h3 class="font-bold text-lg">${p.title}</h3>
          <p class="mt-2 text-gray-700">${p.description}</p>
          <a href="${p.link}" class="inline-block mt-4 text-primary font-semibold">
            View Details →
          </a>
        </div>
      `;
    });

    // Contact
    document.getElementById("contact-text").textContent = data.contact.text;
    const links = document.getElementById("contact-links");
    data.contact.links.forEach(l => {
      links.innerHTML += `
        <a href="${l.url}" target="_blank" class="hover:text-primary transition">
          ${l.label}
        </a>
      `;
    });

  })
  .catch(err => console.error("Failed to load content:", err));
