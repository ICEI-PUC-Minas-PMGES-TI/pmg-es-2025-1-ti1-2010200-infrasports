# Backend API with json-server

Este projeto usa o json-server para criar uma API REST simples a partir do arquivo `db.json`.

## Como rodar o servidor backend (json-server)

1. Certifique-se de ter o Node.js instalado: https://nodejs.org/

2. Instale o json-server globalmente (se ainda não tiver):

```
npm install -g json-server
```

3. No diretório do projeto, rode o comando para iniciar o servidor backend:

```
json-server --watch db.json --port 3000
```

4. A API estará disponível em: `http://localhost:3000`

## Como rodar o site frontend

1. Abra o arquivo `index.html` no seu navegador (duplo clique ou abra via VSCode Live Server).

2. O site irá buscar os dados dos filmes da API backend em `http://localhost:3000/movies`.

## Endpoints disponíveis no backend

- `/movies` - lista todos os filmes com informações de onde assistir.

## Exemplo de uso da API

Para obter a lista de filmes:

```
GET http://localhost:3000/movies
```

## Print da resposta da API

![Resposta da API json-server](./api-response.png)

Você pode usar essa API no seu site para mostrar onde assistir os filmes.
