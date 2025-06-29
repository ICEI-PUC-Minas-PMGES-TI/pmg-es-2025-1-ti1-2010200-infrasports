const espacos = [
  {
    id: 1,
    nome: "Parque das Mangabeiras",
    tipo: "Trilha para Corrida",
    descricao: "Trilha asfaltada com cerca de 3km, ideal para corrida e caminhada.",
    imagem: "../assets/images/parque-mangabeiras.jpg",
  },
  {
    id: 2,
    nome: "Praça JK",
    tipo: "Espaço Funcional",
    descricao: "Área ao ar livre com barras para exercícios de calistenia e treinos funcionais.",
    imagem: "../assets/images/praca-jk.jpg",
  },
  {
    id: 3,
    nome: "Parque Municipal Américo Renné Giannetti",
    tipo: "Parque Urbano",
    descricao:
      "Tradicional parque com lago, áreas de caminhada e ambiente arborizado no centro de BH.",
    imagem: "../assets/images/parque-municipal.jpg",
  },
  {
    id: 4,
    nome: "Praça da Liberdade",
    tipo: "Praça",
    descricao: "Espaço arborizado com jardins planejados, perfeito para caminhadas tranquilas e lazer.",
    imagem: "../assets/images/praca-liberdade.jpg",
  },
  {
    id: 5,
    nome: "Parque Ecológico da Pampulha",
    tipo: "Parque Ecológico",
    descricao: "Ampla área verde com lagoa, trilhas e espaços para piquenique na região da Pampulha.",
    imagem: "../assets/images/parque-pampulha.jpg",
  },
  {
    id: 6,
    nome: "Mirante do Mangabeiras",
    tipo: "Mirante",
    descricao: "Ponto turístico com vista panorâmica da cidade e ambiente propício para relaxamento.",
    imagem: "../assets/images/mirante-mangabeiras.jpg",
  },
  {
    id: 7,
    nome: "Parque Jacques Cousteau",
    tipo: "Parque de Bairro",
    descricao: "Parque com vegetação nativa, pista para caminhada e equipamentos de ginástica.",
    imagem: "../assets/images/parque-jacques.jpg",
  },
];

const container = document.getElementById("espacos-container");
const inputBusca = document.getElementById("busca");

function exibirEspacos(filtrados) {
  container.innerHTML = "";

  if (filtrados.length === 0) {
    container.innerHTML = "<p>Nenhum espaço encontrado.</p>";
    return;
  }

  filtrados.forEach((espaco) => {
    const div = document.createElement("div");
    div.className = "espaco";

    div.innerHTML = `
            <h2>${espaco.nome}</h2>
            <img class="imagem-espaco" src="${espaco.imagem}" alt="Imagem de ${espaco.nome}">
            <p>${espaco.descricao}</p>
            <a href="../páginas/detalhes_espacos.html?id=${espaco.id}">Ver detalhes de ${espaco.nome}</a>
        `;

    container.appendChild(div);
  });
}

// Mostrar todos ao carregar
exibirEspacos(espacos);

// Filtro ao digitar
inputBusca.addEventListener("input", () => {
  const termo = inputBusca.value.toLowerCase();
  const filtrados = espacos.filter(
    (e) => e.nome.toLowerCase().includes(termo) || e.tipo.toLowerCase().includes(termo)
  );
  exibirEspacos(filtrados);
});
