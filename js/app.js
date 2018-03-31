!function () {
  'use strict';
  //append start screen
  $('body').append("<div class='screen screen-start' id='start'><header><h1>Tic Tac Toe</h1><br><p class='message'>Enter Player One Name: </p><input type='text' class='player1Name ○' name='player1Name' placeholder='○'><br><p class='message'>Enter Player Two Name: </p><input type='text' class='player2Name ×' name='player2Name' placeholder='×'><br><label><input type='checkbox' class='AI' /> Play the Computer?</label><br><a href='#' class='button start'>Start game</a></header></div>");
  //append player 1 win screen
  $('body').append("<div class='screen screen-win-one' id='finish'><header><h1>Tic Tac Toe</h1><p class='message'> Wins!</p><a href='#' class='button'>New game</a></header></div>");
  //append player 2 win screen
  $('body').append("<div class='screen screen-win-two' id='finish'><header><h1>Tic Tac Toe</h1><p class='message'> Wins!</p><a href='#' class='button'>New game</a></header></div>");
  //append tie screen
  $('body').append("<div class='screen screen-win-tie' id='finish'><header><h1>Tic Tac Toe</h1><p class='message'>It's a Tie!</p><a href='#' class='button'>New game</a></header></div>");
  //hide everything but start screen onload
  $('.screen-win-one').hide();
  $('.screen-win-two').hide();
  $('.screen-win-tie').hide();
  $('.board').hide();
  //declare all initial state variables
  let count = 0;
  let boxCount = 1;
  let computerPlay, player1Win, player2Win, a1o, a1x, a2o, a2x, a3o, a3x, b1o, b1x, b2o, b2x, b3o, b3x, c1o, c1x, c2o, c2x, c3o, c3x = false;
  //check if win or tie
  const checkWin = function () {
    //assign checkwin variables
    a1o = $('#1').hasClass("box-filled-1");
    a1x = $('#1').hasClass("box-filled-2");
    a2o = $('#2').hasClass("box-filled-1");
    a2x = $('#2').hasClass("box-filled-2");
    a3o = $('#3').hasClass("box-filled-1");
    a3x = $('#3').hasClass("box-filled-2");
    b1o = $('#4').hasClass("box-filled-1");
    b1x = $('#4').hasClass("box-filled-2");
    b2o = $('#5').hasClass("box-filled-1");
    b2x = $('#5').hasClass("box-filled-2");
    b3o = $('#6').hasClass("box-filled-1");
    b3x = $('#6').hasClass("box-filled-2");
    c1o = $('#7').hasClass("box-filled-1");
    c1x = $('#7').hasClass("box-filled-2");
    c2o = $('#8').hasClass("box-filled-1");
    c2x = $('#8').hasClass("box-filled-2");
    c3o = $('#9').hasClass("box-filled-1");
    c3x = $('#9').hasClass("box-filled-2");
    // row 1
    if ((a1o && a2o && a3o)  ||
    // or row 2
    (b1o && b2o && b3o) ||
    //or row 3
    (c1o && c2o && c3o) ||
    // or column 1
    (a1o && b1o && c1o) ||
    // or column 2
    (a2o && b2o && c2o) ||
    // or column 3
    (a3o && b3o && c3o) ||
    // or diagonal 1
    (a1o && b2o && c3o) ||
    // or diagonal 2
    (a3o && b2o && c1o)
    ){
        player1Win = true;
        winner();
    // check if player two won
    } else {
      // row 1
      if ((a1x && a2x && a3x)  ||
      // row 2
      (b1x && b2x && b3x) ||
      // row 3
      (c1x && c2x && c3x) ||
      // column 1
      (a1x && b1x && c1x) ||
      // column 2
      (a2x && b2x && c2x) ||
      // column 3
      (a3x && b3x && c3x) ||
      // diagonal 1
      (a1x && b2x && c3x) ||
      // diagonal 2
      (a3x && b2x && c1x)
      ) {
        player2Win = true;
        winner();
        }
    }
    //check if tie
    if (!player1Win && !player2Win && (count == 8)) {
      itsATie();
    }
  }
  //declare win
  const winner = () => {
    if (player1Win) {
      $('.board').hide();
      $('.screen-win-one').show();
    } else if (player2Win) {
      $('.board').hide();
      $('.screen-win-two').show();
    }
  }
  //declare tie
  const itsATie = () => {
    $('.board').hide();
    $('.screen-win-tie').show();
  }
  //play against computer if checkbox was ticked
  const computerBrain = () => {
    //pick a random number
    let ran = Math.floor(Math.random()*9);
    //if already has been picked
    if ($('.boxes li').eq(ran).hasClass('box-filled-1') || $('.boxes li').eq(ran).hasClass('box-filled-2')) {
      //check for win or tie
      checkWin();
      //pick another random number
      computerBrain();
    }
    //if random number is good
    else {
      //computer takes X's turn
      $('.boxes li').eq(ran).addClass('box-filled-2');
      $('#player1').addClass('active');
      $('#player2').removeClass('active');
    }
  }
  //computerPlay checkbox change handler
  $(".AI").change(function() {
    if(this.checked) {
      $(".×").attr("disabled", true);
      computerPlay = true;
      return computerPlay;
    } else {
      $(".×").removeAttr("disabled");
      computerPlay = false;
      return computerPlay;
    }
  });
  //if text has been entered for player names, replace O and X in board page header with names entered & change winning screens
  $('.button').click(function() {
    let player1Name = $(".player1Name").val();
    if (player1Name) {
      $('#player1').html("<p style='color:black;'>" + player1Name + "</p>");
      $('.screen-win-one').find('.message').html(" " + player1Name + " Wins!");
    }
    let player2Name = $(".player2Name").val();
    if (player2Name) {
      $('#player2').html("<p style='color:black;'>" + player2Name + "</p>");
      $('.screen-win-two').find('.message').html(" " + player2Name + " Wins!");
    }
  });
  //set IDs of boxes to see winner
  $('.boxes > .box').each(function(index) {
    $(this).attr("id", boxCount)
    boxCount++
  });
  //start/restart buttons click handler
  $('.button').click(function() {
    count = 0;
    player1Win = false;
    player2Win = false;
    $('.box').removeClass('box-filled-1 box-filled-2');
    $('.screen').hide();
    $('.board').show();
    $('#player1').addClass('active');
    $('#player2').removeClass('active');
    return count, player1Win, player2Win;
  });
  //hover state mouseover/mouseout event handlers
  $( ".box" ).mouseover( function() {
    //don't adjust boxes with existing state
    if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
      if (count%2 == 0) {
        $(this).css("background-image", "url(./img/o.svg)");
      } else {
        $(this).css("background-image", "url(./img/x.svg)");
      }
    }
  });
  $( ".box" ).mouseout(function() {
    $(this).css("background-image", "");
  });
  //turn click handler
  $('.box').click(function() {
    //don't adjust boxes with existing state
    if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
      // if it's player 1's turn
      if (count%2 == 0) {
        $(this).addClass('box-filled-1');
        $('#player2').addClass('active');
        $('#player1').removeClass('active');
        //otherwise it's player 2's turn
      } else {
        $(this).addClass('box-filled-2');
        $('#player1').addClass('active');
        $('#player2').removeClass('active');
      }
      //if playing against computer
      if (computerPlay) {
        computerBrain();
        //counter goes up
        count++;
      }
      //counter goes up
      count++;
      //check for win or tie
      checkWin();
      return count;
    }
  });
//end module pattern
}();
