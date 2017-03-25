define('app', ['jquery', 'voting'], function($, _voting) {
	
  
  /* starts the application */
	function start() {
    
    /* updates the board */
		var updateView = function(g) {
			g.render($(".board").get(0));
      
      var blue = g.countVotes(1);
      var red = g.countVotes(2);
      
      $(".blue-votes").text(blue);
      $(".red-votes").text(red);
		};
    
    
    /* generates new map */
    var generateMap = function(distribution) {
      var game = new _voting.VotingGame(25, 25);
      game.randomize(distribution);
      return game;
    };
    
		
		var game = generateMap(0.5);
		updateView(game);
    $('#start').show();
    $('#stop').hide();
		
		var stepTimer;
		
    /* computes step */
		var makeStep = function() {
			game.step();
			updateView(game);
		};
		
    
    /* resets the board */
		$("#reset").click(function(ev) {
      var distribution = $(".distribution").val() * 0.01;
      console.log(distribution);
			game = generateMap(distribution);
      clearInterval(stepTimer);
			updateView(game);
      $('#start').show();
      $('#stop').hide();
			ev.preventDefault();
		});
		
    
		/* starts the game */
		$("#start").click(function(ev) {
			updateView(game);
			stepTimer = setInterval(makeStep, 10);
			ev.preventDefault();
      $('#start').hide();
      $('#stop').show();
		});
		
    
    /* stops the game */
		$("#stop").click(function(ev) {
			clearInterval(stepTimer);
			ev.preventDefault();
      $('#start').show();
      $('#stop').hide();
		});
	}
	
  
	return {
		start: start
	}
});
