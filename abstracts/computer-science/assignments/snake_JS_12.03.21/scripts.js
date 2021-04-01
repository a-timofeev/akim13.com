const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
var snakeBody = [];
var speed = 7;
var boost = 7;
var tileCnt = 20;
var tileSize = canvas.width / tileCnt - 2;
var headX = 10;
var headY = 10;
var tailLength = 2; 
var appleX = 5;
var appleY = 5;
var speedX = 0;
var speedY = 0;
var score = 0;
class snakeCtor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
 
document.body.addEventListener("keydown", keyDown);
function keyDown(event){
  // Boost on spacebar
  if (event.keyCode == 32) {
    boost++;
  }
  // Up
  if(event.keyCode == 38) {
    if(speedY == 1)
      return;
    speedY = -1;
    speedX = 0;
  }
  // Down
  if(event.keyCode == 40) {
    if(speedY == -1)
      return;
    speedY = 1;
    speedX = 0;
  }
  // Left
  if(event.keyCode == 37) {
    if(speedX == 1)
      return;
    speedY = 0;
    speedX = -1;
  }
  // Right
  if(event.keyCode == 39) {
    if(speedX == -1)
      return;
    speedY = 0;
    speedX = 1;
  }
}

drawGame();
function drawGame() {
  changeSnakePosition();
  if(gameOver()) {
    return;
  }
  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawSpeed();
  drawScore();
  if (boost == 7) {
    if(score >= 3) {
      speed = 9;
    }
    if (score >= 5) {
      speed = 11;
    }
    if(score >= 7) {
      speed = 13;
    }
    if(score >= 10) {
      speed = 15;
    }
    if(score >= 15) {
      speed = 20;
    }
    if(score >= 20) {
      speed = 25;
    }
    if(score >= 25) {
      speed = 30;
    }
  } else {
    speed = boost;
  }
  setTimeout(drawGame, 1000 / speed);  // 1000 == 1sec
} 
 
function gameOver() {
  var gameOver = false;
  if (speedY == 0 && speedX == 0){
    return false;
  }
  if (headX < 0) {
    gameOver = true;
  }
  else if (headX == tileCnt) {
    gameOver = true
  }
  else if (headY < 0) {
    gameOver = true;
  }
  else if (headY == tileCnt) {
    gameOver = true
  }
  for (var i = 0; i < snakeBody.length; i++) {
    var body = snakeBody[i];
    if (body.x == headX && body.y == headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";
    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }
  return gameOver;
}
 
function drawSpeed() {
  ctx.fillStyle = "white";
  ctx.font = "16px Verdana";
  var drawnSpeed = speed - 6;
  ctx.fillText("Speed: " + drawnSpeed, 3, 33);
}
 
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "16px Verdana";
  ctx.fillText("Score: " + score, 3, 15);
}
 
function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
  ctx.fillStyle = "green";
  for (var i = 0; i < snakeBody.length; i++) {
    var body = snakeBody[i];
    ctx.fillRect(body.x * tileCnt, body.y * tileCnt, tileSize, tileSize);
  }
  snakeBody.push(new snakeCtor(headX, headY));
  while (snakeBody.length > tailLength) { 
    snakeBody.shift();
  }
  ctx.fillStyle = "lime";
  ctx.fillRect(headX * tileCnt, headY * tileCnt, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + speedX;
  headY = headY + speedY;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCnt, appleY * tileCnt, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX == headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCnt);
    appleY = Math.floor(Math.random() * tileCnt);
    tailLength++;
    score++;
  }
}
 

