// Hero looped title
const titles = ["Journalist", "Producer", "Freelancer"];
let titleIndex = 0;
const looped = document.querySelector(".loop-text");

function updateLoopedText() {
  if (!looped) return;

  looped.classList.remove("show");

  setTimeout(() => {
    titleIndex = (titleIndex + 1) % titles.length;
    looped.textContent = titles[titleIndex];
    looped.classList.add("show");
  }, 400);
}

// Show first item immediately
looped.textContent = titles[titleIndex];
looped.classList.add("show");

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

    if (containerId === "collabs-carousel" || containerId === "appearances-carousel") {
      container.innerHTML = items.map(item => `
        <div class="collab-card" onclick="window.open('${item.link}', '_blank')">
  <div class="collab-img-wrapper">
    ${item.cover ? `<img src="${item.cover}" alt="${item.headline}" class="collab-image" />` : ""}
  </div>
  <div class="collab-text">
    <div class="collab-publication">${item.publication}</div>
    <div class="collab-date">${item.date}</div>
    <div class="collab-title">${item.headline}</div>
  </div>
</div>

      `).join("");
      return;
    }

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

async function loadArticles() {
  try {
    const res = await fetch('data/articles.json');
    const articles = await res.json();
    const container = document.getElementById('articles-carousel');
    container.innerHTML = articles.map(article => `
      <div class="collab-card" onclick="window.open('${article.link}', '_blank')">
  <div class="collab-img-wrapper">
    ${article.cover ? `<img src="${article.cover}" alt="${article.headline}" class="collab-image" />` : ""}
  </div>
  <div class="collab-text">
    <div class="collab-publication">${article.publication}</div>
    <div class="collab-date">${article.date}</div>
    <div class="collab-title">${article.headline}</div>
  </div>
</div>
    `).join('');
  } catch (err) {
    console.error('Failed to load articles:', err);
  }
}

async function loadVideos() {
  try {
    const res = await fetch('data/videos.json');
    const videos = await res.json();
    const container = document.getElementById('videos-carousel');
    container.innerHTML = videos.map(video => `
      <div class="collab-card" onclick="window.open('${video.link}', '_blank')">
  <div class="collab-img-wrapper">
    ${video.cover ? `<img src="${video.cover}" alt="${video.headline}" class="collab-image" />` : ""}
  </div>
  <div class="collab-text">
    <div class="collab-publication">${video.publication || 'Video'}</div>
    <div class="collab-date">${video.date || ''}</div>
    <div class="collab-title">${video.headline}</div>
  </div>
</div>
    `).join('');
  } catch (err) {
    console.error('Failed to load videos:', err);
  }
}



// Scroll behavior (desktop only)
window.addEventListener("scroll", () => {
  const menu = document.querySelector(".floating-menu");
  const hero = document.querySelector(".hero");
  const contact = document.getElementById("contact");
  const socialIcons = document.querySelector(".social-icons");

  const heroBottom = hero.getBoundingClientRect().bottom;
  const contactTop = contact.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  // Desktop menu color change
  if (heroBottom < 0) {
    menu.classList.add("scrolled");
  } else {
    menu.classList.remove("scrolled");
  }

  // Fade social icons near contact
  if (contactTop < windowHeight - 100) {
    socialIcons.classList.add("hidden");
  } else {
    socialIcons.classList.remove("hidden");
  }
});
document.querySelectorAll('.carousel-controls').forEach(control => {
  const targetId = control.getAttribute('data-target');
  const carousel = document.getElementById(targetId);
  const leftArrow = control.querySelector('.carousel-arrow.left');
  const rightArrow = control.querySelector('.carousel-arrow.right');
  const progress = control.querySelector('.carousel-progress');

  leftArrow.addEventListener('click', () => {
    carousel.scrollBy({ left: -320, behavior: 'smooth' });
  });

  rightArrow.addEventListener('click', () => {
    carousel.scrollBy({ left: 320, behavior: 'smooth' });
  });

  carousel.addEventListener('scroll', () => {
    const scrollAmount = carousel.scrollLeft;
    const totalScroll = carousel.scrollWidth - carousel.clientWidth;
    const percent = totalScroll > 0 ? (scrollAmount / totalScroll) * 100 : 0;
    progress.style.width = `${percent}%`;
  });
});
