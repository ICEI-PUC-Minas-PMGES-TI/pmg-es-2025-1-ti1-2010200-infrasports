// Configuração inicial do mapa
const map = L.map('map').setView([-19.9167, -43.9345], 13);

// Camada base do mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
}).addTo(map);

// Dados das ciclovias
const cicloviasBH = [
    {
        nome: "Ciclovia Av. Antônio Carlos",
        coordenadas: [
            [-19.9300, -43.9380], [-19.9315, -43.9370],
            [-19.9330, -43.9360], [-19.9350, -43.9345]
        ]
    },
    {
        nome: "Ciclovia Av. Amazonas",
        coordenadas: [
            [-19.9200, -43.9400], [-19.9180, -43.9420],
            [-19.9160, -43.9440], [-19.9140, -43.9460]
        ]
    },
    {
        nome: "Ciclovia Parque Municipal",
        coordenadas: [
            [-19.9245, -43.9360], [-19.9250, -43.9355],
            [-19.9255, -43.9350], [-19.9260, -43.9345]
        ]
    },
    {
        nome: "Ciclovia da Lagoa da Pampulha",
        coordenadas: [
            [-19.8500, -43.9800], [-19.8520, -43.9780],
            [-19.8540, -43.9760], [-19.8560, -43.9740]
        ]
    },
    {
        nome: "Ciclovia Av. do Contorno",
        coordenadas: [
            [-19.9340, -43.9300], [-19.9335, -43.9320],
            [-19.9330, -43.9340], [-19.9325, -43.9360]
        ]
    },
    {
        nome: "Ciclovia Av. Cristiano Machado",
        coordenadas: [
            [-19.9050, -43.9550], [-19.9080, -43.9530],
            [-19.9110, -43.9510], [-19.9140, -43.9490]
        ]
    },
    {
        nome: "Ciclovia Av. Pedro II",
        coordenadas: [
            [-19.9100, -43.9300], [-19.9120, -43.9280],
            [-19.9140, -43.9260], [-19.9160, -43.9240]
        ]
    }
];

// Estações Bike BH
const estacoesBikeBH = [
    {nome: "Estação Praça Sete", coordenadas: [-19.9200, -43.9380]},
    {nome: "Estação Savassi", coordenadas: [-19.9390, -43.9380]},
    {nome: "Estação Praça da Liberdade", coordenadas: [-19.9310, -43.9350]},
    {nome: "Estação Mercado Central", coordenadas: [-19.9190, -43.9430]},
    {nome: "Estação Santa Tereza", coordenadas: [-19.9140, -43.9460]},
    {nome: "Estação Praça da Estação", coordenadas: [-19.9190, -43.9370]},
    {nome: "Estação Pampulha", coordenadas: [-19.8550, -43.9770]},
    {nome: "Estação Minascentro", coordenadas: [-19.9350, -43.9340]},
    {nome: "Estação BH Shopping", coordenadas: [-19.9300, -43.9380]},
    {nome: "Estação Praça do Papa", coordenadas: [-19.9500, -43.9300]}
];

// Pontos turísticos
const pontosInteresse = [
    {nome: "Parque Municipal", coordenadas: [-19.9250, -43.9350]},
    {nome: "Praça da Liberdade", coordenadas: [-19.9310, -43.9350]},
    {nome: "Mineirão", coordenadas: [-19.8650, -43.9710]}
];

// Quadras esportivas reais 
const quadrasBH = [
    {
        nome: "Quadra Poliesportiva da Praça do Papa",
        coordenadas: [-19.9515, -43.9312]
    },
    {
        nome: "Quadra Poliesportiva do Bairro Sion",
        coordenadas: [-19.9358, -43.9370]
    },
    {
        nome: "Quadra Poliesportiva da Vila Paris",
        coordenadas: [-19.9174, -43.9450]
    }
];

// Pistas de skate reais 
const pistasSkateBH = [
    {
        nome: "Pista de Skate da Praça da Estação",
        coordenadas: [-19.9205, -43.9375]
    },
    {
        nome: "Pista de Skate do Parque Ecológico da Pampulha",
        coordenadas: [-19.8518, -43.9710]
    },
    {
        nome: "Pista de Skate da Praça Raul Soares",
        coordenadas: [-19.9292, -43.9350]
    }
];

