//jquery.js
jQuery(document).ready(function(e) {   

      var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for setInterval
var fruits = ['apple', 'cherry', 'grapes', 'mango', 'watermelon', 'strawberry', 'papaya'];
jQuery(function () {

    //click on start reset button

    jQuery("#startreset").click(function () {

        //we are playing
        if (playing == true) {

            //reload page
            location.reload();
        } else {

            //we are not playing
            playing = true; //game initiated

            //set score to 0
            score = 0; //set score to 0
            jQuery("#scorevalue").html(score);

            //show trials left 
            jQuery("#trialsleft").show();
            trialsLeft = 3;
            addHearts();

            //hide game over box
            jQuery("#gameOver").hide();

            //change button text to reset game
            jQuery("#startreset").html("Reset Game");

            //start sending fruits
            startAction();
        }
    });


    //slice a fruit

    jQuery("#fruit1").mouseover(function () {
        score++;
        jQuery("#scorevalue").html(score); //update score
        //    document.getElementById("slicesound").play();
        jQuery("#slicesound")[0].play();//play sound

        //stop fruit
        clearInterval(action);

        //hide fruit
        jQuery("#fruit1").hide(500, function () {
            jQuery(this).toggle("fadeOut");
        }); //slice fruit

        //send new fruit
        setTimeout(startAction, 500);
    });

    //functions

    //fill trialLeft box with hearts

    function addHearts() {
        jQuery("#trialsleft").empty();
        for (i = 0; i < trialsLeft; i++) {
            jQuery("#trialsleft").append('<img src="images/hearts.png" class="life">');
        }
    }

    //start sending fruits

    function startAction() {

        //generate a fruit
        jQuery("#fruit1").show();
        chooseFruit(); //choose a random fruit
        jQuery("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 }); //random position

        //generate a random step
        step = 1 + Math.round(5 * Math.random()); // change step

        // Move fruit down by one step every 10ms
        action = setInterval(function () {

            //move fruit by one step
            jQuery("#fruit1").css('top', jQuery("#fruit1").position().top + step);

            //check if the fruit is too low
            if (jQuery("#fruit1").position().top > jQuery("#fruitsContainer").height()) {
                //check if we have trials left
                if (trialsLeft > 1) {
                    //generate a fruit
                    jQuery("#fruit1").show();
                    chooseFruit(); //choose a random fruit
                    jQuery("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 }); //random position

                    //generate a random step
                    step = 1 + Math.round(5 * Math.random()); // change step

                    //reduce trials by one
                    trialsLeft--;

                    //populate trialsLeft box
                    addHearts();

                } else { // game over
                    playing = false; //we are not playing anymore
                    jQuery("#startreset").html("Start Game"); // change button to Start Game
                    jQuery("#gameOver").show();
                    jQuery("#gameOver").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
                    jQuery("#trialsleft").hide();
                    stopAction();
                }
            }
        }, 10);
    }

    // generate a random fruit

    function chooseFruit() {
        jQuery("#fruit1").attr('src', 'images/' + fruits[Math.round(7 * Math.random())] + '.png');
    }

    //Stop dropping fruits

    function stopAction() {
        clearInterval(action);
    }
});

    });
