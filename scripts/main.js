$(document).ready(function() {
    
  var canvas = $('.board').get(0);
  
  var red = 0;
  var blue = 0;
  
  
  /* updates the plot */
  var updatePlot = function(g) {
    var data = [{
      values: [100.0*blue/625.0, 100.0*red/625.0],
      labels: ['Blue', 'Red'],
      marker: {
        colors: ['rgb(0, 0, 255)', 'rgb(255, 0, 0)']
      },
      type: 'pie'
    }];

    var layout = {
      height: 240,
      width: 240
    };

    Plotly.newPlot('plot', data, layout);
  };
  
  
  /* updates the board */
  var updateView = function(g) {
    g.render(canvas);
    
    blue = g.countVotes(1);
    red = g.countVotes(2);
    
    $(".blue-votes").text(blue);
    $(".red-votes").text(red);
    
    updatePlot(g);
  };
  
  
  /* generates new map */
  var generateMap = function(distribution) {
    var game = new VotingGame(25, 25);
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
  
  
  function getMousePos(e, client) {
    var rect = client.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  
  
  var paint = true;
  var drag = false;
  $('.board').mousedown(function(e) {
    var pos = game.getCellPos(canvas, getMousePos(e, canvas));
    paint = game.getCell(pos) == 1 ? 2 : 1;
    game.setCell(pos, paint);
    updateView(game);
    
    $(this).bind('mousemove', function(e) {
      var pos = game.getCellPos(canvas, getMousePos(e, canvas));
      game.setCell(pos, paint);
      updateView(game);
    });
  });
  
  
  $('.board').mouseup(function(e) {
    $(this).unbind('mousemove');
  });
  
  
  $('.board').mouseout(function(e) {
    $(this).unbind('mousemove');
  });
});
