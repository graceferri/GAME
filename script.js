let score = 0;
let player = document.getElementById("player");
let gameContainer = document.querySelector(".game-container");
let scoreDisplay = document.getElementById("score");
let gameWidth = gameContainer.offsetWidth;
let gameHeight = gameContainer.offsetHeight;

let playerSpeed = 15;
let fallingObjects = [];
let gameInterval;

function movePlayer(event) {
  let playerPos = player.getBoundingClientRect();
  if (event.key === "ArrowLeft" && playerPos.left > 0) {
    player.style.left = `${playerPos.left - playerSpeed}px`;
  }
  if (event.key === "ArrowRight" && playerPos.right < gameWidth) {
    player.style.left = `${playerPos.left + playerSpeed}px`;
  }
}

function generateFallingObject() {
  let fallingObject = document.createElement("div");
  fallingObject.classList.add("falling-object");
  
  let randomX = Math.floor(Math.random() * (gameWidth - 30));
  fallingObject.style.left = `${randomX}px`;
  fallingObject.style.top = `-30px`;

  gameContainer.appendChild(fallingObject);
  fallingObjects.push(fallingObject);
}

function updateFallingObjects() {
  fallingObjects.forEach((object, index) => {
    let objectPos = object.getBoundingClientRect();
    object.style.top = `${objectPos.top + 5}px`;

    // Check if the object has hit the player
    let playerPos = player.getBoundingClientRect();
    if (
      objectPos.bottom >= playerPos.top &&
      objectPos.left + 30 >= playerPos.left &&
      objectPos.left <= playerPos.right
    ) {
      score++;
      scoreDisplay.innerText = `Score: ${score}`;
      object.remove();
      fallingObjects.splice(index, 1);
    }

    // Remove the object if it goes out of bounds
    if (objectPos.top > gameHeight) {
      object.remove();
      fallingObjects.splice(index, 1);
    }
  });
}

function gameLoop() {
  updateFallingObjects();
  if (Math.random() < 0.05) {
    generateFallingObject();
  }
}

document.addEventListener("keydown", movePlayer);

function startGame() {
  gameInterval = setInterval(gameLoop, 30);
}

startGame();
