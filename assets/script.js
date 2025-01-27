/*GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score */
//will contain a question grabbed from an array

var questions = [
  {
  question: "Commonly used data types DO NOT include:",
  options: ["Strings",
            "Booleans",
            "Alerts",
            "Numbers"],
  answer:   "Alerts",
  },
  {
  question: "Inside which HTML element do we put the JavaScript?",
  options:  ["<scripting>",
            "<script>",
            "<js>",
            "<javascript>",],
  answer: "<script>",
  },
  {
  question: "What is the correct syntax for referring to an external script called 'script.js'?",
  options: ["<script name='script.js'>",
            "<script href='script.js'>",
            "<script src='script.js'>",
            "<script text='script.js'>"],
  answer: "<script src='script.js'>",
  },
  {
  question: "How do you write 'Hello everybody!' in an alert box?",
  options: ["alert('Hello everybody!');",
            "alertText('Hello everybody!');",
            "alertBox('Hello everybody!');",
            "alertPrompt('Hello everybody!');"],
  answer: "alert('Hello everybody!');",
  },
  {
  question: "How do you call a function named 'startFunction'?",
  options: ["call startFunction( )",
            "get function startFunction( )",
            "execute startFunction( )",
            "startFunction( )"],
  answer: "startFunction( )"
  },
];

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector('#seconds');
var questionContent = document.querySelector("#questions");
var heading = document.querySelector(".heading");
var buttonWrapper = document.querySelector("#button-wrapper");
var penalty = 10;
var points = 5;
var ulCreate = document.createElement('ul');
var startBtn = document.querySelector("#start-quiz");
var seconds = document.querySelector("#seconds")
var timeHeading = document.querySelector("#time");
var timeLeft = 80;
var timeInterval=0;

startBtn.addEventListener("click", function () {
    if (timeInterval === 0) {
      timeInterval = setInterval(function () {
        timeLeft--;
        seconds.textContent = timeLeft;

        if (timeLeft <= 0) {
          clearInterval(timeInterval);
          quizCompleted();
          timeHeading.textContent = "";
          seconds.textContent = "Outta Time!";
          seconds.setAttribute("style", "font-size: 25px");
        }
      }, 1000);
    }
    displayQuestion (questionIndex);
  });

function displayQuestion (questionIndex) {
  questionContent.innerHTML = "";
  ulCreate.innerHTML = "";
  buttonWrapper.innerHTML = "";

  for (var i = 0; i <questions.length; i ++) {
    var renderQuestion = questions[questionIndex].question;
    var renderOptions = questions[questionIndex].options;
    questionContent.textContent = renderQuestion;
  }
  renderOptions.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionContent.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", (checkAnswer));
  })
}
//compares player answer to the correct solution
function checkAnswer(event) {
  var element = event.target;

  if (element.matches("li")) {

      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");
      if (element.textContent == questions[questionIndex].answer) {
          score++;
          createDiv.textContent = "Correct!";
          timeLeft = timeLeft + points;
          createDiv.setAttribute("style", "color:green; padding: 20px");
      } else {
            timeLeft = timeLeft - penalty;
            createDiv.textContent = "Incorrect!";
            createDiv.setAttribute("style", "color:red; padding: 20px");
      }

      questionIndex++;

      if (questionIndex >= questions.length) {
        quizCompleted();
        createDiv.textContent = "You have finished the quiz! You got  " + score + "/" + questions.length + " correct!";
        createDiv.setAttribute("style", "color:black; padding: 20px; border-top: 0px;");
      } else {
        displayQuestion(questionIndex);
      }
      questionContent.appendChild(createDiv);
  }
}

function quizCompleted () {
  heading.innerHTML = "";
  questionContent.innerHTML = "";
  seconds.textContent = timeLeft;

  var newH1 = document.createElement("h1");
  newH1.setAttribute("id", "finalH1");
  newH1.textContent = "The Quiz is Over!";
  questionContent.appendChild(newH1);

  var pTag = document.createElement("p");
  pTag.setAttribute("id", "pTag");
  questionContent.appendChild(pTag);

  if (timeLeft >=0) {
    var timeScore = timeLeft;
    var newPtag = document.createElement("p");
    clearInterval(timeInterval);
    pTag.textContent = "Your score is " + timeScore;
    questionContent.appendChild(newPtag);
  }

  var nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "userInitials");
  nameInput.textContent = "";
  nameInput.placeholder = "Enter your name/initials here!";
  nameInput.setAttribute("style", "border: 2px solid black; font-size: 25px; text-align: center; border-radius:20px; background-color: lightblue; color: red; font-weight: bold; margin: 20px; padding: 20px; width: 80%;");
  questionContent.appendChild(nameInput);

  var scoreSubmit = document.createElement("button");
  scoreSubmit.setAttribute("type", "submit");
  scoreSubmit.setAttribute("style", "font-size: 30px; border-radius: 20px; background-color: blue; color: white; padding: 10px; margin: auto; display: block;");
  scoreSubmit.textContent = "Submit";
  questionContent.appendChild(scoreSubmit);

  scoreSubmit.addEventListener("click", function() {
    var playerName = document.getElementById("userInitials").value;
     {

      var savedScore = {
        initials: playerName,
        score: timeScore
      }
      console.log(savedScore);
      var savedScoreString = JSON.stringify(savedScore);
      localStorage.setItem('savedScore', savedScoreString);

      //var savedStringFromLocalStorage = localStorage.getItem('savedScore');
      //var savedLocalStorageInfo = JSON.parse(savedStringFromLocalStorage);
      //console.log(savedLocalStorageInfo);
    }
    highScores ();
  });

  function highScores () {
    heading.innerHTML = "";
    questionContent.innerHTML = "";
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "highScoreDiv");
    newDiv.nodeValue = nameInput, timeScore;
    questionContent.appendChild(newDiv);

    var storedInfoString = localStorage.getItem("savedScore");
    var savedInfo = JSON.parse(storedInfoString);

    document.getElementById("highScoreDiv").innerHTML = savedInfo;
    console.log(savedInfo);

  }
  var returnSubmit = document.createElement("button");
  returnSubmit.setAttribute("type", "submit");
  returnSubmit.setAttribute("style", "font-size: 30px; border-radius: 20px; background-color: orange; color: blue; padding: 10px; margin: auto; margin-top: 20px; display: block");
  returnSubmit.textContent = "REDO";
  questionContent.appendChild(returnSubmit);

  returnSubmit.addEventListener("click", function() {
    window.location.replace("./index.html");
  })
}
