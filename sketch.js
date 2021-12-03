const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;


var soldier;
var enemy;
var img;
var ground;
var flag;
var fl;
var gameState=0;
var button;
var img2;
var sm;
var background;
var gm;
var gm2;
var ei;
var score=0;
var bullets;
var bi;



var health=1000;
var ri;
var cloudsGroup;
var soldierGroup;
var bulletGroup;
var bulletGroup2;
var cloud;
var m;
var gunSound;
var rock;
var bomb;
var bomb2;
var health2=500;
var bullet2;
var hide;
var fire;
var walk;
var run;
var show;
var stand;
var reset;
var health3=1000;
var health4=1000;
var blast;

function preload(){
  img=loadImage("images/mount.png");
  fl=loadImage("images/Indianflag.png");
  img2=loadImage("images/image (23).png");
  sm=loadImage("images/s2.png");
  sm2=loadImage("images/soldier.png");
  gm2=loadImage("images/image (23).png");
  ei=loadImage("images/enemy.png");
  bi=loadImage("images/bullets.png");
  bi2=loadImage("images/bullets2.png");

ri=loadImage("images/rock.png");
m=loadImage("images/march.png");
bomb= loadImage("images/image (29).png");
blast=loadImage("images/image30.png");

gunSound=loadSound("audio/bullet.mp3");
bomb2=loadSound("audio/bomb.wav");

}

function setup() {
  createCanvas(1200,750);

  database = firebase.database();

  engine=Engine.create();
  world=engine.world;
  ground=createSprite(600,375,1200,50); 
  ground.addImage(gm2);
  ground.scale=1.1;
  
  soldier= createSprite(400,550,150,150);
  soldier.addImage(sm);
  soldier.scale=0.3;
 

  enemy= createSprite(900,500,200,100);
  enemy.addImage(ei);
  enemy.scale=0.8;
 enemy.visible=false;

   
  
  
  flag=createSprite(550,550,20,20);
  flag.addImage(fl);
  flag.scale=0.5;
  button= new Button();

  cloudsGroup = new Group();
  bulletGroup = new Group();
  bulletGroup2 = new Group();
}

