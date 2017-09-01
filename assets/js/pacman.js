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
		new_direction = null;
		speed=11;
		direction='right';
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
            new_direction = 'right';
        }
        else if (cursors.left.isDown)
        {
            new_direction = 'left';
        }
        else if (cursors.up.isDown)
        {
            new_direction = 'up';
        }
        else if (cursors.down.isDown)
        {
            new_direction = 'down';
        }

        updateDelay++;

        if (updateDelay % (20-speed) == 0) {

			if(new_direction){
                direction = new_direction;
                new_direction = null;
            }

            if(direction == 'right' && right==true){
                pacman.x = pacman.x + 15;
            }
            else if(direction == 'left' && left==true){
                pacman.x = pacman.x - 15;
            }
            else if(direction == 'up' && up==true){
                pacman.y = pacman.y - 15;
            }
            else if(direction == 'down' && down==true) {
                pacman.y = pacman.y + 15;
            }
            
        }

        this.wallCollision();
	},

	wallCollision: function() {
		right=true,left=true,down=true,up=true;
		//check with borders
		if(pacman.x >= 735) 
			right=false;
		if(pacman.x <= 0) 
			left=false;
		if (pacman.y >= 585) 
			down=false;
		if (pacman.y <= 0) 
			up=false;

		//check with walls
		for(var i = 0; i < wall.length; i++) {
			if(pacman.x==(wall[i].x-15)&&pacman.y==wall[i].y)
				right=false;
			if(pacman.x==(wall[i].x+15)&&pacman.y==wall[i].y)
				left=false;
			if(pacman.y==(wall[i].y-15)&&pacman.x==wall[i].x)
				down=false;
			if(pacman.y==(wall[i].y+15)&&pacman.x==wall[i].x)
				up=false;
		}	
	}
};