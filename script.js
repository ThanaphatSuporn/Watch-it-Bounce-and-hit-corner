const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const hitCountLabel = document.getElementById('hitCount');
const cornerCountLabel = document.getElementById('cornerCount');

// Square properties
let square = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 3, // Speed in x-direction
  dy: 3, // Speed in y-direction
  size: 100, // Square size
};

let hitCount = 0;
let cornerCount = 0;

// Game loop
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the square
  ctx.fillStyle = 'red';
  ctx.fillRect(square.x - square.size / 2, square.y - square.size / 2, square.size, square.size);

  // Update square position
  square.x += square.dx;
  square.y += square.dy;

  // Bounce off walls
  let hitVertical = false;
  let hitHorizontal = false;

  if (square.x + square.size / 2 > canvas.width || square.x - square.size / 2 < 0) {
    square.dx = -square.dx;
    hitCount++;
    hitVertical = true;
    updateHits();
  }

  if (square.y + square.size / 2 > canvas.height || square.y - square.size / 2 < 0) {
    square.dy = -square.dy;
    hitCount++;
    hitHorizontal = true;
    updateHits();
  }

  // Check for corner hits
  if (hitVertical && hitHorizontal) {
    cornerCount++;
    updateCornerHits();
  }

  requestAnimationFrame(draw);
}

// Update the hit count
function updateHits() {
  hitCountLabel.textContent = hitCount;
}

// Update the corner hit count
function updateCornerHits() {
  cornerCountLabel.textContent = cornerCount;
}

// Start the game
draw();
