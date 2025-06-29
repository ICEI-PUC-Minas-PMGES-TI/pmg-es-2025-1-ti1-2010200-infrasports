const espacos = [
  {
    id: 1,
    nome: "Parque das Mangabeiras",
    tipo: "Trilha para Corrida",
    descricao: "Trilha asfaltada com cerca de 3km, ideal para corrida e caminhada.",
    localizacao: "Belo Horizonte - MG",
    horario_funcionamento: "06:00 às 20:00",
    avaliacao: 4.7,
    infraestrutura: ["Estacionamento", "Bebedouro", "Banheiros", "Iluminação noturna"],
    acessibilidade: ["Rampa de acesso", "Piso tátil", "Banheiro adaptado"],
    imagem: "assets/img/parque-mangabeiras.jpg",
    criadoPor: "admin",
    podeExcluir: ["admin"]
  },
  {
    id: 2,
    nome: "Praça JK",
    tipo: "Espaço Funcional",
    descricao: "Área ao ar livre com barras para exercícios de calistenia e treinos funcionais.",
    localizacao: "Belo Horizonte - MG",
    horario_funcionamento: "24 horas",
    avaliacao: 4.5,
    infraestrutura: ["Barras fixas", "Área gramada", "Iluminação pública"],
    acessibilidade: ["Caminhos nivelados"],
    imagem: "assets/img/praca-jk.jpg",
    criadoPor: "admin",
    podeExcluir: ["admin"]
  },
  {
    id: 3,
    nome: "Parque Municipal Américo Renné Giannetti",
    tipo: "Parque Urbano",
    descricao: "Tradicional parque com lago, áreas de caminhada e ambiente arborizado no centro de BH.",
    localizacao: "Centro - BH",
    horario_funcionamento: "06:00 às 18:00",
    avaliacao: 4.6,
    infraestrutura: ["Lago", "Pista de caminhada", "Playground", "Área verde"],
    acessibilidade: ["Calçadas acessíveis", "Rampas", "Sinalização tátil"],
    imagem: "assets/img/parque-municipal.jpg",
    criadoPor: "admin",
    podeExcluir: ["admin"]
  },
  {
    id: 4,
    nome: "Praça da Liberdade",
    tipo: "Praça",
    descricao: "Espaço arborizado com jardins planejados, perfeito para caminhadas tranquilas e lazer.",
    localizacao: "Savassi - BH",
    horario_funcionamento: "06:00 às 22:00",
    avaliacao: 4.8,
    infraestrutura: ["Jardins", "Bancos", "Pista de caminhada", "Iluminação"],
    acessibilidade: ["Piso tátil", "Banheiro adaptado", "Rampas de acesso"],
    imagem: "assets/img/praca-liberdade.jpg",
    criadoPor: "admin",
    podeExcluir: ["admin"]
  },
  {
    id: 5,
    nome: "Parque Ecológico da Pampulha",
    tipo: "Parque Ecológico",
    descricao: "Ampla área verde com lagoa, trilhas e espaços para piquenique na região da Pampulha.",
    localizacao: "Pampulha - BH",
    horario_funcionamento: "08:30 às 17:00",
    avaliacao: 4.4,
    infraestrutura: ["Trilhas", "Área de piquenique", "Lagoa", "Estacionamento"],
    acessibilidade: ["Rampas", "Sinalização visual", "Pisos nivelados"],
    imagem: "assets/img/parque-pampulha.jpg",
    criadoPor: "admin",
    podeExcluir: ["admin"]
  },
  {
    id: 6,
    nome: "Mirante do Mangabeiras",
    tipo: "Mirante",
    descricao: "Ponto turístico com vista panorâmica da cidade e ambiente propício para relaxamento.",
    localizacao: "Mangabeiras - BH",
    horario_funcionamento: "09:00 às 18:00",
    avaliacao: 4.9,
    infraestrutura: ["Mirante", "Café", "Segurança", "Banheiros"],
    acessibilidade: ["Elevador de acesso", "Banheiro adaptado"],
    imagem: "assets/img/mirante-mangabeiras.jpg",
    criadoPor: "admin",
    podeExcluir: ["admin"]
  },
  {
    id: 7,
    nome: "Parque Jacques Cousteau",
    tipo: "Parque de Bairro",
    descricao: "Parque com vegetação nativa, pista para caminhada e equipamentos de ginástica.",
    localizacao: "Betânia - BH",
    horario_funcionamento: "07:00 às 18:00",
    avaliacao: 4.3,
    infraestrutura: ["Equipamentos de ginástica", "Pista de caminhada", "Área verde"],
    acessibilidade: ["Caminhos acessíveis", "Rampa de acesso"],
    imagem: "assets/img/parque-jacques.jpg",
    criadoPor: "admin",
    podeExcluir: ["admin"]
  },
];

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const espaco = espacos.find((e) => e.id === id);

