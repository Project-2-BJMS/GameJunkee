// Targeting area of the form
const form = document.querySelector('.search-game');
const dish = document.querySelector('.post-game');
const formPostGame = document.querySelector('.post-game');


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
        body: `fields id, name, cover.image_id, summary; search "${game}"; where version_parent = null; limit 1;`,
    })
        
}


// Image link for covers or screenshots
// We can determine the size of the image once we start the front end
// images.igdb.com/igdb/image/upload/t_${size}/{${cover.image_id}.jpg
// images.igdb.com/igdb/image/upload/t_1080p/{${cover.image_id}.jpg


// Create cards for each game on the page
let image = document.createElement('img');
let gameTitle = document.createElement('h4');

const gameCards = (games) => {
    let card = document.createElement('div');
    card.className = 'card';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    gameTitle.innerText = games.name;
    gameTitle.className = games.name;
    
    image.src = `https://images.igdb.com/igdb/image/upload/t_720p/${games.cover.image_id}.jpg`;
    image.className = `https://images.igdb.com/igdb/image/upload/t_cover_big/${games.cover.image_id}.jpg`;

    let summary = document.createElement('p');
    summary.innerText = games.summary;
    summary.className = 'card-summary';

    let btn = document.createElement("button");
    btn.innerHTML = "Post Game";
    btn.type = "submit";
    btn.id = "submit-game";
    btn.classList.add('btn', 'primary');
    
    cardBody.appendChild(gameTitle);
    cardBody.appendChild(image);
    cardBody.appendChild(summary);
    card.appendChild(cardBody);
    card.appendChild(btn);
    dish.append(card);
    console.log(btn);
    console.log(image.className);
    console.log(gameTitle.className);

}


const initListOfTasks = (data) => {
    dish.innerHTML = '';
    data.forEach((game) => {
        gameCards(game);
    });
};


// Function to handle when a user submits the feedback form
const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submit invoked');
  
    const gameInput = document.getElementById('game-search');
    // Get the value of the game and save it to a variable
    const gameName = gameInput.value;
    
    // Make a fetch POST request to the server
    postGame(gameName)
        .then(response => 
            response.json()
        )
        .then(data => {
            console.log(data)
            initListOfTasks(data)
        }
        )
        .catch(err => 
            console.error(err)
        );
    gameInput.value = '';
  };
  
  // Listen for when the form is submitted
form.addEventListener('submit', handleFormSubmit);

const handlePostGame = async (event) => {
    event.preventDefault();
    const title = gameTitle.className;
    console.log(title);
    const img_url = image.className;
    console.log(img_url);
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, img_url }),
        headers:  { 'Content-Type': 'application/json' },

    })
    if(response.ok) {
        document.location.replace('/profile')
    } else {
        alert(response.statusText)
    } 
}

formPostGame.addEventListener('submit', handlePostGame)