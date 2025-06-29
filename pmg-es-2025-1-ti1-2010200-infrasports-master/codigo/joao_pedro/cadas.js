document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-treino");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const treino = {
      titulo: form.titulo.value,
      data_hora: form.data_hora.value,
      tipo_treino: form.tipo_treino.value,
      distancia: form.distancia.value,
      duracao: form.duracao.value,
      altimetria: form.altimetria.value,
      frequencia: form.frequencia.value,
      intensidade: form.intensidade.value,
      observacoes: form.observacoes.value
    };

    fetch("http://localhost:3000/treinos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(treino)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao salvar treino.");
        }
        return response.json();
      })
      .then(data => {
        alert("Treino cadastrado com sucesso!");
        form.reset();
      })
      .catch(error => {
        console.error("Erro:", error);
        alert("Falha ao cadastrar o treino.");
      });
  });
});
