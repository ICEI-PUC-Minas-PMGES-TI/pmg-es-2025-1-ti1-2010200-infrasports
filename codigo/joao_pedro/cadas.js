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

    const treinosSalvos = JSON.parse(localStorage.getItem("treinos")) || [];
    treinosSalvos.push(treino);
    localStorage.setItem("treinos", JSON.stringify(treinosSalvos));

    alert("Treino cadastrado com sucesso!");
    form.reset();
  });
});
