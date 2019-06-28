function handleQuizAppFunctions() {
    let progress = 0;
    let score = 0;
    function handleStartClick() {
        $('.start-button').on('click', e => {
            console.log(`handleStartClick ran`);
            e.preventDefault();
            $('.introduction').hide();
            $('.quiz').show();
        }); 
    }
    function displayQuestion(questionIndex) {
        console.log(`displayQuestion ran`);
        if ($('.question.number').text()) {
            $('.question.number').text().remove();
        }
        $('.question-number').text(`${questionIndex+1}. ${quizDATA[questionIndex].question}`);
        
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
    function isAnswerCorrect(questionIndex) {
            return ($('input:checked').val() === quizDATA[questionIndex].correct);
    }
    function displayResult(bool) {
        if($('.result__info').html()) {
            $('.result__info').empty();
        }

        if (bool) {
            $('.result__info').append(`<p>You're correct!</p>`);
            score++;
            $('.result__info').append(`
                <p>After ${progress+1} ${(progress+1 === 1) ? "question" : "questions"}, your score is:
                <p>${score}/10</p>`);
        } else {
            $('.result__info').append(`<p>Wrong this time.</p>`);
            $('.result__info').append(`
                <p>After ${progress+1} ${(progress+1 === 1) ? "question" : "questions"}, your score is:
                <p>${score}/10</p>`);
        }
        displayImage(progress);
        displayImageComment(progress);
        $('.result').show();
    }
    function displayImage(questionIndex) {
        $('.js-img').attr('src', `${quizDATA[questionIndex].imageSrc}`);
        $('.js-img').attr('alt', `${quizDATA[questionIndex].imageAlt}`);
    }
    function displayImageComment(questionIndex) {
        console.log(`${quizDATA[questionIndex].comment}`);
        $('.js-comment').text(`${quizDATA[questionIndex].comment}`);
    }
    function iterateQuestion() {
        return progress++;
    }
    function handleSelect() {
        $('.select').on('click', e => {
            console.log("handleSelect ran");
            e.preventDefault();
            $('.quiz').hide();
            displayResult(isAnswerCorrect(progress));
            setButtonText(progress);
            iterateQuestion();
        });
    }
    function handleNextQ() {
        $('.nextQ').on('click', e => {
            $('.result').hide();
            if (progress === 10) {
                addFinishedQuizComment(score);
                $('.complete__text').append(`<p>${score} out of 10</p>`);
                $('.complete').append(`<a href="https://srbm.github.io/quiz-app"><button type="button">Play Again</button></a>`);
                $('.complete').show();
            } else {
                displayQuestion(progress);
                displayAnswers(progress);
                $('.quiz').show();
            }
        });
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
    function addFinishedQuizComment(playerScore) {
        if (playerScore === 10) {
            $('.complete__text').prepend(`<h3>Wow, you really know your Cats!</h3>`);
        } else if (playerScore > 6) {
            $('.complete__text').prepend(`<h3>You don't have to be perfect to win the game. Nice job!</h3>`);
        } else if (playerScore > 3) {
            $('.complete__text').prepend(`<h3>You've got some work to do but you can still be ready by March</h3>`);
        } else {
            $('.complete__text').prepend(`<h3>Back to the practice floor for sprints.</h3>`);
        }
    }



    handleStartClick();
    displayQuestion(progress);
    displayAnswers(progress);
    handleSelect();
    handleNextQ();
}

$(handleQuizAppFunctions());