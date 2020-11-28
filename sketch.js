var monkey, monkey_running;
var banana, bananaImage;
var stone, stoneImage;
var ground, groundImage;
var bananaGroup, stoneGroup;
var edges;
var score = 0;
var survivalTime = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,500);
  monkey = createSprite(100,400,10,10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(0,495,1500,10);
  ground.velocityX=-2;
  ground.shapeColor = "brown";
  
  edges = createEdgeSprites();
  bananaGroup = new Group();
  stoneGroup = new Group();
}


function draw() {
  background("green");
  
  survivalTime = Math.round(frameCount/getFrameRate());
  textSize(20);
  stroke("black");
  fill("black");
  text("Score: "+score,400,50);
  text("Survival Time: "+survivalTime,400,100);
  
  if (ground.x<0){
    ground.x = ground.width/2;
  }
  if (keyDown("space")){
    monkey.velocityY=-10;
  }
  monkey.velocityY = monkey.velocityY+0.8;
  monkey.collide(ground);
  
  createBanana();
  createStone();
  
  if (monkey.isTouching(bananaGroup)){
    score = score +1 ;
    bananaGroup.destroyEach();
  }
  drawSprites();
}

function createBanana(){
  if(World.frameCount%80 === 0){
    banana = createSprite(590,150,10,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -3;
    banana.lifetime = 150;
    bananaGroup.add(banana);
    banana.scale = 0.1;
  }
}

function createStone(){
  if(World.frameCount%300 === 0){
    stone = createSprite(590,460,10,10);
    stone.addImage(stoneImage);
    stone.velocityX = -3;
    stone.lifetime = 220;
    stoneGroup.add(stone);
    stone.scale = 0.25;
  }
}



