document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-local");
  const imagemInput = document.getElementById("imagem");
  const preview = document.getElementById("preview");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  // Pré-visualização da imagem
  imagemInput.addEventListener("input", () => {
    const url = imagemInput.value;
    if (url) {
      preview.src = url;
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }
  });

  // Submissão do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Captura de dados
    const local = {
      nome: document.getElementById("nome").value.trim(),
      endereco: document.getElementById("endereco").value.trim(),
      tipo: document.getElementById("tipo").value,
      descricao: document.getElementById("descricao").value.trim(),
      horario: document.getElementById("horario").value.trim(),
      imagem: imagemInput.value.trim(),
      contato: document.getElementById("contato").value.trim()
    };

    // Validação básica
    if (!local.nome || !local.endereco || !local.tipo || !local.horario || !local.contato) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Armazenamento no LocalStorage
    const locais = JSON.parse(localStorage.getItem("locais")) || [];
    locais.push(local);
    localStorage.setItem("locais", JSON.stringify(locais));

    // Feedback e reset
    mensagemSucesso.textContent = "Local cadastrado com sucesso!";
    form.reset();
    preview.style.display = "none";

    setTimeout(() => {
      mensagemSucesso.textContent = "";
    }, 3000);
  });
});