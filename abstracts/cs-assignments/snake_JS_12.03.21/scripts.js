var head, apple;

function start() {
  head = new component(30, 30, "green", 235, 235);
  apple = new appleFun(100, 100, 15, 0, 2*Math.PI);
  gameArea.start();
}

var gameArea = {
  canvas : document.createElement("canvas"),
  start : function () {
    //this.generateApple();
    this.canvas.width = 512;
    this.canvas.height = 512;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 10);
    window.addEventListener('keydown', function(e) {
      gameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function(e) {
      gameArea.key = false;
    })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}

function appleFun(x, y, r, startangle, endangle) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.startangle = startangle;
  this.endangle = endangle;
  this.update = function() {
    ctx = gameArea.context;
    ctx.fillStyle = "red";
    ctx.arc(this.x, this.y, this.r, this.startangle, this.endangle);
    ctx.fill();
  }
  this.eat = function(head) {
    var myLeft = head.x;
    var myRight = head.x + head.width;
    var myTop = head.y;
    var myBottom = head.y + head.height;
    var appleLeft = this.x - this.r;
    var appleRight = this.x + this.r;
    var appleBottom = this.y + this.r;
    var appleTop = this.y - this.r;
    var ate = true;
    if (myBottom < appleTop || myTop > appleBottom || myRight < appleLeft || myLeft > appleRight) {
      ate = false;
    }
    return ate;
  }
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

function updateGameArea() {  // TODO fix slowing down of the head.
  if(apple.eat(head)) {
    gameArea.stop();
  } else {
    gameArea.clear();
    if (gameArea.key == 72 && head.speedX != 1) {head.speedX = -1; head.speedY = 0;}
    if (gameArea.key == 76 && head.speedX != -1) {head.speedX = 1; head.speedY = 0;}
    if (gameArea.key == 75 && head.speedY != 1) {head.speedY = -1; head.speedX = 0;}
    if (gameArea.key == 74 && head.speedY != -1) {head.speedY = 1; head.speedX = 0;}
    head.newPos();
    head.update();
    apple.update();
  }
}

