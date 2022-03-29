var rocket,rocketImg;
var bullet,bulletImg;
var bg,bgImg;
var alienImg;
var aliensGroup;

var explosionSound;
var bulletSound;
var dieSound;
var love,loveImg;
var score;


function preload(){
alienImg= loadImage("assets/alienUFO.png");
rocketImg = loadImage("assets/rocket.png");
bulletImg = loadImage("assets/bullet.png");
bgImg = loadImage("assets/background.png");
loveImg = loadImage("assets/life.png");
explosionSound = loadSound("assets/explosion.mp3");
bulletSound = loadSound("assets/bulletSound.mp3");
dieSound = loadSound("assets/die.mp3")
}

function setup() {
  createCanvas(600,570);

  bg = createSprite(300,285);
  bg.addImage("backgroundImage",bgImg);

  rocket = createSprite(300,500);
  rocket.addImage("rocketImage",rocketImg);
  rocket.scale = 0.25;

  bullet = createSprite(800,800);
  
  aliensGroup = new Group();

  score = 0;
  life = 3;
 
}

function draw() {
  
  background(180);

  if(keyDown("RIGHT_ARROW") && rocket.x < 570){
    rocket.x = rocket.x+3;
  }

  if(keyDown("LEFT_ARROW") &&  rocket.x > 30){
    rocket.x = rocket.x-3;
  }

  spawnAliens();

  if(keyDown("space") && life > 0){
    bullet = createSprite(300,430);
    bullet.addImage("bulletImage",bulletImg);
    bullet.scale = 0.1;
    bullet.velocityY = -1;
    bullet.x = rocket.x;
    bulletSound.play();
    bulletSound.setVolume(0.1);
  }

  if(aliensGroup.isTouching(bullet)){
     aliensGroup.destroyEach();
     explosionSound.play();
     explosionSound.setVolume(0.1);
     score += 1;
  }


  if(aliensGroup.isTouching(rocket) && life > 0){
    life -= 1;
    rocket.destroy();

    dieSound.play();
    dieSound.setVolume(0.2);

    rocket = createSprite(300,500);
    rocket.addImage("rocketImage",rocketImg);
    rocket.scale = 0.25;
  }

  if(life === 0){
    rocket.destroy();
    aliensGroup.destroyEach();
  }

  for (var i=450; i<=550; i=i+50){
    love = createSprite(i,50,30,30);
    love.addImage("loveImage",loveImg);
    love.scale = 0.04;
  }
   
 drawSprites();

 fill("red");
 textSize(20);
 text("Score: "+score,30,30);
}

function spawnAliens() {
  if (frameCount % 60 === 0) {
    var alien = createSprite(600,120,40,10);
    alien.x = Math.round(random(40,560));
    alien.addImage(alienImg);
    alien.scale = 0.05
    alien.velocityY = 2;
    aliensGroup.add(alien);
  }
}

