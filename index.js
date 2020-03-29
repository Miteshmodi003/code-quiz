let quiz = [
    {
        quizQuestion: "What is the syntax for creating a function in JavaScript named as Geekfunc?",
        options: ["function = Geekfunc()", "function Geekfunc()", "function:= Geekfunc()", "function : Geekfunc()"],
        correct: "function Geekfunc()"
    },
    {
        quizQuestion: "How is the function called in JavaScript?",
        options: ["call Geekfunc()", "call function Geekfunc()", "Geekfunc()", "function Geekfunc()"],
        correct: "Geekfunc()"
    },
    {
        quizQuestion: "What is the JavaScript syntax for printing values in Console?",
        options: ["print(5)", "console.log(5);", "console.print(5);", "print.console(5);"],
        correct: "console.log(5);"
    },
    {
        quizQuestion: "What is the method in JavaScript used to remove the whitespace at the beginning and end of any string ?",
        options: ["strip()", "trim()", "stripped()", "trimmed()"],
        correct: "trim()"
    },
    {
        quizQuestion: "Which of the following is an advantage of using JavaScript?",
        options: ["Increased interactivity.", "Less server interaction.", "Immediate feedback from the users.", "All of the above."],
        correct: "All of the above."
    },
    {
        quizQuestion: "JavaScript is a ________ Side Scripting Language.",
        options: ["Server", "ISP", "Browser", "None of the above"],
        correct: "Browser"
    },
];

let quesIndex = 0;
let i = 0;
let hideIntro = document.getElementById("intro"),
    showQues = document.getElementById("questionss"),
    startQuiz = document.getElementById("start"),
    submitName = document.querySelector("button.submitName"),
    timerClock = document.getElementById("timer"),
    saveCurrentScore = document.getElementById("storeTheScore"),
    currentUserScore = document.getElementById("currentScore"),
    quesHeader = document.getElementById("quiz"),
    selections = document.getElementById("selections");
let timeRemaining = (quiz.length * 10 + 1);
let userName, correct;
let lastQuestionSubmitted = false;

function initateTimer() {
    
    hideIntro.classList.add('d-none');
    showQues.classList.remove('d-none');

    setTimer();
    populateQuiz();
}

function setTimer() {

    var countdown = setInterval(function () {
        timeRemaining--;
        timerClock.textContent = "Time: " + timeRemaining;
        
        if (timeRemaining === 0 || lastQuestionSubmitted) {
            clearInterval(countdown);
            setTimeout(showFinalScore, 1000);
        }
    }, 1000);
}

function populateQuiz() {
    correct = quiz[quesIndex].correct;
    quesHeader.textContent = quiz[quesIndex].quizQuestion;
    selections.innerHTML = "";

    var optionChoices = quiz[quesIndex].options;

    for (var i = 0; i < optionChoices.length; i++) {
        let nxtOption = document.createElement("button");
        nxtOption.textContent = optionChoices[i];
        answerBtn = selections.appendChild(nxtOption).setAttribute("class", "btn btn-light btn-block");   
    }

    quesIndex++;
}

// to be executed on completion of quiz
function showFinalScore() {
    // we add d-none bootstrap class on completion of quiz to hide the question content
    document.getElementById("questionss").classList.add('d-none');

    // in order to display final score on the same index page, we remove bootstrap d-none class from storeTheScore id
    saveCurrentScore.classList.remove('d-none');
    currentUserScore.textContent = "Your final score is " + timeRemaining + ".";
}

startQuiz.addEventListener("click", initateTimer);
submitName.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    window.location.href = './scores.html';
});

function addScore() {
    userName = document.getElementById("userName").value;
    let currentScore = {
        name: userName,
        score: timeRemaining
    };
    
    let scoresCollectionVar = JSON.parse(localStorage.getItem("scores") || "[]");
    scoresCollectionVar.push(currentScore)
    localStorage.setItem("scores", JSON.stringify(scoresCollectionVar));
}

function fadeOutResponse(result) {
    result.style.display = 'none';
}

function displayResponse(result) {
    result.removeAttribute('style');
    i++;
}

selections.addEventListener("click", function (event) {
    var result = document.getElementsByClassName("response")[0];
    
    if (correct === event.target.textContent) {
        result.innerHTML = "You got this! Correct Answer!";
        result.style.color = "green";
        setTimeout(fadeOutResponse(result), 1000);
        displayResponse(result);
    } else {
        result.innerHTML = "WRONG ANSWER.";
        result.style.color = "red";
        setTimeout(fadeOutResponse(result), 1000);
        timeRemaining -= 5;
        displayResponse(result);
    }
    
    stopOnLastAnswerSubmission(i);
});

function stopOnLastAnswerSubmission(i) {
    if (i === 5) {
        lastQuestionSubmitted = true;
    }
    else {
        populateQuiz();
    }
}
