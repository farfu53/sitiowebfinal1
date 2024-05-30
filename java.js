
const users = {
    "1234": "1234"
};

function validateLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    if (username === "" || password === "") {
        errorMessage.textContent = "Por favor, complete todos los campos.";
        return false;
    }

    if (users[username] && users[username] === password) {
        window.location.href = 'juegos.html';
        return false;
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
        return false;
    }
}

function registerUser() {
    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const registerMessage = document.getElementById('registerMessage');

    if (newUsername === "" || newPassword === "") {
        registerMessage.textContent = "Por favor, complete todos los campos.";
        return false;
    }

    if (users[newUsername]) {
        registerMessage.textContent = "El usuario ya existe.";
        return false;
    } else {
        users[newUsername] = newPassword;
        registerMessage.textContent = "Registro exitoso. Ahora puede iniciar sesión.";
        registerMessage.style.color = "green";
        return false;
    }
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('formTitle').textContent = 'Iniciar Sesión';
    document.getElementById('errorMessage').textContent = '';
    document.getElementById('registerMessage').textContent = '';
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Registrarse';
    document.getElementById('errorMessage').textContent = '';
    document.getElementById('registerMessage').textContent = '';
}


async function fetchGames() {
    const apiKey = '8d56566d522241bdbcfa8a11ef2decc9'; 
    const url = `https://api.rawg.io/api/games?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const games = data.results;
        const gamesList = document.getElementById('gamesList');

        games.forEach(game => {
            const gameDiv = document.createElement('div');
            gameDiv.className = 'game';
            gameDiv.innerHTML = `
                <img src="${game.background_image}" alt="${game.name}">
                <p>${game.name}</p>
            `;
            gamesList.appendChild(gameDiv);
        });
    } catch (error) {
        console.error('Error al obtener los juegos:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('gamesList')) {
        fetchGames();
    }
});