// Ícones personalizados
const icones = {
    ciclovia: L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
    }),
    estacao: L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    pontosInteresse: L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    quadra: L.icon({
        iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvhKAEhNiMssLaOipUm0wP7d8TQ0xnNwVcMQ&s',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    }),
    skate: L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/39/39933.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    })
};

// Grupos de camadas
const camadas = {
    "Ciclovias": L.layerGroup(),
    "Estações Bike BH": L.layerGroup(),
    "Pontos Turísticos": L.layerGroup(),
    "Quadras Esportivas": L.layerGroup(),
    "Pistas de Skate": L.layerGroup()
};

// Notas simuladas para cada tipo de ponto
const notasSimuladas = {
    // Ciclovias
    "Ciclovia Av. Antônio Carlos": 5,
    "Ciclovia Av. Amazonas": 4,
    "Ciclovia Parque Municipal": 3,
    "Ciclovia da Lagoa da Pampulha": 5,
    "Ciclovia Av. do Contorno": 4,
    "Ciclovia Av. Cristiano Machado": 3,
    "Ciclovia Av. Pedro II": 3,

    // Estações Bike BH
    "Estação Praça Sete": 4,
    "Estação Savassi": 5,
    "Estação Praça da Liberdade": 3,
    "Estação Mercado Central": 4,
    "Estação Santa Tereza": 3,
    "Estação Praça da Estação": 4,
    "Estação Pampulha": 5,
    "Estação Minascentro": 3,
    "Estação BH Shopping": 4,
    "Estação Praça do Papa": 5,

    // Pontos turísticos
    "Parque Municipal": 5,
    "Praça da Liberdade": 4,
    "Mineirão": 3,

    // Quadras esportivas
    "Quadra Poliesportiva da Praça do Papa": 4,
    "Quadra Poliesportiva do Bairro Sion": 5,
    "Quadra Poliesportiva da Vila Paris": 3,

    // Pistas de skate
    "Pista de Skate da Praça da Estação": 5,
    "Pista de Skate do Parque Ecológico da Pampulha": 4,
    "Pista de Skate da Praça Raul Soares": 3
};

// Função para gerar estrelas (fixas, não clicáveis)
function gerarEstrelas(nota) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span style="color:${i <= nota ? '#FFD700' : '#CCC'}">&#9733;</span>`;
    }
    return starsHtml;
}

// Função para criar popup com avaliação simulada
function criarPopupComAvaliacao(nome) {
    const nota = notasSimuladas[nome] || 0;
    return `
        <b>${nome}</b><br>
        Avaliação: ${gerarEstrelas(nota)}
    `;
}

// --- Adiciona ciclovias com linhas e marcadores ---
cicloviasBH.forEach(ciclovia => {
    // Linha da ciclovia
    L.polyline(ciclovia.coordenadas, {
        color: '#4CAF50',
        weight: 5
    }).bindPopup(criarPopupComAvaliacao(ciclovia.nome))
      .addTo(camadas["Ciclovias"]);

    // Marcador início
    L.marker(ciclovia.coordenadas[0], {
        icon: icones.ciclovia,
        title: `Início: ${ciclovia.nome}`
    }).bindPopup(criarPopupComAvaliacao(ciclovia.nome))
      .addTo(camadas["Ciclovias"]);

    // Marcador fim
    L.marker(ciclovia.coordenadas[ciclovia.coordenadas.length - 1], {
        icon: icones.ciclovia,
        title: `Fim: ${ciclovia.nome}`
    }).bindPopup(criarPopupComAvaliacao(ciclovia.nome))
      .addTo(camadas["Ciclovias"]);
});

// Estações Bike BH
estacoesBikeBH.forEach(estacao => {
    L.marker(estacao.coordenadas, {
        icon: icones.estacao,
        title: estacao.nome
    }).bindPopup(criarPopupComAvaliacao(estacao.nome))
      .addTo(camadas["Estações Bike BH"]);
});

// Pontos turísticos
pontosInteresse.forEach(ponto => {
    L.marker(ponto.coordenadas, {
        icon: icones.pontosInteresse,
        title: ponto.nome
    }).bindPopup(criarPopupComAvaliacao(ponto.nome))
      .addTo(camadas["Pontos Turísticos"]);
});

