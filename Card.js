(function () {
    'use strict';
    function Card(rank, suit, src) {
        this.rank = rank;
        this.suit = suit;
        this.src = src;
    }
    window.Card = Card
}());