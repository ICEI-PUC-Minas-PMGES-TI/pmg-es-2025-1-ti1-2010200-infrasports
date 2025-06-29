document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-local");
  const imagemInput = document.getElementById("imagem");
  const preview = document.getElementById("preview");
  const mensagemSucesso = document.getElementById("mensagem");

  // Preview da imagem selecionada (arquivo)
  imagemInput.addEventListener("change", () => {
    const file = imagemInput.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      preview.style.display = "none";
      preview.src = "";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Pega usuário logado do sessionStorage
    const usuarioCorrenteJSON = sessionStorage.getItem("usuarioCorrente");
    if (!usuarioCorrenteJSON) {
      alert("Você precisa estar logado para cadastrar um local.");
      return;
    }
    const usuarioCorrente = JSON.parse(usuarioCorrenteJSON);

    const file = imagemInput.files[0];

    // Função que faz POST no JSON Server com o local
    const salvarLocal = async (imagemBase64) => {
      const local = {
        nome: document.getElementById("nome").value.trim(),
        endereco: document.getElementById("endereco").value.trim(),
        tipo: document.getElementById("tipo").value,
        descricao: document.getElementById("descricao").value.trim(),
        horario: document.getElementById("horario").value.trim(),
        imagem: imagemBase64 || "",
        contato: document.getElementById("contato").value.trim(),
        criadoPor: usuarioCorrente.login || usuarioCorrente.id,
        podeExcluir: [usuarioCorrente.login || usuarioCorrente.id, "admin"]
      };

      // Validação simples
      if (!local.nome || !local.endereco || !local.tipo || !local.horario || !local.contato) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/espacos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(local)
        });

        if (!response.ok) throw new Error("Erro ao cadastrar local.");

        mensagemSucesso.textContent = "Local cadastrado com sucesso!";
        form.reset();
        preview.style.display = "none";
        preview.src = "";

        setTimeout(() => {
          mensagemSucesso.textContent = "";
        }, 3000);
      } catch (error) {
        alert("Erro ao cadastrar local: " + error.message);
      }
    };

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        salvarLocal(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      salvarLocal("");
    }
  });
});
