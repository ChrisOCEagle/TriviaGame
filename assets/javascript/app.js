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
    index = 0;
// create an array for the questions that contains each individual question as an object
var questions = [
        {imageSrc: "assets/images/Charmander-Silhouette.png",
         choices: ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"],
         answer: "Charmander",
         answerSrc: "assets/images/Charmander.png",
         displayed: false},
        {imageSrc: "assets/images/Bulbasaur-Silhouette.png",
         choices: ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"],
         answer: "Bulbasaur",
         answerSrc: "assets/images/Bulbasaur.png",
         displayed: false},
        {imageSrc: "assets/images/Pikachu-Silhouette.png",
         choices: ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"],
         answer: "Pikachu",
         answerSrc: "assets/images/Pikachu.png",
         displayed: false},
        {imageSrc: "assets/images/Squirtle-Silhouette.png",
         choices: ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"],
         answer: "Squirtle",
         answerSrc: "assets/images/Squirtle.png",
         displayed: false}
    ];

// this function will display the image and the buttons dynamically
function display(param) {
    // displays the image
    var img = $("<img src='" + param.imageSrc + "'>").attr("width", "200px");
    $("#image").html(img);
    param.displayed = true;
    // displays the answer choices as buttons
    $(".btns").empty();
    $("#text").empty();
    for ( i = 0; i < param.choices.length; i++) {
        var btn = $("<button>").text(param.choices[i]);
        btn.attr("data-name", param.choices[i]);
        $(".btns").append(btn);
    }
    }

$(document).ready(function() {
    // display the starting time in the timer div
    $("#timer").text(timer.timeConverter(timer.time))
    // create a click event for the start button
    // once the start button is clicked the timer will start and the first question will display
    $("#start").on("click", function() {
        timer.start();
        display(questions[0]);
    });

    // Here is where the bulk of the game will take place
    $(document).on("click", ".btns > button", function() {

        if ( index < questions.length ) {
            if ( $(this).attr("data-name") === questions[index].answer ) {
                timer.stopTime();
                correct++;
                var correctImg = $("<img src='" + questions[index].answerSrc + "'>");
                correctImg.attr("width", "200px");
                $("#image").html(correctImg);
                var correctText = "Congrats, you got it right! The correct answer was: ";
                $("#text").text(correctText + questions[index].answer);
                setTimeout(function() {
                    display(questions[index + 1]);
                    timer.start();
                    index++;
                },3000);
            } else {
                timer.stopTime();
                incorrect++;
                var correctImg = $("<img src='" + questions[index].answerSrc + "'>");
                correctImg.attr("width", "200px");
                $("#image").html(correctImg);
                var incorrectText = "The answer you chose was incorrect, the correct answer was: ";
                $("#text").text(incorrectText + questions[index].answer);
                setTimeout(function() {
                    display(questions[index + 1]);
                    timer.start();
                    index++;
                },3000);
            }
        } else if ( index === questions.length ) {}
    });
});

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
                if ( index < questions.length ) {
                    var correctImg = $("<img src='" + questions[index].answerSrc + "'>");
                    correctImg.attr("width", "200px");
                    $("#image").html(correctImg);
                    $("#text").html("Time's up!" + "<br>");
                    $("#text").append("The answer is: " + questions[index].answer);
                    setTimeout(function() {
                        display(questions[index + 1]);
                        timer.start();
                        index++;
                    },3000);
                } else if ( index === questions.length ) {}
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