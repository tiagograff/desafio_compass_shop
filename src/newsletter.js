document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display-newsletter");
  const button = document.getElementById("subscribe-button");

  const form = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  button.addEventListener("click", (event) => {
    event.preventDefault();
    display.textContent = "";
    const value = document.getElementById("display-newsletter").value;
    const ok = validator(value);
    if (ok) {
      display.style.color = "green";
    } else {
      display.style.color = "red";
    }
  });

  function validator(address) {
    return form.test(address);
  }
});
