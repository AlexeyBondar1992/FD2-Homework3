'use strict';
let deck = new Deck().shuffle(),
    playersNumber = 2,
    playersNames = ['Vasili', 'Petr'],
    playersCards = cardDeal(deck, playersNumber),
    players = createPlayers(playersNames, playersCards);
    new PlayingGame(players);

function cardDeal(deck, playersCount) {
    let playersCards = [],
        length = deck.length/playersCount;
    for (let j = 0; j < playersCount; j++) {
        playersCards[j] = deck.splice(0,length);
    }
    return playersCards;
}
function createPlayers(playersNames, playersCards) {
    let players = [];
    for (let i = 0; i < playersNames.length; i++){
        players[i] = new Player(playersNames[i], playersCards[i]);
    }
    return players;
}