// add onclick event for delete buttons
function deletePasswordEvent() {
    let deleteButtons = document.querySelectorAll(".delete-button");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].onclick = () => {
            let id = deleteButtons[i].parentElement.parentElement.parentElement.id;
            const request = new Request(
                `${document.location.href}api/passwords/${id}`,
                { headers: { 'X-CSRFToken': getCookie('csrftoken'), 'content-type': 'application/json' } }
            );
            fetch(request, {
                method: 'DELETE',
                mode: 'same-origin'  // Do not send CSRF token to another domain.
            }).then(() => getPasswords(document.querySelector("#q").value).then(results => displayPasswords(results)))
        }
    }
}