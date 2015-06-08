ThunderConnector = require('thunder-connector');

var keypress = require('keypress')
  , tty = require('tty');

var irobot = require('irobot');

var robot = new irobot.Robot('/dev/ttyO0');
robot.on('ready', function () {
  console.log('READY1');
});
// make `process.stdin` begin emitting "keypress" events

ThunderConnector.connect();

function up(degrees){
	stopTime = Math.floor(degrees * 22.3);
	setTimeout(function(){ThunderConnector.command('up');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function down(degrees){
	stopTime = Math.floor(degrees * 22.3);
	setTimeout(function(){ThunderConnector.command('down');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function turnRightDegrees(degrees){
	stopTime = Math.floor(degrees * 22.3)
	setTimeout(function(){ThunderConnector.command('right');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function turnLeftDegrees(degrees){
	stopTime = Math.floor(degrees * 22.3)
	setTimeout(function(){ThunderConnector.command('left');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function fire(){
	setTimeout(function(){ThunderConnector.command('fire');},0);
}

  // mysong =  
  //  [ [ 392, 300 ],
  //    [ 164.8, 600 ],
  //    [ 130.8, 600 ],
  //    [ 164.8, 450 ],
  //    [ 392, 200 ],
  //    [ 261.6, 600 ],
  //    [ 329.6, 450 ],
  //    [ 293.7, 200 ],
  //    [ 261.6, 800 ],
  //    [ 164.8, 400 ],
  //    [ 92.5, 600 ],
  //    [ 392, 600 ],
  //    [ 392, 600 ] 
  //    [ 392, 300 ],
  //    [ 329.6, 600 ],
  //    [ 293.7, 600 ],
  //    [ 261.6, 450 ],
  //    [ 246.9, 200 ],
  //    [ 440, 600 ],
  //    [ 246.9, 450 ],
  //    [ 261.6, 200 ],
  //    [ 261.6, 800 ],
  //    [ 392, 400 ],
  //    [ 164.8, 600 ],
  //    [ 130.8, 600 ] ];
 mysong =  
   [ 
   [ 392, 300 ],
     [ 164.8, 300 ], 
     [ 130.8, 600 ],
   [ 164.8, 600 ],
  [ 392, 600 ],
   [ 261.6, 700 ],
    [ 329.6, 300 ],
    [ 293.7, 300 ],
     [ 261.6, 600 ],
     [ 164.8, 600 ],
     [ 185.0, 600 ],
     [ 196, 600 ],
      [ 196, 300],
     [ 196, 300],
     [329.6, 700],
     [293.7, 400],
     [261.6, 500],
     [246.9, 800],
     [220.0, 400],
     [246.9, 400],
     [261.6, 500],
     [261.6, 600],
     [196.0, 600],
     [164.8, 600],
     [130.8, 600]
      ];
     
        
// robot.on('bump', function (e) {
//     console.log('BUMP', e);
//     console.log(mysong);
//     robot.sing(mysong);
// });

keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);

  if (key.name == 'w'){
  	console.log("moved up");
    robot.sing(mysong);
  	//up(10);
    data = {left: 20, right: 20};
    robot.drive(data);
  } else if (key.name == 's'){
  	console.log("moved down");
  	//down(10);
  } else if (key.name == 'd'){
  	console.log("moved right");
  	//turnRightDegrees(10);
  } else if (key.name == 'a'){
  	console.log("moved left");
  	//turnLeftDegrees(10);
  } else if (key.name == 'space'){
  	console.log("stop");
        data = {left: 0, right: 0};
    robot.drive(data);
  	//fire();
  }


  if (key && key.ctrl && key.name == 'c') {
    console.log('control c');
    process.exit(0);
   // process.stdin.pause();
  }
});

if (typeof process.stdin.setRawMode == 'function') {
  process.stdin.setRawMode(true);
} else {
  tty.setRawMode(true);
}
process.stdin.resume();
