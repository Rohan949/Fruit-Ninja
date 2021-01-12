var fruit1,fruit2,fruit3,fruit4,fruitGroup,enemyGroup;
var alien1,alien2;
var sword,knife;
var PLAY=1;
var END=0;
var gameState=1;
var gameOver;

function preload(){
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  swordImage  = loadImage("sword.png");
  alien1=loadAnimation("alien1.png");
  alien2=loadAnimation("alien2.png");
  gameOverImage=loadImage("gameover.png");
  gameOverSound= loadSound("gameover.mp3");
  knife=loadSound("knifeSwooshSound.mp3")
 }
 

function setup(){
  createCanvas(500, 500);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  fruitGroup=new Group();
  enemyGroup=new Group();
  score=0
  
  gameOver=createSprite(220,200,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale=2;
  
    sword.setCollider("circle",0,0,30);
  sword.debug = false; 

}
function draw(){
 background("aqua");
    

  if(gameState === PLAY){
     sword.y=World.mouseY;
    sword.x=World.mouseX;
    fruits();
    enemies();
    gameOver.visible=false;
    if (fruitGroup.isTouching(sword)){
     fruitGroup.destroyEach();
      score=score+2;
      knife.play();
    }
    if (enemyGroup.isTouching(sword)){
      gameOver.visible=true;
      gameState=END;
      gameOverSound.play();
    }
  }
    else if(gameState === END){
    if(keyDown("space")){
      gameState=PLAY;
      score=0;
    }
  }
  function fruits(){
    if(World.frameCount%80===0){
      var fruit=createSprite(400,200,20,20);
      fruit.scale=0.2;
      r=Math.round(random(1,4))
      if (r==1){
        fruit.velocityX=-(7+(score/4))
        fruit.addImage(fruit1);
      } else if (r==2) {
     fruit.velocityX=-(7+(score/4))
        fruit.addImage(fruit2);
      }else if(r==3){
       
  fruit.velocityX=-(7+(score/4))
        fruit.addImage(fruit3);
        }
      else{
     fruit.velocityX=-(7+(score/4))
        fruit.addImage(fruit4);
      }
      fruit.y=Math.round(random(50,340));
      fruit.velocityX=-10;
      fruit.setLifetime=100;
      fruitGroup.add(fruit);
     }
    }
  function enemies(){
    if(World.frameCount%200===0){
 var monster=createSprite(400,200,20,20);
      r=Math.round(random(1,2))
      if (r==1){
        monster.addAnimation("moving",alien1);
      } else if (r==2) {
        monster.addAnimation("moving",alien2);
      }
      monster.y=Math.round(random(100,300));
      monster.velocityX=-10;
      monster.setLifetime=50;
      enemyGroup.add(monster);
    }
    
    
 }
  drawSprites();
  //set stroke color
    stroke(255,204,0);
   //size of text
  textSize(20); 
  //text
    text("Score: "+ score, 300,50);
}

  
  
