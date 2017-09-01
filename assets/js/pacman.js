var pacman,up,down,left,right;

var Pacman = {
	preload: function() {
		game.load.image('wall', './assets/images/snake.png');
		game.load.image('pacman', './assets/images/target.png')
	},

	create: function() {
		wall=[];
		up=true,down=true,left=true,right=true;
		updateDelay=0;
		speed=11;
		direction=null;
		game.stage.backgroundColor = '#000000';
		for (var i=0;i<snake.length;i++) {
			wall[i]=game.add.sprite(snake[i].x,snake[i].y,'wall');
		}
		pacman=game.add.sprite(0,0,'pacman');
		game.add.text(30, 20, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
	},

	update: function() {
        if (cursors.right.isDown)
        {
            direction = 'right';
        }
        else if (cursors.left.isDown)
        {
            direction = 'left';
        }
        else if (cursors.up.isDown)
        {
            direction = 'up';
        }
        else if (cursors.down.isDown)
        {
            direction = 'down';
        }

        updateDelay++;

        if (updateDelay >=1) {

            if(direction == 'right' && right==true){
                pacman.x = pacman.x + 3;
            }
            else if(direction == 'left' && left==true){
                pacman.x = pacman.x - 3;
            }
            else if(direction == 'up' && up==true){
                pacman.y = pacman.y - 3;
            }
            else if(direction == 'down' && down==true) {
                pacman.y = pacman.y + 3;
            }
            updateDelay=0;
            direction=null;
        }

        this.wallCollision();
	},

	wallCollision: function() {
		right=true,left=true,down=true,up=true;
		//check with borders
		if(pacman.x >= 732.5) 
			right=false;
		if(pacman.x <= 0) 
			left=false;
		if (pacman.y >= 583) 
			down=false;
		if (pacman.y <= 0) 
			up=false;

		//check with walls
		for(var i = 0; i < wall.length; i++) {
			if(pacman.x==(wall[i].x-15)&&Math.abs(pacman.y-wall[i].y)<15)
				right=false;
			if(pacman.x==(wall[i].x+15)&&Math.abs(pacman.y-wall[i].y)<15)
				left=false;
			if(pacman.y==(wall[i].y-15)&&Math.abs(pacman.x-wall[i].x)<15)
				down=false;
			if(pacman.y==(wall[i].y+15)&&Math.abs(pacman.x-wall[i].x)<15)
				up=false;
		}	
	}
};