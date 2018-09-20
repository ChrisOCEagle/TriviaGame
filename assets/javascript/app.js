// When the page loads the header, directions, static timer, and start button will display
// Once the start button is clicked the timer will begin counting down, 
    // the first question will appear along with four possible answers
$(document).ready(function() {
    // create a click event for the start button
    $("#start").on("click", timer.start)
    // display the first question
    $("#start").on("click", question.display)
    // display the starting time in the timer div
    $("#timer").text(timer.timeConverter(timer.time))
    // 
    $(".btn-choice").on("click", function() {
        alert("hello")
    })
})

// the variable the will hold the setInterval
var intervalId;

// this will determine whether or not the timer is running
var timerRunning = false;

// create each question as an object
var question = {
        image: "assets/images/Charmander.png",
        choices: ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"],
        answer: "Charmander",
        display: function() {
            // displays the image
            var img = $("<img src='" + question.image + "'>").attr("width", "200px");
            $("#image").html(img);
            // this displays the answer choices
            for ( i = 0; i < question.choices.length; i++) {
                var btn = $("<button>" + question.choices[i] + "</button>");
                btn.attr("class", "btn-choice");
                btn.attr("id", "btn-" + parseInt(i + 1));
                $(".btns").append(btn)
            }
        }
    },

    timer = {
    time: 2,
    start: function() {
    // if the timer is not running
    if ( !timer.timerRunning ) {
    // then set the timer to running every second
    timerRunning = true;
    intervalId = setInterval(timer.count, 1000);
    }
    // hide the directions
    $("#directions-text").hide();
    // hide the start button
    $("#start").hide();
    },
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
    stopTime: function() {
        timerRunning = false;
        clearInterval(intervalId);
    },
    timeConverter: function(t) {
    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
    seconds = "0" + seconds;
    }

    if (minutes === 0) {
    minutes = "00";
    }

    else if (minutes < 10) {
    minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
    }
}
// Once one of the four answers is selected
    // the user will get a message saying whether or not they were correct 
    // and the question will update to a new one
// After all questions have been answered the results will display
