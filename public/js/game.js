// Targeting area of the form
const form = document.querySelector('.post-game');
const dish = document.querySelector('.form-group');


// Api Information
// Access token
const authorization = 'ta5b18wx16vse70z5zuvikmrtbwbjg';

// Api key
const client_id = 'npvry4nqbcqnp7c32upkzo41fzzwcj';

// Current Secret key
const secretKey = "zknzxg77aaag3061h9g2mcdcuke1py";


// Function to check access token validity.  If it doesn't work it runs a function 
// function checkTokenWorks() {
//     if (gameSearch(input) == err) {
//         accessToken
//     } else {
//         console.log("success!")
//     }
// }


// Function that retrieves access token
function accessToken() {
    axios({
        url: "https://id.twitch.tv/oauth2/token",
        method: 'POST',
        data: {
            'client_id': client_id,
            'client_secret': secretKey,
            'grant_type': "client_credentials"
        },
    })
        .then(response => 
            console.log(response.data)
        )
        .catch(err => {
            console.error(err);
        });
}


// Function for user to input a keyword and get responses of games with their names, cover image, summary, and url
const postGame = (game) => {
    return fetch("https://cors-test-run.herokuapp.com/https://api.igdb.com/v4/games", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Client-ID': client_id,
            'Authorization': `Bearer ${authorization}`,
        },
        body: `fields id, name, cover.image_id, summary, url; where name ~ *"${game}"*; sort rating desc; limit 3;`,
    })
        
}


// Image link for covers or screenshots
// We can determine the size of the image once we start the front end
// images.igdb.com/igdb/image/upload/t_${size}/{${cover.image_id}.jpg
// images.igdb.com/igdb/image/upload/t_1080p/{${cover.image_id}.jpg


// Create cards for each game on the page
let cardContainer;
const gameCards = (games) => {
    let card = document.createElement('div');
    card.className = 'card';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h4');
    title.innerText = games.name;
    title.className = 'card-title';
    
    let image = document.createElement('img');
    image.src = `https://images.igdb.com/igdb/image/upload/t_cover_big/${games.cover.image_id}.jpg`;
    image.className = 'card-image';

    let summary = document.createElement('p');
    summary.innerText = games.summary;
    summary.className = 'card-summary';

    let url = document.createElement('h5');
    url.innerText = games.url;
    url.className = 'card-url';

    cardBody.appendChild(title);
    cardBody.appendChild(image);
    cardBody.appendChild(summary);
    cardBody.appendChild(url);
    card.appendChild(cardBody);
    dish.appendChild(card);

}


const initListOfTasks = (data) => {
    if (cardContainer) {
        document.getElementById('card-container').replaceWith(cardContainer);
        return;
    }

    cardContainer = document.querySelector('.post-container');
    data.forEach((game) => {
        gameCards(game);
    });
};


