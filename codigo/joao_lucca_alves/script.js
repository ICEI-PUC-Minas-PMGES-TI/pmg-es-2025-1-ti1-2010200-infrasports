// Configuração inicial do mapa
const map = L.map('map').setView([-19.9167, -43.9345], 13);

// Camada base do mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
}).addTo(map);

// Dados completos das ciclovias
const cicloviasBH = [
    {
        nome: "Ciclovia Av. Antônio Carlos",
        coordenadas: [
            [-19.9300, -43.9380], [-19.9315, -43.9370], 
            [-19.9330, -43.9360], [-19.9350, -43.9345]]
    },
    {
        nome: "Ciclovia Av. Amazonas",
        coordenadas: [
            [-19.9200, -43.9400], [-19.9180, -43.9420],
            [-19.9160, -43.9440], [-19.9140, -43.9460]]
    },
    {
        nome: "Ciclovia Parque Municipal",
        coordenadas: [
            [-19.9245, -43.9360], [-19.9250, -43.9355],
            [-19.9255, -43.9350], [-19.9260, -43.9345]]
    },
    {
        nome: "Ciclovia da Lagoa da Pampulha",
        coordenadas: [
            [-19.8500, -43.9800], [-19.8520, -43.9780],
            [-19.8540, -43.9760], [-19.8560, -43.9740]]
    },
    {
        nome: "Ciclovia Av. do Contorno",
        coordenadas: [
            [-19.9340, -43.9300], [-19.9335, -43.9320],
            [-19.9330, -43.9340], [-19.9325, -43.9360]]
    },
    {
        nome: "Ciclovia Av. Cristiano Machado",
        coordenadas: [
            [-19.9050, -43.9550], [-19.9080, -43.9530],
            [-19.9110, -43.9510], [-19.9140, -43.9490]]
    },
    {
        nome: "Ciclovia Av. Pedro II",
        coordenadas: [
            [-19.9100, -43.9300], [-19.9120, -43.9280],
            [-19.9140, -43.9260], [-19.9160, -43.9240]]
    }
];

// Estações Bike BH completas
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

// Pontos turísticos com classificação correta
const pontosInteresse = [
    {nome: "Parque Municipal", coordenadas: [-19.9250, -43.9350], tipo: "pontosInteresse"},
    {nome: "Praça da Liberdade", coordenadas: [-19.9310, -43.9350], tipo: "pontosInteresse"},
    {nome: "Mineirão", coordenadas: [-19.8650, -43.9710], tipo: "pontosInteresse"}
];

// Definição de camadas
const camadas = {
    "Ciclovias": L.layerGroup(),
    "Estações Bike BH": L.layerGroup(),
    "Pontos Turísticos": L.layerGroup()
};

// Paleta de cores para os elementos
const cores = {
    ciclovias: "#4CAF50",       // Verde
    estacoes: "#0066CC",        // Azul
    pontosInteresse: "#FF0000"  // Vermelho
};

// Adiciona ciclovias
cicloviasBH.forEach(ciclovia => {
    L.polyline(ciclovia.coordenadas, {
        color: cores.ciclovias,
        weight: 5,
        className: 'ciclovia'
    }).bindPopup(`<b>${ciclovia.nome}</b>`)
     .addTo(camadas["Ciclovias"]);
});

// Adiciona estações Bike BH
estacoesBikeBH.forEach(estacao => {
    L.circleMarker(estacao.coordenadas, {
        color: cores.estacoes,
        fillColor: `${cores.estacoes}80`,
        radius: 6,
        fillOpacity: 0.9,
        className: 'estacao-bike'
    }).bindPopup(`<b>${estacao.nome}</b><br>Estação Bike BH`)
     .addTo(camadas["Estações Bike BH"]);
});

// Adiciona pontos turísticos
pontosInteresse.forEach(ponto => {
    L.circleMarker(ponto.coordenadas, {
        color: cores[ponto.tipo],
        fillColor: `${cores[ponto.tipo]}80`,
        radius: ponto.tipo === "estadio" ? 10 : 8,
        fillOpacity: 0.9,
        className: `ponto-${ponto.tipo}`
    }).bindPopup(`<b>${ponto.nome}</b><br>${
        ponto.tipo === "parque" ? "Parque" : 
        ponto.tipo === "praca" ? "Praça" : "Estádio"
    }`)
     .addTo(camadas["Pontos Turísticos"]);
});

// Adiciona todas as camadas ao mapa
camadas["Ciclovias"].addTo(map);
camadas["Estações Bike BH"].addTo(map);
camadas["Pontos Turísticos"].addTo(map);

// Controle de camadas
L.control.layers(null, camadas, {collapsed: false}).addTo(map);

// Ajuste de zoom para mostrar todos os elementos
setTimeout(() => {
    const bounds = L.latLngBounds(
        [...cicloviasBH.flatMap(c => c.coordenadas), ...estacoesBikeBH.map(e => e.coordenadas), ...pontosInteresse.map(p => p.coordenadas)]
    );
    map.fitBounds(bounds.pad(0.1));
}, 100);