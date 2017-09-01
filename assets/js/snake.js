var snake, target, squareSize, score, speed,
    updateDelay, direction, new_direction,
    cursors, scoreTextValue, textStyle_Key, textStyle_Value;

var Snake = {

    preload : function() {
        game.load.image('snake', './assets/images/snake.png');
        game.load.image('target', './assets/images/target.png');
    },

    create : function() {
        snake = [];
        target = {};
        squareSize = 15;
        score = 0;
        speed = 13;
        updateDelay = 0;
        direction = 'right';
        new_direction = null;

        cursors = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#000000';

        var randY = (Math.floor(Math.random() * 38 )+1)* squareSize;
        var randX = (Math.floor(Math.random() * 20 )+1)* squareSize;
        snake[0] = game.add.sprite(randX, randY, 'snake'); 

        this.generateTarget();

        textStyle_Key = { font: "bold 15px arial", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 20px arial", fill: "#fff", align: "center" };

        game.add.text(30, 20, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
    },

    update: function() {
        if (cursors.right.isDown && direction!='left')
        {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction!='right')
        {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction!='down')
        {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction!='up')
        {
            new_direction = 'down';
        }

        updateDelay++;

        if (updateDelay % (20-speed) == 0) {

            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }


            if(direction == 'right'){
                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'left'){
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'up'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if(direction == 'down'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }

            snake.push(lastCell);
            firstCell = lastCell;

            snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));

            this.targetCollision();
            this.selfCollision(firstCell);
            this.borderCollision(firstCell);
        }


    },

    generateTarget: function(){

        var randomY = (Math.floor(Math.random() * 32 )+4)* squareSize;
        var randomX = (Math.floor(Math.random() * 42 )+4)* squareSize;

        target = game.add.sprite(randomX, randomY, 'target');
    },

    targetCollision: function() {

        for(var i = 0; i < snake.length; i++){
            if(snake[i].x == target.x && snake[i].y == target.y){

                target.destroy();

                score++;

                if(score==level) {
                    game.state.start('Pacman');
                }
                else
                    this.generateTarget();

                scoreTextValue.text = score.toString();
            }
        }

    },

    selfCollision: function(head) {
        for(var i = 0; i < snake.length - 1; i++){
            if(head.x == snake[i].x && head.y == snake[i].y){

                game.state.start('Game_Over');
                
            }
        }

    },

    borderCollision: function(head) {
        if(head.x >= 750 || head.x < 0 || head.y >= 600 || head.y < 0){
            game.state.start('Game_Over');
        }

    }

};