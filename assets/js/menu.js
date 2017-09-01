var Menu = {

    preload : function() {
        // Load all the needed resources for the menu.
        game.load.image('menu', './assets/images/menu.png');
    },

    create: function () {

        // Add menu screen.
        // It will act as a button to start the game.
        this.add.button(0, 0, 'menu', this.startGame, this);
        game.add.text(263, 380, "Click to start", { font: "bold 36px arial", fill: "#46c0f9", align: "center"});
    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Snake');

    }

};