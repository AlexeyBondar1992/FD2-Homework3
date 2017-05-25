(function () {
    'use strict';
    function PlayingGame(players) {
        let animation_duration = 2,
            suit = 0;//seconds
        start(players);
        suit = suitChoiceWheel(animation_duration);
        suitCardsWeightChange(suit, players);
        gamePlay(players, suit, animation_duration);
    }

    function start(players) {
        let playersDOM = document.body.querySelectorAll('.player'),
            divsInsideGame = document.body.querySelector('.game').querySelectorAll('div'),
            h1 = document.createElement('h1');
        h1.textContent = scoreGenerator(players);
        divsInsideGame[0].append(h1);
        for (let i = 0; i < players.length; i++) {
            let positionTop = 0;
            playersDOM[i].querySelector('h1').textContent = players[i].name;
            for (let j = 0; j < players[i].cards.length; j++) {
                let li = document.createElement('li');
                li.innerHTML = `<img src=images/Playing_Cards/back_Side.jpg>`;
                li.style.top = `${positionTop}px`;
                playersDOM[i].querySelector('ul').appendChild(li);
                positionTop += 3;
            }
        }
    }

    function scoreGenerator(players) {
        let text = '',
            length = players.length;
        for (let i = 0; i < length; i++) {
            if (i < length - 1) {
                text += `${players[i].score}  :  `;
            } else {
                text += `${players[i].score}`;
            }
        }
        return text;
    }

    function suitChoiceWheel(animation_duration) {
        let divsInsideGame = document.body.querySelector('.game').querySelectorAll('div'),
            spansInsideGame = divsInsideGame[1].querySelectorAll('span'),
            suit = Math.round(Math.random() * 3),
            rotateAngular = 360 * 6,
            suitName = ['spades', 'hearts', 'diamonds', 'clubs'];
        if (suit === 1) {
            rotateAngular += 270;
        } else if (suit === 2) {
            rotateAngular += 180;
        } else if (suit === 3) {
            rotateAngular += 90;
        }
        spansInsideGame[1].style.transition = `transform ${animation_duration}s linear`;
        setTimeout(function () {
            spansInsideGame[1].style.transform = `rotate(${rotateAngular}deg)`;
        }, 0);
        setTimeout(function () {
            spansInsideGame[0].style.background = `none`;
            spansInsideGame[1].style.background = `none`;
            spansInsideGame[1].style.border = `none`;
            divsInsideGame[1].style.background = 'url("images/' + suitName[suit] + '.png") no-repeat 50% 50%';
            divsInsideGame[1].style.backgroundSize = '50%';
            divsInsideGame[1].style.transition = `opacity ${animation_duration / 2}s linear`;
            setTimeout(function () {
                divsInsideGame[1].style.opacity = 0.5;
            }, 0);
        }, (animation_duration + 1) * 1000);
        return suit;
    }

    function suitCardsWeightChange(suit, players) {
        for (let i = 0; i < players.length; i++) {
            for (let j = 0; j < players[0].cards.length; j++) {
                if (suit === players[i].cards[j].suit) {
                    players[i].cards[j].rank = players[i].cards[j].rank + 10;
                }
            }
        }
    }

    function gamePlay(players, suit, animation_duration) {
        let playersDOM = document.body.querySelectorAll('.player'),
            player1CardsDOM = playersDOM[0].querySelectorAll('li'),
            player2CardsDOM = playersDOM[1].querySelectorAll('li'),
            score = document.body.querySelector('.game').querySelector('h1'),
            timeout = animation_duration * 2;
        for (let i = players[0].cards.length - 1; i >= 0; i--) {
            let player1Card = players[0].cards[i],
                player2Card = players[1].cards[i];
            setTimeout(function () {
                player1CardsDOM[i].classList.add('player1cardMove1');
                player2CardsDOM[i].classList.add('player2cardMove1');
                player1CardsDOM[i].addEventListener('animationend', function anim1() {
                    player1CardsDOM[i].classList.remove('player1cardMove1');
                    player2CardsDOM[i].classList.remove('player2cardMove1');
                    player1CardsDOM[i].querySelector('img').src = player1Card.src;
                    player2CardsDOM[i].querySelector('img').src = player2Card.src;
                    player1CardsDOM[i].classList.add('player1cardMove2');
                    player2CardsDOM[i].classList.add('player2cardMove2');
                    player1CardsDOM[i].removeEventListener('animationend', anim1);
                    player1CardsDOM[i].addEventListener('animationend', function anim2() {
                        player1CardsDOM[i].classList.remove('player1cardMove2');
                        player2CardsDOM[i].classList.remove('player2cardMove2');
                        if (player1Card.rank > player2Card.rank) {
                            players[0].score += 1;
                            score.textContent = scoreGenerator(players);
                            player1CardsDOM[i].classList.add('player1wins');
                            player2CardsDOM[i].classList.add('player2looses');
                        } else if (player1Card.rank < player2Card.rank) {
                            players[1].score += 1;
                            score.innerText = scoreGenerator(players);
                            player1CardsDOM[i].classList.add('player1looses');
                            player2CardsDOM[i].classList.add('player2wins');
                        } else {
                            player1CardsDOM[i].classList.add('player1looses');
                            player2CardsDOM[i].classList.add('player2looses');
                        }
                        player1CardsDOM[i].removeEventListener('animationend', anim2);
                        player1CardsDOM[i].addEventListener('animationend', function anim3() {
                            player1CardsDOM[i].style.transition = `transform 1s linear`;
                            player2CardsDOM[i].style.transition = `transform 1s linear`;
                            player1CardsDOM[i].style.transform = `translateY(210px) translateX(100px) scale(0.6)`;
                            player2CardsDOM[i].style.transform = `translateY(210px) translateX(-100px) scale(0.6)`;
                                let step = 0;
                                for (let j = i ; j < players[0].cards.length; j++) {
                                    player1CardsDOM[j].style.transform = `translateY(${210+step}px) translateX(100px) scale(0.6)`;
                                    player2CardsDOM[j].style.transform = `translateY(${210+step}px) translateX(-100px) scale(0.6)`;
                                    step +=125;
                                }
                        });
                    });
                });
            }, timeout * 1000);
            timeout += animation_duration * 2;
        }
    }
    window.PlayingGame = PlayingGame
}());