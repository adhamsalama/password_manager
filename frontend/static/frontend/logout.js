let logoutButton = document.querySelector("#logout-button");
        logoutButton.onclick = () => {
            fetch('http://127.0.0.1:8000/api/logout')
            .then(response => response.json())
            .then(result => {
                window.location.replace('http://127.0.0.1:8000');
            })
        }