var bg, bgImg;
var player, shooterImg, shooter_shooting;
var edges;
var bullet, bulletgroup, bulletavl = 20;
var enemy, enemygroup;
var bulletimg;
var score = 0;
var life = 200;
var gameState=1;


function preload() {

  shooterImg = loadImage("assets/soldier.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletimg = loadImage("assets/bullet.png")
  bgImg = loadImage("assets/bg5.jpg")

}
function setup() {


  createCanvas(800, windowHeight);
  edges = createEdgeSprites()

  //adding the background image
  bg = createSprite(displayWidth / 3 - 20, displayHeight / 2, 0, 0)
  bg.addImage(bgImg)
  bg.scale = 1.9


  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 150, 50, 50);
  player.addImage(shooterImg)
  player.scale = 1
  player.debug = true
  player.setCollider("rectangle", 0, 0, 100, 250)

  //bullerts
  bulletgroup = new Group();
  //enemy
  enemygroup = new Group();

}

function draw() {
  background(0);
  if(gameState===1){
    player.collide(edges[0]);
    player.collide(edges[1]);
     //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("LEFT_ARROW") || touches.length > 0) {
    player.x = player.x - 30
  }
  if (keyDown("RIGHT_ARROW") || touches.length > 0) {
    player.x = player.x + 30
  }
  if (keyWentDown("space") && bulletavl > 0) {
    bullet = createSprite(player.x, player.y - 100, 10, 10);
    bullet.velocityY = -10;
    bullet.addImage(bulletimg)
    bullet.scale = 0.08;
    bulletgroup.add(bullet)
    bulletavl -= 1
  }
  if (bulletgroup.isTouching(enemygroup)) {
    for (var i = 0; i < bulletgroup.length; i++) {
      for (var j = 0; j < enemygroup.length; j++) {
        if (bulletgroup[i].isTouching(enemygroup[j])) {
          bulletgroup[i].destroy();
          enemygroup[j].destroy();
          score += 5;
        }
      }
    }
  }
  if (enemygroup.isTouching(player)) {
    for (var i = 0; i < enemygroup.length; i++) {
      if (enemygroup[i].isTouching(player)) {
        life = life - 50;
        enemygroup[i].destroy();
      }
    }
  }
  dinosaurs();
  drawSprites();
  showhealthbar();
  fill("white")
  textSize(20)
  text("Score : " + score, 680, 30)
  //text("Bullets : " + bulletavl, 450, 30) 
  if (bulletavl <= 5) {
    fill("black")
    rect(445, 10, 110, 27)
    fill("red")
    textSize(20)

    text("Bullets : " + bulletavl, 450, 30)

  }
  else {

    fill("white")
    textSize(20)
    text("Bullets : " + bulletavl, 450, 30)
  }
  if(life<=0||bulletavl<=0){
    gameState=2;
  }
  }
  else if(gameState==2){
   background("black");
   fill("white") ;
   textSize(40)
   text("GAME OVER",300,displayHeight/2)
  }
 

 
}

function dinosaurs() {
  if (frameCount % 90 == 0) {
    enemy = createSprite(30, -10, 20, 20);
    enemy.velocityY = 5;
    enemy.x = random(20, 780);
    enemy.lifetime = 200;
    enemygroup.add(enemy);
  }
}
function showhealthbar() {
  fill("white")
  noStroke()
  rect(40, 20, 185, 20)
  fill("red")
  noStroke()
  if (life > 0) {
    rect(40, 20, life, 20)
  }
}