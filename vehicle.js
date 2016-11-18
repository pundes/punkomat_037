
function Vehicle(x, y) {
  this.position = createVector(x, y);
  this.r = 6;
  this.maxspeed;
  this.maxforce = 1;
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);


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


          fill(0);
          stroke(149, 165, 16);
          push();
          translate(this.position.x, this.position.y);
          rect(-3, -3, 10, 10);
          stroke(0)
          line(0, 0, 50, 0);
          line(0, 0, 0, 30);
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
