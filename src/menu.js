//constantes
const navBarHamburguer = document.querySelector(".nav-bar-hamburguer");
const menuHamburguerButton = document.getElementById("menu-hamburguer-button");

//ao ser clicado o menu irá mostrar o css por trás é o menu html oculto/auxiliar
menuHamburguerButton.addEventListener("click", () => {
  if (
    navBarHamburguer.style.display === "none" ||
    navBarHamburguer.style.display === ""
  ) {
    navBarHamburguer.style.display = "flex";
  } else {
    navBarHamburguer.style.display = "none";
  }
});
