const espacos = [
    {
        id: 1,
        nome: "Parque das Mangabeiras",
        tipo: "Trilha para Corrida",
        descricao: "Trilha asfaltada com cerca de 3km, ideal para corrida e caminhada.",
        imagem: "assets/img/parque-mangabeiras.jpg"
    },
    {
        id: 2,
        nome: "Praça JK",
        tipo: "Espaço Funcional",
        descricao: "Área ao ar livre com barras para exercícios de calistenia e treinos funcionais.",
        imagem: "assets/img/praca-jk.jpg"
    }
];

const container = document.getElementById('espacos-container');
const inputBusca = document.getElementById('busca');

function exibirEspacos(filtrados) {
    container.innerHTML = '';

    if (filtrados.length === 0) {
        container.innerHTML = '<p>Nenhum espaço encontrado.</p>';
        return;
    }

    filtrados.forEach(espaco => {
        const div = document.createElement('div');
        div.className = 'espaco';

        div.innerHTML = `
            <h2>${espaco.nome}</h2>
            <img src="${espaco.imagem}" alt="Imagem de ${espaco.nome}" style="max-width: 100%; border-radius: 10px; margin-bottom: 10px;">
            <p>${espaco.descricao}</p>
            <a href="detalhes.html?id=${espaco.id}">Ver detalhes de ${espaco.nome}</a>
        `;

        container.appendChild(div);
    });
}

// Mostrar todos ao carregar
exibirEspacos(espacos);

// Filtro ao digitar
inputBusca.addEventListener('input', () => {
    const termo = inputBusca.value.toLowerCase();
    const filtrados = espacos.filter(e =>
        e.nome.toLowerCase().includes(termo) ||
        e.tipo.toLowerCase().includes(termo)
    );
    exibirEspacos(filtrados);
});
