class Agent {
  
  constructor(c, posX, posY, link) {
    let rand = p5.Vector.random2D();
    //this.position = createVector(random(windowWidth), random(windowHeight));
    this.position = createVector(posX, posY);
    this.position_new = this.position;
    this.velocity = p5.Vector.random2D();
    this.velocity_new = this.velocity;
    this.acceleration = createVector();
    //this.character = this.getCharacter();
    this.character = c;
    this.isLink = link;
    if (link) {
      this.link = createA("mailto: etmuzio@gmail.com", c);
    } else {
      this.link = null;
    }
  }

  dToroid(x1, y1, x2, y2) {
    let dx = abs(x2 - x1);
    let dy = abs(y2 - y1);

    if (dx > 0.5) {
      dx = 1 - dx;
    }

    if (dy > 0.5) {
      dy = 1 - dy;
    }
    let dsq = dx * dx + dy * dy;
    dsq = sqrt(dsq);
    return dsq;
  }

  update(agents,speed) {
    let total = 0;
    let average = createVector();
    let boundsOffset = 6;

    for (let a of agents) {
      let d = this.dToroid(
        this.position.x,
        this.position.y,
        a.position.x,
        a.position.y
      );
      //separation
      if (a != this && d < 20 && d != 0) {
        let difference = p5.Vector.sub(this.position, a.position);
        difference.div(d);
        difference.mult(5);
        average.add(difference);
        total++;
      }
      //cohesion
      else if (a != this && d >= 20 && d < 100) {
        let difference = p5.Vector.sub(a.position, this.position);
        difference.mult(0.0001);
        average.add(difference);
        total++;
      }
    }
    if (total != 0) {
      this.acceleration = average.div(total);
    }

    this.velocity_new = this.velocity.add(this.acceleration);
    this.velocity_new.normalize();
    this.velocity_new.mult(speed);
    this.position_new = this.position.add(this.velocity_new);

    //edge detection

    if (this.position_new.x > windowWidth + boundsOffset) {
      this.position_new.x = -boundsOffset;
    }
    if (this.position_new.x < -boundsOffset) {
      this.position_new.x = windowWidth + boundsOffset;
    }
    if (this.position_new.y > windowHeight + boundsOffset) {
      this.position_new.y = -boundsOffset;
    }
    if (this.position_new.y < -boundsOffset) {
      this.position_new.y = windowHeight + boundsOffset;
    }
  }

  render(agent) {
    //strokeWeight(16);
    //stroke(0);
    //point(this.position.x, this.position.y);
    if (!agent.isLink) {
      text(agent.character, this.position_new.x, this.position_new.y);
    } else {
      agent.link.position(this.position_new.x, this.position_new.y);
    }
  }
  postdate() {
    this.velocity = this.velocity_new;
    this.position = this.position_new;
  }
}
