var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var bancoDados
var pos
var balloonPosition

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  balloonPosition=database.ref("balao/altura");
  balloonPosition.on("value",readPosition, showError)
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(pos !== undefined){
    if(keyDown("up")){
        savePosition(0,-10);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
        balloon.scale=balloon.scale -0.01;
      }   

    if(keyDown("down")){
        savePosition(0,10);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
        balloon.scale=balloon.scale +0.01;
    }
    if(keyDown("left")){
        savePosition(-10,0);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
    if(keyDown("right")){
        savePosition(10,0);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
}

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function savePosition(x,y){
  bancoDados.ref("balao/altura").set(
      {
          x:pos.x + x,
          y:pos.y + y
      }
  )
}
function readPosition(data){
  pos = data.val();
  balloon.x = pos.x;
  balloon.y = pos.y;
}
function showError(){
  console.log("error")
} 