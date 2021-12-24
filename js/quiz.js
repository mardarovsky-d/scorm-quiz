'use strict';

const questions = [
    {'question': "🇷🇺 Назовите столицу России.", 'answers': ["Санкт-Петербург", "Москва", "Екатеринбург"], 'correct': "Москва", 'score': 10 },
    {'question': "🇧🇷 Назовите столицу Бразилии.", 'answers': ["Бразилиа", "Рио-де-Жанейро", "Сан-Паулу"], 'correct': "Бразилиа", 'score': 10 },
    {'question': "🇺🇸 Назовите столицу США.", 'answers': ["Нью-Йорк", "Лос-Анджелес", "Вашингтон"], 'correct': "Вашингтон", 'score': 10 },
    {'question': "🇫🇷 Назовите столицу Франции", 'answers': ["Париж", "Неаполь", "Рим"], 'correct': "Париж", 'score': 10 },
    {'question': "🇫🇮 Назовите столицу Финляндии", 'answers': ["Осло", "Стокгольм", "Хельсинки"], 'correct': "Хельсинки", 'score': 10 },
    {'question': "🇮🇹 Назовите столицу Италии", 'answers': ["Лондон", "Рим", "Варшава"], 'correct': "Рим", 'score': 10 },
    {'question': "🇬🇧 Назовите столицу Великобритании", 'answers': ["Лондон", "Стокгольм", "Нью-Йорк"], 'correct': "Лондон", 'score': 10 },
    {'question': "🇦🇹 Назовите столицу Австрии", 'answers': ["Берлин", "Оттава", "Вена"], 'correct': "Вена", 'score': 10 },
    {'question': "🇯🇵 Назовите столицу Японии", 'answers': ["Токио", "Осака", "Киото"], 'correct': "Токио", 'score': 10 },
    {'question': "🇵🇱 Назовите столицу Польши", 'answers': ["Мадрид", "Варшава", "Киев"], 'correct': "Варшава", 'score': 10 },
];

let result = 0;
let minimum = 80;
let maximum = 0;
let questionCounter = 0;

questions.forEach(question => {
    maximum += question.score;
});

let questionSlider = document.getElementById('carousel-inner');
let indicators = document.querySelector('.carousel-indicators');
const userScore = document.getElementById('user-score');
const maxScore = document.getElementById('max-score');
const finishButton = document.getElementById('finish-button');
const quizResult = document.getElementById('quiz-result');
const resultMessage = document.getElementById('result-message');
const passingScore = document.getElementById('passing-score');
const allDoneAlert = document.getElementById('all-done');

finishButton.style.display = 'none';

userScore.innerText = String(result);
maxScore.innerText = String(100);

for (let i = 0; i < questions.length; i++) {
    indicators.insertAdjacentHTML('beforeend', "" +
        "<button type=\"button\" data-bs-target=\"#quiz-carousel\" data-bs-slide-to=" + i + " aria-label=" + "Slide " + (i + 1) + "></button>")
}

indicators.firstElementChild.classList.add('active');

for (let i = 0; i < questions.length; i++) {
    questionSlider.insertAdjacentHTML('beforeend', "" +
        "<div class=\"carousel-item\">\n" +
        "                <div class=\"p-5\">\n" +
        "                    <form class='row mx-5' name=\"question-" + i + "\">\n" +
        "                        <div>\n" +
        "                            <p class='small'>Вопрос " + (i + 1) + "</p>\n" +
        "                        </div>\n" +
        "                        <div>\n" +
        "                            <p class=\"lead\">" + questions[i].question + "</p>\n" +
        "                        </div>\n" +
        "                        <div class=\"answers\">\n" +
        "                        </div>\n" +
        "                        <div class=\"col-auto\">\n" +
        "                            <button type=\"submit\" class=\"btn submit btn-primary my-3\">Ответить</button>\n" +
        "                        </div>\n" +
        "                    </form>\n" +
        "                </div>\n" +
        "            </div>");
}
questionSlider.firstElementChild.classList.add('active');

let submitButtons = document.querySelectorAll('.submit');
let answers = document.querySelectorAll('.answers');

for (let i = 0; i < questions.length; i++) {
    for (let j = 0; j < questions[i].answers.length; j++) {
        answers[i].insertAdjacentHTML('beforeend', "" +
            "<div class='form-check'>" +
            "<input class=\"form-check-input\" " +
            "type=\"radio\" " +
            "value=\"" + questions[i].answers[j] + "\"" +
            " name=\"question-" + i + "\" id=\"flexRadioDefault" + j + "\">\n" +
            "    <label class=\"form-check-label\" for=\"flexRadioDefault" + j + "\">\n" +
            questions[i].answers[j] +
            "    </label>\n" +
            "</div>");
    }
}

for (let i = 0; i < questions.length; i++) {
    submitButtons[i].addEventListener('click', e => {
        e.preventDefault();
        const userAnswer = document.querySelector(`input[name="question-${CSS.escape(String(i))}"]:checked`).value;
        if (userAnswer === questions[i].correct) {
            result += questions[i].score;
            userScore.innerText = String(result);
            alert(userAnswer + ' - это правильный ответ!');
        } else {
            alert(userAnswer + ' - это неправильный ответ!\nВерный ответ - ' + questions[i].correct);
        }
        submitButtons[i].setAttribute('disabled', 'true');
        const inputs = document.querySelectorAll(`input[name="question-${CSS.escape(String(i))}"]`);
        inputs.forEach(input => {
            input.setAttribute('disabled', 'true');
        });
        questionCounter += 1;
        if (questionCounter >= questions.length) {
            allDoneAlert.classList.remove('visually-hidden');
            finishButton.style.display = 'block';
            quizResult.innerText = result;
            passingScore.innerText = String(minimum);
            if (result >= minimum) {
                resultMessage.innerText = 'Вы отлично справились!';
            } else {
                resultMessage.innerText = 'Чтобы завершить курс, пройдите тест повторно...';
            }
        }
    });
}