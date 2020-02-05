var buttonColors = ["red","blue","yellow","green"];
var userClickedPattern = []
var gamePattern = [];
var started = false;
var level = 0;
$(document).keypress(function (){
  if(!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started=true;
  }
});
$(".btn").click(function () {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  animatePress(userChoosenColor);
  playSound(userChoosenColor);
  checkAnswer(userClickedPattern.length-1);
});
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 3);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);

};

function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
};
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
{
  console.log("success");
  if(userClickedPattern.length === gamePattern.length)
  {
    setTimeout(function (){
      nextSequence();
    }, 1000);
  }
}
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function(){
      $(body).addClass("game-over");
    },200);
    $("h1").text("Game Over Press any key to restart");
    startOver();
  }
}

function startOver()
{
  level = 0;
  gamePattern = [];
  started = false;
}
