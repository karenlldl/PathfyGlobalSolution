// ------------------ FUNÇÕES GERAIS ---------------
function salvarUsuarioPathfy(usuario) {
  localStorage.setItem("usuarioPathfy", JSON.stringify(usuario));
}

function carregarUsuarioPathfy() {
  const dados = localStorage.getItem("usuarioPathfy");
  if (!dados) return null;
  try {
    return JSON.parse(dados);
  } catch (e) {
    console.error("Erro ao ler usuarioPathfy do localStorage", e);
    return null;
  }
}

// ----------- QUANDO O DOM CARREGAR ------------
document.addEventListener("DOMContentLoaded", function () {
  const caminho = window.location.pathname;

  // ========== MENU MOBILE ==========
  const menuToggle = document.querySelector(".menu-toggle");
  const navRight = document.querySelector(".nav-right");

  if (menuToggle && navRight) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navRight.classList.toggle("open");
    });
  }

  // ----------- FORMULÁRIO DE CONTATO ---------------
  const formContato = document.getElementById("form-contato");

  if (formContato) {
    formContato.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!formContato.checkValidity()) {
        formContato.reportValidity();
        return;
      }

      alert("Mensagem enviada, entraremos em contato!");
      formContato.reset();
    });
  }

  // -------------- FAQ ----------
  const perguntas = document.querySelectorAll(".faq .pergunta");

  if (perguntas.length) {
    perguntas.forEach((pergunta) => {
      const titulo = pergunta.querySelector("h3");
      if (!titulo) return;

      titulo.style.cursor = "pointer";

      titulo.addEventListener("click", () => {
        perguntas.forEach((p) => {
          if (p !== pergunta) p.classList.remove("ativa");
        });
        pergunta.classList.toggle("ativa");
      });
    });
  }

  // -------------- CADASTRO (paginaCadastro.html) -----------------

  if (caminho.includes("paginaCadastro")) {
    const formCadastro = document.getElementById("lg-form");

    if (formCadastro) {
      formCadastro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("lg-nome")?.value.trim();
        const empresa = document.getElementById("lg-empresa")?.value.trim();
        const cargo = document.getElementById("lg-cargo")?.value.trim();

        const interessesSelect = document.getElementById("lg-interesses");
        const interesses = interessesSelect ? interessesSelect.value : "";

        const email = document.getElementById("lg-email")?.value.trim();
        const senha = document.getElementById("lg-senha")?.value.trim();

        if (!nome || !empresa || !cargo || !interesses || !email || !senha) {
          alert("Por favor, preencha todos os campos para concluir o cadastro.");
          return;
        }

        const usuario = {
          nome,
          empresa,
          cargo,
          interesses, // string (ex: "Python", "Java", "UX/UI")
          email,
          senha,
        };

        salvarUsuarioPathfy(usuario);

        alert("Cadastro realizado com sucesso!");
        window.location.href = "paginaUsuario.html";
      });
    }
  }

  //------------- LOGIN (paginaLogin.html)----------------

  if (caminho.includes("paginaLogin")) {
    const formLogin = document.getElementById("lg-form");

    if (formLogin) {
      formLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("lg-email")?.value.trim();
        const senha = document.getElementById("lg-senha")?.value.trim();

        if (!email || !senha) {
          alert("Preencha email e senha para continuar.");
          return;
        }

        const usuario = carregarUsuarioPathfy();

        if (!usuario) {
          alert("Nenhum usuário cadastrado foi encontrado. Faça seu cadastro primeiro.");
          return;
        }

        if (email === usuario.email && senha === usuario.senha) {
          alert("Login realizado com sucesso! 🚀");
          window.location.href = "paginaUsuario.html";
        } else {
          alert("Email ou senha inválidos. Tente novamente.");
        }
      });
    }
  }

  // ---------- PÁGINA DE USUÁRIO (paginaUsuario.html) --------

  if (caminho.includes("paginaUsuario")) {
    const usuario = carregarUsuarioPathfy();
    if (!usuario) {
      console.warn("Nenhum usuário encontrado no localStorage.");
    } else {
      // Sidebar "Olá, Maria!"
      const hello = document.querySelector(".colab-hello");
      if (hello) {
        const primeiroNome = usuario.nome.split(" ")[0];
        hello.textContent = `Olá, ${primeiroNome}!`;
      }

      // Card "Meu perfil" – certifique-se que o HTML tem esses IDs
      const nomePerfil = document.getElementById("perfil-nome");
      const empresaPerfil = document.getElementById("perfil-empresa");
      const cargoPerfil = document.getElementById("perfil-cargo");
      const interessesPerfil = document.getElementById("perfil-interesses");

      if (nomePerfil) nomePerfil.textContent = usuario.nome;
      if (empresaPerfil) empresaPerfil.textContent = usuario.empresa;
      if (cargoPerfil) cargoPerfil.textContent = usuario.cargo;
      if (interessesPerfil) interessesPerfil.textContent = usuario.interesses;
    }

  // Navegação lateral (Início / Pathfy IA / Vagas)
    const navButtons = document.querySelectorAll(".colab-nav-btn");
    const sections = document.querySelectorAll(".colab-section");

    if (navButtons.length && sections.length) {
      navButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          navButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          const targetId = btn.getAttribute("data-section-target");

          sections.forEach((sec) => {
            if (sec.id === targetId) {
              sec.classList.add("active");
            } else {
              sec.classList.remove("active");
            }
          });
        });
      });
    }
  }
});