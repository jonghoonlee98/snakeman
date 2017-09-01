var Game_Over = {

    preload : function() {
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {
        this.add.button(0, 0, 'gameover', this.startGame, this);

        game.add.text(260, 390, "Click to retry", { font: "bold 36px arial", fill: "#46c0f9", align: "center"});
        game.add.text(285, 350, "SCORE", { font: "bold 16px arial", fill: "#46c0f9", align: "center"});
        game.add.text(350, 348, score.toString(), { font: "bold 20px arial", fill: "#fff", align: "center" });
    },

    startGame: function () {
        this.state.start('Snake');
    }

};