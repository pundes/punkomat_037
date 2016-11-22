// Based on the book Nature of Code from Daniel Shiffman

var vehicles = [];
var noise;


function setup() {
  createCanvas(windowWidth,windowHeight);

  if(windowWidth < 1280) {
    for (var i = 0; i < 170; i++) {
      vehicles.push(new Vehicle(random(width), random(height)));
    }
  } else {
    for (var i = 0; i < 230; i++) {
      vehicles.push(new Vehicle(random(width), random(height)));
    }
  }


  noise = new Noise();
}

function draw() {
  background(149, 165, 166);

  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].separate(vehicles);
    vehicles[i].update();
    vehicles[i].borders();
    vehicles[i].display(vehicles);
  }
}

// SOUND
function Noise() {
  var freqs = T(function(count) {
    return [450][count % 0.001];
  });
  var noise = T("fnoise", {freq:freqs, mul:0.03}).play();
  T("interval", {interval:freqs}, freqs).start();
}
