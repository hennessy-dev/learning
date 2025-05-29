document.addEventListener('DOMContentLoaded', () => {
    
    const socket = io('http://localhost:4000/')

    socket.on('connect', () => {
        console.log('Connected to server!');
        
        socket.emit('message', {user: 'John', text: 'Hello World'})
    })

    socket.on('message', (data) => {
        console.log(`Message: ${data}`);
    })

    socket.on('disconnect', () => {
        console.log('Disconnected from server!');    
    })

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const loginMessage = document.getElementById('loginMessage');
    const loggedInUsersSection = document.getElementById('loggedInUsersSection');
    const loggedInUsersTableBody = document.getElementById('loggedInUsersTableBody');

    const loggedInUsers = []; // In-memory array to store successfully logged-in users

    loginButton.addEventListener('click', async () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            loginMessage.textContent = 'Please enter both username and password.';
            loginMessage.style.color = '#FF3B30';
            return;
        }

        try {

            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/11.1.0'},
                body: `{"username":"${username}","password":"${password}"}`
            };
            
            let data;
            
            const response = await fetch('http://localhost:4000/auth/login', options)
                            .then(response => data = response.json())
                            .then(response => console.log(response))
                            .catch(err => console.error(err));

            if(data.access_token) {
                socket.emit('payload', {
                    username,
                    token: data.access_token
                });
            }
            
        
            loginMessage.textContent = `Login successful for ${username}!`;
            loginMessage.style.color = '#34C759';
            usernameInput.value = '';
            passwordInput.value = '';

            const now = new Date();
            loggedInUsers.push({ username: data.username || username, loginTime: now.toLocaleTimeString() });
            updateLoggedInUsersTable();

            // loginCard.style.display = 'none';
            loggedInUsersSection.style.display = 'block';
                
        } catch (error) {
            // Handle network errors (e.g., API not running, no internet)
            console.error('Error during login request:', error);
            alert('Network Error: Could not connect to the API. Please ensure the API is running at localhost:3000.');
            loginMessage.textContent = 'Network error: Could not connect to the API.';
            loginMessage.style.color = '#FF3B30';
        }
    });

    function updateLoggedInUsersTable() {
        loggedInUsersTableBody.innerHTML = ''; // Clear existing rows
        loggedInUsers.forEach(user => {
            const row = loggedInUsersTableBody.insertRow();
            const usernameCell = row.insertCell();
            const loginTimeCell = row.insertCell();
            usernameCell.textContent = user.username;
            loginTimeCell.textContent = user.loginTime;
        });
    }

    // Allow login by pressing Enter in the password field
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginButton.click();
        }
    });
});