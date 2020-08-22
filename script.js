const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

let score = 0;

const brickColumnCount = 9;
const brickRowCount = 5;

// Canvas API
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ball properties, eg: position x & y
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
};

// Paddle properties
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
};

// Brick properties
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Create ball 
function createBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}


// Create paddle on canvas
function createPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Create bricks
const bricks = [];
for (let i = 0; i < brickColumnCount; i++){
    bricks[i] = [];
    for (let j = 0; j < brickRowCount; j++){
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo}
    }
}

function createBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    })
}

// Show score on canvas
function showScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw on canvas
function draw() {
    createBall();
    createPaddle();
    showScore();
    createBricks();
}

draw();

// Event handlers for Rules btn and close btn
rulesBtn.addEventListener('click', () => {
   rules.classList.add('show');
});

closeBtn.addEventListener('click', () => {
   rules.classList.remove('show');
});
