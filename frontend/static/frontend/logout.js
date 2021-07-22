let logoutButton = document.querySelector("#logout-button");
        logoutButton.onclick = () => {
            fetch(`${window.location.origin}/api/logout`)
            .then(response => response.json())
            .then(result => {
                window.location.replace(`${window.location.origin}`);
            })
        }