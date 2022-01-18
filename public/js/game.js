// Require axios to access igdb database
const axios = require('axios');
// Api Information
// Access token
const authorization = 'ta5b18wx16vse70z5zuvikmrtbwbjg';
// Api key
const client_id = 'npvry4nqbcqnp7c32upkzo41fzzwcj';
// Current Secret key
const secretKey = "zknzxg77aaag3061h9g2mcdcuke1py";
// Function to check access token validity.  If it doesn't work it runs a function
// checkTokenWorks() {
//     if ()
// }
// Function that retrieves access token


// function accessToken() {
//     axios({
//         url: "https://id.twitch.tv/oauth2/token",
//         method: 'POST',
//         data: {
//             'client_id': client_id,
//             'client_secret': secretKey,
//             'grant_type': "client_credentials"
//         },
//     })
//         .then(response => {
//             console.log(response.data);
//         })
//         .catch(err => {
//             console.error(err);
//         });
// }
// Function for user to input a keyword and get responses of games with their names, cover image, summary, and url
const gameSearch = async (event) => {
    event.preventDefault()

    const searchGame = document.querySelector('#game-search').value.trim()
    console.log(searchGame)

    const game = searchGame.toString()
    await axios({
        url: "https://api.igdb.com/v4/games",
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
            'Client-ID': client_id,
            'Authorization': `Bearer ${authorization}`,
        },
        data: `fields id, name, cover.image_id, summary, url; where name ~ *"${game}"*; sort rating asc; limit 10;`,
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.error(err);
        });

}
// accessToken();
// gameSearch(searchGame);


document
    .querySelector('.post-game')
    .addEventListener('submit', gameSearch)
// Image link for covers or screenshots
// We can determine the size of the image once we start the front end
// images.igdb.com/igdb/image/upload/t_${size}/{${cover.image_id}.jpg