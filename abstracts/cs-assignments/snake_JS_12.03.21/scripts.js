var head, apple;
var prevDir = "u", nextDir;

function start() {
  head = new component(30, 30, "green", 235, 235);
  generateApple();
  gameArea.start();
}

var gameArea = {
  canvas : document.createElement("canvas"),
  start : function () {
    this.canvas.width = 512;
    this.canvas.height = 512;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 150);
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

function generateApple() {
  randX = Math.floor(Math.random()*500);
  randY = Math.floor(Math.random()*500);
  return apple = new appleFun(randX, randY, 15, 0, 2*Math.PI);
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
  this.collide = function(head) {
    var myLeft = head.x;
    var myRight = head.x + head.width;
    var myTop = head.y;
    var myBottom = head.y + head.height;
    var appleLeft = this.x - this.r;
    var appleRight = this.x + this.r;
    var appleBottom = this.y + this.r;
    var appleTop = this.y - this.r;
    var collision = true;
    if (myBottom < appleTop || myTop > appleBottom || myRight < appleLeft || myLeft > appleRight) {
      collision = false;
    }
    return collision;
  }
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = -1;
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

function moveBody(hx, hy, prevDir, nextDir) {
  var body = new component(30, 30, "lime", hx, hy+30);
  if (prevDir == "u" && nextDir == "l") {
    body.x = hx + 30;
    while (body.y != hy) {
      body.y -= 1;
      body.update();
    }
  }
  else if (prevDir == "u" && nextDir == "r") {
    body.x = hx - 30;
    while (body.y != hy) {
      body.y -= 1;
      body.update();
    }
  }
  else if (prevDir == "d" && nextDir == "l") {
    body.x = hx + 30;
    while (body.y != hy) {
      body.y += 1;
      body.update();
    }
  }
  else if (prevDir == "d" && nextDir == "r") {
    body.x = hx - 30;
    while (body.y != hy) {
      body.y += 1;
      body.update();
    }
  }
  // 
  else if (prevDir == "r" && nextDir == "d") {
    body.y = hy + 30;
    while (body.x != hx) {
      body.y += 1;
      body.update();
    }
  }
  else if (prevDir == "r" && nextDir == "u") {
    body.y = hy - 30;
    while (body.x != hx) {
      body.y += 1;
      body.update();
    }
  }
  else if (prevDir == "l" && nextDir == "d") {
    body.y = hy - 30;
    while (body.x != hx) {
      body.y -= 1;
      body.update();
    }
  }
  else if (prevDir == "l" && nextDir == "u") {
    body.y = hy + 30;
    while (body.x != hx) {
      body.y -= 1;
      body.update();
    }
  }

  prevDir = nextDir;
  body.update();
}

function updateGameArea() {  // TODO fix slowing down of the head.
  if(apple.collide(head)) {
    gameArea.stop();
  } else {
    gameArea.clear();
    if (gameArea.key == 72 && head.speedX != 1) {head.speedX = -1; head.speedY = 0; nextDir = "l";}
    else if (gameArea.key == 76 && head.speedX != -1) {head.speedX = 1; head.speedY = 0; nextDir = "r";}  // elses are to fix rapid key presses
    else if (gameArea.key == 75 && head.speedY != 1) {head.speedY = -1; head.speedX = 0; nextDir = "u";}
    else if (gameArea.key == 74 && head.speedY != -1) {head.speedY = 1; head.speedX = 0; nextDir = "d";}
    moveBody(head.x, head.y, prevDir, nextDir);
    head.newPos();
    head.update();
    apple.update();
  }
}

