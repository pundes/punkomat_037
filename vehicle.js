
function Vehicle(x, y) {
  this.position = createVector(x, y);
  this.r = 6;
  this.maxspeed;
  this.maxforce = 1;
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);

  var val;
  var rx, ry, lx1, ly1, lx2, ly2;
  var black, grey, yellow;

  black = color(0, 0, 0);
  yellow = color(149, 165, 16);
  grey = color(149, 165, 166);

  rx = 5;
  ry = 5;
  lx1 = (rx + 10) - 1;
  ly1 = (ry + 10) - 1;
  lx2 = 75;
  ly2 = (ry + 10) - 1;


  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.separate = function(vehicles) {
    var desiredseparation = 150;
    var sum = createVector();
    var count = 0;
    for (var i = 0; i < vehicles.length; i++) {
      var d = p5.Vector.dist(this.position, vehicles[i].position);
      if ((d > 0) && (d < desiredseparation)) {
        var diff = p5.Vector.sub(this.position, vehicles[i].position);
        diff.normalize();
        diff.div(d);
        sum.add(diff);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.maxspeed = 50;
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0.5);
  }

  this.display = function(vehicles) {
    var dist;
    for (var i = 0; i < vehicles.length; i++) {
      dist = p5.Vector.dist(this.position, vehicles[i].position);
      if(dist > 0 && dist < 65) {
          fill(149, 165, 166)
          stroke(0);
          strokeWeight(1);
          //bezier(-100, -100, this.position.x-2, this.position.y+20, 20, 20, vehicles[i].position.x, vehicles[i].position.y);
          line(this.position.x, this.position.y, vehicles[i].position.x-4, vehicles[i].position.y+30);
          line(this.position.x, this.position.y, vehicles[i].position.x, vehicles[i].position.y);
          line(this.position.x, this.position.y, vehicles[i].position.x+2, vehicles[i].position.y-10);
          rect(this.position.x, this.position.y, 10, 10);


          var min = 0;
          var max = 360;
          val = Math.round(Math.random() * (max - min)) + min;

          if(val === 100) {
            rx = -5;
            ry = -5;
            lx1 = rx + 1;
            ly1 = ry + 1;
            lx2 = -75;
            ly2 = rx + 1;
          } else if(val === 111) {
            rx = 5;
            ry = -5;
            lx1 = (rx + 10) - 1;
            ly1 = ry + 1;
            lx2 = (rx + 10) - 1;
            ly2 = -75;
          } else if(val === 313) {
            rx = 5;
            ry = 5;
            lx1 = (rx + 10) - 1;
            ly1 = (ry + 10) - 1;
            lx2 = 75;
            ly2 = (ry + 10) - 1;
          } else if(val === 248) {
            rx = -5;
            ry = 5;
            lx1 = rx + 1;
            ly1 = (ry + 10) - 1;
            lx2 = rx + 1;
            ly2 = 75;
          }

          push();
          translate(this.position.x, this.position.y);
          stroke(black);
          line(lx1, ly1, lx2, ly2);
          fill(grey);
          rect(0, 0, 10, 10);
          fill(black);
          stroke(yellow);
          rect(rx, ry, 10, 10)
          pop();
      }
    }
  }




  this.borders = function() {
    if (this.position.x < -this.r) this.position.x =  width+this.r;
    if (this.position.y < -this.r) this.position.y = height+this.r;
    if (this.position.x >  width+this.r) this.position.x = -this.r;
    if (this.position.y > height+this.r) this.position.y = -this.r;
  }
}
