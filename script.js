// Rotating title
const titles = ["Journalist", "Producer", "Freelancer"];
let i = 0;

function rotateTitle() {
  document.getElementById("title-text").textContent = titles[i];
  i = (i + 1) % titles.length;
}
setInterval(rotateTitle, 2000);

// Hide floating icons near contact section
window.addEventListener("scroll", () => {
  const socials = document.querySelector(".socials");
  const contact = document.querySelector("#contact");
  const contactTop = contact.getBoundingClientRect().top;

  if (contactTop < window.innerHeight * 0.6) {
    socials.style.display = "none";
  } else {
    socials.style.display = "flex";
  }
});
