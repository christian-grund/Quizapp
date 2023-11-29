let questions = [
  {
    question: "Wer hat HTML erfunden?",
    answer_1: "Robbie Williams",
    answer_2: "Lady Gaga",
    answer_3: "Tim Berners-Lee",
    answer_4: "Justin Bieber",
    right_answer: 3,
  },
  {
    question: "Wer hat's erfunden?",
    answer_1: "Die Franzosen",
    answer_2: "Die Österreicher",
    answer_3: "Die Deutschen",
    answer_4: "Die Schweizer",
    right_answer: 4,
  },
  {
    question: "Wer hat's erfunden?",
    answer_1: "Die Franzosen",
    answer_2: "Die Österreicher",
    answer_3: "Die Deutschen",
    answer_4: "Die Schweizer",
    right_answer: 1,
  },
];

let currentQuestion = 0;
let rightAnswers = 0;
let AUDIO_SUCCES = new Audio("audio/success.mp3");
let AUDIO_FAIL = new Audio("audio/fail.mp3");

function init() {
  document.getElementById("number-of-questions").innerHTML = questions.length;

  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length; // returns TRUE or FALSE
}

function showEndScreen() {
  document.getElementById("end-screen").style = "";
  document.getElementById("question-body").style = "display: none";
  document.getElementById("number-of-questions-endscreen").innerHTML = questions.length;
  document.getElementById("number-of-right-questions").innerHTML = rightAnswers;
  document.getElementById("header-image").src = "img/trophy.png";
}

function updateToNextQuestion() {
  let question = questions[currentQuestion];
  document.getElementById("question-text").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
  document.getElementById("question-number").innerHTML = currentQuestion + 1;
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById("progress-bar").innerHTML = `${percent}%`;
  document.getElementById("progress-bar").style = `width: ${percent}%`;
}

function answer(selection) {
  let selectedAnswerNumber = selection.slice(-1);
  let question = questions[currentQuestion];
  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (rightAnswerSelected(selectedAnswerNumber, question)) {
    document.getElementById(selection).parentNode.classList.add("bg-success");
    rightAnswers++;
    AUDIO_SUCCES.play();
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
    AUDIO_FAIL.play();
  }
  document.getElementById("next-button").disabled = false;
}

function rightAnswerSelected(selectedAnswerNumber, question) {
  return selectedAnswerNumber == question["right_answer"];
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById("next-button").disabled = true;

  resetAnswerButtons();
  showQuestion();
}

function resetAnswerButtons() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-success", "bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success", "bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success", "bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success", "bg-danger");
}

function restartGame() {
  document.getElementById("header-image").src = "img/pencil.jpg";
  document.getElementById("end-screen").style = "display: none";
  document.getElementById("question-body").style = "";

  currentQuestion = 0;
  rightAnswers = 0;

  init();
}
