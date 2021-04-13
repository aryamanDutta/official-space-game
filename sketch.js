var PLAY = 1;
var END = 0;
var gameState = PLAY;
var shuttle,shuttleImage;
var block,blockImage;
var meteor,meteorImage;
var star,starImage;
var block;
var score; 
var randomYPositionForMeteor;
var randomYPositionForStar;
var over,overImage;



function preload(){
blockImage=loadImage("images/back.jpg");
shuttleImage=loadImage("images/space_shuttle.png");
meteorImage=loadImage("images/space_meteor.png");
starImage=loadImage("images/star.png");
overImage=loadImage("images/over.jpg");
}

function setup(){
 createCanvas(1280,608);
 block=createSprite(400,400,1280,608);
 block.addImage(blockImage);
 block.scale=2;
 //block.x = block.width/2;
 block.velocityX = -4;
 
 
 
shuttle=createSprite(600,600);
shuttle.addImage(shuttleImage);
shuttle.scale=0.12;




meteorGroup= new Group();
starGroup= new Group();


    score=0;

}

function draw(){
    background("white");
    console.log(gameState);
    if (gameState===PLAY){

        if (block.x < 500)
    {
     block.x = block.width/2;
    }


shuttle.x=mouseX;
shuttle.y=mouseY;



if(starGroup.isTouching(shuttle)){
    starGroup.destroyEach();
    score=score+2;
}
    
    
    spawnMeteor();
    spawnStars();

    
    
    if(shuttle.isTouching(meteorGroup)){
        meteorGroup.destroyEach();
        shuttle.destroy();
        starGroup.destroyEach();
        block.destroy();
        gameState=END;
        
    }
    
}
if (gameState === END){
    over=createSprite( 600,300);
    over.addImage(overImage);
    over.scale=0.3;
    starGroup.destroyEach();
 
    
}
drawSprites();

stroke("white");
textSize(25);
text("Score = "+score,350,40);
if (score===10){
    stroke("white");
textSize(25);
text("Well Done",500,40);
}
}


function spawnMeteor(){

    if(frameCount%80===0)
    {
        randomYPositionForMeteor = Math.round(random(100,500));
      meteor = createSprite(1300,randomYPositionForMeteor);
      meteor.addImage(meteorImage)
      meteor.scale=0.1;
      meteor.velocityX=-(3 + 3*score/100);
      meteorGroup.add(meteor);  
      meteor.lifetime = 2000;
    }

}


function spawnStars(){

    if(frameCount%60===0)
    {
        randomYPositionForStar = Math.round(random(100,500));
      star = createSprite(1300,randomYPositionForStar);
      star.addImage(starImage)
      star.scale=0.02;
      star.velocityX=-(2+ 3*score/100);
      starGroup.add(star);
      star.lifetime = 2000;
    }
} 