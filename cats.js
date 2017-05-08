enchant();
var bear = [];
var heart = [];
var N = 0, NR;
var start = false;
var menu = false;
var apasat = false;

window.onload = function()
 {
    game = new Game(240, 300);
    game.fps = 24;
    game.preload(['chara1.gif','im.jpg', 'heart1.png']);
	
	
	var easy = new enchant.Label();
	easy.text = "Easy ";
	easy.width = 128;
	easy.height = 64;
	easy.font = "20px 'Arial'";
	easy.x = 40;
	easy.y = 120;
		
	var medium = new enchant.Label();
	medium.text = "Medium ";
	medium.width = 128;
	medium.height = 64;
	medium.font = "20px 'Arial'";
	medium.x = 100;
	medium.y = 120;
		
	var hard = new enchant.Label();
	hard.text = "Hard ";
	hard.width = 128;
	hard.height = 64;
	hard.font = "20px 'Arial'";
	hard.x = 180;
	hard.y = 120;
	
	
	var Menu = new enchant.Label();
	Menu.text = "MENU";
	Menu.width = 128;
	Menu.height = 64;
	Menu.font = "18px 'Arial'";
	Menu.x = 90;
	Menu.y = 260;

    game.onload = function() 
	{
        background = new Sprite(240, 300);  
        background.x = background.y = 0;    
        background.image = game.assets['im.jpg'];
		
        game.rootScene.addChild(background);
		game.rootScene.addChild(Menu);
		
		if(start == false)
		{
		
			game.rootScene.addChild(easy);
			game.rootScene.addChild(medium);
			game.rootScene.addChild(hard);
		
			easy.addEventListener("touchstart", function() { 
															NR = 64; start = true;
															game.rootScene.removeChild(easy);
															game.rootScene.removeChild(medium);
															game.rootScene.removeChild(hard);
															game.onload();
															});
			medium.addEventListener("touchstart", function() {
															NR = 37; start = true;;
															game.rootScene.removeChild(easy);
															game.rootScene.removeChild(medium);
															game.rootScene.removeChild(hard); 
															game.onload();
															});
			hard.addEventListener("touchstart", function() {
															NR = 17; start = true;;
															game.rootScene.removeChild(easy);
															game.rootScene.removeChild(medium);
															game.rootScene.removeChild(hard);
															game.onload();
															});
		
		}
		
		var nr = 47, d = 15;
		for(var i=0; i<5; i++)
		{
			bear[i] = new Sprite(32, 32); 
			bear[i].x = Math.random() * 240;
			bear[i].y = d;
			d += nr;
			bear[i].width = 32;
			bear[i].height = 32;
			bear[i].stay = false;
			

			bear[i].image = game.assets['chara1.gif']; 
			bear[i].frame = 1;
			
			if(start == true && menu == false)
			{	
				bear[i].addEventListener("enterframe", function(i)
					{
						if(menu == false && this.stay == false )
						{
						if(menu == true)
						alert(menu);
							if(this.x < 220)
								this.x += 1;
							else
								this.x = 0;
							this.frame = this.age % 2 + 6;
							
							var a = Math.round(Math.random() * 100);
							if( a % NR == 0)
								this.stay = true;
						}
					});
			}
		}

        if(start == true && menu == false)
			game.rootScene.addEventListener('touchstart', function(e)
							{
								for(var i=0; i<5; i++)
									if( bear[i].stay == true ) 
										if( bear[i].x < e.localX && e.localX < bear[i].x + 32 && bear[i].y < e.localY && e.localY < bear[i].y + 32)
											bear[i].stay = false;
							});
		var restart, resume;
		Menu.addEventListener('touchstart', function() 
							{
								menu = true;
								restart = new enchant.Label();
								restart.text = "Restart";
								restart.width = 128;
								restart.height = 64;
								restart.font = "18px 'Arial'";
								restart.x = 40;
								restart.y = 120;
								
								resume = new enchant.Label();
								resume.text = "Resume";
								resume.width = 128;
								resume.height = 64;
								resume.font = "18px 'Arial'";
								resume.x = 150;
								resume.y = 120;
								
								game.rootScene.addChild(restart);
								game.rootScene.addChild(resume);
								
								if(menu == true)
								{
									restart.addEventListener("touchstart", function()
									{
										alert("restart");
										window.location.reload();
									});
									resume.addEventListener("touchstart", function()
									{
										alert("resume");
										game.rootScene.removeChild(restart);
										game.rootScene.removeChild(resume);
										menu = false;
									});
								
								}
							});
        game.score = 0;
		var Score = new enchant.Label();
        Score.text = "Score " + game.score;
        Score.width = 128;
        Score.height = 64;
        Score.font = "18px 'Arial'";
		Score.x = 0;
		Score.y = 260;
		Score.frame = 1;
		
		for(var i=0; i<3; i++)
		{
			heart[i] = new Sprite(23,23);
			heart[i].image = game.assets['heart1.png'];
			heart[i].x = 150 + 23*i;
			heart[i].y = 260;
			heart[i].frame = 1;
			heart[i].width = 20;
			heart[i].height = 20;
		}
		if(start == true && menu == false)
		{
			game.rootScene.addEventListener('enterframe',function()
		{
			var nr = 0;
            for(var i=0; i<5; i++)
				if(bear[i].stay == false)
					nr++;
			if(nr == 5)
				game.score += 10;
			if(nr == 0)
			{
				if(N < 3)
				{
					game.rootScene.removeChild(heart[N]);
					N++;
					for(var i=0; i<5; i++)
						bear[i].stay = false;
				}
				else
					game.end();
			}
			if(start == true)
			Score.text = "Score " + game.score;
			game.rootScene.addChild(Score);
			game.rootScene.addChild(Menu);
			
        });
		}
		if(start == true)
			for(var i=0; i<5; i++)
				game.rootScene.addChild(bear[i]);
		for(var i=0; i<3; i++)
				game.rootScene.addChild(heart[i]);
		
		game.end = function()
		{	
			var lose = new enchant.Label();
			lose.text = "You lose ";
			lose.width = 128;
			lose.height = 64;
			lose.font = "24px 'Arial'";
			lose.x = 80;
			lose.y = 120;
			lose.frame = 1;
			game.rootScene.addChild(lose);
		}
		
    
	}
    game.start();
}
