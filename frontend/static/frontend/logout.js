let logoutButton = document.querySelector("#logout-button");
        logoutButton.onclick = () => {
            fetch('https://${document.location.hostname}/api/logout')
            .then(response => response.json())
            .then(result => {
                window.location.replace('http://127.0.0.1:8000');
            })
        }