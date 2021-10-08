const agents = [];
const copy = "Emmett deMuzio. I offer services: >> 2d/3d Design >> Animation >> Fabrication >> Programming Contact me via e-mail."
const cell_x = 12;
const cell_y = 16;
const lineBreaks = [0,15,16,34,50,63,78,92,93,107];
var speed = 0;
var time = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < lineBreaks.length; i++)
    {
      for (let j = lineBreaks[i]; j < lineBreaks[i+1]; j++){
        let pX = windowWidth/4 + (cell_x*(j-lineBreaks[i]));
        let pY = windowHeight/2 + (cell_y*i);
        agents.push(new Agent(copy.at(j), pX, pY, false));
      }
    }
  
  for (let w = 108; w < 115; w++){
    let pX = windowWidth/4 + (cell_x*(w-92));
    let pY = windowHeight/2 + (cell_y*7);
    agents.push(new Agent(copy.at(w), pX, pY, true));
  }
  
  
}

function draw() {
  background(255);
  if (time > 50 && speed < 1){
    speed = speed + deltaTime/60000;
  } else {
    time = time + deltaTime/60;
  }
  
  for (let a of agents) {
    a.update(agents, speed);
    a.render(a);
    a.postdate();
  }
  
}