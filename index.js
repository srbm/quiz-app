function handleButtonClick() {
    console.log(`handleButtonClick ran`);
    //target button clicked
    //on click
    $('.start-button').on('click', e => {
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













function handleQuizAppFuncions() {
    hideSections();
    handleButtonClick();
}

$(handleQuizAppFuncions())