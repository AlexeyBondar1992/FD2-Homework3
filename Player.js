(function () {
    'use strict';
    function Player(name, cards) {
        this.name = name;
        this.score = 0;
        this.cards = cards;
    }
    window.Player = Player
}());