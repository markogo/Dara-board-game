import * as utilities from './utilities';
import * as players from './players'

export const grid = () => Array.from(document.getElementsByClassName('q'));

export function emptyQs() {
    return grid().filter(quadElement => (quadElement as HTMLElement).innerText === '');
}

export function updateGridColors(){
    grid().filter(Q => (Q as HTMLElement).innerText == 'x').forEach(n => (n as HTMLElement).style.backgroundColor = "green");
    grid().filter(Q => (Q as HTMLElement).innerText == 'o').forEach(n => (n as HTMLElement).style.backgroundColor = "red");
    grid().filter(Q => (Q as HTMLElement).innerText == '').forEach(n => (n as HTMLElement).style.backgroundColor = "");
}

const countX = () => grid().filter(quadElement => (quadElement as HTMLElement).innerText === 'x').length;

const countO = () => grid().filter(quadElement => (quadElement as HTMLElement).innerText === 'o').length;

export const checkForVictory = () => {
    return (countX() < 3 || countO() < 3);
}

export function displayWhosTurn() {
    if (players.Player1.myTurn == true) {
        utilities.getElementById('whosTurn')!.innerHTML = "Player 1 turn!";
    } else {
        utilities.getElementById('whosTurn')!.innerHTML = "Player 2 turn!";
    }
}

export function displayTokenCounts() {
    utilities.getElementById('player1Token')!.innerHTML = String(players.Player1.tokenCount);
    utilities.getElementById('player2Token')!.innerHTML = String(players.Player2.tokenCount);
}


export function chooseWhoStarts() {
    const rd1 = utilities.getElementById("rd1")!;
    const rd2 = utilities.getElementById("rd2")!;

    if ((rd1 as HTMLInputElement).checked == true) {
        players.Player1.myTurn = true;
        players.Player2.myTurn = false;
    } else if ((rd2 as HTMLInputElement).checked == true) {
        players.Player2.myTurn = true;
        players.Player1.myTurn = false;
    }
    displayWhosTurn();
    players.displayGamePhase();
}
