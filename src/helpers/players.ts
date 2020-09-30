import * as controller from '../index'
import * as utilities from './utilities'
import * as gameBoard from './gameBoard'
import * as gameLogic from './gameLogic'

export const Player1 = {
    tokenCount: 12,
    myTurn: false,
    ai: false
}

export const Player2 = {
    tokenCount: 12,
    myTurn: false,
    ai: false
}


export function startPlayerOne() {
    gameBoard.grid().forEach(quadElement => (quadElement as HTMLElement).innerText = '');
    Player1.tokenCount = 12;
    Player2.tokenCount = 12;
    Player1.ai = false;
    Player2.ai = true;
    gameBoard.chooseWhoStarts();
    gameBoard.displayTokenCounts();
    gameBoard.grid().forEach(quadElement => quadElement.addEventListener('click', controller.clickFn));
    gameLogic.initAIGame();
    gameBoard.updateGridColors();
}

export function startPlayerTwo() {
    gameBoard.grid().forEach(quadElement => (quadElement as HTMLElement).innerText = '');
    Player1.ai = false;
    Player2.ai = false;
    Player1.tokenCount = 12;
    Player2.tokenCount = 12;
    gameBoard.displayTokenCounts();
    gameBoard.chooseWhoStarts();
    gameBoard.grid().forEach(quadElement => quadElement.addEventListener('click', controller.clickFn));
    gameBoard.updateGridColors();
}

export function startPlayerZero() {
    gameBoard.grid().forEach(quadElement => (quadElement as HTMLElement).innerText = '');
    Player1.tokenCount = 12;
    Player2.tokenCount = 12;
    gameBoard.displayTokenCounts();
    gameBoard.chooseWhoStarts();
    Player1.ai = true;
    Player2.ai = true;
    gameBoard.grid().forEach(quadElement => quadElement.addEventListener('click', controller.clickFn));
    gameLogic.initAIGame();
    gameBoard.updateGridColors();
}

export function player1TakeTurn(index: number) {
    (gameBoard.grid()[index] as HTMLElement).innerText = "x";
    Player1.tokenCount -= 1;

    gameBoard.displayTokenCounts();
    toggleTurn();
    gameBoard.displayWhosTurn();
    gameBoard.updateGridColors();
}

export function player2TakeTurn(index: number) {
    (gameBoard.grid()[index] as HTMLElement).innerText = "o";
    Player2.tokenCount -= 1;

    gameBoard.displayTokenCounts();
    toggleTurn();
    gameBoard.displayWhosTurn();
    gameBoard.updateGridColors();
}

let phase1 = true;

export function toggleTurn() {
    Player1.myTurn = !Player1.myTurn;
    Player2.myTurn = !Player2.myTurn;

    displayGamePhase();

    if (Player1.myTurn && Player1.ai && phase1 || Player2.myTurn && Player2.ai && phase1) {
        gameLogic.phase1AIMove();
    }
    if (Player1.myTurn && Player1.ai && !phase1 || Player2.myTurn && Player2.ai && !phase1) {
        gameLogic.phase2AIMove();
    }
}

export function displayGamePhase() {
    if (Player1.tokenCount != 0 && Player2.tokenCount != 0) {
        utilities.getElementById("gamePhase")!.innerHTML = "Phase 1";
    }
    else if (Player1.tokenCount == 0 && Player2.tokenCount == 0 && phase1) {
        alert("Phase 2 begins!");
        phase1 = false;
        utilities.getElementById("gamePhase")!.innerHTML = "Phase 2";
        controller.disableListeners();
        controller.makeElementsDraggable();
    }
    else{
        utilities.getElementById("gamePhase")!.innerHTML = "Phase 2";
    }
    gameBoard.updateGridColors();
}