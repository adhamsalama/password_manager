let logoutButton = document.querySelector("#logout-button");
        logoutButton.onclick = () => {
            fetch('${document.location.href}api/logout')
            .then(response => response.json())
            .then(result => {
                window.location.replace(`${document.location.href}`);
            })
        }