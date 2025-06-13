// Looping titles
const titles = ["Journalist", "Producer", "Freelancer"];
let i = 0;
function rotateTitle() {
  document.getElementById("title-text").textContent = titles[i];
  i = (i + 1) % titles.length;
}
setInterval(rotateTitle, 2000);

// Hide floating socials near contact
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
// === Load Articles ===
let articleIndex = 0;
const articlesPerPage = 4;

function renderArticles() {
  const container = document.getElementById("articles-container");
  container.innerHTML = "";
  const sorted = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  const current = sorted.slice(articleIndex, articleIndex + articlesPerPage);
  current.forEach(article => {
    const el = document.createElement("a");
    el.href = article.url;
    el.target = "_blank";
    el.className = "article-card";
    el.innerHTML = `
      <img src="${article.image}" alt="${article.title}" />
      <div class="info">
        <p><strong>${article.publication}</strong><br>
        Publication date: ${article.date}</p>
        <h3>${article.title}</h3>
      </div>
    `;
    container.appendChild(el);
  });
}

function nextSlide(section) {
  if (section === "articles") {
    if (articleIndex + articlesPerPage < articles.length) {
      articleIndex += articlesPerPage;
      renderArticles();
    }
  }
}

function prevSlide(section) {
  if (section === "articles") {
    if (articleIndex - articlesPerPage >= 0) {
      articleIndex -= articlesPerPage;
      renderArticles();
    }
  }
}

renderArticles(); // initial call
