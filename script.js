// Hero looped title
const titles = ["Journalist", "Producer", "Freelancer"];
let titleIndex = 0;
const looped = document.querySelector(".loop-text");

function updateLoopedText() {
  if (!looped) return;

  looped.classList.remove("show");

  setTimeout(() => {
    looped.textContent = titles[titleIndex];
    looped.classList.add("show");
    titleIndex = (titleIndex + 1) % titles.length;
  }, 400); // match CSS transition
}

// Initial show
setTimeout(() => {
  looped.classList.add("show");
}, 100);

// Loop every 2 seconds
setInterval(updateLoopedText, 2000);

document.addEventListener("DOMContentLoaded", () => {
  const showMoreBtn = document.getElementById("show-more");
  const fullBio = document.getElementById("full-bio");

  if (showMoreBtn && fullBio) {
    showMoreBtn.addEventListener("click", () => {
      fullBio.style.display = "block";
      showMoreBtn.style.display = "none";
    });
  }

  loadCarousel("data/articles.json", "articles-carousel");
  loadCarousel("data/collabs.json", "collabs-carousel");
  loadCarousel("data/appearances.json", "appearances-carousel");

  loadArticles();
  loadVideos();
});

// Generic carousel loader
async function loadCarousel(jsonPath, containerId) {
  try {
    const res = await fetch(jsonPath);
    const items = await res.json();
    const container = document.getElementById(containerId);
    if (!container) return;

    // ✅ FIXED COLLABS SECTION RENDERING
    if (containerId === "collabs-carousel" || containerId === "appearances-carousel") {
      container.innerHTML = items.map(item => `
        <div class="collab-card" onclick="window.open('${item.link}', '_blank')">
          <div class="collab-text">
            <div class="collab-publication">${item.publication}</div>
            <div class="collab-date">${item.date}</div>
            <div class="collab-title">${item.headline}</div>
          </div>
          <div class="collab-img-wrapper">
            ${item.cover ? `<img src="${item.cover}" alt="${item.headline}" class="collab-image" />` : ""}
          </div>
        </div>
      `).join("");
      return;
    }
    

    // Default rendering for other carousels (e.g. appearances)
    container.innerHTML = items.map(item => `
      <div class="carousel-item" onclick="window.open('${item.link}', '_blank')">
        ${item.cover ? `<img src="${item.cover}" alt="${item.headline}" />` : ""}
        <div>
          <div style="font-size: 0.85rem; font-family: 'Open Sans', sans-serif; color: #000;">${item.publication || ''}</div>
          <div style="font-size: 0.85rem; font-family: 'Open Sans', sans-serif; color: #888;">${item.date || ''}</div>
          <div style="font-size: 1.25rem; font-family: 'Work Sans', sans-serif;">${item.headline}</div>
        </div>
      </div>
    `).join("");

  } catch (err) {
    console.error(`Failed to load ${jsonPath}:`, err);
  }
}

// Load Articles
async function loadArticles() {
  try {
    const res = await fetch('data/articles.json');
    const articles = await res.json();
    const container = document.getElementById('articles-container');
    container.innerHTML = '';

    articles.forEach((article, index) => {
      const isImageLeft = index % 2 === 0;
      const card = document.createElement('a');
      card.href = article.link;
      card.target = "_blank";
      card.className = `article-card ${isImageLeft ? 'left' : 'right'}`;
      card.innerHTML = `
        ${isImageLeft ? `
          <img src="${article.cover}" class="article-img" alt="${article.headline}" />
          <div class="article-text">
            <h3>${article.publication}</h3>
            <p class="article-date">${article.date}</p>
            <h4>${article.headline}</h4>
          </div>
        ` : `
          <div class="article-text">
            <h3>${article.publication}</h3>
            <p class="article-date">${article.date}</p>
            <h4>${article.headline}</h4>
          </div>
          <img src="${article.cover}" class="article-img" alt="${article.headline}" />
        `}
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load articles:', err);
  }
}

// Load Videos
async function loadVideos() {
  try {
    const res = await fetch('data/videos.json');
    const videos = await res.json();
    const container = document.getElementById('videos-container');
    if (!container) return;
    container.innerHTML = '';

    videos.forEach((video, index) => {
      const isImageLeft = index % 2 === 0;
      const card = document.createElement('a');
      card.href = video.link;
      card.target = "_blank";
      card.className = `article-card ${isImageLeft ? 'left' : 'right'}`;
      card.innerHTML = `
        ${isImageLeft ? `
          <img src="${video.cover}" class="article-img" alt="${video.headline}" />
          <div class="article-text">
            <h3>${video.publication || 'Video'}</h3>
            <p class="article-date">${video.date || ''}</p>
            <h4>${video.headline}</h4>
          </div>
        ` : `
          <div class="article-text">
            <h3>${video.publication || 'Video'}</h3>
            <p class="article-date">${video.date || ''}</p>
            <h4>${video.headline}</h4>
          </div>
          <img src="${video.cover}" class="article-img" alt="${video.headline}" />
        `}
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load videos:', err);
  }
}
window.addEventListener("scroll", () => {
  const menu = document.querySelector(".floating-menu");
  const hero = document.querySelector(".hero");
  const contact = document.getElementById("contact");
  const socialIcons = document.querySelector(".social-icons");

  const heroBottom = hero.getBoundingClientRect().bottom;
  const contactTop = contact.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  // Switch menu from top to right vertical after hero
  if (heroBottom < 0) {
    menu.classList.add("right-floating-menu");
  } else {
    menu.classList.remove("right-floating-menu");
  }

  // Fade out social icons near contact
  if (contactTop < windowHeight - 100) {
    socialIcons.classList.add("hidden");
  } else {
    socialIcons.classList.remove("hidden");
  }
});
window.addEventListener("scroll", () => {
  const menu = document.querySelector(".floating-menu");
  const hero = document.querySelector(".hero");

  if (hero.getBoundingClientRect().bottom < 0) {
    menu.classList.add("scrolled");
  } else {
    menu.classList.remove("scrolled");
  }
});