if (espaco) {
  document.getElementById("nome-espaco").textContent = espaco.nome;
  document.getElementById("imagem-espaco").src = espaco.imagem;
  document.getElementById("imagem-espaco").alt = `Imagem de ${espaco.nome}`;
  document.getElementById("descricao-espaco").textContent = espaco.descricao;
  document.getElementById("tipo-espaco").textContent = espaco.tipo;
  document.getElementById("localizacao-espaco").textContent = espaco.localizacao;
  document.getElementById("horario-espaco").textContent = espaco.horario_funcionamento;
  document.getElementById("avaliacao-espaco").textContent = espaco.avaliacao;

  const estrela = document.getElementById("estrela-avaliacao");
  if (espaco.avaliacao >= 4.5) {
    estrela.style.filter = "brightness(1.3)";
  } else if (espaco.avaliacao >= 3.5) {
    estrela.style.filter = "brightness(1.0)";
  } else if (espaco.avaliacao >= 2.5) {
    estrela.style.filter = "brightness(0.7)";
  } else {
    estrela.style.filter = "brightness(0.4)";
  }

  const listaInfra = document.getElementById("infraestrutura-espaco");
  espaco.infraestrutura.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    listaInfra.appendChild(li);
  });

  const listaAcess = document.getElementById("acessibilidade-espaco");
  espaco.acessibilidade.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    listaAcess.appendChild(li);
  });

  if (espaco.id === 1) {
    const imagensSlide = [
      "assets/img/prq das mangabeiras ft1.jpg",
      "assets/img/prq das mangabeiras ft2.jpg",
      "assets/img/prq das mangabeiras ft3.jpg",
      "assets/img/prq das mangabeiras ft4.jpg",
    ];

    let indiceSlide = 0;
    const imgSlide = document.getElementById("imagem-slide");
    const containerSlide = document.getElementById("slideshow");
    containerSlide.style.display = "block";

    function mostrarSlide(indice) {
      if (indice < 0) {
        indiceSlide = imagensSlide.length - 1;
      } else if (indice >= imagensSlide.length) {
        indiceSlide = 0;
      } else {
        indiceSlide = indice;
      }
      imgSlide.src = imagensSlide[indiceSlide];
    }

    window.trocarSlide = function (direcao) {
      mostrarSlide(indiceSlide + direcao);
    };

    mostrarSlide(indiceSlide);
  }
} else {
  document.body.innerHTML = "<p>Espaço não encontrado.</p>";
}

// Função para buscar clima de BH
function buscarClimaBH() {
  const apiKey = "57ebb2cb9e9dccac51213241ec7d39b1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Belo Horizonte,BR&units=metric&lang=pt_br&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temp = data.main.temp.toFixed(1);
      const condicao = data.weather[0].description;
      document.getElementById("temperatura").textContent = temp;
      document.getElementById("condicao").textContent =
        condicao.charAt(0).toUpperCase() + condicao.slice(1);
    })
    .catch((err) => {
      console.error("Erro ao buscar clima:", err);
      document.getElementById("temperatura").textContent = "N/A";
      document.getElementById("condicao").textContent = "N/A";
    });
}

// Chamar a função ao carregar a página
buscarClimaBH();
