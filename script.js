const quoteDisplay = document.getElementById("quoteDisplay");
const typingInput = document.getElementById("typingInput");
const scoreDisplay = document.getElementById("scoreDisplay");
const timeDisplay = document.getElementById("timeDisplay");
const errorModal = document.getElementById("errorModal");
const errorMessage = document.getElementById("errorMessage");
const closeButton = document.getElementsByClassName("close-button")[0];
const start = document.getElementById("start");
const avgtimeDisplay = document.getElementById("avgtimeDisplay");

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function getQuotes() {
  fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(quotes) {
    
      startGame(shuffle(quotes).slice(0,10));
    });
    scoreDisplay.innerHTML = "";
    timeDisplay.innerHTML = "";
    errorMessage.innerHTML ="";
  
}

function startGame(quotes) {
  var index = 0;
  var score = 0;
  var startTime = Date.now();
  
  // Function to show the next quote
  function showQuote() {
    quoteDisplay.innerHTML = quotes[index].text;
  }
  
  // Function to handle quote submission
  function handleSubmit(event) {
    if (event.key === "Enter") {
      if (typingInput.value === quotes[index].text) {
        score++;
        scoreDisplay.innerHTML = "Score: " + score;
        index++;
        typingInput.value = "";
        errorMessage.innerHTML = "Correct!";
        } else {
          errorMessage.innerHTML = "Incorrect quote.";
          scoreDisplay.innerHTML = "Score: " + score;
          index++;
          typingInput.value = "";

        }
      }
      if (index === quotes.length) {
        endGame(startTime, score);
      } else {
        showQuote();
      }
    }
    
    function endGame(startTime, score) {
      var endTime = Date.now();
      var timeTaken = (endTime - startTime) / 1000;
      var avgtime = timeTaken / index;
      
      localStorage.setItem("score", score);
      localStorage.setItem("timeTaken", timeTaken);
      
      scoreDisplay.innerHTML = "Final Score: " + score;
      timeDisplay.innerHTML = "Time Taken: " + timeTaken + " seconds";
      avgtimeDisplay.innerHTML = "Average Time Taken: " + avgtime + " seconds";
      
      typingInput.removeEventListener("keypress", handleSubmit);
    }
    
    
    typingInput.addEventListener("keypress", handleSubmit);
    
    
    showQuote();
  }
  

start.addEventListener("click", getQuotes);
  