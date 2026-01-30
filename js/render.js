fetch("data/content.json")
  .then(res => res.json())
  .then(data => {

    /* ======================
       SITE
    ====================== */
    document.getElementById("site-title").textContent = data.site.title;
    document.getElementById("footer-text").textContent = data.site.footer;

    /* ======================
       NAVIGATION
    ====================== */
    const nav = document.getElementById("nav-menu");
    nav.innerHTML = ""; // clear before render

    data.navigation.forEach(item => {
      nav.innerHTML += `
        <li>
          <a href="${item.href}" class="hover:text-primary transition">
            ${item.label}
          </a>
        </li>
      `;
    });

    /* ======================
       HERO
    ====================== */
    document.getElementById("hero-title").textContent = data.hero.title;
    // document.getElementById("hero-subtitle").innerHTML =
    // data.hero.subtitle.replace(/\n/g, "<br>");
    // document.getElementById("hero-tagline").textContent = data.hero.tagline;


    /* ======================
       ABOUT
    ====================== */
    document.getElementById("about-text").textContent = data.about.text;

    /* ======================
    JOURNEY (ANIMATED CAROUSEL)
    ====================== */
    const journeyData = data.journey;
    let current = 0;
    let isAnimating = false;

    const leftBox = document.getElementById("journey-left");
    const centerBox = document.getElementById("journey-center");
    const rightBox = document.getElementById("journey-right");

    const titleEl = document.getElementById("journey-title");
    const shortEl = document.getElementById("journey-short");

    const prevBtn = document.getElementById("journey-prev");
    const nextBtn = document.getElementById("journey-next");

    function setContent() {
      const prev = (current - 1 + journeyData.length) % journeyData.length;
      const next = (current + 1) % journeyData.length;

      leftBox.querySelector("img").src = journeyData[prev].image;
      centerBox.querySelector("img").src = journeyData[current].image;
      rightBox.querySelector("img").src = journeyData[next].image;

      // HANYA TITLE, TANPA YEAR
      titleEl.textContent = journeyData[current].title;
      shortEl.textContent = journeyData[current].short;
    }


function slide(direction) {
  if (isAnimating) return;
  isAnimating = true;

  // JARAK LEBIH PENDEK
  const offset = direction === "next" ? "-40%" : "40%";

  // Animate out
  centerBox.style.transform = `translateX(${offset}) scale(0.96)`;
  centerBox.style.opacity = "0";

  setTimeout(() => {
    // Update index
    current =
      direction === "next"
        ? (current + 1) % journeyData.length
        : (current - 1 + journeyData.length) % journeyData.length;

    // Reset position (dekat, bukan jauh)
    centerBox.style.transition = "none";
    centerBox.style.transform =
      `translateX(${direction === "next" ? "40%" : "-40%"}) scale(0.96)`;
    centerBox.style.opacity = "0";

    setContent();

    // Force reflow
    centerBox.offsetHeight;

    // Animate back to center
    centerBox.style.transition = "all 0.45s ease";
    centerBox.style.transform = "translateX(0) scale(1)";
    centerBox.style.opacity = "1";

    isAnimating = false;
  }, 300);
}


    // Init
    setContent();

    /* ======================
    AUTO SLIDE (4s)
    ====================== */
    let autoSlideTimer = null;

    function startAutoSlide() {
    stopAutoSlide(); // prevent duplicate timer
    autoSlideTimer = setInterval(() => {
        slide("next");
    }, 4000);
    }

    function stopAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }
    }

    /* ======================
    CONTROLS (MANUAL)
    ====================== */
    nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    slide("next");
    startAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    slide("prev");
    startAutoSlide();
    });

    /* ======================
    INIT
    ====================== */
    startAutoSlide();





    /* ======================
       PROJECTS
    ====================== */
    const projectList = document.getElementById("project-list");

    data.projects.forEach(project => {
      const card = document.createElement("a");
      card.href = project.link;
      card.className = `
        bg-background rounded-2xl shadow-md overflow-hidden
        hover:shadow-xl hover:-translate-y-1 transition
      `;

      card.innerHTML = `
        <img
          src="${project.image}"
          alt="${project.title}"
          class="w-full h-48 object-cover">

        <div class="p-6 space-y-2">
          <h3 class="text-xl font-bold">${project.title}</h3>
          <p class="text-gray-700 text-sm">
            ${project.description}
          </p>
        </div>
      `;

      projectList.appendChild(card);
    });


    /* ======================
       CONTACT
    ====================== */
    document.getElementById("contact-text").textContent = data.contact.text;

    const links = document.getElementById("contact-links");
    links.innerHTML = ""; // clear before render

    data.contact.links.forEach(l => {
      links.innerHTML += `
        <a href="${l.url}"
           target="_blank"
           class="hover:text-primary transition">
          ${l.label}
        </a>
      `;
    });

  })
  .catch(err => {
    console.error("Failed to load content:", err);
  });
