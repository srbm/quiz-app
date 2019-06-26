let questionNumber = 0;
let score = 0;
function handleButtonClick() {
    //target button clicked
    //on click
    $('.start-button').on('click', e => {
        console.log(`handleButtonClick ran`);
        //prevent default
        e.preventDefault();
        //hide intro
        $('.introduction').hide();
        //show display quiz
        $('.quiz').show();
    }); 
}
function hideSections() {
    console.log(`hideSections ran`);
    //show only intro section on start up
    $('.quiz, .result, .complete').hide();
}
function displayQuestion(questionIndex) {
    console.log(`displayQuestion ran`);
    if ($('.question.number').text()) {
        $('.question.number').text().remove();
    }
    $('.question-number').text(`${questionIndex+1}. ${quizDATA[questionIndex].question}`)
    
}
function displayAnswers(questionIndex) {
    console.log(`displayAnswers ran`);
    const choices = [];
    const answersObj = quizDATA[questionIndex].answers;
    if ($('.choices').html()) {
        $('.choices').empty();
    }
    for (const answer in answersObj) {
        choices.push(
            `<label>
                <input type="radio" name="choice" value="${answersObj[answer]}" required>${answersObj[answer]}
            </label>`);   
    }
    $('.choices').append(choices);
}
function checkAnswer(questionIndex) {
        return ($('input:checked').val() === quizDATA[questionIndex].correct) 
}
function displayResult(bool) {
    if($('.result__info').html()) {
        $('.result__info').empty();
    }
    if (bool) {
        $('.result__info').append(`<p>You're correct!</p>`);
        score++;
        $('.result__info').append(`<p>Score: ${score}/${questionNumber+1}</p>`);
    } else {
        $('.result__info').append(`<p>Wrong this time.</p>`);
        $('.result__info').append(`<p>Score: ${score}/${questionNumber+1}</p>`);
    }
    displayImage(questionNumber);
    $('.result').show();
}
function displayImage(questionIndex) {
    $('.js-img').attr('src', `${quizDATA[questionIndex].imageSrc}`);
    $('.js-img').attr('alt', `${quizDATA[questionIndex].imageAlt}`);

}
function iterateQuestion() {
    return questionNumber++;
}
function handleSelect() {
    $('.select').on('click', e => {
        console.log("handleSelect ran")
        e.preventDefault();
        $('.quiz').hide();
        displayResult(checkAnswer(questionNumber));
        setButtonText(questionNumber);
        iterateQuestion();
    })
}
function handleNextQ() {
    $('.nextQ').on('click', e => {
        $('.result').hide();
        if (questionNumber === 10) {
            $('.col-md').append(`<p>${score} out of 10</p><a href="https://srbm.github.io/quiz-app"><button type="button">Play Again</button></a>`)
            $('.complete').show();
        } else {
            displayQuestion(questionNumber);
            displayAnswers(questionNumber);
            $('.quiz').show();
        }
    })
}
function setButtonText(questionIndex) {
    $('.nextQ').text( () => {
        if(questionIndex < 9) {
            return "Next Question";
        } else {
            return "Complete Quiz";
        }
    });
}







function handleQuizAppFunctions() {
    hideSections();
    handleButtonClick();
    displayQuestion(questionNumber);
    displayAnswers(questionNumber);
    handleSelect();
    handleNextQ();
}

$(handleQuizAppFunctions())