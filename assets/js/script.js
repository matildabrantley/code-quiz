var main = document.getElementsByTagName("main")[0]; //main section where quiz occurs
var mainText = document.getElementById("main-text"); //titles, questions
var questionBox = document.getElementById("question-box");
var startButton = document.getElementById("start");
var viewScoresElement = document.getElementById("view-scores");
var scoreText = document.getElementById("score");
var questions = [];
var currentQuestion;
var score;
var scoreTimer;

startButton.addEventListener("click", startQuiz);
viewScoresElement.addEventListener("click", viewHighScores);

//multiple choice question
class Question {
    constructor(questionText, choicesText, correct){
        this.questionText = questionText; //string
        this.choicesText = choicesText; //array of strings
        this.correct = correct; //index of correct answer in choices
        this.choiceButtons = [];
    }

    //function called inside button choice's event
    answerQuestion(choiceButton) {

        questionBox.style.borderBottom = "solid";
        if (choiceButton.value == this.correct){
            document.getElementById("response").textContent = "Correct!";
        } else {
            score -= 10;
            document.getElementById("response").textContent = "Wrong!";
        }

        setTimeout(function(){
            document.getElementById("response").textContent = "";
            questionBox.style.borderBottom = null;
        }, 1000);

        //clear old choices
        this.clearChoices();

        //display next question
        currentQuestion++;
        if (currentQuestion  < questions.length)
            questions[currentQuestion].displayQuestion();
        else
            endQuiz();

    }

    displayQuestion() {
        //set h1 to question text
        mainText.textContent = this.questionText;

        //add each button
        for (var i = 0; i < this.choicesText.length; i++)
            this.addChoice(i);
    }

    //create, set, append choice button, add event listener, push choiceButtons array
    addChoice(i) {
        var newChoice = document.createElement("button");
        newChoice.setAttribute("class", "choice-button");
        newChoice.setAttribute("value", i);
        //set choice button text
        newChoice.textContent = (i+1) + ". " + this.choicesText[i];
        //event needs reference back to this object since "this" refers to DOM element while inside event
        var thisObject = this;
        newChoice.addEventListener("click", function() {thisObject.answerQuestion(this)});
        questionBox.appendChild(newChoice);
        this.choiceButtons.push(newChoice);
    }

    //remove every choice button
    clearChoices() {
        for (var i = 0; i < this.choiceButtons.length; i++)
            questionBox.removeChild(this.choiceButtons[i]);
    }
}


function startQuiz() {
    console.log("startQuiz");
    main.style.left = "30%";
    mainText.style.fontSize = "2vw";
    mainText.style.textAlign = "left";
    document.getElementById("annoucement").textContent = "";
    startButton.style.display = "none"; //simply hide start button
    console.log("starting");
    
    //start score countdown timer
    scoreTimer = setInterval(function(){
        //creeping redness from sides as score goes down for suspense!
        document.getElementById("body").style.backgroundImage = "radial-gradient(circle, white, white, red " + (100+score) + "%)";
        //if (score < 25)
            //document.getElementById("body").style.backgroundImage = "radial-gradient(circle, white, white, red " + (100+score) + "%)";
        score -= 0.1;
        scoreText.textContent = round(score);
        if (score <= 0)
            endQuiz();
    }, 100);

    createQuestions();
    score = 100;
    currentQuestion = 0;
    questions[currentQuestion].displayQuestion();
}


function endQuiz() {
    console.log("endQuiz");
    clearInterval(scoreTimer);
    mainText.textContent = "All Done!";
    main.style.left = "40%";

    //clear lingering buttons when game ends at zero
    if (score <= 0)
        questions[currentQuestion].clearChoices();
    questions = [];

    //announce final score
    scoreText.textContent = round(score);
    document.getElementById("annoucement").textContent = "Your final score is " + round(score)  + ".";

    document.getElementById("initials-form").style.display = "block";
    var submitButton= document.getElementById("submit");
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        var initials = document.querySelector("#initials").value;
        document.getElementById("initials-form").style.display = "none";
        updateHighScores([initials, round(score)]);
        finalMenu();
    });
}

