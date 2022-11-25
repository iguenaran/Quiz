const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// Questions
let questions = [
    {
        question : "Who is this?",
        imgSrc : "borat.jpg",
        choiceA : "Borat",
        choiceB : "Helen Keller",
        choiceC : "Azamat",
        correct : "A"
    },{
        question : "What year did New Yorkers stop to watch the Seinfeld series finale in Times Square?",
        imgSrc : "ts.jpg",
        choiceA : "1995",
        choiceB : "1998",
        choiceC : "1999",
        correct : "B"
    },{
        question : "Who is this American poet?",
        imgSrc : "Sylvia.jpg",
        choiceA : "Virginia Woolf",
        choiceB : "Mary Oliver",
        choiceC : "Sylvia Plath",
        correct : "C"
    },{
        question : "What year was the Playstation2 released in North America?",
        imgSrc : "ps2.jpg",
        choiceA : "2000",
        choiceB : "1995",
        choiceC : "1997",
        correct : "A"
    },{
        question : "Who is this novelist?",
        imgSrc : "Franz.jpg",
        choiceA : "Albert Camus",
        choiceB : "Franz Kafka",
        choiceC : "Thomas Mann",
        correct : "B"
    },{
        question : "Who was the first woman to summit Everest?",
        imgSrc : "junko.JPG",
        choiceA : "Jordan Romero",
        choiceB : "Karen Lundgren",
        choiceC : "Junko Tabei",
        correct : "C"

    },{
        question : "Who is this philosopher?",
        imgSrc : "Emil.webp",
        choiceA : "Fernando Pessoa",
        choiceB : "Emil Cioran",
        choiceC : "José Saramago",
        correct : "B"
    },{
        question : "Who is this?",
        imgSrc : "AliG.jpeg",
        choiceA : "Dave",
        choiceB : "Rico",
        choiceC : "Ali G",
        correct : "C"
    }
];

// Variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnswer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "5.png":
              (scorePerCent >= 60) ? "4.png":
              (scorePerCent >= 40) ? "3.png":
              (scorePerCent >= 20) ? "2.png":
              "1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
