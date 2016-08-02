$(document).on('pagecreate', function() {

	var keys;
	var score = 0;
	var questions;
	var randomize;
	$.getJSON("quiz.json", function(json) {
		/*Get all the keys from JSON*/
		keys = Object.keys(json.quiz.question);
		/*
		 * Append title and description
		 * Placed all quiz objects
		 */
		$('#title').append(json.quiz.name);
		$('#description').append(json.quiz.description);

		/*Start button clicked*/
		$('#start').on('click', function() {
			questions = $('#questions').val();
			randomize = $('#randomize').val();
			$('#jumbotron').remove();

			removeQuestions(randomize);
			//console.log(keys)
			keys.forEach(function(a) {
				//Append to an array all necessary info, then loop it to show//
				$('body').append(
						//Can break this for randomization
				  '<div data-role="page" id=q' + a + '>' +	
					'<div data-role="header"><h4>' + json.quiz.question[a].id + '.' + json.quiz.question[a].text + '</h4></div>' + '<div data-role="main" class="ui-content">' +
					'<form><ol role="radiogroup">' +
						'<li><input type="radio" name="choices" value="'+isCorrect(json.quiz.question[a].choices.choice[0]) +'"> ' + isObject(json.quiz.question[a].choices.choice[0]) + '</li>' +
						'<li><input type="radio" name="choices" value="'+isCorrect(json.quiz.question[a].choices.choice[1]) + '">' + isObject(json.quiz.question[a].choices.choice[1]) + '</li>' + 
						'<li><input type="radio" name="choices" value="'+isCorrect(json.quiz.question[a].choices.choice[2]) + '">' + isObject(json.quiz.question[a].choices.choice[2]) + '</li>' +
						'<li><input type="radio" name="choices" value="'+isCorrect(json.quiz.question[a].choices.choice[3]) + '">' + isObject(json.quiz.question[a].choices.choice[3]) + '</li>' +
				  '</form></div>' +

				  //Can break this for randomization
				  	'<fieldset class="ui-grid-a" data-role="footer">' + 
					    '<a class="ui-block-a" href=#q' + increaseNum(a) + ' data-transition="flip">NEXT</a>' + 
					    '<a class="ui-block-b" href=#q' + decreaseNum(a) + ' data-transition="flip"> BACK </a>' + 
					    '</fieldset></ol></div>' 
				)//append
			})//forEach

//********************MODULAR FUNCTIONS**************************//

			function isObject(object) {
				if(typeof(object) != 'string') {
					console.log(object)
					return object.text
				} else {
					return object;
				}
			}//isObject	

			function isCorrect(object) {
				if(typeof(object) != 'string') {
					return object.correct
				} else {
					return '';
				}
			}

			function increaseNum(num) {
				var value = parseInt(num);

				if(value < 5) {
					return value + 1;
				} else {
					return value;
				}
			}//increase

			function decreaseNum(num) {
				var value = parseInt(num);

				if(value > 0) {
					return value - 1;
				} else {
					return value;
				}
			}//increase

			function removeQuestions() {
				var value = keys.length - questions;
				
				for(var i=0; i<value; i++) {
					keys.pop();
				}
			}
		});//onClick

		 $('input[type="radio"]').click(function () {
			         var value = '';
				 value = $(this).val();
					         
				 if(value == 'true') {
					$(this).closest('li').css('background-color', 'green');
					$(this).prop('disabled', true);
					score += 1;
					$(this).closest('form').append('<b>Score is now: ' + score + '</b></br>')
				 } else {
					$(this).closest('li').css('background-color', 'red');
					$(this).prop('disabled', true);
					score -= 1;
					$(this).closest('form').append('<b>Score is now: ' + score + '</b></br>')
				 }
		 });

	})//getJSON
})
