const question = document.getElementById('question');
const choices  = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question : "Inside which html element do we put javascript?",
        choice1 : "<script>",
        choice2 : "<javascript>",
        choice3 : "<js>",
        choice4 : "<scripting>",
        answer : 1,
    },
    {
        question: "What is the correct syntax for referring to an external script named 'script.js'?",
        choice1 : "<script href='script.js'>",
        choice2 : "<script name='script.js'>",
        choice3 : "<script src='script.js'>",
        choice4 : "<script file='script.js'>",
        answer : 3,
    },
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startquiz = () => {
    questionCounter = 0;
    score = 0;
    // do a full copy of all questions from the questions array
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {

    if (availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
        // GO TO THE END PAGE
        return window.location.assign('/end.html')
    }
    questionCounter++;

    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // update progress bar
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    // console.log(availableQuestions);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // const classToApply = "incorrect";
        // if (selectedAnswer == currentQuestion.answer) {
        //     classToApply = "correct";
        // }
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

        if (classToApply == "correct") {
            incrementScore(CORRECT_BONUS)            
        }

        // apply correct class to the choice container containing the correct answer to the question
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


startquiz()