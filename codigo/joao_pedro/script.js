document.addEventListener('DOMContentLoaded', function () {
  const estrelas = document.querySelectorAll('.estrelas span');
  let avaliacao = 0;

  estrelas.forEach((estrela, index) => {
    estrela.addEventListener('click', () => {
      avaliacao = index + 1;
      atualizarEstrelas(avaliacao);
    });
  });

  function atualizarEstrelas(nota) {
    estrelas.forEach((estrela, index) => {
      if (index < nota) {
        estrela.classList.add('ativa');
      } else {
        estrela.classList.remove('ativa');
      }
    });
  }
});
