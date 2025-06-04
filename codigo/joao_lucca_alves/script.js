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
    })
};

// Grupos de camadas
const camadas = {
    "Ciclovias": L.layerGroup(),
    "Estações Bike BH": L.layerGroup(),
    "Pontos Turísticos": L.layerGroup()
};

// Adiciona ciclovias, linhas e marcadores de início e fim
cicloviasBH.forEach(ciclovia => {
    // Linha da ciclovia
    L.polyline(ciclovia.coordenadas, {
        color: '#4CAF50',
        weight: 5
    }).bindPopup(`<b>${ciclovia.nome}</b>`)
      .addTo(camadas["Ciclovias"]);

    // Marcador início
    L.marker(ciclovia.coordenadas[0], {
        icon: icones.ciclovia,
        title: `Início: ${ciclovia.nome}`
    }).bindPopup(`<b>Início</b><br>${ciclovia.nome}`)
      .addTo(camadas["Ciclovias"]);

    // Marcador fim
    L.marker(ciclovia.coordenadas[ciclovia.coordenadas.length - 1], {
        icon: icones.ciclovia,
        title: `Fim: ${ciclovia.nome}`
    }).bindPopup(`<b>Fim</b><br>${ciclovia.nome}`)
      .addTo(camadas["Ciclovias"]);
});

// Adiciona estações Bike BH
estacoesBikeBH.forEach(estacao => {
    L.marker(estacao.coordenadas, {
        icon: icones.estacao,
        title: estacao.nome
    }).bindPopup(`<b>${estacao.nome}</b><br>Estação Bike BH`)
      .addTo(camadas["Estações Bike BH"]);
});

// Adiciona pontos turísticos
pontosInteresse.forEach(ponto => {
    L.marker(ponto.coordenadas, {
        icon: icones.pontosInteresse,
        title: ponto.nome
    }).bindPopup(`<b>${ponto.nome}</b><br>Ponto Turístico`)
      .addTo(camadas["Pontos Turísticos"]);
});

// Adiciona camadas ao mapa
camadas["Ciclovias"].addTo(map);
camadas["Estações Bike BH"].addTo(map);
camadas["Pontos Turísticos"].addTo(map);

// Controle de camadas no mapa
L.control.layers(null, camadas, {collapsed: false}).addTo(map);

// Ajusta zoom para mostrar todos os elementos
setTimeout(() => {
    const todasCoordenadas = [
        ...cicloviasBH.flatMap(c => c.coordenadas),
        ...estacoesBikeBH.map(e => e.coordenadas),
        ...pontosInteresse.map(p => p.coordenadas)
    ];
    const bounds = L.latLngBounds(todasCoordenadas);
    map.fitBounds(bounds.pad(0.1));
}, 100);

// Estilo para a legenda
const style = document.createElement('style');
style.innerHTML = `
    .info.legend {
        background: white;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        font-family: Arial, sans-serif;
    }
    .info.legend h4 {
        margin: 0 0 10px 0;
        font-size: 16px;
        color: #333;
    }
    .info.legend div {
        margin: 8px 0;
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    .info.legend img {
        margin-right: 10px;
        width: 24px;
        height: 24px;
    }
`;
document.head.appendChild(style);

// Controle de legenda no mapa
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = `
        <h4>Legenda</h4>
        <div><img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" alt="Ciclovia"> Ciclovias</div>
        <div><img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" alt="Estação"> Estações Bike</div>
        <div><img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Ponto"> Pontos Turísticos</div>
    `;
    return div;
};

legend.addTo(map);

// Função de busca
document.getElementById('search-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const termo = this.value.trim().toLowerCase();

        if (!termo) return;

        let encontrado = false;

        // 1. Busca em ciclovias
        for (const ciclovia of cicloviasBH) {
            if (ciclovia.nome.toLowerCase().includes(termo)) {
                const bounds = L.latLngBounds(ciclovia.coordenadas);
                map.fitBounds(bounds.pad(0.2));
                encontrado = true;
                break;
            }
        }

        // 2. Busca em estações
        if (!encontrado) {
            for (const estacao of estacoesBikeBH) {
                if (estacao.nome.toLowerCase().includes(termo)) {
                    map.setView(estacao.coordenadas, 17);
                    encontrado = true;
                    break;
                }
            }
        }

        // 3. Busca em pontos turísticos
        if (!encontrado) {
            for (const ponto of pontosInteresse) {
                if (ponto.nome.toLowerCase().includes(termo)) {
                    map.setView(ponto.coordenadas, 17);
                    encontrado = true;
                    break;
                }
            }
        }

        // Alerta se nada for encontrado
        if (!encontrado) {
            alert('Nenhum resultado encontrado para: ' + this.value);
        }
    }
});

