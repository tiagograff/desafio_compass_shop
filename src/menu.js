const navBarHamburguer = document.querySelector(".nav-bar-hamburguer");
const menuHamburguerButton = document.getElementById("menu-hamburguer-button");

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
