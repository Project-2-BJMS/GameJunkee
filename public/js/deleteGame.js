const deleteGame = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')
        console.log(id)

        const response = await fetch(`/api/games/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
};



// const deleteBtn = document.querySelector('.delete-game')
// deleteBtn.addEventListener('click', deleteGame)
document
    .querySelector('#delete-game')
    .addEventListener('click', deleteGame)