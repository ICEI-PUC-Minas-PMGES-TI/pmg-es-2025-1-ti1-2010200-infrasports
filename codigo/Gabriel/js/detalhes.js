// Lista de espaços (simulando os dados que viriam do JSONServer ou de um arquivo JSON)
const espacos = [
    {
        "id": 1,
        "nome": "Parque das Mangabeiras",
        "tipo": "Trilha para Corrida",
        "descricao": "Trilha asfaltada com cerca de 3km, ideal para corrida e caminhada.",
        "localizacao": "Belo Horizonte - MG",
        "horario_funcionamento": "06:00 às 20:00",
        "avaliacao": 4.7,
        "infraestrutura": [
            "Estacionamento",
            "Bebedouro",
            "Banheiros",
            "Iluminação noturna"
        ],
        "acessibilidade": [
            "Rampa de acesso",
            "Piso tátil",
            "Banheiro adaptado"
        ],
        "imagem": "assets/img/parque-mangabeiras.jpg"
    },
    {
        "id": 2,
        "nome": "Praça JK",
        "tipo": "Espaço Funcional",
        "descricao": "Área ao ar livre com barras para exercícios de calistenia e treinos funcionais.",
        "localizacao": "Belo Horizonte - MG",
        "horario_funcionamento": "24 horas",
        "avaliacao": 4.5,
        "infraestrutura": [
            "Barras fixas",
            "Área gramada",
            "Iluminação pública"
        ],
        "acessibilidade": [
            "Caminhos nivelados"
        ],
        "imagem": "assets/img/praca-jk.jpg"
    }
];

// 1. Pega o ID da URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id')); // converte para número


const espaco = espacos.find(e => e.id === id);


if (espaco) {
    document.getElementById('nome-espaco').textContent = espaco.nome;
    document.getElementById('imagem-espaco').src = espaco.imagem;
    document.getElementById('imagem-espaco').alt = 'Imagem de ${espaco.nome}';
    document.getElementById('descricao-espaco').textContent = espaco.descricao;
    document.getElementById('tipo-espaco').textContent = espaco.tipo;
    document.getElementById('localizacao-espaco').textContent = espaco.localizacao;
    document.getElementById('horario-espaco').textContent = espaco.horario_funcionamento;
    document.getElementById('avaliacao-espaco').textContent = espaco.avaliacao;
// Atualiza a cor da estrela com base na avaliação
const estrela = document.getElementById('estrela-avaliacao');

if (espaco.avaliacao >= 4.5) {
    estrela.style.filter = "brightness(1.3)";
} else if (espaco.avaliacao >= 3.5) {
    estrela.style.filter = "brightness(1.0)";
} else if (espaco.avaliacao >= 2.5) {
    estrela.style.filter = "brightness(0.7)";
} else {
    estrela.style.filter = "brightness(0.4)";
}

    // Lista de infraestrutura
    const listaInfra = document.getElementById('infraestrutura-espaco');
    espaco.infraestrutura.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listaInfra.appendChild(li);
    });

    // Lista de acessibilidade
    const listaAcess = document.getElementById('acessibilidade-espaco');
    espaco.acessibilidade.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listaAcess.appendChild(li);
    });
} else {
    document.body.innerHTML = '<p>Espaço não encontrado.</p>';
}