document.addEventListener("DOMContentLoaded", () => {
  //constantes
  const display = document.getElementById("display-newsletter");
  const button = document.getElementById("subscribe-button");

  //forma do address
  const form = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  button.addEventListener("click", (event) => {
    //previne recarregamento da página
    event.preventDefault();
    const value = document.getElementById("display-newsletter").value;
    const ok = validator(value);
    if (ok) {
      //se der certo retorna ao usuário com uma cor verde
      display.style.color = "green";
    } else {
      //se der errado retorna com uma cor vermelha
      display.style.color = "red";
    }
  });

  //validação de address
  function validator(address) {
    return form.test(address);
  }
});
