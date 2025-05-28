document.addEventListener('DOMContentLoaded', () => {
  const estrelas = document.querySelectorAll('.estrelas span');
  const comentarioInput = document.getElementById('comentario');
  const confirmarBtn = document.getElementById('confirmar');
  const avaliacoesContainer = document.querySelector('.avaliacoes');
  let avaliacao = 0;

  // Atualiza o visual das estrelas com base na nota
  function atualizarEstrelas(nota) {
    estrelas.forEach((estrela, index) => {
      estrela.classList.toggle('ativa', index < nota);
    });
  }

  // Evento de clique nas estrelas
  estrelas.forEach((estrela, index) => {
    estrela.addEventListener('click', () => {
      avaliacao = index + 1;
      atualizarEstrelas(avaliacao);
    });
  });

  // Gera um nome de usuário genérico (pode ser melhorado futuramente com login)
  function gerarNomeUsuario() {
    const nomes = ['Usuário', 'Anônimo', 'Visitante', 'Atleta'];
    return nomes[Math.floor(Math.random() * nomes.length)];
  }

  // Renderiza todas as avaliações
  function renderizarAvaliacoes() {
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    avaliacoesContainer.innerHTML = '';

    avaliacoes.forEach(av => {
      const div = document.createElement('div');
      div.classList.add('avaliacao');

      const label = document.createElement('label');
      label.textContent = av.nome || 'Usuário';

      const estrelasDiv = document.createElement('div');
      estrelasDiv.classList.add('estrelas');
      for (let i = 0; i < 5; i++) {
        const estrela = document.createElement('span');
        estrela.textContent = '★';
        estrela.classList.toggle('ativa', i < av.estrelas);
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

  // Salvar nova avaliação
  function salvarAvaliacao() {
    const comentario = comentarioInput.value.trim();
    if (avaliacao === 0 || comentario === '') {
      alert('Por favor, selecione uma nota e escreva um comentário.');
      return;
    }

    const novaAvaliacao = {
      nome: gerarNomeUsuario(),
      estrelas: avaliacao,
      texto: comentario
    };

    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    avaliacoes.push(novaAvaliacao);
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));

    // Limpa formulário e atualiza interface
    comentarioInput.value = '';
    avaliacao = 0;
    atualizarEstrelas(0);
    renderizarAvaliacoes();
  }

  confirmarBtn.addEventListener('click', salvarAvaliacao);

  // Carrega avaliações ao abrir a página
  renderizarAvaliacoes();
});
