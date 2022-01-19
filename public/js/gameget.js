const gameGet = async (event) => {
    event.preventDefault()

    const gameTitle = document.querySelector('#game-title-search').value.trim()

    if (gameTitle) {
        console.log(gameTitle)
        const title = gameTitle.replace(' ', '-')
        console.log(title)
        const response = await fetch(`/gameget`, {
        method: 'GET',
        headers: {
            headers: { 'Content-Type': 'application/json' },
        },
    })
    if (response.ok) {
        document.location.replace('/gameresult')
    } else {
        alert(response.statusText);
        // document.location.replace('/login')
    }
    }
}
// accessToken();
// gameSearch(searchGame);


document
    .querySelector('.game-search-form')
    .addEventListener('submit', gameGet)