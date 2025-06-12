const titles = ["Journalist", "Producer", "Freelancer"];
let i = 0;

function rotateTitle() {
  const titleElement = document.getElementById("title-text");
  titleElement.textContent = titles[i];
  i = (i + 1) % titles.length;
}

setInterval(rotateTitle, 2000);
