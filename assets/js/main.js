var game;
var level=1;

game = new Phaser.Game(750, 600, Phaser.AUTO, '');

game.state.add('Menu', Menu);
game.state.add('Snake', Snake);
game.state.add('Pacman', Pacman);
game.state.add('Game_Over', Game_Over);


game.state.start('Menu');
