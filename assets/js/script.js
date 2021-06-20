var main = document.getElementsByTagName("main")[0]; //main section where quiz occurs
var mainText = document.getElementById("main-text"); //titles, questions
var startButton = document.getElementById("start");
var scoreText = document.getElementById("score");
var questions = [];
var currentQuestion;
var score;
var scoreTimer;

startButton.addEventListener("click", startQuiz);

//multiple choice question
class Question {
    constructor(questionText, choicesText, correct){
        this.questionText = questionText; //string
        this.choicesText = choicesText; //array of strings
        this.correct = correct; //index of correct answer in choices
        this.choiceButtons = new Array(choicesText.length);
    }

    //function called inside button choice's event
    answerQuestion(choiceButton){

        if (!(choiceButton.value == this.correct))
            score -= 10;

        //remove previous buttons
        for (var i = 0; i < this.choiceButtons.length; i++)
            main.removeChild(this.choiceButtons[i]);

        //display next question
        currentQuestion++;
        if (currentQuestion  < questions.length)
            questions[currentQuestion].displayQuestion();
        else
            endQuiz();

    }

    displayQuestion(){
        //set h1 to question text
        mainText.textContent = this.questionText;

        //create, set, append choice buttons and add event listener to each
        for (var i = 0; i < this.choiceButtons.length; i++) {
            this.choiceButtons[i] = document.createElement("button");
            this.choiceButtons[i].setAttribute("class", "choice-button");
            this.choiceButtons[i].setAttribute("value", i);
            //set choice button text
            this.choiceButtons[i].textContent = (i+1) + ". " + this.choicesText[i];
            //event needs reference back to this object since "this" refers to DOM element while inside event
            var thisObject = this;
            this.choiceButtons[i].addEventListener("click", function() {thisObject.answerQuestion(this)});
            main.appendChild(this.choiceButtons[i]);
        } 
    }
}


function startQuiz(){
    main.style.left = "30%";
    mainText.style.fontSize = "2vw";
    mainText.style.textAlign = "left";
    document.getElementById("annoucement").textContent = "";
    startButton.style.display = "none"; //simply hide start button
    console.log("starting");
    
    //start score countdown timer
    scoreTimer = setInterval(function(){
        score -= 0.1;
        scoreText.textContent = round(score);
        if (score <= 0)
            endQuiz();
    }, 100);

    score = 100;
    currentQuestion = 0;
    questions[currentQuestion].displayQuestion();
}


function endQuiz() {
    clearInterval(scoreTimer);
    mainText.textContent = "All Done!";
    main.style.left = "40%";
    //clear lingering buttons from game ending suddenly when score hits zero
    var lingeringButtons = document.getElementsByClassName("choice-button");
    for (var i = 0; i < lingeringButtons.length; i++)
        main.removeChild(lingeringButtons[i]);


    scoreText.textContent = round(score);
    document.getElementById("annoucement").textContent = "Your final score is " + round(score)  + ".";

    var backButton = document.createElement("button");
    backButton.textContent = "Go Back";
    backButton.addEventListener("click", function() {

        mainText.textContent = "Coding Quiz Challenge";
        document.getElementById("annoucement").textContent = "Try to answer the following code-related questions within" + 
        "the time limit. Keep in mind that incorrect answers will penalize your time score by ten seconds.";
        main.removeChild(this);

        originalStyles();
    });
    main.appendChild(backButton);

    localStorage.setItem("highScore", round(score));
}

//round to one decimal place (for really close scores)
function round(value) {return Math.round(value * 10) / 10;}

//Reverts every element to its original style in style.css! 
function originalStyles() {
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

questions.push(new Question("The <h1> tag is the _____ size heading", ["Smallest", "Medium", "Largest",], 2));
questions.push(new Question("What JavaScript function returns an HTML element by its ID?", ["getId()", "findElementById()", "importElement()", "getElementById()"], 3));
questions.push(new Question("What JavaScript syntax separates multiple name:value pairs within objects?", [",", ";", "!", "=", "#", "$"], 0));
questions.push(new Question("Bootstrap is a framework for which language?", ["JavaScript", "Java", "CSS", "PHP"], 2));
questions.push(new Question("Which data type is used to switch values between only two states?", ["On-Off", "Boolean", "Object", "String"], 1));
questions.push(new Question("Where is a webpage's localStorage held?", ["Server-side", "Client-side"], 1));
questions.push(new Question("Which JavaScript keyword refers to the (closest) object it belongs to?", ["Let", "Home", "Here", "This"], 3));
questions.push(new Question("Which JavaScript keyword makes a template for creating objects (provided a constructor)?", ["function", "template", "construct", "class"], 3));
questions.push(new Question("True or False: As analogy, if HTML is the noun and CSS the adjective/adverb, JavaScript is most like the verb.", ["True", "False"], 0));
