const LOGIN_URL = "../páginas/login.html";
let RETURN_URL = "../public/home-page.html";
const API_URL = '/users';

// Agora é um array
let db_usuarios = [];
let usuarioCorrente = {};

// Inicializa a aplicação de Login
async function initLoginApp() {
    const pagina = window.location.pathname;

    if (pagina !== LOGIN_URL) {
        sessionStorage.setItem('returnURL', pagina);
        RETURN_URL = pagina;

        const usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
        if (usuarioCorrenteJSON) {
            usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
        } else {
            window.location.href = LOGIN_URL;
        }

        // Removido showUserInfo pois não está definido
        // document.addEventListener('DOMContentLoaded', function () {
        //     showUserInfo('userInfo');
        // });
    } else {
        const returnURL = sessionStorage.getItem('returnURL');
        RETURN_URL = returnURL || RETURN_URL;

        // Carrega usuários ao iniciar página de login
        await carregarUsuarios();
        console.log('Usuários carregados com sucesso.');
    }
}

// Função para carregar usuários da API
function carregarUsuarios() {
    return fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            db_usuarios = data; // agora é um array
        })
        .catch(error => {
            console.error('Erro ao ler usuários via API JSONServer:', error);
            displayMessage("Erro ao ler usuários.");
        });
}

// Verifica login e senha contra o banco de usuários
function loginUser(login, senha) {
    const usuario = db_usuarios.find(user => user.login === login && user.senha === senha);

    if (usuario) {
        usuarioCorrente = {
            id: usuario.id,
            login: usuario.login,
            email: usuario.email,
            nome: usuario.nome
        };

        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
        return true;
    }

    return false;
}

// Logout
function logoutUser() {
    sessionStorage.removeItem('usuarioCorrente');
    window.location = LOGIN_URL;
}

// Cadastra novo usuário
function addUser(nome, login, senha, email, dataNascimento, endereco, hobby, esporte, fotoPerfil) {
    const usuario = {
        nome, login, senha, email, dataNascimento, endereco, hobby, esporte, fotoPerfil
    };

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
    })
    .then(response => response.json())
    .then(data => {
        db_usuarios.push(data); // usa o dado retornado pela API
        alert("Cadastro realizado com sucesso!");
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário via API JSONServer:', error);
        alert("Erro ao cadastrar usuário.");
    });
}
