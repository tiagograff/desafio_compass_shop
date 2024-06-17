const cardTemplates = [
  `   <div class="card" data-price="2500000" data-name="Syltherine">
      <div class="card-image">
        <img class="card-image-img" src="./img/image 1.svg" />
        <span class="card-image-discount">-30%</span>
      </div>
      <div class="card-text">
        <h3 class="card-text-title">Syltherine</h3>
        <p class="card-text-paragraph">Stylish cafe chair</p>
        <div class="card-price">
          <span class="card-price-discount">Rp 2.500.000</span>
          <span class="card-price-total">Rp 3.500.000</span>
        </div>
      </div>
    </div>`,
  `   <div class="card" data-price="2500000" data-name="Leviosa">
      <div class="card-image">
        <img class="card-image-img" src="./img/image 2.svg" />
      </div>
      <div class="card-text">
        <h3 class="card-text-title">Leviosa</h3>
        <p class="card-text-paragraph">Stylish cafe chair</p>
        <div class="card-price">
          <span class="card-price-discount">Rp 2.500.000</span>
        </div>
      </div>
    </div>`,
  `   <div class="card" data-price="7000000" data-name="Lolito">
      <div class="card-image">
        <img class="card-image-img" src="./img/image 3.svg" />
        <span class="card-image-discount">-50%</span>
      </div>
      <div class="card-text">
        <h3 class="card-text-title">Lolito</h3>
        <p class="card-text-paragraph">Luxury big sofa</p>
        <div class="card-price">
          <span class="card-price-discount">Rp 7.000.000</span>
          <span class="card-price-total">Rp 14.000.000</span>
        </div>
      </div>
    </div>`,
  `   <div class="card" data-price="500000" data-name="Respira">
      <div class="card-image">
        <img class="card-image-img" src="./img/image 4.svg" />
        <span class="card-image-new">new</span>
      </div>
      <div class="card-text">
        <h3 class="card-text-title">Respira</h3>
        <p class="card-text-paragraph">Outdoor bar table and stool</p>
        <div class="card-price">
          <span class="card-price-discount">Rp 500.000</span>
        </div>
      </div>
    </div>`,
];

function newCard(index) {
  const card = document.createElement("div");
  card.classList.add("card");

  const template = cardTemplates[index % cardTemplates.length];
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = template;

  const name = extractName(template);
  card.classList.add(`group-${name}`);

  card.innerHTML = template;
  return card;
}

let currentPage = 1;
const totalItems = cardTemplates.length * 8;
let itemsPerPage = 16;

const cardContent = document.getElementById("card-id");
const pageIndicator = document.getElementById("page-indicator");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const paragraphFilter = document.getElementById("paragraph-filter-show");
const filterSort = document.querySelector(".filter-sort");

function updateCards() {
  const show = parseInt(document.getElementById("display-button").value, 10);

  cardContent.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  for (let i = start; i < end && i < totalItems; i++) {
    const templateIndex = i % cardTemplates.length;
    const card = newCard(templateIndex);
    cardContent.appendChild(card);
  }

  pageIndicator.textContent = `Page ${currentPage}`;

  const startDisplay = start + 1;
  const endDisplay = Math.min(end, totalItems);
  paragraphFilter.textContent = `Showing ${startDisplay}-${endDisplay} of ${totalItems} results`;
  paragraphFilter.style.color = "var(--color-black)";

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = end >= totalItems;

  if (show <= 0) {
    paragraphFilter.textContent = "Incorrect value";
    paragraphFilter.style.color = "red";
    prevButton.disabled = true;
    nextButton.disabled = true;
  } else if (isNaN(show)) {
    paragraphFilter.textContent = "This is a letter";
    paragraphFilter.style.color = "red";
    prevButton.disabled = true;
    nextButton.disabled = true;
  } else {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }
}

document.getElementById("filter-button").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector(".filter-sort").classList.toggle("show");
});

function generateCards() {
  itemsPerPage = parseInt(document.getElementById("display-button").value, 10);

  if (itemsPerPage <= 0) {
  } else {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }
  currentPage = 1;
  updateCards();
}

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateCards();
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage * itemsPerPage < totalItems) {
    currentPage++;
    updateCards();
  }
});

document
  .getElementById("submit-show-button")
  .addEventListener("click", (event) => {
    event.preventDefault();
    generateCards();
  });

function sortCards(sortBy) {
  if (sortBy === "price-low-high") {
    cardTemplates.sort((a, b) => extractPrice(a) - extractPrice(b));
  } else if (sortBy === "price-high-low") {
    cardTemplates.sort((a, b) => extractPrice(b) - extractPrice(a));
  } else if (sortBy === "alphabetical-a") {
    cardTemplates.sort((a, b) => extractName(a).localeCompare(extractName(b)));
  } else if (sortBy === "alphabetical-z") {
    cardTemplates.sort((a, b) => extractName(b).localeCompare(extractName(a)));
  }
  // Regenerar todos os cards após a ordenação
  generateCards();
}

function extractPrice(template) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = template;
  const card = tempDiv.querySelector(".card"); // Seleciona o elemento .card dentro do template
  return parseInt(card.getAttribute("data-price"), 10);
}

function extractName(template) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = template;
  const card = tempDiv.querySelector(".card");
  return card.getAttribute("data-name");
}

document
  .getElementById("filter-dropdown")
  .addEventListener("change", (event) => {
    const sortBy = event.target.value;
    sortCards(sortBy);
    generateCards();
  });

generateCards();
