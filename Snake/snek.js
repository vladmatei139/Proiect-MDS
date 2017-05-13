var canvas,easy,medium,hard,score,Pscore,p,instr;
var alb,rosu,verde,albastru,multi,sunet;
var snake;
var gscale = 30;
var food;
var col = 0;
var keysDisabled = false;
var paused = false;

function setup(){
	canvas = createCanvas(900, 600);
	easy = createButton('Easy');
	easy.id('easy');
	medium = createButton('Medium');
	hard = createButton('Hard');
	pScore = createElement('h1','Score: 0');
	instr = createElement('p','Sageti: miscati sarpele Space: meniu');
	instr.id('instructiuni');
	score = 0;

	easy.position((windowWidth-easy.width-30-medium.width-30-hard.width)/2,100);
	easy.mousePressed(function(){start(5);});
	
	medium.position(easy.x+easy.width+30, easy.y);
	medium.mousePressed(function(){start(10);});
	
	hard.position(medium.x+medium.width+30, medium.y);
	hard.mousePressed(function(){start(20);});

	pScore.position((windowWidth-30-hard.width)/2,easy.y+15);

	snake = new Snake();
	food = new Food();
	food.setSpawn();
	food.spawn();

	windowResized();

	noLoop();
}

function draw(){
	background(30,30,30);
	snake.checkGameOver();
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
	if(paused == false)
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
		if(this.size == this.tail.length)
			for(var i = 0; i < this.size-1; i++)
				this.tail[i] = this.tail[i+1];
		this.tail[this.size-1] = createVector(this.x,this.y);
		this.x = this.x + this.xspeed*gscale;
		this.y = this.y + this.yspeed*gscale;
	}

	this.show = function(){
		if(col == 0)
			fill(255, 255, 255);
		if(col == 1)
			fill(255, 0, 0);
		if(col == 2)
			fill(0, 255, 0);
		if(col == 3)
			fill(0, 0, 255);
		if(col == 4)
			fill(floor(random(255)),floor(random(255)),floor(random(255)));
		if(this.x>=canvas.width) this.x = 0;
		if(this.y>=canvas.height) this.y = 0;
		if(this.x<0) this.x = canvas.width - gscale;
		if(this.y<0) this.y = canvas.height - gscale;
		for(var i = 0; i < this.size; i++)
			rect(this.tail[i].x,this.tail[i].y,gscale,gscale);
		rect(this.x,this.y,gscale,gscale);
	}

	this.direction = function(x,y){
		this.xspeed = x;
		this.yspeed = y;
	}

	this.eat = function(foo){
		if(this.x == foo.x && this.y == foo.y)
			{
				this.size++;
				score++;
				pScore.html('Score: ' + score);
				return true;
			}
	}

	this.checkGameOver = function(){
		for(var i =0; i<this.tail.length; i++)
			if(this.tail[i].x == this.x && this.tail[i].y == this.y)
				noLoop();
	}
}

function keyPressed() {
	if(keysDisabled == true)
		return;
	if (keyCode === UP_ARROW && snake.yspeed != 1) {
    	snake.direction(0, -1);
    	keysDisabled = true;
    	setTimeout(function(){keysDisabled = false;}, 25);
  } else if (keyCode === DOWN_ARROW && snake.yspeed != -1) {
    	snake.direction(0, 1);
    	keysDisabled = true;
    	setTimeout(function(){keysDisabled = false;}, 25);
  } else if (keyCode === RIGHT_ARROW && snake.xspeed != -1) {
    	snake.direction(1, 0);
    	keysDisabled = true;
    	setTimeout(function(){keysDisabled = false;}, 25);
  } else if (keyCode === LEFT_ARROW && snake.xspeed != 1) {
    	snake.direction(-1, 0);
    	keysDisabled = true;
    	setTimeout(function(){keysDisabled = false;}, 25);
  }
  	if (keyCode == 32 && paused == false){
  		pause();

  	}
  	else if (keyCode == 32 && paused == true){
  		unpause();
  	}
}

function Food(){
	this.x = 0;
	this.y = 0;

	this.setSpawn = function(){
		this.x = randCol();
		this.y = randRow();
		var onSnake = false;
		if(this.x == snake.x && this.y == snake.y)
			onSnake = true;
		for(var i = 0; i < snake.tail.length; i++)
			if(this.x == snake.tail[i].x && this.y == snake.tail[i].y)
				onSnake = true;
		if(onSnake == true)
			this.setSpawn();
	}

	this.spawn = function(){
		fill(floor(random(255)),100,floor(random(255)));
		rect(this.x,this.y,gscale,gscale);
	}
}

function pause(){
	paused = true;
	p = createElement('p','PAUSED');
	p.id('pauza');
	alb = createButton('Alb');
	alb.position(300,200);
	alb.mousePressed(function(){col = 0;});
	rosu = createButton('Rosu');
	rosu.position(300,250);
	rosu.mousePressed(function(){col = 1;});
	verde = createButton('Verde');
	verde.position(300,300);
	verde.mousePressed(function(){col = 2;});
	albastru = createButton('Albastru');
	albastru.position(300,350);
	albastru.mousePressed(function(){col = 3;});
	multi = createButton('Multicolor');
	multi.position(300,400);
	multi.mousePressed(function(){col = 4;});
	noLoop();	
}

function unpause(){
	var but = document.getElementById('easy');
	if(but != null)
		return;
	paused = false;
	p.remove();
	alb.remove();
	rosu.remove();
	verde.remove();
	albastru.remove();
	multi.remove();
	loop();
}

function randCol(){
	return floor(random(canvas.width/gscale))*gscale;
}

function randRow(){
	return floor(random(canvas.height/gscale))*gscale;
}

function windowResized(){
	easy.position((windowWidth-easy.width-30-medium.width-30-hard.width)/2,100);
	easy.mousePressed(function(){start(5);});
	
	medium.position(easy.x+easy.width+30, easy.y);
	medium.mousePressed(function(){start(10);});
	
	hard.position(medium.x+medium.width+30, medium.y);
	hard.mousePressed(function(){start(20);});

	pScore.position((windowWidth-30-hard.width)/2,easy.y+15);
}