function finalMenu(){
    console.log("finalMenu");
    var backButton = document.createElement("button");
    backButton.textContent = "Go Back";
    backButton.addEventListener("click", function() {

        mainText.textContent = "Coding Quiz Challenge";
        document.getElementById("annoucement").textContent = "Try to answer the following code-related questions within" + 
        "the time limit. Keep in mind that incorrect answers will penalize your time score by ten seconds.";
        main.removeChild(this);

        originalStyles(); //bring back original css styles 
    });
    main.appendChild(backButton);

    //Add clear high scores button
    var clearButton = document.createElement("button");
    clearButton.textContent = "Clear High Scores";
    clearButton.addEventListener("click", function() {
        localStorage.clear();
        main.removeChild(this);
    });
    main.appendChild(clearButton);
}

function updateHighScores(initials){
    console.log("updateHighScores");
    //if first person to score
    if (localStorage.getItem("highScores") === null)
        localStorage.setItem("highScores", JSON.stringify(new Array())); //stringify empty array... *head scratch*
    //create local array to store highScore array of initials from localStorage
    var highscoreArray = JSON.parse(localStorage.getItem("highScores"));
    //push new item to local array
    highscoreArray.push(initials);

    //sort high scores based on 
    highscoreArray = highscoreArray.sort(function(score1, score2) {
        return score2[1] - score1[1];
    });

    //set localStorage to updated array
    localStorage.setItem("highScores", JSON.stringify(highscoreArray));
}

 function getHighScores(){
     return JSON.parse(localStorage.getItem("highScores"));
 }

 function viewHighScores(){
    console.log("viewHighScores");
    var highScoresArray = getHighScores(); //retrieve high scores from localStorage
    var highScoresSection = document.getElementById("high-scores");
    document.getElementById("view-scores").textContent = "Hide High Scores";
    var scoresList = document.createElement("ol");
    highScoresSection.append(scoresList);
    for (var i = 0; i < highScoresArray.length; i++){
        var listItem = document.createElement("li");
        listItem.textContent = highScoresArray[i][1];
        scoresList.append(listItem);
    }  

    document.getElementById("view-scores").textContent = "Hide High Scores";
    viewScoresElement.removeEventListener("click", viewHighScores);
    viewScoresElement.addEventListener("click", function(){
        scoresList.remove();
        viewScoresElement.addEventListener("click", viewHighScores);
        document.getElementById("view-scores").textContent = "Show High Scores";
    });
}

//round to one decimal place (for really close scores)
function round(value) {return Math.round(value * 10) / 10;}

//Reverts every element back to its original style! 
function originalStyles() {
    console.log("originalStyles");
    //select every element in the DOM
    var elements = document.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++) {
        //get a string of all styles on this element
        var styles = elements[i].getAttribute("style");
            if (styles != null) { //ignore nulls
                //break up styles string into an array
                styles = styles.split(';');
                styles.pop(); //remove empty string at end
                for (var j = 0; j < styles.length; j++){
                    //split style name from its value
                    var styleName = styles[j].split(":"); 
                    styleName = styleName[0].trim();
                    //revert style to original with null
                    elements[i].style[styleName] = null;
                }
            }
    }
}

function createQuestions () {
    questions.push(new Question("The HTML <h1> tag is the _____ size heading", ["Smallest", "Medium", "Largest",], 2));
    questions.push(new Question("What JavaScript function returns an HTML element by its ID?", ["getId()", "findElementById()", "importElement()", "getElementById()"], 3));
    questions.push(new Question("Where is a webpage's localStorage held?", ["Client-side", "Server-side", "Both", "Neither"], 0));
    questions.push(new Question("What JavaScript syntax separates multiple name:value pairs within objects?", [",", ";", "!", "=", "#", "$"], 0));
    questions.push(new Question("Bootstrap is a framework for which language?", ["JavaScript", "Java", "CSS", "PHP"], 2));
    questions.push(new Question("Which data type is used to switch values between only two states?", ["On-Off", "Boolean", "Object", "String"], 1));
    questions.push(new Question("Which JavaScript keyword refers to the (closest) object it belongs to?", ["Let", "Home", "Here", "This"], 3));
    questions.push(new Question("Which JavaScript keyword makes a template for creating objects (provided a constructor)?", ["function", "template", "construct", "class"], 3));
    questions.push(new Question("True or False: As analogy, if HTML is the noun and CSS the adjective/adverb, JavaScript is most like the verb.", ["True", "False"], 0));
}