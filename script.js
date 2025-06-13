// === TITLE LOOP ===
const titles = ["Journalist", "Producer", "Freelancer"];
let i = 0;
function rotateTitle() {
  document.getElementById("title-text").textContent = titles[i];
  i = (i + 1) % titles.length;
}
setInterval(rotateTitle, 2000);

// === HIDE FLOATING SOCIALS NEAR CONTACT ===
window.addEventListener("scroll", () => {
  const socials = document.querySelector(".socials");
  const contact = document.querySelector("#contact");
  if (!contact) return;
  const contactTop = contact.getBoundingClientRect().top;
  if (contactTop < window.innerHeight * 0.6) {
    socials.style.display = "none";
  } else {
    socials.style.display = "flex";
  }
});

// === ARTICLE SLIDER ===
let articleIndex = 0;
const articlesPerPage = 4;
function renderArticles() {
  const container = document.getElementById("articles-container");
  container.innerHTML = "";
  const sorted = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  const current = sorted.slice(articleIndex, articleIndex + articlesPerPage);
  current.forEach(item => {
    const el = document.createElement("a");
    el.href = item.url;
    el.target = "_blank";
    el.className = "article-card";
    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="info">
        <p><strong>${item.publication}</strong><br>${item.date}</p>
        <h3>${item.title}</h3>
      </div>`;
    container.appendChild(el);
  });
}

// === VIDEO SLIDER ===
let videoIndex = 0;
const videosPerPage = 4;
function renderVideos() {
  const container = document.getElementById("videos-container");
  container.innerHTML = "";
  const sorted = videos.sort((a, b) => new Date(b.date) - new Date(a.date));
  const current = sorted.slice(videoIndex, videoIndex + videosPerPage);
  current.forEach(item => {
    const el = document.createElement("a");
    el.href = item.url;
    el.target = "_blank";
    el.className = "video-card";
    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="info">
        <p><strong>${item.publication}</strong><br>${item.date}</p>
        <h3>${item.title}</h3>
      </div>`;
    container.appendChild(el);
  });
}

// === COLLAB SLIDER ===
let collabIndex = 0;
const collabsPerPage = 4;
function renderCollabs() {
  const container = document.getElementById("collabs-container");
  container.innerHTML = "";
  const sorted = collabs.sort((a, b) => new Date(b.date) - new Date(a.date));
  const current = sorted.slice(collabIndex, collabIndex + collabsPerPage);
  current.forEach(item => {
    const el = document.createElement("a");
    el.href = item.url;
    el.target = "_blank";
    el.className = "collab-card";
    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="info">
        <p><strong>${item.publication}</strong><br>${item.date}</p>
        <h3>${item.title}</h3>
      </div>`;
    container.appendChild(el);
  });
}

// === APPEARANCES STATIC ===
function renderAppearances() {
  const container = document.getElementById("appearances-container");
  container.innerHTML = "";
  appearances.forEach(item => {
    const el = document.createElement("div");
    el.className = "appearance-card";
    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="info">
        <h3>${item.title}</h3>
      </div>`;
    container.appendChild(el);
  });
}

// === SLIDER CONTROLS ===
function nextSlide(section) {
  if (section === "articles" && articleIndex + articlesPerPage < articles.length) {
    articleIndex += articlesPerPage;
    renderArticles();
  }
  if (section === "videos" && videoIndex + videosPerPage < videos.length) {
    videoIndex += videosPerPage;
    renderVideos();
  }
  if (section === "collabs" && collabIndex + collabsPerPage < collabs.length) {
    collabIndex += collabsPerPage;
    renderCollabs();
  }
}

function prevSlide(section) {
  if (section === "articles" && articleIndex - articlesPerPage >= 0) {
    articleIndex -= articlesPerPage;
    renderArticles();
  }
  if (section === "videos" && videoIndex - videosPerPage >= 0) {
    videoIndex -= videosPerPage;
    renderVideos();
  }
  if (section === "collabs" && collabIndex - collabsPerPage >= 0) {
    collabIndex -= collabsPerPage;
    renderCollabs();
  }
}

// === ABOUT TOGGLE ===
document.getElementById("toggle-bio").addEventListener("click", () => {
  const full = document.getElementById("bio-full");
  const btn = document.getElementById("toggle-bio");
  if (full.style.display === "none") {
    full.style.display = "block";
    btn.textContent = "Show Less";
  } else {
    full.style.display = "none";
    btn.textContent = "Show More";
  }
});

// === INITIAL LOAD ===
renderArticles();
renderVideos();
renderCollabs();
renderAppearances();
