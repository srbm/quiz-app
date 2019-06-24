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
    $('.quiz, .result').hide();
}

function displayQuestion(questionIndex) {
    console.log(`displayQuestion ran`);
    $('.question-number').text(`${questionIndex+1}. ${questionsAnswers[questionIndex].question}`)
}












function handleQuizAppFuncions() {
    hideSections();
    handleButtonClick();
    displayQuestion(0);
}

$(handleQuizAppFuncions())