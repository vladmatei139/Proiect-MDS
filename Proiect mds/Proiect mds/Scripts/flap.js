var canvas, easy, medium, hard, score, Pscore;
var alb, galben, verde, portocaliu, multi, sunet;
var col = 0;
var pipeSpeed;
var flappy;
var pipes = [];
var over = false;
var muted = false;
var flapSound, gameoverSound, gjSound, bgm;

function preload() {
    flapSound = loadSound('../Content/Music/hiyoko.wav');
    gameoverSound = loadSound('../Content/Music/kachi27.wav');
    gjSound = loadSound('../Content/Music/clap.wav');
    bgm = loadSound('../Content/Music/doll.mp3');
}

function setup() {
    flapSound.setVolume(0.3);
    gameoverSound.setVolume(0.3);
    gjSound.setVolume(0.3);
    bgm.setVolume(0.5);
    canvas = createCanvas(900, 900);
    easy = createButton('easy');
    medium = createButton('medium');
    hard = createButton('hard');
    pScore = createElement('h1', 'Score: 0');
    instr = createElement('p', 'Space: flap R: reset');
    instr.id('instructiuni');
    score = 0;

    easy.position((windowWidth - easy.width - 30 - medium.width - 30 - hard.width) / 2, 100);
    easy.mousePressed(function () { start(-5); });

    medium.position(easy.x + easy.width + 30, easy.y);
    medium.mousePressed(function () { start(-7); });

    hard.position(medium.x + medium.width + 30, medium.y);
    hard.mousePressed(function () { start(-9); });

    pScore.position((windowWidth - 30 - hard.width) / 2, easy.y + 15);

    flappy = new Flappy();
    pipes.push(new Pipe());

    windowResized();


    alb = createButton('Alb');
    alb.position(300, 200);
    alb.mousePressed(function () { col = 0; });
    galben = createButton('Galben');
    galben.position(300, 250);
    galben.mousePressed(function () { col = 1; });
    verde = createButton('Verde');
    verde.position(300, 300);
    verde.mousePressed(function () { col = 2; });
    portocaliu = createButton('Portocaliu');
    portocaliu.position(300, 350);
    portocaliu.mousePressed(function () { col = 3; });
    multi = createButton('Multicolor');
    multi.position(300, 400);
    multi.mousePressed(function () { col = 4; });
    sunet = createButton('Mute/Unmute');
    sunet.position(300, 450);
    sunet.mousePressed(function () {
        if (muted == false) {
            muted = true;
            masterVolume(0);
        } else {
            muted = false;
            masterVolume(1);
        }
    }
    );


    noLoop();
}

function draw() {
    background(30, 30, 30);
    flappy.update();
    flappy.show();
    for (var i = 0; i < pipes.length; i++) {
        if (pipes[i].offscreen() == true) {
            pipes.splice(i, 1);
            score++;
            pScore.html('Score: ' + score);
            if (score != 0 && score % 10 == 0)
                gjSound.play();
        }
        if (flappy.intersects(pipes[i]) == true)
            pipes[i].hit = true;
        pipes[i].update();
        pipes[i].show();
        if (pipes[i].hit == true) {                                 //game over check
            bgm.stop();
            gameoverSound.play();
            over = true;
            noLoop();
        }
    }
}

function Flappy() {
    this.x = 50;
    this.y = 400;
    this.gravity = 0.6;
    this.lift = -15;
    this.speed = 0;

    this.show = function () {
        if (col == 0)
            fill(255, 255, 255);
        if (col == 1)
            fill(255, 235, 84);
        if (col == 2)
            fill(7, 122, 68);
        if (col == 3)
            fill(255, 175, 28);
        if (col == 4)
            fill(floor(random(255)), floor(random(255)), floor(random(255)));
        ellipse(this.x, this.y, 30, 30);
    }

    this.update = function () {
        this.speed = this.speed + this.gravity;
        this.y = this.y + this.speed;

        if (this.y > canvas.height) {
            this.speed = 0;
            this.y = constrain(this.y, 0, canvas.height);
        }

        if (this.y < 0) {
            this.speed = 0;
            this.y = constrain(this.y, 0, canvas.height);
        }
    }

    this.jump = function () {
        this.speed = this.speed + this.lift;
    }

    /* this.checkGameOver = function () {
         for (var i = 0; i < pipes.length; i++)
             if (this.intersects(pipes[i])) {
                 
             }
     }*/

    this.intersects = function (aPipe) {
        if ((this.y - 15 < aPipe.holeTop || this.y + 15 > aPipe.holeBot) && (this.x >= aPipe.x && this.x <= aPipe.x + aPipe.pipeWidth)) {
            return true;
        }
    }
}

function Pipe() {
    this.x = canvas.width;
    this.holeSize = 250;
    this.holeTop = floor(random(canvas.height - this.holeSize));
    this.holeBot = this.holeTop + this.holeSize;
    this.pipeWidth = 20;
    this.hit = false;

    this.show = function () {
        fill(255);
        if (this.hit == true)
            fill(255, 0, 0);
        rect(this.x, 0, this.pipeWidth, this.holeTop);
        rect(this.x, this.holeBot, this.pipeWidth, canvas.height - this.holeTop - this.holeSize);
    }

    this.update = function () {
        this.x = this.x + pipeSpeed;
    }

    this.offscreen = function () {
        if (this.x < 0 - this.pipeWidth)
            return true;
        return false;
    }
}

function keyPressed() {
    if (keyCode == 32) {
        flappy.jump();
        if (over == false)
            flapSound.play();
    }

    if (keyCode == 82) {

        flappy = new Flappy();
        pipes = [];
        score = 0;
        pScore.html('Score: ' + score);
        if (over == true) {
            over = false;
            bgm.loop();
            loop();
        }
    }
}

function start(x) {
    pipeSpeed = x;
    easy.remove();
    medium.remove();
    hard.remove();
    bgm.loop();
    loop();
    setInterval(function () { pipes.push(new Pipe()); }, 1500);
}

function windowResized() {
    easy.position((windowWidth - easy.width - 30 - medium.width - 30 - hard.width) / 2, 100);
    easy.mousePressed(function () { start(-5); });

    medium.position(easy.x + easy.width + 30, easy.y);
    medium.mousePressed(function () { start(-7); });

    hard.position(medium.x + medium.width + 30, medium.y);
    hard.mousePressed(function () { start(-10); });

    pScore.position((windowWidth - 30 - hard.width) / 2, easy.y + 15);
}
