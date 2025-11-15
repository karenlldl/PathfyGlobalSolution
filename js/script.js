// MENU MOBILE
const menuToggle = document.querySelector(".menu-toggle");
const navRight = document.querySelector(".nav-right");

if (menuToggle && navRight) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    navRight.classList.toggle("open");
  });
}

// MENSAGEM DE ENVIO DE CONTATO (só se o form existir na página)
const form = document.getElementById("form-contato");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // impede envio real

    if (!form.checkValidity()) {
      form.reportValidity(); // força o navegador a mostrar os erros
      return;
    }

    alert("Mensagem enviada, entraremos em contato!");

    form.reset(); 
  });
}

// FAQ – ABRIR/FECHAR PERGUNTAS
const perguntas = document.querySelectorAll(".faq .pergunta");

if (perguntas.length) {
  perguntas.forEach((pergunta) => {
    const titulo = pergunta.querySelector("h3");

    if (!titulo) return;

    titulo.style.cursor = "pointer";

    titulo.addEventListener("click", function () {
      // fecha as outras
      perguntas.forEach((p) => {
        if (p !== pergunta) {
          p.classList.remove("ativa");
        }
      });

      pergunta.classList.toggle("ativa");
    });
  });
}

//LOGIN - VALIDA E ENTRA
