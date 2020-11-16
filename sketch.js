var monkey, monkey_running,monkey_collided;
var ground, invisibleGround, groundImage;

var bananaGroup, bananaImage;
var obstaclesGroup, obstacle,stoneImage;

function preload() {
monkey_running=
loadAnimation ("Monkey_01.png","Monkey_02.png",
"Monkey_03.png","Monkey_4.png","Monkey_05.png",
"Monkey_06.png","Monkey_07.png","Monkey_08.png",
                "Monkey_09.png","Monkey_10.png")
  stoneImage=loadImage("stone.png")
bananaimage=loadImage("banana.png")
}
function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
    ground.x = ground.width /2;
  ground.velocityX = -(4-(3*score/100));
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
}

function draw() {
  background(180);
  
  
  
  if(keyDown("space")) {
    monkey.velocityY = -10;
  }
    monkey.velocityY = monkey.velocityY + 0.9;
    
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
      spawnbananas();
  spawnObstacles();
     //End the game when trex is touching the obstacle
    if(obstaclesGroup.isTouching(monkey)){
      monkey.velocityX = 0
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);   
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
} 
  
  monkey.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
   
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  
score = 0;
  
} 

function spawnbananas() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}