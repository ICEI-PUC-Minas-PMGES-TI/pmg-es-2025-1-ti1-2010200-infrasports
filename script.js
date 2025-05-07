// Mapa centralizado em BH com zoom adequado
const map = L.map('map').setView([-19.9167, -43.9345], 13);

// Mapa base com mais contraste
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

// Principais ciclovias de BH
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

// Outros pontos importantes
const pontosInteresse = [
    {nome: "Parque Municipal", coordenadas: [-19.9250, -43.9350], tipo: "Parque"},
    {nome: "Praça da Liberdade", coordenadas: [-19.9310, -43.9350], tipo: "Ponto Turístico"},
    {nome: "Mineirão", coordenadas: [-19.8650, -43.9710], tipo: "Estádio"}
];

// Cria grupos de camadas
const camadas = {
    "Ciclovias": L.layerGroup(),
    "Estações Bike BH": L.layerGroup(),
    "Pontos Turísticos": L.layerGroup()
};

// Adiciona ciclovias ao mapa e ao grupo de camadas
cicloviasBH.forEach(ciclovia => {
    const polyline = L.polyline(ciclovia.coordenadas, {
        className: 'ciclovia',
        weight: 5
    }).bindPopup(`<b>${ciclovia.nome}</b>`);
    
    polyline.addTo(camadas["Ciclovias"]);
});

// Adiciona estações Bike BH
estacoesBikeBH.forEach(estacao => {
    const marker = L.circleMarker(estacao.coordenadas, {
        className: 'estacao-bikebh',
        radius: 8,
        fillOpacity: 0.9
    }).bindPopup(`<b>${estacao.nome}</b><br>Estação Bike BH`);
    
    marker.addTo(camadas["Estações Bike BH"]);
});

// Adiciona outros pontos importantes
pontosInteresse.forEach(ponto => {
    const marker = L.circleMarker(ponto.coordenadas, {
        className: 'ponto-interesse',
        radius: 8,
        fillOpacity: 0.9
    }).bindPopup(`<b>${ponto.nome}</b><br>${ponto.tipo}`);
    
    marker.addTo(camadas["Pontos Turísticos"]);
});

// Adiciona todas as camadas ao mapa inicialmente
camadas["Ciclovias"].addTo(map);
camadas["Estações Bike BH"].addTo(map);
camadas["Pontos Turísticos"].addTo(map);

// Adiciona controle de camadas
L.control.layers(null, camadas, {collapsed: false}).addTo(map);

// Ajusta o zoom para mostrar todas as features
setTimeout(() => {
    const bounds = new L.LatLngBounds();
    
    // Adiciona todas as coordenadas das ciclovias
    cicloviasBH.forEach(ciclovia => {
        ciclovia.coordenadas.forEach(coord => {
            bounds.extend(coord);
        });
    });
    
    // Adiciona todas as estações
    estacoesBikeBH.forEach(estacao => {
        bounds.extend(estacao.coordenadas);
    });
    
    // Adiciona todos os pontos de interesse
    pontosInteresse.forEach(ponto => {
        bounds.extend(ponto.coordenadas);
    });
    
    map.fitBounds(bounds.pad(0.1));
}, 100);