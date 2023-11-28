let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    }, 
    {
        "question": "Wer hat's erfunden?",
        "answer_1": "Die Franzosen",
        "answer_2": "Die Österreicher",
        "answer_3": "Die Deutschen",
        "answer_4": "Die Schweizer",
        "right_answer": 4
    },
];

let currentQuestion = 0;

function init() {
    document.getElementById("number-of-questions").innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-text').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedAnswerNumber = selection.slice(-1);

    let idOfRightAnswer = `answer_${question['right_answer']}`;
     
    if (selectedAnswerNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    console.log(currentQuestion)
    document.getElementById('next-button').disabled = true;
    document.getElementById('current-question').innerHTML = currentQuestion;
    
    resetAnswerButtons();
    showQuestion();
}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success', 'bg-danger');
}