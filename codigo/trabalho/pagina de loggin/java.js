let isLogin = true;

const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const toggleLink = document.getElementById("toggle-link");
const toggleText = document.getElementById("toggle-form");
const form = document.getElementById("form");

toggleLink.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Cadastro";
  submitBtn.textContent = isLogin ? "Entrar" : "Cadastrar";
  toggleText.innerHTML = isLogin
    ? 'Não tem conta? <span id="toggle-link">Cadastre-se</span>'
    : 'Já tem conta? <span id="toggle-link">Entrar</span>';
  // Reatribui o evento ao novo span criado
  document.getElementById("toggle-link").addEventListener("click", () => toggleLink.click());
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  if (isLogin) {
    alert(`Bem-vindo de volta, ${username}!`);
  } else {
    alert(`Conta criada para ${username}!`);
  }

  form.reset();
});
