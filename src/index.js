// makes a text node like this: 
//  <type>string<\type>
function text_element(type, string) {
    let element = document.createElement(type);
    element.appendChild(document.createTextNode(string));
    return element;
}

// Generalized Fetch Function
function general_fetch(url) {
    return fetch(url).then(res => { return res.json() })
}

// Constant nodes from our HTML file
const gameList = document.querySelector(".game-list")
let gameDetail = document.querySelector(".game-details")

// -------------- #2 && #3 --------------
// When the page loads, show the image, name, and high_score properties of the the first game in the array returned from your fetch.
// When the user clicks on one of the games in the list, display all the details of that game.
function editGameDetails(gameObject) {
    // remove old event listeners
    gameDetail.parentElement.replaceChild(gameDetail.cloneNode(true), gameDetail)
    gameDetail = document.querySelector(".game-details");

    // set image source
    gameDetail.querySelector("#detail-image").setAttribute("src", gameObject["image"]);
    // set game title
    gameDetail.querySelector("#detail-title").textContent = gameObject["name"];
    // set highscore
    gameDetail.querySelector("#detail-high-score").textContent = gameObject["high_score"];

    // #4 The user should be able to enter a high score in the form on the right side and have it show that value for "high score".
    gameDetail.querySelector("#high-score-form").addEventListener("submit", (event) => {
        event.preventDefault();

        // check if there is actually a new highscore in the box
        let scoreInput = event.target.querySelector("#score-input")
        if (scoreInput.value.length > 0) {
            // check if its actually a new highscore
            let oldScore = gameObject["high_score"];
            if (parseInt(oldScore) < parseInt(scoreInput.value)) {
                gameDetail.querySelector("#detail-high-score").textContent = scoreInput.value
                gameObject["high_score"] = parseInt(scoreInput.value);
            }
        }
    });
}

// -------------- #1 --------------
// fetch games from http://localhost:3000/games
// add them to #game-list
// <h5>game_name (game_manufacturer)<\h5>
general_fetch("http://localhost:3000/games").then((data) => {
    
    // #2 show the first game's details by default
    editGameDetails(data[0])

    for (let gameIndex in data) {
        let gameNode = text_element("h5", `${data[gameIndex]["name"]} (${data[gameIndex]["manufacturer_name"]})`)

        // #3 When the user clicks on one of the games in the list, display all the details of that game.
        gameNode.addEventListener("click", () => {
            editGameDetails(data[gameIndex]);
        });

        gameList.appendChild(gameNode);
    }
})