// Quadras esportivas
quadrasBH.forEach(quadra => {
    L.marker(quadra.coordenadas, {
        icon: icones.quadra,
        title: quadra.nome
    }).bindPopup(criarPopupComAvaliacao(quadra.nome))
      .addTo(camadas["Quadras Esportivas"]);
});

// Pistas de skate
pistasSkateBH.forEach(pista => {
    L.marker(pista.coordenadas, {
        icon: icones.skate,
        title: pista.nome
    }).bindPopup(criarPopupComAvaliacao(pista.nome))
      .addTo(camadas["Pistas de Skate"]);
});

// Adiciona as camadas ao mapa e o controle para ativar/desativar
camadas["Ciclovias"].addTo(map);
camadas["Estações Bike BH"].addTo(map);
camadas["Pontos Turísticos"].addTo(map);
camadas["Quadras Esportivas"].addTo(map);
camadas["Pistas de Skate"].addTo(map);

L.control.layers(null, camadas).addTo(map);


// Função para buscar locais pelo nome (case insensitive)
function buscarLocal(query) {
    query = query.trim().toLowerCase();
    if (!query) return null;

    // Buscar nas ciclovias
    for (const ciclovia of cicloviasBH) {
        if (ciclovia.nome.toLowerCase().includes(query)) {
            return { tipo: 'ciclovia', dado: ciclovia };
        }
    }
    // Buscar nas estações
    for (const estacao of estacoesBikeBH) {
        if (estacao.nome.toLowerCase().includes(query)) {
            return { tipo: 'estacao', dado: estacao };
        }
    }
    // Buscar pontos turísticos
    for (const ponto of pontosInteresse) {
        if (ponto.nome.toLowerCase().includes(query)) {
            return { tipo: 'ponto', dado: ponto };
        }
    }
    // Buscar quadras esportivas
    for (const quadra of quadrasBH) {
        if (quadra.nome.toLowerCase().includes(query)) {
            return { tipo: 'quadra', dado: quadra };
        }
    }
    // Buscar pistas de skate
    for (const pista of pistasSkateBH) {
        if (pista.nome.toLowerCase().includes(query)) {
            return { tipo: 'skate', dado: pista };
        }
    }
    return null;
}

// Função para centralizar e abrir popup no mapa
function mostrarNoMapa(resultado) {
    if (!resultado) {
        alert('Local não encontrado.');
        return;
    }

    let latlng, popupContent;

    switch (resultado.tipo) {
        case 'ciclovia':
            // Centraliza na média dos pontos da ciclovia e abre popup no primeiro ponto
            const coords = resultado.dado.coordenadas;
            const latSum = coords.reduce((acc, cur) => acc + cur[0], 0);
            const lngSum = coords.reduce((acc, cur) => acc + cur[1], 0);
            const latMed = latSum / coords.length;
            const lngMed = lngSum / coords.length;
            latlng = [latMed, lngMed];
            popupContent = criarPopupComAvaliacaoSimulada(resultado.dado);
            break;
        case 'estacao':
            latlng = resultado.dado.coordenadas;
            popupContent = `<b>${resultado.dado.nome}</b>`;
            break;
        case 'ponto':
            latlng = resultado.dado.coordenadas;
            popupContent = `<b>${resultado.dado.nome}</b>`;
            break;
        case 'quadra':
            latlng = resultado.dado.coordenadas;
            popupContent = `<b>${resultado.dado.nome}</b>`;
            break;
        case 'skate':
            latlng = resultado.dado.coordenadas;
            popupContent = `<b>${resultado.dado.nome}</b>`;
            break;
        default:
            return;
    }

    map.setView(latlng, 16);

    // Cria e abre popup temporário no local encontrado
    L.popup()
     .setLatLng(latlng)
     .setContent(popupContent)
     .openOn(map);
}

// Adiciona listener no input de busca
const inputBusca = document.getElementById('search-input');
inputBusca.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const query = inputBusca.value;
        const resultado = buscarLocal(query);
        mostrarNoMapa(resultado);
    }
});
