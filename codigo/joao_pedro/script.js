document.addEventListener('DOMContentLoaded', function () {
  const estrelas = document.querySelectorAll('.estrelas span');
  const comentarioInput = document.getElementById('comentario');
  const confirmarBtn = document.getElementById('confirmar');
  const avaliacoesContainer = document.querySelector('.avaliacoes');
  let avaliacao = 0;

  // ⭐ Atualiza visualmente as estrelas
  function atualizarEstrelas(nota) {
    estrelas.forEach((estrela, index) => {
      if (index < nota) {
        estrela.classList.add('ativa');
      } else {
        estrela.classList.remove('ativa');
      }
    });
  }

  // ⭐ Evento de clique nas estrelas
  estrelas.forEach((estrela, index) => {
    estrela.addEventListener('click', () => {
      avaliacao = index + 1;
      atualizarEstrelas(avaliacao);
    });
  });

  // 📝 Salvar avaliação
  confirmarBtn.addEventListener('click', () => {
    const comentario = comentarioInput.value.trim();
    if (avaliacao === 0 || comentario === '') {
      alert('Por favor, selecione uma nota e escreva um comentário.');
      return;
    }

    const novaAvaliacao = {
      estrelas: avaliacao,
      texto: comentario
    };

    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    avaliacoes.push(novaAvaliacao);
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));

    comentarioInput.value = '';
    avaliacao = 0;
    atualizarEstrelas(0);
    renderizarAvaliacoes();
  });

  // 📋 Renderizar avaliações salvas
  function renderizarAvaliacoes() {
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    avaliacoesContainer.innerHTML = '';

    avaliacoes.forEach(av => {
      const div = document.createElement('div');
      div.classList.add('avaliacao');

      const label = document.createElement('label');
      label.textContent = 'Usuário';

      const estrelasDiv = document.createElement('div');
      estrelasDiv.classList.add('estrelas');

      // Cria spans com a classe 'ativa' para estrelas preenchidas
      for (let i = 0; i < 5; i++) {
        const estrela = document.createElement('span');
        estrela.textContent = '★';
        if (i < av.estrelas) {
          estrela.classList.add('ativa');
        }
        estrelasDiv.appendChild(estrela);
      }

      const comentario = document.createElement('p');
      comentario.textContent = av.texto;

      div.appendChild(label);
      div.appendChild(estrelasDiv);
      div.appendChild(comentario);
      avaliacoesContainer.appendChild(div);
    });
  }

  // 🚀 Carrega avaliações ao iniciar
  renderizarAvaliacoes();
});
