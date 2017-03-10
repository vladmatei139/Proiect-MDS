var canvas,easy,medium,hard;
var snake;
var gscale = 30;
var food;

function setup(){
	canvas = createCanvas(900, 600);
	easy = createButton('easy');
	medium = createButton('medium');
	hard = createButton('hard');

	easy.position((windowWidth-easy.width-30-medium.width-30-hard.width)/2,100);
	easy.mousePressed(function(){start(5);});
	
	medium.position(easy.x+easy.width+30, easy.y);
	medium.mousePressed(function(){start(10);});
	
	hard.position(medium.x+medium.width+30, medium.y);
	hard.mousePressed(function(){start(20);});

	snake = new Snake();
	food = new Food();
	food.setSpawn();
	food.spawn();

	noLoop();
}

function draw(){
	background(30,30,30);
	snake.update();
	snake.show();
	if(snake.eat(food) == true)
		food.setSpawn();
	food.spawn();
}

function start(x){
	frameRate(x);
	easy.remove();
	medium.remove();
	hard.remove();
	loop();
}

function Snake(){
	this.x = 0;
	this.y = 0;
	this.xspeed = 0;
	this.yspeed = 0;
	this.tail = [];
	this.size = 0;

	this.update = function(){
		this.x = this.x + this.xspeed*gscale;
		this.y = this.y + this.yspeed*gscale;
	}

	this.show = function(){
		if(this.x>=canvas.width) this.x = 0;
		if(this.y>=canvas.height) this.y = 0;
		if(this.x<0) this.x = canvas.width - gscale;
		if(this.y<0) this.y = canvas.height - gscale;
		fill(255);
		rect(this.x,this.y,gscale,gscale);
	}

	this.direction = function(x,y){
		this.xspeed = x;
		this.yspeed = y;
	}

	this.eat = function(foo){
		if(snake.x == foo.x && snake.y == foo.y)
			return true;
	}

}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.direction(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.direction(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.direction(-1, 0);
  }
}

function Food(){
	this.x = 0;
	this.y = 0;

	this.setSpawn = function(){
		this.x = randCol();
		this.y = randRow();
		//de implementat sa nu apara pe sarpe

	}

	this.spawn = function(){
		fill(floor(random(255)),100,floor(random(255)));
		rect(this.x,this.y,gscale,gscale);
	}
}

function randCol(){
	return floor(random(canvas.width/gscale))*gscale;
}

function randRow(){
	return floor(random(canvas.height/gscale))*gscale;
}