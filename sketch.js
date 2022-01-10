var balloon;
var shadow;
var database, balloonposition;

function preload() {

  backgroundImg = loadImage("bg.jpg");
  hotairballoon = loadImage("Hot Air Ballon-01.png")
  cloudImg = loadImage("cloud.png");
  grass = loadImage("grass.png");
  mount = loadImage("mount.png");
  shadowImg = loadImage("shadow.png");
}

function setup() {
  database = firebase.database();
  createCanvas(windowWidth, windowHeight);
  balloon = createSprite(500, 300, 50, 50);
  balloon.addImage("hotairballoon", hotairballoon);
  balloon.scale = 0.1;

  shadow = createSprite(500, height - 14, 20, 20);
  shadow.addImage(shadowImg);
  shadow.scale = 0.38;

  var ballposition = database.ref("Balloon/Position");
  ballposition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg);
  imageMode(CENTER);
  image(cloudImg, width / 2, height / 2, 1980, height);
  image(mount, width / 2, height - 320, 1980, height / 2);
  image(grass, width / 2, height - 40, 1980, height / 4);


  if (keyDown(LEFT_ARROW)) {
    if (balloon.x > 90) {
      writePosition(-10, 0);
    }
  }

  else if (keyDown(RIGHT_ARROW)) {
    if (balloon.x < width - 90) {
      writePosition(10, 0);
    }
  }

  else if (keyDown(UP_ARROW)) {
    if (balloon.y > 150) {
      writePosition(0, -10);
      shadow.scale = shadow.scale + 0.005;
    }


  }
  else if (keyDown(DOWN_ARROW)) {
    if (balloon.y < height - 150) {
      writePosition(0, 10);
      shadow.scale = shadow.scale - 0.005;
    }

  }

  drawSprites();
}

function readPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
  shadow.x = position.x;
}

function writePosition(x, y) {
  database.ref('Balloon/Position').set({
    'x': balloon.x + x,
    'y': balloon.y + y,
  })
}

function showError() {
  console.log("error");
}