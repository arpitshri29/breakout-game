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

// Move paddle left and right
function movePaddle() {
    paddle.x += paddle.dx;

    // Wall detection for right wall
    if (paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }

    // Wall detection for left wall
    if (paddle.x < 0){
        paddle.x = 0;
    }


}

// Draw on canvas
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    createBall();
    createPaddle();
    showScore();
    createBricks();
}

// Update canvas drawing and animation
function update() {
    movePaddle();

    // Draw everything on canvas
    draw();

    requestAnimationFrame(update)
}

update();

// keydown event
function keyDown(e){
    if (e.key === 'Right' || e.key === 'ArrowRight'){
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft'){
        paddle.dx = - paddle.speed;
    }
}

// keyup event
function keyUp(e){
    if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft'){
        paddle.dx = 0;
    }
}

// Keyboard event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);


// Event handlers for Rules btn and close btn
rulesBtn.addEventListener('click', () => {
   rules.classList.add('show');
});

closeBtn.addEventListener('click', () => {
   rules.classList.remove('show');
});
