import * as players from "./helpers/players"
import * as utilities from './helpers/utilities';
import * as gameLogic from './helpers/gameLogic';
import * as gameBoard from './helpers/gameBoard'

enableListeners();
gameBoard.displayTokenCounts();

function enableListeners() {
    utilities.getElementById('1player').addEventListener('click', players.startPlayerOne);
    utilities.getElementById('2player').addEventListener('click', players.startPlayerTwo);
    utilities.getElementById('0player').addEventListener('click', players.startPlayerZero);
}

export function clickFn(event: any) {
    if (!(gameBoard.emptyQs().includes(event.target))) {
        return "";
    }

    if (players.Player1.myTurn == true) {
        if (gameLogic.check3Row((event.target), 'x')) {
            players.player1TakeTurn(gameLogic.qNumId(event.target));
        } else {
            return '';
        }
    } else {
        if (gameLogic.check3Row((event.target), 'o')) {
            players.player2TakeTurn(gameLogic.qNumId(event.target));
        } else {
            return '';
        }
    }
}

export function disableListeners() {
    gameBoard.grid().forEach(quadElement => quadElement.removeEventListener('click', clickFn));
}

export function makeElementsDraggable() {
    gameBoard.grid().forEach((quadElement) => {
        if (players.Player1.myTurn == true) {
            if ((quadElement as HTMLElement).innerText == 'x') {
                quadElement.setAttribute('draggable', "true")
            } else {
                quadElement.setAttribute('draggable', "false")
            }
        }
        else {
            if ((quadElement as HTMLElement).innerText == 'o') {
                quadElement.setAttribute('draggable', "true")
            } else {
                quadElement.setAttribute('draggable', "false")
            }
        }
        quadElement.addEventListener('dragstart', onDragStart),
            quadElement.addEventListener('dragover', gameLogic.onDragOver),
            quadElement.addEventListener('drop', gameLogic.onDrop)
    });
}

export function onDragStart(event: any) {

    let nearbyQuads = gameLogic.getNearbyQuads(event.target);

    gameBoard.grid().forEach((quadElement) => {
        if (!(nearbyQuads.includes(quadElement)) || !gameLogic.check4RowDrag(event.target,quadElement, (players.Player1.myTurn)?'x':'o')) {
            quadElement.removeEventListener('drop', gameLogic.onDrop);
            quadElement.removeEventListener('dragover', gameLogic.onDragOver);
        } else {
            quadElement.addEventListener('dragover', gameLogic.onDragOver);
            quadElement.addEventListener('drop', gameLogic.onDrop);
        }
    });
    event.dataTransfer.setData('text', event.target.innerText);
    event.dataTransfer.setData('source', event.target.id);
}