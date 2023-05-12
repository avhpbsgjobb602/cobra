// define variables for the game
var canvas, ctx;
var snake = [];
var apple = {};
var squareSize = 10;
var score = 0;
var direction = 'right';
var gameLoop;

// start the game when the window loads
window.onload = function() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  createSnake();
  createApple();
  gameLoop = setInterval(paint, 80);
}

// create the initial snake
function createSnake() {
  var length = 5;
  for (var i = length - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
  }
}

// create the apple for the snake to eat
function createApple() {
  apple = {
    x: Math.floor(Math.random() * (canvas.width / squareSize)),
    y: Math.floor(Math.random() * (canvas.height / squareSize))
  }
}

// paint the snake and apple on the canvas
function paint() {
  // set the canvas background to white
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // paint the snake
  ctx.fillStyle = '#000000';
  for (var i = 0; i < snake.length; i++) {
    var cell = snake[i];
    ctx.fillRect(cell.x * squareSize, cell.y * squareSize, squareSize, squareSize);
  }

  // paint the apple
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(apple.x * squareSize, apple.y * squareSize, squareSize, squareSize);

  // update the snake position
  var head = { x: snake[0].x, y: snake[0].y };
  if (direction == 'right') {
    head.x++;
  } else if (direction == 'left') {
    head.x--;
  } else if (direction == 'up') {
    head.y--;
  } else if (direction == 'down') {
    head.y++;
  }
  snake.unshift(head);

  // check if the snake has collided with the apple
  if (head.x == apple.x && head.y == apple.y) {
    score++;
    createApple();
  } else {
    snake.pop();
  }

  // check if the snake has collided with the wall or itself
  if (head.x < 0 || head.x >= canvas.width / squareSize || head.y < 0 || head.y >= canvas.height / squareSize) {
    clearInterval(gameLoop);
    alert('Game Over!');
  }
  for (var i = 1; i < snake.length; i++) {
    if (head.x == snake[i].x && head.y == snake[i].y) {
      clearInterval(gameLoop);
      alert('Game Over!');
    }
  }

  // display the score
  document.getElementById('score').innerHTML = score;
}

// change the snake direction based on keyboard input
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 37 && direction != 'right') {
    direction = 'left';
  } else if (event.keyCode == 38 && direction != 'down') {
    direction = 'up';
  } else if (event.keyCode == 39 && direction != 'left') {
    direction = 'right';
  } else if (event.keyCode == 40 && direction != 'up') {
    direction = 'down';
  }
});
