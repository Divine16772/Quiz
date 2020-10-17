// select all elements

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
const scorediv = document.getElementById("scoreContainer");

// create our questions

let questions = [
    {
        question : "What does HTML stands for?",
        imgsrc : "img/html.png",
        choiceA : "Hyper Text Markup Language",
        choiceB : "High Transfer makeup Language",
        choiceC : "Hyper Transmission Markup Language ",
        correct :"A"
    },{
        question : "What does CSS stands for?",
        imgsrc : "img/css.png",
        choiceA : "Control Sheet Styling",
        choiceB : "Cascading Style Sheet",
        choiceC : "Colouring Style Sheet",
        correct :"B"
    },{
        question : "What does JS stands for?",
        imgsrc : "img/js.png",
        choiceA : "Just Saying",
        choiceB : "Justifying Sheets",
        choiceC : "JavaScript",
        correct :"C"
    },{
        question : "Which of the following retains the information it's storing when the power to the system is turned off?",
        imgsrc : "img/1.jpeg",
        choiceA : "CPU",
        choiceB : "ROM",
        choiceC : "RAM",
        correct :"B"
    },{
        question : "A network of computers and other devices that is confined to a relatively small space is called?",
        imgsrc : "img/11.png",
        choiceA : "Wide Area Network",
        choiceB : "Local Area Network",
        choiceC : "Global Network",
        correct :"B"
    },{
        question : "Every computer connected to the internet is identified by a unique four-part string, known as",
        imgsrc : "img/12.png",
        choiceA : "IP address",
        choiceB : "Host name",
        choiceC : "Domain name",
        correct :"A"
    },{
        question : "ENIAC was the first general-purpose electronic computer, ENIAC stands for",
        imgsrc : "img/4.jpeg",
        choiceA : "Electronic Network Interactive Computer",
        choiceB : "Electronic Numerical Integrator and Computer",
        choiceC : "Electronic Network Integrated Analytical Computer",
        correct :"B"
    },{
        question : "Which of the following statement is correct?",
        imgsrc : "img/13.png",
        choiceA : "1 KB = 10244 bytes",
        choiceB : "1 MB = 2048 bytes",
        choiceC : "1 MB = 1000 kilobytes",
        correct :"A"
    },{
        question : "Which of the following memories must be refreshed many times per second?",
        imgsrc : "img/6.jpeg",
        choiceA : "Static RAM",
        choiceB : "Dynamic RAM",
        choiceC : "EPROM",
        correct :"B"
    },{
        question : "PNG refers to",
        imgsrc : "img/7.png",
        choiceA : "Image file",
        choiceB : "Movie / animation file",
        choiceC : "Audio file",
        correct :"A"
    },{
        question : "USB is a device used to store data and it stands for",
        imgsrc : "img/8.jpeg",
        choiceA : "Unlimited Service Bond",
        choiceB : "Unlimited Serial Bus",
        choiceC : "Universal Serial Bus",
        correct :"C"
    },{
        question : "______ is a technology that allows telephone calls to be made over computer networks like the internet.",
        imgsrc : "img/9.jpeg",
        choiceA : "VoIP",
        choiceB : "GSM",
        choiceC : "Modem",
        correct :"A"
    },{
        question : "To identify TCP/IP errors such as connection problems ______ command can be used.",
        imgsrc : "img/10.png",
        choiceA : "FTPP",
        choiceB : "Ping",
        choiceC : "POP3",
        correct :"B"
    }
];

//craete some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; //10s
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//render a question 

function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgsrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

//start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); //1000ms = 1s
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
         //change progress answer to red
         answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion(); 
        }else{
            //end quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

//check answer
function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct){
        //answer is correct
        score++
        //change progress color to green
        answerIsCorrect();
    }else{
        //answer is wrong
        //change progress answer to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion(); 
    }else{
        //end quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

//anser is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//anser is wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scorediv.style.display = "block";

    //caculate amount of questions percent answered by the user
    const scorePercent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePercent
    let img = (scorePercent >= 80) ? "img/5.png":
              (scorePercent >= 60) ? "img/4.png":
              (scorePercent >= 40) ? "img/3.png":
              (scorePercent >= 20) ? "img/2.png":
              "img/1.png";

    scorediv.innerHTML = "<img src="+ img +">";
    scorediv.innerHTML += "<p>"+ scorePercent +"%</p>";
}