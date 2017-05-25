(function () {
    'use strict';
    class Deck extends Array {
        constructor () {
            super();
            let suitName = ['spades', 'hearts', 'diamonds', 'clubs'],
                cardName = ['6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
            for (let i = 6; i <= 14; i++) {
                for (let j = 1; j <= 4; j++) {
                    this[(i - 6) + 9 * (j - 1)] = new Card(i, j - 1, `images/Playing_Cards/${cardName[i-6]}_of_${suitName[j-1]}.png`);
                }
            }
        }

        shuffle () {
            let shuffledDeck = [];
            for (let i = this.length - 1; i >= 0; i--) {
                let a = Math.round(Math.random()*i);
                shuffledDeck[i] = this.splice(a,1).shift();
            }
            return shuffledDeck;
        }
    }
    window.Deck = Deck
}());

/*(function () {
    'use strict';
    function Deck() {
        let deck = [],
            suitName = ['spades', 'hearts', 'diamonds', 'clubs'],
            cardName = ['6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
        for (let i = 6; i <= 14; i++) {
            for (let j = 1; j <= 4; j++) {
                deck[(i - 6) + 9 * (j - 1)] = new Card(i, j - 1, `images/Playing_Cards/${cardName[i-6]}_of_${suitName[j-1]}.png`);
            }
        }
        return deck;
    }
    Array.prototype.shuffle = function () {
        let shuffledDeck = [];
        for (let i = this.length - 1; i >= 0; i--) {
            let a = Math.round(Math.random()*i);
            shuffledDeck[i] = this.splice(a,1).shift();
        }
        return shuffledDeck;
    };
    window.Deck = Deck
}());*/
