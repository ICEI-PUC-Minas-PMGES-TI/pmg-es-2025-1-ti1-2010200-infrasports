document.getElementById("cadastroAtletaForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const mensagem = document.getElementById("mensagemCadastro");
  mensagem.textContent = "";

  const atleta = {
    nome: this.nome.value.trim(),
    dataNascimento: this.dataNascimento.value,
    endereco: this.endereco.value.trim(),
    hobby: this.hobby.value.trim(),
    esporte: this.esporte.value,
    email: this.email.value.trim(),
    login: this.login.value.trim(),
    senha: this.senha.value
    // A imagem não está sendo enviada. Será necessário fazer upload ou armazenar o base64 separadamente.
  };

  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(atleta),
    });

    if (response.ok) {
      mensagem.style.color = "green";
      mensagem.textContent = "Cadastro realizado com sucesso!";
      this.reset();
    } else {
      throw new Error("Erro ao salvar no servidor.");
    }
  } catch (error) {
    console.error(error);
    mensagem.style.color = "red";
    mensagem.textContent = "Erro ao cadastrar. Tente novamente.";
  }
});
