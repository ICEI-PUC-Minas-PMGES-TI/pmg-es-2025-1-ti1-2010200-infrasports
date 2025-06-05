document.addEventListener('DOMContentLoaded', () => {
  const estrelas = document.querySelectorAll('.estrela');
  const nomeInput = document.getElementById('usuario');
  const comentarioInput = document.getElementById('comentario');
  const confirmarBtn = document.getElementById('confirmar');
  const avaliacoesContainer = document.querySelector('.avaliacoes');
  let avaliacao = 0;

  function atualizarEstrelas(nota) {
    estrelas.forEach((estrela) => {
      const valor = Number(estrela.dataset.valor);
      estrela.classList.toggle('ativa', valor <= nota);
      // Atualiza aria-pressed para acessibilidade
      estrela.setAttribute('aria-pressed', valor === nota ? 'true' : 'false');
    });
  }

  function verificarCampos() {
    // Habilita o botão Confirmar apenas se avaliacao > 0 e comentário não vazio
    confirmarBtn.disabled = !(avaliacao > 0 && comentarioInput.value.trim() !== '');
  }

  estrelas.forEach((estrela) => {
    const valor = Number(estrela.dataset.valor);

    estrela.addEventListener('click', () => {
      avaliacao = valor;
      atualizarEstrelas(avaliacao);
      verificarCampos();
    });

    estrela.addEventListener('mouseover', () => {
      atualizarEstrelas(valor);
    });

    estrela.addEventListener('mouseout', () => {
      atualizarEstrelas(avaliacao);
    });
  });

  // Verifica comentário para habilitar o botão
  comentarioInput.addEventListener('input', verificarCampos);

  function gerarNomeUsuario() {
    const nomes = ['Usuário', 'Anônimo', 'Visitante', 'Atleta'];
    return nomes[Math.floor(Math.random() * nomes.length)];
  }

  async function renderizarAvaliacoes() {
    avaliacoesContainer.innerHTML = '';

    try {
      const response = await fetch('http://localhost:3000/avaliacoes');
      if (!response.ok) throw new Error('Erro ao buscar avaliações');
      const avaliacoes = await response.json();

      avaliacoes.forEach((av) => {
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
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
      avaliacoesContainer.textContent = 'Não foi possível carregar as avaliações.';
    }
  }

  async function salvarAvaliacao() {
    const nome = nomeInput.value.trim();
    const comentario = comentarioInput.value.trim();

    if (avaliacao === 0 || comentario === '') {
      alert('Por favor, selecione uma nota e escreva um comentário.');
      return;
    }

    const novaAvaliacao = {
      nome: nome !== '' ? nome : gerarNomeUsuario(),
      estrelas: avaliacao,
      texto: comentario
    };

    try {
      const response = await fetch('http://localhost:3000/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaAvaliacao)
      });

      if (!response.ok) throw new Error('Erro ao salvar avaliação');

      nomeInput.value = '';
      comentarioInput.value = '';
      avaliacao = 0;
      atualizarEstrelas(0);
      confirmarBtn.disabled = true;
      renderizarAvaliacoes();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar a avaliação. Tente novamente.');
    }
  }

  confirmarBtn.addEventListener('click', salvarAvaliacao);

  renderizarAvaliacoes();
  verificarCampos(); // para desabilitar botão no início
});
