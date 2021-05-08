var bg,bgImage;
var bird,birdImage,birdCollided;
var tower,towerImage;
var plane,planeImage;
var balloon,ballonImage;
var edges;
var planeGroup,balloonGroup,towerGroup,sharkImage;
var stone,stoneImage,stoneGroup;
var start,startImage;
var button,buttonImage;
var reset,resetImage;
var hitSound;
var clickingSound;
var aboutUs,aboutUsImage;
var help,helpImage,exit,exitImage,heartImage;
var life,lifeImage;
var chirpingSound;
var energy=1000;
var life=3;
var gameState="start";

function preload(){
  bgImage=loadImage("bg.png");
  birdImage=loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png","bird7.png","bird8.png","bird9.png",
  "bird10.png","bird11.png","bird12.png","bird13.png","bird14.png");
  birdCollided=loadAnimation("bird15.png");
  sharkImage=loadAnimation("shark1.png","shark2.png","shark3.png","shark4.png");
  towerImage=loadImage("tower.png");
  planeImage=loadImage("aeroplane.png");
  balloonImage=loadImage("hotairballoon.png");
  stoneImage=loadImage("stone.png");
  startImage=loadImage("start.png");
  buttonImage=loadImage("play.png");
  resetImage=loadImage("reset.png");
  aboutUsImage=loadImage("about.png");
  helpImage=loadImage("help.png");
  exitImage=loadImage("exit.png");

  heartImage=loadImage("life.png");

  hitSound=loadSound("hit.mp3");
  clickingSound=loadSound("clicking.mp3");
  chirpingSound=loadSound("chirping.mp3");
} 

function setup() {
  createCanvas(displayWidth,displayHeight-150);
  bg=createSprite(displayWidth/2,displayHeight/2-100,displayWidth,displayHeight);
  bg.addImage("bg",bgImage);

  bird=createSprite(200,200,50,50);
  bird.addAnimation("bird",birdImage);
  bird.addAnimation("birdCollided",birdCollided);
  bird.scale=0.65;

  start=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  start.addImage("start",startImage);

  button=createSprite(displayWidth/2,displayHeight/2,50,50);
  button.addImage("button",buttonImage);

  reset=createSprite(displayWidth/2,displayHeight/2+100,50,50);
  reset.addImage("reset",resetImage);
  reset.scale=0.2;

  aboutUs=createSprite(displayWidth/2+200,displayHeight/2,50,50);
  aboutUs.addImage("us",aboutUsImage);
  aboutUs.scale=0.45;

  help=createSprite(displayWidth/2-200,displayHeight/2,50,50);
  help.addImage("help",helpImage);
  help.scale=0.5;

  exit=createSprite(displayWidth-100,100,50,50);
  exit.addImage("exit",exitImage);
  exit.scale=0.3;

  edges=createEdgeSprites();

  planeGroup=new Group();
  balloonGroup=new Group();
  towerGroup=new Group();
  stoneGroup=new Group();
  sharkGroup=new Group();

}
function draw() {
  background("#1e8bb7");
  drawSprites();

  if(gameState==="start"){
    start.visible=true;
    button.visible=true;
    bg.visible=false;
    bird.visible=false;
    reset.visible=false;
    exit.visible=false;
    help.visible=true;
    aboutUs.visible=true;

    textSize(60);
    fill("white");
    stroke("black");
    strokeWeight(9);
    text("SAVE THE BIRD, SAVE THE WORLD",displayWidth/2-500,100);

    if(mousePressedOver(button)){
      clickingSound.play();
      gameState="play";
    }
    if(mousePressedOver(aboutUs)){
      gameState="about";
      clickingSound.play();
    }

    if(mousePressedOver(help)){
      gameState="help";
      clickingSound.play();
      }
  }

  if(gameState==="help"){
    
    exit.visible=true;
    start.visible=false;
    button.visible=false;
    help.visible=false;
    bg.visible=false;
    aboutUs.visible=false;
    bird.visible=false;
    reset.visible=false;

    textSize(40);
    fill("white");
    stroke("black");
    strokeWeight(5);
    text("RULES",displayWidth/2-100,50);

    if(mousePressedOver(exit)){
      gameState="start";
      clickingSound.play();
      }

    //TYPE TEXT HERE
    textSize(30);
    fill("white");
    stroke("black");
    text(" * Bird should not touch shark,hotairballoon,plane,toweretc.",20,150);
    text(" * If bird touches shark,hotairballoon,plane,tower etc than birds life would get decrease and if energy would go to 0 than game  would end.",20,200);
    text(" * Bird energy would get decrease if bird doesnt drink water.",20,250);
    text(" * Bird energy can get increase by drinking water from the river.",20,300);
    
  }

  if(gameState==="about"){
   
    exit.visible=true;
    start.visible=false;
    button.visible=false;
    help.visible=false;
    aboutUs.visible=false;
    bg.visible=false;
    bird.visible=false;
    reset.visible=false;

    textSize(40);
    fill("white");
    stroke("black");
    strokeWeight(5);
    text("ABOUT US",displayWidth/2-100,50);

    if(mousePressedOver(exit)){
      gameState="start";
      clickingSound.play();
      }

    //TYPE TEXT HERE
    textSize(35);
    fill("white");
    stroke("black");
    strokeWeight(2);
    text(" * My name is Komal Ghiya.",20,150);
    text(" * My present age is 13.",20,200);
    text(" * I have completed my project with my teacher Tanuja Lawaniya.",20,250);
    text(" * I have been inspired by the movie ROBOT 2.0.",20,300);
    text(" * In summer season we should put water bucket on top of tower so that birds can drink water.It is gonna help birds in their ",20,350);
    text("  survival.",20,400)
  }

   
  bird.collide(edges);
  

  if(gameState==="play"){

    aboutUs.visible=false;
    help.visible=false;
    reset.visible=false;
    start.visible=false;
    button.visible=false;
    bg.visible=true;
    bird.visible=true;

    bg.velocityX=-4;
    energy=Math.floor(energy - 0.10);

  
    fill("blue");
    textSize(40);
    stroke("black");
    strokeWeight(3);
    text("ENERGY "+energy,displayWidth-400,100);

    if(bg.x<0){
      bg.x=800;
    }

    if(keyDown(UP_ARROW)){
      chirpingSound.play();
      bird.velocityY=-5;
    }

    if(keyDown("space")){
      chirpingSound.play();
      bird.velocityY=-15;
    }

    if(keyDown(LEFT_ARROW)){
      chirpingSound.play();
      bird.x=bird.x-3;
    }
    if(keyDown(RIGHT_ARROW)){
      chirpingSound.play();
      bird.x=bird.x+3;
    }
    bird.velocityY+=0.5;

    spawnshark();
    spawntower();
  
    var num=Math.round(random(1,2));
    if(num===1){
      spawnPlane();
    }
    if(num===2){
      spawnBalloon();
    }

    if(bird.y>400){
      energy=energy+5;
    }

    if(bird.isTouching(planeGroup) ||  bird.isTouching(sharkGroup) || bird.isTouching(balloonGroup) || bird.isTouching(stoneGroup) || bird.isTouching(towerGroup)){
      hitSound.play();
      planeGroup.destroyEach();
      balloonGroup.destroyEach();
      stoneGroup.destroyEach();
      sharkGroup.destroyEach();
      towerGroup.destroyEach();
      life=life-1;
    }
    if(life===3){
      image(heartImage,50,50,70,70);
      image(heartImage,95,50,70,70);
      image(heartImage,140,50,70,70);

    }
    if(life===2){
      image(heartImage,50,50,70,70);
      image(heartImage,95,50,70,70);
    }
    if(life===1){
      image(heartImage,50,50,70,70);
    }
    if(life===0 || energy===0){
      gameState="end";
    }
    
    }
  
    if(gameState==="end"){
    fill("red");
    textSize(200);
    stroke("black");
    strokeWeight(3);
    text("GAME OVER",displayWidth/2-600,displayHeight/2+50);
    bg.velocityX=0;
    bird.velocityY=6;
  
    bird.changeAnimation("birdCollided",birdCollided);

    reset.visible=true;

    if(mousePressedOver(reset)){
      clickingSound.play();
      restart();
    }

    towerGroup.setVelocityXEach(0);
    towerGroup.setLifetimeEach(-1);
    planeGroup.setVelocityXEach(0);
    planeGroup.setLifetimeEach(-1);
    balloonGroup.setVelocityXEach(0);
    balloonGroup.setLifetimeEach(-1);
    stoneGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
    sharkGroup.setVelocityXEach(0);
    sharkGroup.setLifetimeEach(-1);

    fill("blue");
    textSize(50);
    stroke("black");
    strokeWeight(3);
    text("ENERGY "+energy,displayWidth/2-150,100);
    }
 
}
function restart(){
  gameState="play";
  bird.x=50;
  bird.y=50;
  bird.changeAnimation("bird",birdImage);
  towerGroup.destroyEach();
  balloonGroup.destroyEach();
  planeGroup.destroyEach();
  stoneGroup.destroyEach();
  energy=1000;
  life=3;
}