function draw() {
  
  Engine.update(engine);

  if(gameState===0){
    button.display();
    drawSprites();
textSize(20);
  fill("black");
  text("enemy country have captured a large area of Kargil",200,300);
  text("two points are most important to be recaptured they are 4574 and 5353 because these points covers a very large area of Kargil",50,345)
  text(" out eof which point 5353 is most difficult to recapture",200,360)
text("13 JAK rifles have been targeted to recapture the point 4574 and 5353 click on this button to start the game ",200,380);
text("Kargi WAR",750,400);

}
  if(gameState===1){

    
    

    
   // console.log(ground.position);
   flag.visible=false;
   //soldier.visible=false;

  spawnClouds();

  

     hide=createButton("hide");
    hide.position(800,580);
  if(hide.mousePressed(function(){
    soldier.visible=false;
   soldier.position.x=1200;
  }));

     fire=createButton("fire");
    fire.position(800,660);
    if(fire.mousePressed(function(){
  soldier.addImage(sm2);
 soldier.scale=0.3;
 var bullet=createSprite(soldier.position.x,soldier.position.y,50,50);
 bullet.addImage(bi2);
 bullet.scale=0.1;
 bullet.velocityX=100;
 gunSound.play();
 bullet.lifetime=20;
 bulletGroup2.add(bullet);
    }));

     run=createButton("run");
    run.position(800,620);
    if(run.mousePressed(function(){
     // soldier.position.x=soldier.position.x+100;
      ground.position.x=ground.position.x+-100;
      score = score + Math.round(getFrameRate()/3);
      health = health - Math.round(getFrameRate()/30);
      soldier.position.x=soldier.position.x+50;
      soldier.addImage(m);
      soldier.scale=1.1;
    }));

    walk=createButton("walk");
   walk.position(840,620);
   if(walk.mousePressed(function(){
  // soldier.position.x=soldier.position.x+10;
   ground.position.x=ground.position.x+-10;
   score = score + Math.round(getFrameRate()/10);
   health = health - Math.round(getFrameRate()/300);
   soldier.position.x=soldier.position.x+5;
   soldier.addImage(m);
   }));

    show=createButton("show");
   show.position(840,580);
   if(show.mousePressed(function(){
    soldier.visible=true;
   soldier.addImage(sm);
   soldier.scale=0.3;
   soldier.position.x=400;
   }));

    stand=createButton("stand");
   stand.position(860,660);
   if(stand.mousePressed(function(){
    soldier.addImage(sm);
   }));

    reset=createButton("reset");
   reset.position(860,700);
   if(reset.mousePressed(function(){
  health=1000;
  score=0;
  soldier.addImage(sm);
  soldier.scale=0.3;
  soldier.position.x=400;
  soldier.position.y=550;
  health2=500;
  enemy.visible=false;
   }));

   if(cloudsGroup.isTouching(soldier)){
    health = health - Math.round(getFrameRate()/1);
    }
     

   if(score>=200){
    enemy.visible=true;
 bullet2=createSprite(enemy.position.x,enemy.position.y,50,50);
  bullet2.addImage(bi);
  bullet2.scale=0.1;
  bullet2.velocityX=-200;
  bullet2.lifetime=5;
  bulletGroup.add(bullet2);
    }
  
    if(bulletGroup.isTouching(soldier)){
      health = health - Math.round(getFrameRate()/0.90);
    }
      
    

   if (ground.x < 50){
    ground.x = ground.width/2;
  }

  if(soldier.position.x>=1400){
    soldier.position.x=0;
  }
  
  if(bulletGroup2.isTouching(enemy)){
    health2 = health2 - Math.round(getFrameRate()/0.30);
  }
  
  if(health2<=0){
    gameState=2;
  }

   drawSprites();
   
   
   if(health<=0){
    textSize(50);
    fill("red");
    text("Game Over",600,375);
    text("click on reset to restart the game",400,425);
    soldier.pause();
    health=0;
    health2=500;
    soldier.addImage(sm);
    soldier.scale=0.3;
  
  }
   textSize(25);
   fill("black")
   text("Distance Covered:"+score,900,50);
   text("Health:"+health,500,50);
   text("EnemyHealth:"+health2,200,50);
   
  }  

  if(gameState===2){
    textSize(24);
    fill("green");
    text("you recaptured point 4574 its time to recapture point 5353",200,325);
    text("click on next to start level two",200,375);
  var next=createButton("next");
  next.position(200,425);
  if(next.mousePressed(function(){
   gameState=3;
   next.hide();
  }));
}
  


if(gameState===3){
 
   // console.log(ground.position);
   flag.visible=false;
   //soldier.visible=false;

  spawnClouds();
 

bullet2=createSprite(enemy.position.x,enemy.position.y,50,50);
  bullet2.addImage(bi);
  bullet2.scale=0.1;
  bullet2.velocityX=-200;
  bullet2.lifetime=5;
  bulletGroup.add(bullet2);
  
     hide=createButton("hide");
    hide.position(800,580);
  if(hide.mousePressed(function(){
    soldier.visible=false;
   soldier.position.x=1200;
  }));

     fire=createButton("fire");
    fire.position(800,660);
    if(fire.mousePressed(function(){
  soldier.addImage(sm2);
 soldier.scale=0.3;
 var bullet=createSprite(soldier.position.x,soldier.position.y,50,50);
 bullet.addImage(bi2);
 bullet.scale=0.1;
 bullet.velocityX=100;
 gunSound.play();
 bullet.lifetime=20;
 bulletGroup2.add(bullet);
    }));

     run=createButton("run");
    run.position(800,620);
    if(run.mousePressed(function(){
     // soldier.position.x=soldier.position.x+100;
      ground.position.x=ground.position.x+-100;
      score = score + Math.round(getFrameRate()/3);
      health4 = health4 - Math.round(getFrameRate()/30);
      soldier.position.x=soldier.position.x+50;
      soldier.addImage(m);
      soldier.scale=1.1;
    }));

    walk=createButton("walk");
   walk.position(840,620);
   if(walk.mousePressed(function(){
  // soldier.position.x=soldier.position.x+10;
   ground.position.x=ground.position.x+-10;
   score = score + Math.round(getFrameRate()/10);
   health4 = health4 - Math.round(getFrameRate()/300);
   soldier.position.x=soldier.position.x+5;
   soldier.addImage(m);
   }));

    show=createButton("show");
   show.position(840,580);
   if(show.mousePressed(function(){
    soldier.visible=true;
   soldier.addImage(sm);
   soldier.scale=0.3;
   soldier.position.x=400;
   }));

    stand=createButton("stand");
   stand.position(860,660);
   if(stand.mousePressed(function(){
    soldier.addImage(sm);
   }));

    reset=createButton("reset");
   reset.position(860,700);
   if(reset.mousePressed(function(){
  health4=1000;
  soldier.addImage(sm);
  soldier.scale=0.3;
  soldier.position.x=400;
  soldier.position.y=550;
  health3=1000;
 
   }));

   if(cloudsGroup.isTouching(soldier)){
    health4 = health4 - Math.round(getFrameRate()/1);
    }
     

   
  
    if(bulletGroup.isTouching(soldier)){
      health4 = health4 - Math.round(getFrameRate()/0.45);
    }
      
    

   if (ground.x < 40){
    ground.x = ground.width/2;
  }

  if(soldier.position.x>=1400){
    soldier.position.x=0;
  }
  
  if(bulletGroup2.isTouching(enemy)){
    health3 = health3 - Math.round(getFrameRate()/0.30);
  }
  
  if(health3<=0){
    gameState=5;
    enemy.addImage(blast);
  }

   drawSprites();
   
   
   if(health4<=0){
    textSize(50);
    fill("red");
    text("Game Over",600,375);
    text("click on reset to restart the game",400,425);
    soldier.pause();
    health=0;
    health3=500;
    soldier.addImage(sm);
    soldier.scale=0.3;
     
  }
   textSize(25);
   fill("black")
  
   text("Enemy2Health:"+health3,200,80);
   text("Health:"+health4,500,80);
text("level2",100,50);
 
 
}
if(gameState===5){
  textSize(25);
  fill("green");
  text("You Win",600,375);
  text("Click on reset to play again",400,425);
  if(reset.mousePressed(function(){
    gameState=1;
    health=1000;
    score=0;
    soldier.addImage(sm);
    soldier.scale=0.3;
    soldier.position.x=400;
    soldier.position.y=550;
    health2=500;
    enemy.visible=false;
   
     }));
}  
}

 
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 5 === 0) {
     cloud = createSprite(random(0,1200),0,40,10);
    cloud.addImage(bomb);
    cloud.scale = 0.03;
    cloud.velocityY = 100;
    bomb2.play();
    cloudsGroup.add(cloud);
  }
}
