define('voting', ['jquery', 'array2d'], function($, a2d) {
	
	function VotingGame(width, height) {
    
    /* states of the cells */
		var States = {
      UNDECIDED: 0,
			BLUE: 1,
      RED: 2
		};
		
    
    /* colors of the cell states */
		var Colors = {
      0: '#808080',   // undecided
			1: '#0000ff',   // blue
			2: '#ff0000'    // red
		};
    
    
    //! Defines the neighbourhood.
    var neighbourhood = [
      [ -1, -1 ], [ 0, -1 ], [ 1, -1 ],
      [ -1, 0 ],             [ 1, 0 ],
      [ -1, 1 ],  [ 0, 1 ],  [ 1, 1 ]
    ];
		
    
		var width = width;
		var height = height;
		var cells = new a2d.Array2d(width, height);
		
    
    /* returns the width */
		this.getWidth = function() { return width; };
    
    
    /* returns the height */
		this.getHeight = function() { return height; };
		
    
    /* clears the board */
		this.clear = function() {
			cells.forEach(function(v, x, y) { cells.set(x, y, States.UNDECIDED); });
		};
		
    
    /* generates a random population */
		this.randomize = function() {
			cells.forEach(function(v, x, y) { cells.set(x, y, Math.random() < 0.5 ? States.BLUE : States.RED); });
		};
				
    
    /* computes the burning automaton step */
		this.step = function() {
			/* pick random voter */
      var x = Math.floor(Math.random() * width);
      var y = Math.floor(Math.random() * height);
      
      /* pick random neighbour */
      var n = Math.floor(Math.random() * neighbourhood.length);
      var nx = x + neighbourhood[n][0];
      var ny = y + neighbourhood[n][1];
      
      nx = nx % width;
      ny = ny % height;      
      
      /* assign new political view */
			cells.set(x, y, cells.get(nx, ny));
		};
		
    
    /* renders the board on canvas */
		this.render = function(canvas) {
      
      var dx = canvas.getAttribute('width') / width;
      var dy = canvas.getAttribute('height') / height;
      var ctx = canvas.getContext('2d');
      
      for (var x = 0; x < width; ++x) { 
        for (var y = 0; y < height; ++y) {
          ctx.fillStyle =  Colors[cells.get(x, y)];
          ctx.fillRect(x * dx, y * dy, dx, dy);
        }
      }
		};
		
    
    /* counts the votes */
		this.countVotes = function(state) {
			var votes = 0;
			cells.forEach(function(v, x, y) { if (v == state) ++votes; });
			return votes;
		};
		
		this.randomize();
	}
	
	return {
		VotingGame: VotingGame
	}
	
});
