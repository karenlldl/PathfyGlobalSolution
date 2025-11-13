const menuToggle = document.querySelector(".menu-toggle");
const navRight = document.querySelector(".nav-right");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  navRight.classList.toggle("open");
});

