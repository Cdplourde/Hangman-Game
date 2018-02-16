//Create global variables
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var words = ['awkward', 'crypt', 'jukebox', 'kayak', 'zombie', 'satellite', 'cookies', 'official'];
var images = ["assets/images/start.png", "assets/images/guess1.png", "assets/images/guess2.png", "assets/images/guess3.png", "assets/images/guess4.png", "assets/images/guess5.png", "assets/images/lose.png"];
var guesses = [];
var currWord = words[Math.floor(Math.random() * words.length)];
var correct = 0;
var incorrect = 0;

$(document).ready(function() {

    //Get random word on page load
    newWord();
    //'New Word' button. Resets to defaults and creates new word.
    $('#reset').on('click', function() {
        newWord();
    });   

    // Get user input
    $(document).keypress(function(event) {
        var userInput = String.fromCharCode(event.which);
        // Test if user input is valid alphabetical character
        if (alphabet.includes(userInput) && !guesses.includes(userInput)) {    
            guesses.push(userInput);
            // Loop through the current word to see if the user input matches any characters
            for (i = 0; i < currWord.length; i++) {
                if (userInput === currWord[i]) {
                    //If guessed correctly, reveal letter and increment correct
                    $('#word span:nth-of-type(' + (i + 1) + ')').text(userInput);
                    correct++
                        //Check win condition
                        setTimeout(function() {
                            if (correct === currWord.length) {
                            var playAgain = alert("YOU WIN!!!");
                            newWord();           
                            }
                            else{}
                        }), 500;
                }
                else{}
            }
            //If guessed incorrectly, display under guessed letters and increment incorrect
            if (!currWord.includes(userInput)) {
                guesses.push(userInput);
                $('#guesses').append(userInput);
                incorrect++
                $("img").attr("src", images[incorrect]);
                //Check lose condition
                setTimeout(function() {
                    if (incorrect >= 6) {
                    var playAgain = alert("Oh no, you lost! Your word was " + currWord);
                    newWord();
                    }
                    else{}
                }, 500);
            }
        }
        else{}
    });

    //Function to reset everything to defaults
    function newWord() {
        //Reset variables
        incorrectGuesses = 0;
        correct = 0;
        incorrect = 0;
        guesses = [];
        //Get new word
        currWord = words[Math.floor(Math.random() * words.length)];
        //Empty guesses and reset image
        $("img").attr("src", images[0]);
        $('#word').empty();
        $('#guesses').empty();
        //Create spans for new word
        for (i = 0; i < currWord.length; i++) {   
            var newSpan = $('<span>');
            $(newSpan).text("_");
            newSpan.addClass('wordLetter');   
            $('#word').append(newSpan);
        };
    };    

});
