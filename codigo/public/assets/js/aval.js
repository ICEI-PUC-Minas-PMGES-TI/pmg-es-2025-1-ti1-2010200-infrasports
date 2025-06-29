const botoesEstrelas = document.querySelectorAll('.estrela');
const btnConfirmar = document.getElementById('confirmar');
const inputNome = document.getElementById('usuario');
const inputComentario = document.getElementById('comentario');
const containerAvaliacoes = document.querySelector('.avaliacoes');

let avaliacaoSelecionada = 0;

// Atualiza o estado visual das estrelas e atributo aria-checked
function atualizarEstrelas() {
  botoesEstrelas.forEach((estrela) => {
    const valor = parseInt(estrela.dataset.valor);
    const selecionada = valor <= avaliacaoSelecionada;
    estrela.classList.toggle('selecionada', selecionada);
    estrela.setAttribute('aria-checked', selecionada);
  });
}

// Verifica se os campos estão preenchidos para habilitar o botão
function verificarCampos() {
  const habilitar = inputNome.value.trim() !== '' &&
                   inputComentario.value.trim() !== '' &&
                   avaliacaoSelecionada > 0;
  btnConfirmar.disabled = !habilitar;
}

// Exibe uma avaliação na lista
function exibirAvaliacao(avaliacao) {
  const div = document.createElement('div');
  div.classList.add('avaliacao');

  const label = document.createElement('label');
  label.textContent = avaliacao.nome;

  const estrelas = document.createElement('div');
  estrelas.classList.add('estrelas');
  for (let i = 1; i <= 5; i++) {
    const estrela = document.createElement('span');
    estrela.textContent = '★';
    estrela.style.color = i <= avaliacao.estrelas ? '#f1c40f' : '#ccc';
    estrelas.appendChild(estrela);
  }

  const p = document.createElement('p');
  p.textContent = avaliacao.comentario;

  div.appendChild(label);
  div.appendChild(estrelas);
  div.appendChild(p);
  containerAvaliacoes.appendChild(div);
}

// Limpa o formulário após envio
function limparFormulario() {
  inputNome.value = '';
  inputComentario.value = '';
  avaliacaoSelecionada = 0;
  atualizarEstrelas();
  verificarCampos();
}

// Eventos das estrelas para seleção
botoesEstrelas.forEach((estrela) => {
  estrela.addEventListener('click', () => {
    avaliacaoSelecionada = parseInt(estrela.dataset.valor);
    atualizarEstrelas();
    verificarCampos();
  });
});

// Monitorar inputs para habilitar botão
inputNome.addEventListener('input', verificarCampos);
inputComentario.addEventListener('input', verificarCampos);

// Enviar avaliação para o JSON Server
btnConfirmar.addEventListener('click', () => {
  const nome = inputNome.value.trim();
  const comentario = inputComentario.value.trim();

  if (!nome || !comentario || avaliacaoSelecionada === 0) return;

  const novaAvaliacao = {
    nome,
    comentario,
    estrelas: avaliacaoSelecionada
  };

  fetch('http://localhost:3000/avaliacoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novaAvaliacao)
  })
  .then(res => {
    if (!res.ok) throw new Error('Erro ao salvar avaliação');
    return res.json();
  })
  .then(dados => {
    exibirAvaliacao(dados);
    limparFormulario();
  })
  .catch(err => {
    console.error(err);
    alert('Erro ao salvar avaliação. Verifique se o JSON Server está rodando.');
  });
});

// Carregar avaliações já salvas ao iniciar
fetch('http://localhost:3000/avaliacoes')
  .then(res => res.json())
  .then(dados => {
    dados.forEach(exibirAvaliacao);
  })
  .catch(err => {
    console.error('Erro ao carregar avaliações:', err);
  });

// Inicialização inicial
atualizarEstrelas();
verificarCampos();
