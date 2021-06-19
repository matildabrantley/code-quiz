var main = document.getElementsByTagName("main")[0]; //main section where quiz occurs
var mainText = document.getElementById("main-text"); //titles, questions
var startButton = document.getElementById("start");
var questions = [];
var currentQuestion = 0;
var numChoices = 4;

startButton.addEventListener("click", startQuiz);

//multiple choice question
class Question {
    constructor(questionText, choicesText, correct){
        this.questionText = questionText; //string
        this.choicesText = choicesText; //array of strings
        this.correct = correct; //index of correct answer in choices
        this.choiceButtons = new Array(choicesText.length);
    }

    //function sent to button event, needs reference back to this object inside event
    answerQuestion(thisQuestion){
        console.log("answering");
        mainText.textContent = this.questionText;
        currentQuestion++;
    }

    displayQuestion(){
        //set h1 to question text
        mainText.textContent = this.questionText;

        //create, set, append choice buttons and add event listener to each
        for (var i = 0; i < this.choiceButtons.length; i++) {
            this.choiceButtons[i] = document.createElement("button");
            this.choiceButtons[i].setAttribute("class", "choice-button");
            //set choice button text
            this.choiceButtons[i].textContent = (i+1) + ". " + this.choicesText[i];
            //event needs reference back to this object since "this" refers to DOM element while inside event
            var thisObject = this;
            this.choiceButtons[i].addEventListener("click", function() {thisObject.answerQuestion()});
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
    mainText.style.fontSize = "2vw";
    mainText.style.textAlign = "left";
    document.getElementById("instructions").style.display = "none";
    main.removeChild(startButton);
    console.log("starting");
    

    questions[currentQuestion].displayQuestion();
}

