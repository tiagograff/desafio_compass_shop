//templates de 4 cards que serão replicados 8 vezes
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

//função que cria um novo card
function newCard(index) {
  //criando div
  const card = document.createElement("div");
  //adcionando class card
  card.classList.add("card");

  //calcula índice do array que sera selecionado 1 - 4
  const template = cardTemplates[index % cardTemplates.length];
  const tempDiv = document.createElement("div");
  //escrevendo na div o template
  tempDiv.innerHTML = template;
  card.innerHTML = template;
  //retornando novo card criado
  return card;
}

//página atual da paginação
let currentPage = 1;
//tamanaho da página vai ser baseado no tamanho do array de templates
const totalItems = cardTemplates.length * 8;
//itens que serão mostrados por página por default
let itemsPerPage = 16;

//constantes
const cardContent = document.getElementById("card-id");
const pageIndicator = document.getElementById("page-indicator");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const paragraphFilter = document.getElementById("paragraph-filter-show");
const filterSort = document.querySelector(".filter-sort");

function updateCards() {
  //pegando o valor para ser exibido
  const show = parseInt(document.getElementById("display-button").value, 10);
  //limpando tela
  cardContent.innerHTML = "";
  //itens por página - valor inicial
  const start = (currentPage - 1) * itemsPerPage;
  //itens por página - valor final
  const end = start + itemsPerPage;

  //for que distribui os cards por página
  for (let i = start; i < end && i < totalItems; i++) {
    const templateIndex = i % cardTemplates.length;
    const card = newCard(templateIndex);
    //adiciona nova carta ao conteúdo
    cardContent.appendChild(card);
  }

  //indicamento da página atual
  pageIndicator.textContent = `Page ${currentPage}`;

  //monstrando quanto de um total de itens que está sendo exibido na tela
  const startDisplay = start + 1;
  const endDisplay = Math.min(end, totalItems);
  paragraphFilter.textContent = `Showing ${startDisplay}-${endDisplay} of ${totalItems} results`;
  paragraphFilter.style.color = "var(--color-black)";

  //botões disabilitados caso tenha ultrapassado os limites
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = end >= totalItems;

  //se o botão de show for zero ou negativo, mensagem de valor incorreto
  if (show <= 0) {
    paragraphFilter.textContent = "Incorrect value";
    paragraphFilter.style.color = "red";
    prevButton.disabled = true;
    nextButton.disabled = true;
    //se for not a number, retornará que precisa ser um número
  } else if (isNaN(show)) {
    paragraphFilter.textContent = "This is a letter";
    paragraphFilter.style.color = "red";
    prevButton.disabled = true;
    nextButton.disabled = true;
  } else {
    //caso ok, habilita botões novamente
    prevButton.disabled = false;
    nextButton.disabled = false;
  }
}

//quando o botão de filtragem for clicado, aparecerá um select com opções de filtragem
document.getElementById("filter-button").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector(".filter-sort").classList.toggle("show");
});

//função que gera os cards
function generateCards() {
  //pegando valor de cards por página
  itemsPerPage = parseInt(document.getElementById("display-button").value, 10);

  //se for diferente zero ou positivo habilita botões
  if (!itemsPerPage <= 0) {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }
  currentPage = 1;
  //renderiza cards na tela
  updateCards();
}

//botão de prévia
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    //diminui na apresentação atual
    currentPage--;
    //renderiza cards
    updateCards();
  }
});

//botão de próximo
nextButton.addEventListener("click", () => {
  //se a página atual ainda for menor que o total de páginas
  if (currentPage * itemsPerPage < totalItems) {
    //soma na apresentação atual
    currentPage++;
    //renderiza cards
    updateCards();
  }
});

//submit button
document
  .getElementById("submit-show-button")
  .addEventListener("click", (event) => {
    //faz com que a página não recarregue
    event.preventDefault();
    //gera os cards ao clicar no botão de show
    generateCards();
  });

//função que extrai do template o preço do produto
function extractPrice(template) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = template;
  const card = tempDiv.querySelector(".card"); // Seleciona o elemento .card dentro do template
  return parseInt(card.getAttribute("data-price"), 10);
}

//função que extrai do template o nome do produto
function extractName(template) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = template;
  const card = tempDiv.querySelector(".card");
  return card.getAttribute("data-name");
}

//função de filtragem, vai ordernar os cards
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
  //gera novamente os cards(ERRO: esta gerando de 4 cards por quatro cards
  //deve ser o template, que ele ordena apenas o template e depois suas cópias), porém agora ordenados
  generateCards();
}

//ao ser selecionado um novo item no select, faz a filtragem dos produtos
document
  .getElementById("filter-dropdown")
  .addEventListener("change", (event) => {
    const sortBy = event.target.value;
    sortCards(sortBy);
    generateCards();
  });

//renderizando cards
generateCards();
