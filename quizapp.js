//////////////////////////// Global //////////////////////////////

let currentQuestion = 0;
let rightAnswers = 0;
let percent = 0;
let questionsData = '';
let AUDIO_SUCCES = new Audio('audio/success2.mp3');
let AUDIO_FAIL = new Audio('audio/fail2.mp3');
let AUDIO_APPLAUSE = new Audio('audio/applause.mp3');
let AUDIO_BOOING = new Audio('audio/booing.mp3');
let AUDIO_CHEERING = new Audio('audio/cheering.mp3');

//////////////////////////// Start Screen //////////////////////////////

function showStartScreen() {
  document.getElementById('question-screen').style = 'display: none';
  document.getElementById('end-screen').style = 'display: none';
  document.getElementById('start-screen').style = '';
  document.getElementById('progress-bar').style = 'display: none';
  document.getElementById('header-image').src = './img/quiz.jpg';

  currentQuestion = 0;
  rightAnswers = 0;
  percent = 0;

  document.getElementById('category-list').innerHTML = '';

  for (i = 0; i < questions_data.length; i++) {
    const data = questions_data[i];
    document.getElementById('category-list').innerHTML += /*html*/ `
      <li class="list-group-item justify-content-space-between">
                ${data['name']}
                <a
                  onclick="loadQuestions('${data['category']}')"
                  class="btn btn-primary"
                >${data['questions'].length} Fragen</a>
                
              </li>
    `;
  }
}

//////////////////////////// Question Screen //////////////////////////////

function loadQuestions(category) {
  for (let i = 0; i < questions_data.length; i++) {
    const element = questions_data[i];
    if (category == element['category']) {
      questionsData = questions_data[i];
      updateToNextQuestion();
    }
  }
}

function updateToNextQuestion() {
  let question = questionsData['questions'][currentQuestion];
  document.getElementById('start-screen').style = 'display: none';
  document.getElementById('question-screen').style = '';
  document.getElementById('header-image').src = questionsData['img'];
  document.getElementById('progress-bar').parentNode.style = '';
  document.getElementById('question-text').innerHTML = question['question'];
  document.getElementById('answer_1').innerHTML = question['answer_1'];
  document.getElementById('answer_2').innerHTML = question['answer_2'];
  document.getElementById('answer_3').innerHTML = question['answer_3'];
  document.getElementById('answer_4').innerHTML = question['answer_4'];
  document.getElementById('number-of-questions').innerHTML =
    questionsData['questions'].length;
  document.getElementById('question-number').innerHTML = currentQuestion + 1;
  updateProgressBar();
}

//////////////////////////// Progress Bar //////////////////////////////

function updateProgressBar() {
  percent = (currentQuestion + 1) / questionsData['questions'].length;

  percent = Math.round(percent * 100);
  document.getElementById('progress-bar').innerHTML = `${percent}%`;
  document.getElementById('progress-bar').style = `width: ${percent}%`;
}

//////////////////////////// Answers //////////////////////////////

function answer(selection) {
  let selectedAnswerNumber = selection.slice(-1);
  let question = questionsData['questions'][currentQuestion];

  let idOfRightAnswer = `answer_${question['right_answer']}`;

  if (rightAnswerSelected(selectedAnswerNumber, question)) {
    document
      .getElementById(selection)
      .parentNode.classList.add('bg-success-subtle');
    rightAnswers++;
    AUDIO_SUCCES.play();
  } else {
    document
      .getElementById(selection)
      .parentNode.classList.add('bg-danger-subtle');
    document
      .getElementById(idOfRightAnswer)
      .parentNode.classList.add('bg-success-subtle');
    AUDIO_FAIL.play();
  }
  document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedAnswerNumber, question) {
  return selectedAnswerNumber == question['right_answer'];
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById('next-button').disabled = true;

  resetAnswerButtons();
  showQuestion();
}

function resetAnswerButtons() {
  document
    .getElementById('answer_1')
    .parentNode.classList.remove('bg-success-subtle', 'bg-danger-subtle');
  document
    .getElementById('answer_2')
    .parentNode.classList.remove('bg-success-subtle', 'bg-danger-subtle');
  document
    .getElementById('answer_3')
    .parentNode.classList.remove('bg-success-subtle', 'bg-danger-subtle');
  document
    .getElementById('answer_4')
    .parentNode.classList.remove('bg-success-subtle', 'bg-danger-subtle');
}

function showQuestion() {
  let rightAnswersPercent = rightAnswers / questionsData['questions'].length;
  console.log(rightAnswersPercent);
  console.log(questionsData['questions'].length);

  if (gameIsOver()) {
    showEndScreen();
    if (rightAnswersPercent >= 0.66) {
      AUDIO_CHEERING.play();
    }
    if (rightAnswersPercent <= 0.34) {
      AUDIO_BOOING.play();
    } else {
      AUDIO_APPLAUSE.play();
    }
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questionsData['questions'].length; // returns TRUE or FALSE
}

//////////////////////////// End Screen //////////////////////////////

function showEndScreen() {
  document.getElementById('end-screen').style = '';
  document.getElementById('question-screen').style = 'display: none';
  document.getElementById('number-of-right-questions').innerHTML = rightAnswers;
  document.getElementById('number-of-questions-endscreen').innerHTML =
    questionsData['questions'].length;
  document.getElementById('header-image').src = 'img/trophy.png';
}

function restartGame() {
  document.getElementById('header-image').src = 'img/quiz.jpg';
  document.getElementById('end-screen').style = 'display: none';
  document.getElementById('start-screen').style = '';
  document.getElementById('progress-bar').parentNode.style = 'display: none';

  currentQuestion = 0;
  rightAnswers = 0;
  percent = 0;
  questionsData = '';

  showStartScreen();
}