function spawntower(){
  if(frameCount%200===0){
    tower=createSprite(displayWidth,displayHeight/2+100,50,50);
    tower.addAnimation("tower",towerImage);
    tower.velocityX=-4;
    tower.scale=0.7;
    tower.lifetime=450;
    towerGroup.add(tower);
    

    //spawning stones
    stone=createSprite(displayWidth,620,50,50);
    stone.addImage("stone",stoneImage);
    stone.velocityX=-(random(3,15));
    stone.velocityY=-6;
    stone.scale=0.1;
    stone.lifetime=450;
    stoneGroup.add(stone);
  }
}

function spawnPlane(){
  if(frameCount%200===0){
    plane=createSprite(displayWidth,200,50,50);
    plane.y=random(50,300);
    plane.addImage("aeroplane",planeImage);
    plane.velocityX=-10
    plane.scale=0.3;
    plane.lifetime=450;
    planeGroup.add(plane);
  }
}

function spawnBalloon(){
  if(frameCount%200===0){
    balloon=createSprite(displayWidth,200,50,50);
    balloon.y=random(50,300)
    balloon.addImage("balloon",balloonImage);
    balloon.velocityX=-4;
    balloon.scale=0.3;
    balloon.lifetime=450;
    balloonGroup.add(balloon);
  }
}

function spawnshark(){
  if(frameCount%50===0){
    shark=createSprite(displayWidth,300,50,50);
    shark.y=random(700,displayWidth-100)
    shark.addAnimation("shark",sharkImage);
    shark.velocityX=-10;
    shark.scale=0.3;
    shark.lifetime=450;
    sharkGroup.add(shark);
  }
}
