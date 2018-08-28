var numSquares = 6;
var colors = [];
var goalColor;
var squares = document.querySelectorAll(".square");
var body = document.querySelector("body");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
  //Mode Buttons event listeners
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("btn--active");
      modeButtons[1].classList.remove("btn--active");
      this.classList.add("btn--active");

      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
}

function setupSquares() {
  for(var i = 0; i < squares.length; i++){
    //add click listeners to squares
    squares[i].addEventListener("click", function(){
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor
      //compare color to picked color
      if (clickedColor === goalColor){
        document.querySelector("h1").style.backgroundColor = goalColor;
        for (var j = 0; j < squares.length; j++){
          squares[j].style.backgroundColor = goalColor;
        }
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
      } else {
          this.style.backgroundColor = "#232323";
          messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset(){
  //Generating new colors
  colors = generateRandomColors(numSquares);

  //Picking new color
  goalColor = pickColor();

  //Resetting h1 color
  document.querySelector("h1").style.backgroundColor = "#f48b8d";

  //Update messages
  colorDisplay.textContent = goalColor.toUpperCase();
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  for (var i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.backgroundColor = "#232323";
    }
    body.style.backgroundColor = "#232323";
  }
}

resetButton.addEventListener("click", function(){
  reset();
});

function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  var arr = [];

  for (var i = 0; i < num; i++){
    arr.push(randomColor());
  }

  return arr;
}

function randomColor(){
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}
