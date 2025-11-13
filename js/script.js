//
const menuToggle = document.querySelector(".menu-toggle");
const navRight = document.querySelector(".nav-right");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  navRight.classList.toggle("open");
});

// Mensagem de envio de contato
  const form = document.getElementById("form-contato");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // impede envio real

    if (!form.checkValidity()) {
      form.reportValidity(); // força o navegador a mostrar os erros
      return;
    }

    alert("Mensagem enviada, entraremos em contato!");
    
    form.reset(); // limpa o formulário (opcional)
  });
