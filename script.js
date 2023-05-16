// Created element list by using variables
var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions 
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 75;
var alert =document.getElementById("alert");
var info = document.getElementById("info");
var addscore = document.getElementById("addscore");
var submitresult = document.getElementById("submitresult"); 
var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));

// Mutiple Choice question for user to choose from
var questions = [
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<js>", "<javascript>" , "<script>" , "<script.js>"],
        answer : "<script>"    
    },
    {
        title: "What does CSS stand for?",
        choices: ["Constructive Styling Sheet","Cascading Styling Sheets","Creative Style Sheet", "Cascading Style Sheet"],
        answer : "Cascading Style Sheet"    
    },
    {
        title: "What is a span tag used for?",
        choices: ["To differentiate elements on the DOM","To separate sections of text","To group elements for styling purposes","To create a hyperlink in HTML"],
        answer : "To group elements for styling purposes"    
    },
    {
        title: "Which is not a JavaScript Data Type? ",
        choices: ["String","Boolean","Object","Element","Undefined"],
        answer : "Element"    
    },
    {
        title: "What are all the types of pop up boxes available in JavaScript",
        choices: ["Alert, Confirm, Prompt","Alert, Confirm, Command","Alarm, Confirm, Prompt", "Alarm, Confirm, Notify "],
        answer : "Alert, Confirm, Prompt"    
    },
]

// Click Start Quiz to begin quiz
btnStart.addEventListener("click", startQuiz);
function startQuiz(){
    if(storedScores !==null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions= questions[currentindex]
    console.log(nextQuestions.title)
    
        displayQuestion(nextQuestions)

    gametime()
}
btnScore.addEventListener("click" , function(){
    let name = document.getElementById("inputScore").value
    scorePage(name, count)
});

// Timer set interval
function gametime(){

    var timeinterval = setInterval(function(){
        timer.innerText = count
         count--;
        }, 1000);

}

// Send scores to score.html page
function scorePage(a, b) {

    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "score.html";
}

// Displays current question
function displayQuestion(question){
    titleitem.innerText=question.title
    question.choices.forEach(element => {
     var button =document.createElement("button")
    button.className="btn-primary btn-block text-left"
    button.innerText=element
    // questionanswers.innerHTML=""
    questionanswers.appendChild(button)
    button.addEventListener("click", displaynextQuestion)
    });
}

// Display next question 
function displaynextQuestion(e){
    currentindex++
    if(currentindex < questions.length){
        correction(e.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML=""
        if(currentindex < questions.length){    
            nextQuestions= questions[currentindex]
            displayQuestion(nextQuestions)  
        }else {
            currentindex = 0
            displayQuestion(nextQuestions)  
        }

    }else{
        console.log("endgame")
        endgame()
        

    }
    
     
}

// Displays whether the answered questions was Correct or Incorrect
function correction(response){
    
    if(response){
        alert.innerText= "Correct"
        console.log("Correct")
    }else {
        alert.innerText="Incorrect"
        count = count -10
        timer.innerHTML = count
        console.log("Incorrect")

    }
    setTimeout(function(){
        alert.innerText=""
    
        }, 1000);

}

// Function to clear and end quiz
 function endgame (){
    btnStart.classList.add("d-none")
    myScore.innaText = count
    addscore.classList.remove("d-none")
    timecounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")


 }