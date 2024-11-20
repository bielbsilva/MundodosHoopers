const question = document.querySelector('.question');
const answers = document.querySelector('.answers');
const spnQtd = document.querySelector('.spnQtd');
const textTerminar = document.querySelector('.terminar span');
const card = document.querySelector('.card');
const cardTerminar = document.querySelector('.terminar');
const btnRestart = document.querySelector('.terminar button');

comecar.onclick = () => {
    card.classList.add ('active');
}

import question from  './quiz.js';

var currentIndex = 0;
var questionCorrect = 0;

btnRestart.onclick = () => {
    card.style.display = "flex";
    cardTerminar.style.display = "none";

    currentIndex = 0;
    questionCorrect = 0;
    loadQuestion();
};

function nextQuestion(e) {
    if (e.target.getAttribute("data-correct") === true) {
        questionCorrect++;
    }

    if (currentIndex < question.length - 1){
        currentIndex++;
        loadQuestion();
    }else {
        terminar();
    }
}

function terminar(){
    textTerminar.innerHTML = `Você acertou ${questionCorrect} de ${question.length}`;
    card.style.display = "none";
    cardTerminar.style.display = "flex";
}

function loadQuestion(){
    spnQtd.innerHTML = `${currentIndex + 1}/${question.length}`
    const item = question[currentIndex];
    answers.innerHTML = '';
    question.innerHTML = item.question;

    item.answers.forEach ((answers) => {
        const div = document.createElement('div');

        div.innerHTML = `
        <button class="answers" data-correct "${answers.correct}">
          ${answers.Option}
          </button>
          `;

          answers.appenChild(div);
        });   
        
        document.querySelectorAll(".answer").forEach((item) => {
            item.addEventListener("click", nextQuestion);
        })
}

loadQuestion();