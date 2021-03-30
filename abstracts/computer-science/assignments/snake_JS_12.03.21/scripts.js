var head, body, apple, score;
var prevDir = "u", nextDir;
var applesCnt = 0;

function start() {
  head = new component(30, 30, "green", 235, 235);
  body = new component(30, 30, "lime", head.x, head.y+30); 
  score = new component("30px", "consolas", "black", 5, 30, "text")
  // head.speedY = -1;
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
    if (!(myBottom < appleTop || myTop > appleBottom || myRight < appleLeft || myLeft > appleRight)) {
      applesCnt++;
      // apple.clearRect(this.x, this.y, 30, 30);
      delete apple;
      generateApple();
    }
  }
}

function outOfBounds(hx, hy) {
  if (hx < 0 || hx > gameArea.canvas.width - 30 || hy < 0 || hy > gameArea.canvas.height - 30) {
    return true;
  } else {
    return false;
  }
}

function component(width, height, color, x, y, type) {
  this.type = type;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = gameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

function moveBody(body, hx, hy, prevDir, nextDir) {
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
    body.y = hy - 30;
    while (body.x != hx) {
      body.x += 1;
      body.update();
    }
  }
  else if (prevDir == "r" && nextDir == "u") {
    body.y = hy + 30;
    while (body.x != hx) {
      body.x += 1;
      body.update();
    }
  }
  else if (prevDir == "l" && nextDir == "d") {
    body.y = hy - 30;
    while (body.x != hx) {
      body.x -= 1;
      body.update();
    }
  }
  else if (prevDir == "l" && nextDir == "u") {
    body.y = hy + 30;
    while (body.x != hx) {
      body.x -= 1;
      body.update();
    }
  }
  /*
    8th grade called...
    Asked to give its code back.  
    ¯\_(ツ)_/¯
  */
  body.update();
}

function updateGameArea() { 
  if(outOfBounds(head.x, head.y)) {
    gameArea.stop();
  } else {
    gameArea.clear();
    if (gameArea.key == 37 && gameArea.key && head.speedX != 1) {
      head.speedX = -1; 
      head.speedY = 0; 
      prevDir = nextDir; 
      nextDir = "l";
    }
    else if (gameArea.key == 39 && gameArea.key && head.speedX != -1) {
      head.speedX = 1; 
      head.speedY = 0; 
      prevDir = nextDir; 
      nextDir = "r";
    }
    else if (gameArea.key == 38 && gameArea.key && head.speedY != 1) {
      head.speedY = -1; 
      head.speedX = 0; 
      prevDir = nextDir; 
      nextDir = "u";
    }
    else if (gameArea.key == 40 && gameArea.key && head.speedY != -1) {
      head.speedY = 1; 
      head.speedX = 0; 
      prevDir = nextDir; 
      nextDir = "d";
    }
    apple.collide(head);
    body.speedX = head.speedX;
    body.speedY = head.speedY;
    moveBody(body, head.x, head.y, prevDir, nextDir);
    score.text = "Score: " + applesCnt;
    score.update();
    head.newPos();
    head.update();
    body.newPos();
    body.update();
    apple.update();
  }
}

