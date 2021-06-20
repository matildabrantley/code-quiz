var main = document.getElementsByTagName("main")[0]; //main section where quiz occurs
var mainText = document.getElementById("main-text"); //titles, questions
var startButton = document.getElementById("start");
var scoreText = document.getElementById("score");
var questions = [];
var currentQuestion = 0;
var score = 100;
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

questions.push(new Question("As analogy, if HTML is the noun and CSS the adjective/adverb, JavaScript is most like what?", ["Verb", "Pronoun", "Preposition", "Conjunction"], 0));
questions.push(new Question("What JavaScript function returns an HTML element by its ID?", ["getId()", "findElementById()", "importElement()", "getElementById()"], 3));
questions.push(new Question("What JavaScript syntax separates multiple name:value pairs within objects?", [";", ",", "#", "$"], 1));
questions.push(new Question("Bootstrap is a framework for which language?", ["JavaScript", "Java", "CSS", "PHP"], 2));
questions.push(new Question("Which data type is used to switch values between only two states?", ["On-Off", "Boolean", "Object", "String"], 1));
questions.push(new Question("Where is a webpage's localStorage held?", ["Server-side", "Client-side", "Depends", "Neither"], 1));
questions.push(new Question("Which JavaScript keyword refers to the (closest) object it belongs to?", ["Let", "Home", "Here", "This"], 3));
questions.push(new Question("Which JavaScript keyword makes a template for creating objects (provided a constructor)?", ["function", "template", "construct", "class"], 3));

function startQuiz(){
    main.style.left = "30%";
    mainText.style.fontSize = "2vw";
    mainText.style.textAlign = "left";
    document.getElementById("instructions").textContent = "";
    main.removeChild(startButton);
    console.log("starting");
    
    //start score countdown timer
    scoreTimer = setInterval(function(){
        score--;
        scoreText.textContent = score;
    }, 1000);

    questions[currentQuestion].displayQuestion();
}

function endQuiz() {
    clearInterval(scoreTimer);
    mainText.textContent = "All Done!";
    mainText.style.fontSize = "4vw";
    mainText.style.textAlign = "center";
    main.style.left = "40%";
    document.getElementById("instructions").textContent = "Your final score is " + score  + ".";
}


