// When the page loads the header, directions, static timer, and start button will display
// Once the start button is clicked the timer will begin counting down, 
    // the first question will appear along with four possible answers
// Once one of the four answers is selected
    // the user will get a message saying whether or not they were correct 
    // and the question will update to a new one
// After all questions have been answered the results will display

// create some variables to store correct and incorrect answers
var correct = 0,
    incorrect = 0,
    correctImage = "assets/images/Correct.png",
    incorrectImage = "assets/images/Incorrect.png",
// create an array for the questions that contains each individual question as an object
    questions = [
        {image: "assets/images/Charmander.png",
         choices: ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"],
         answer: "Charmander",
         displayed: false},
        {image: "assets/images/Bulbasaur.png",
         choices: ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"],
         answer: "Bulbasaur",
         displayed: false},
        {image: "assets/images/Pikachu.png",
         choices: ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"],
         answer: "Pikachu",
         displayed: false},
        {image: "assets/images/Squirtle.png",
         choices: ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"],
         answer: "Squirtle",
         displayed: false}
    ];
// this function will display the image and the buttons dynamically
function display(param) {
    // displays the image
    var img = $("<img src='" + param.image + "'>").attr("width", "200px");
    $("#image").html(img);
    param.displayed = true;
    // displays the answer choices as buttons
    for ( i = 0; i < param.choices.length; i++) {
        var btn = $("<button>").text(param.choices[i]);
        btn.attr("data-name", param.choices[i]);
        $(".btns").append(btn);
    }
    }

$(document).ready(function() {
    // create a click event for the start button
    // once the start button is clicked the timer will start and the first question will display
    $("#start").on("click", function() {
        timer.start;
        display(questions[0]);
    });
    // display the starting time in the timer div
    $("#timer").text(timer.timeConverter(timer.time))
    // Here is where the bulk of the game will take place
    $(document).on("click", ".btns > button", function() {
        console.log($(this))
        if ( $(this).attr("data-name") === questions[0].answer ) {
            timer.stopTime();
            correct++;
        } else {
            timer.stopTime();
            incorrect++;
        }
    })
})
console.log(timer.start);
// the code for the timer
// the variable the will hold the setInterval
var intervalId,

    // this will determine whether or not the timer is running
    timerRunning = false,

    // the timer as an object
    timer = {
        // the time property of the timer
        time: 5,
        // the property of the timer that sets the timer running
        start: function() {
            // if the timer is not running
            if ( !timerRunning ) {
                // then set the timer to running every second
                timerRunning = true;
                intervalId = setInterval(timer.count, 1000);
            }
            // hide the directions
            $("#directions-text").hide();
            // hide the start button
            $("#start").hide();
        },
        // the property of the timer that tracks the time
        count: function() {
            // decrement time
            timer.time--;
            // take the time, pass it through the timeConverter function and store it in currentTime
            var currentTime = timer.timeConverter(timer.time);
            // display the current time within the timer div
            $("#timer").text(currentTime);
            // stop the timer when it reaches zero
            if ( timer.time === 0 ) {
                timer.stopTime();
            }
        },
        // the property of the timer that stops the timer from running
        stopTime: function() {
            timerRunning = false;
            clearInterval(intervalId);
            timer.reset();
        },
        // the property of the timer that resets the time
        reset: function() {
            timer.time = 5;
            $("#timer").text(timer.timeConverter(timer.time));
        },
        // the property of the timer that converts a number into seconds and minutes
        timeConverter: function(t) {
            // Takes the current time in seconds and convert it to minutes and seconds (mm:ss)
            var minutes = Math.floor(t/60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            if ( minutes === 0) {
                minutes = "00";
            }

            else if (minutes < 10) {
                minutes = "0" + minutes;
            }

            return minutes + ":" + seconds
        }
    };