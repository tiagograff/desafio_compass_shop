const cardTemplates = [
  //template 01
  `   <div class="card">
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
  //template 02
  `   <div class="card">
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
  //template 03
  `   <div class="card">
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
  //template 04
  `   <div class="card">
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

//função para criar um card
function newCard(index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = cardTemplates[index % cardTemplates.length];
  return card;
}

// armazenamento de paginação
let currentPage = 1;
const totalItems = cardTemplates.length * 8;
let itemsPerPage = 16;

//elementos html
const cardContent = document.getElementById("card-id");
const pageIndicator = document.getElementById("page-indicator");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const paragraphFilter = document.getElementById("paragraph-filter-show");

//função que atualiza os cards
function updateCards() {
  //pegando valor de show
  show = parseInt(document.getElementById("display-button").value, 10);

  //limpa os cards existentes para substituir por novos cards
  cardContent.innerHTML = "";

  //calculo para a paginação
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  //gerando cards e os adcioanando na página
  for (let i = start; i < end && i < totalItems; i++) {
    const templateIndex = i % cardTemplates.length;
    const card = newCard(templateIndex);
    cardContent.appendChild(card);
  }

  //atualiza o usuário em que página ele está
  pageIndicator.textContent = `Page ${currentPage}`;

  //atualizando texto de filtro
  const startDisplay = start + 1;
  const endDisplay = Math.min(end, totalItems);
  paragraphFilter.textContent = `Showing ${startDisplay}-${endDisplay} of ${totalItems} results`;
  paragraphFilter.style.color = "var(--color-black)";

  //desativa botões quando chegarem ao seu limite
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

//função que gera os cards de forma padrão
function generateCards() {
  //armazenando valor do display
  itemsPerPage = parseInt(document.getElementById("display-button").value, 10);

  if (itemsPerPage <= 0) {
  } else {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }
  currentPage = 1; //voltando para primeira página
  updateCards();
}

//página anterior
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateCards();
  }
});

//próxima página
nextButton.addEventListener("click", () => {
  if (currentPage * itemsPerPage < totalItems) {
    currentPage++;
    updateCards();
  }
});

//gerando novos cards e de forma que a página não recarregue
document
  .getElementById("submit-show-button")
  .addEventListener("click", (event) => {
    event.preventDefault();
    generateCards();
  });

//gerando a página incial
generateCards();
