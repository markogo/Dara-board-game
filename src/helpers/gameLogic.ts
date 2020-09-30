import * as gameBoard from './gameBoard'
import * as players from './players';
import * as utilities from './utilities'
import * as controller from '../index'

export const qNumId = (quadElement: any) => Number.parseInt(quadElement.id.replace('q', ''));

export function check4RowDrag(sourceEl: any, targetEl: any, letter: string) {

    let left = ((qNumId(targetEl) % 6) > 0) ? (document.getElementById('q' + (qNumId(targetEl) - 1)))! : "";
    let farLeft = ((qNumId(targetEl) % 6) > 1) ? (document.getElementById('q' + (qNumId(targetEl) - 2)))! : "";
    let furthestLeft = ((qNumId(targetEl) % 6) > 2) ? (document.getElementById('q' + (qNumId(targetEl) - 3)))! : "";

    let right = ((qNumId(targetEl) % 6) < 5) ? (document.getElementById('q' + (qNumId(targetEl) + 1)))! : "";
    let farRight = ((qNumId(targetEl) % 6) < 4) ? (document.getElementById('q' + (qNumId(targetEl) + 2)))! : "";
    let furthestRight = ((qNumId(targetEl) % 6) < 3) ? (document.getElementById('q' + (qNumId(targetEl) + 3)))! : "";

    let up = (document.getElementById('q' + (qNumId(targetEl) - 6))) ? (document.getElementById('q' + (qNumId(targetEl) - 6)))! : "";
    let farUp = (document.getElementById('q' + (qNumId(targetEl) - 12))) ? (document.getElementById('q' + (qNumId(targetEl) - 12)))! : "";
    let furthestUp = (document.getElementById('q' + (qNumId(targetEl) - 18))) ? (document.getElementById('q' + (qNumId(targetEl) - 18)))! : "";

    let down = (document.getElementById('q' + (qNumId(targetEl) + 6))) ? (document.getElementById('q' + (qNumId(targetEl) + 6)))! : "";
    let farDown = (document.getElementById('q' + (qNumId(targetEl) + 12))) ? (document.getElementById('q' + (qNumId(targetEl) + 12)))! : "";
    let furthestDown = (document.getElementById('q' + (qNumId(targetEl) + 18))) ? (document.getElementById('q' + (qNumId(targetEl) + 18)))! : "";

    //Figure out which direction does not need to be check
    if (qNumId(sourceEl) > qNumId(targetEl)) {
        //Either coming from the right or bottom
        if (qNumId(sourceEl) - 1 == qNumId(targetEl)) {
            //Coming from right
            if (((left as HTMLElement).innerText == letter && (farLeft as HTMLElement).innerText == letter && furthestLeft) ||
                ((up as HTMLElement).innerText == letter && (farUp as HTMLElement).innerText == letter && (furthestUp as HTMLElement).innerText == letter) ||
                ((down as HTMLElement).innerText == letter && (farDown as HTMLElement).innerText == letter && (furthestDown as HTMLElement).innerText == letter) ||
                ((up as HTMLElement).innerText == letter && (farUp as HTMLElement).innerText == letter && (down as HTMLElement).innerText == letter) ||
                ((down as HTMLElement).innerText == letter && (farDown as HTMLElement).innerText == letter && (up as HTMLElement).innerText == letter)) {
                return false;
            }
        }
        else {
            //Coming from bottom
            if (((left as HTMLElement).innerText == letter && (farLeft as HTMLElement).innerText == letter && furthestLeft) ||
                ((up as HTMLElement).innerText == letter && (farUp as HTMLElement).innerText == letter && (furthestUp as HTMLElement).innerText == letter) ||
                ((right as HTMLElement).innerText == letter && (farRight as HTMLElement).innerText == letter && (furthestRight as HTMLElement).innerText == letter) ||
                ((left as HTMLElement).innerText == letter && (farLeft as HTMLElement).innerText == letter && (right as HTMLElement).innerText == letter) ||
                ((right as HTMLElement).innerText == letter && (farRight as HTMLElement).innerText == letter && (left as HTMLElement).innerText == letter)) {
                return false;
            }
        }
    }
    else {
        //Coming from top or left
        if (qNumId(sourceEl) + 1 == qNumId(targetEl)) {
            //Coming from left
            if (((down as HTMLElement).innerText == letter && (farDown as HTMLElement).innerText == letter && furthestDown) ||
                ((up as HTMLElement).innerText == letter && (farUp as HTMLElement).innerText == letter && (furthestUp as HTMLElement).innerText == letter) ||
                ((right as HTMLElement).innerText == letter && (farRight as HTMLElement).innerText == letter && (furthestRight as HTMLElement).innerText == letter) ||
                ((down as HTMLElement).innerText == letter && (farDown as HTMLElement).innerText == letter && (up as HTMLElement).innerText == letter) ||
                ((up as HTMLElement).innerText == letter && (farUp as HTMLElement).innerText == letter && (down as HTMLElement).innerText == letter)) {
                return false;
            }
        }
        else {
            //coming from Up
            if (((down as HTMLElement).innerText == letter && (farDown as HTMLElement).innerText == letter && furthestDown) ||
                ((left as HTMLElement).innerText == letter && (farLeft as HTMLElement).innerText == letter && (furthestLeft as HTMLElement).innerText == letter) ||
                ((right as HTMLElement).innerText == letter && (farRight as HTMLElement).innerText == letter && (furthestRight as HTMLElement).innerText == letter) ||
                ((right as HTMLElement).innerText == letter && (farRight as HTMLElement).innerText == letter && (left as HTMLElement).innerText == letter) ||
                ((left as HTMLElement).innerText == letter && (farLeft as HTMLElement).innerText == letter && (right as HTMLElement).innerText == letter)) {
                return false;
            }
        }
    }
    //Allowed to move there
    return true;
}

export function check3Row(targetEl: any, letter: string) {
    //Far is two in that direction, normal is one
    //Have to check whether it is making a 3 in a row so could be ends or middle of line
    //If element does not exist then set the letter to "" which will fail the check
    //% 6 > 1 check far left side
    //% 6 < 4 check far right side

    let left = ((qNumId(targetEl) % 6) > 0) ? (document.getElementById('q' + (qNumId(targetEl) - 1)))! : "";
    let farLeft = ((qNumId(targetEl) % 6) > 1) ? (document.getElementById('q' + (qNumId(targetEl) - 2)))! : "";

    let right = ((qNumId(targetEl) % 6) < 5) ? (document.getElementById('q' + (qNumId(targetEl) + 1)))! : "";
    let farRight = ((qNumId(targetEl) % 6) < 4) ? (document.getElementById('q' + (qNumId(targetEl) + 2)))! : "";

    let up = (document.getElementById('q' + (qNumId(targetEl) - 6))) ? (document.getElementById('q' + (qNumId(targetEl) - 6)))! : "";
    let farUp = (document.getElementById('q' + (qNumId(targetEl) - 12))) ? (document.getElementById('q' + (qNumId(targetEl) - 12)))! : "";

    let down = (document.getElementById('q' + (qNumId(targetEl) + 6))) ? (document.getElementById('q' + (qNumId(targetEl) + 6)))! : "";
    let farDown = (document.getElementById('q' + (qNumId(targetEl) + 12))) ? (document.getElementById('q' + (qNumId(targetEl) + 12)))! : "";

    //Check if horizontal 3 in row
    
    if (((left as HTMLElement).innerText == letter && (right as HTMLElement).innerText == letter) ||
     ((farLeft as HTMLElement).innerText == letter && (left as HTMLElement).innerText == letter) ||
      ((farRight as HTMLElement).innerText == letter && (right as HTMLElement).innerText == letter)) {
        return false;
    }

    //Check if vertical 3 in a row  
    if (((up as HTMLElement).innerText == letter && (down as HTMLElement).innerText == letter) ||
     ((farUp as HTMLElement).innerText == letter && (up as HTMLElement).innerText == letter) ||
      ((farDown as HTMLElement).innerText == letter && (down as HTMLElement).innerText == letter)) {
        return false;
    }
    
    //Allowed to move there
    return true;
}


export function getNearbyQuads(targetEl: any) {

    let nearbyQuads: any = [];

    gameBoard.grid().forEach((quadElement) => {

        if (getLeftColumnQuads().includes(targetEl)) {
            if ((qNumId(targetEl) + 1 == qNumId(quadElement)) || (qNumId(targetEl) - 6 == qNumId(quadElement)) || (qNumId(targetEl) + 6 == qNumId(quadElement))) {
                nearbyQuads.push(quadElement);
            }
        }
        else if (getRightColumnQuads().includes(targetEl)) {
            if ((qNumId(targetEl) - 1 == qNumId(quadElement)) || (qNumId(targetEl) - 6 == qNumId(quadElement)) || (qNumId(targetEl) + 6 == qNumId(quadElement))) {
                nearbyQuads.push(quadElement);
            }
        }
        else {
            if ((qNumId(targetEl) - 1 == qNumId(quadElement)) || (qNumId(targetEl) + 1 == qNumId(quadElement)) || (qNumId(targetEl) - 6 == qNumId(quadElement)) || (qNumId(targetEl) + 6 == qNumId(quadElement))) {
                nearbyQuads.push(quadElement);
            }
        }
    })

    return nearbyQuads;
}

function getLeftColumnQuads() {
    let leftQuads: any = [];

    gameBoard.grid().forEach((quadElement) => {
        if (qNumId(quadElement) == 0 || qNumId(quadElement) == 6 || qNumId(quadElement) == 12 || qNumId(quadElement) == 18 || qNumId(quadElement) == 24) {
            leftQuads.push(quadElement);
        }
    })
    return leftQuads;
}

function getRightColumnQuads() {
    let rightQuads: any = [];

    gameBoard.grid().forEach((quadElement) => {
        if (qNumId(quadElement) == 5 || qNumId(quadElement) == 11 || qNumId(quadElement) == 17 || qNumId(quadElement) == 23 || qNumId(quadElement) == 29) {
            rightQuads.push(quadElement);
        }
    })
    return rightQuads;
}

let removeToken = false;

function removeElement(event: any) {
    event.target.innerText = '';
    removeToken = false;

    if (players.Player1.myTurn == true) {
        players.Player1.tokenCount += 1
    } else {
        players.Player2.tokenCount += 1
    }

    gameBoard.grid().forEach(quad => {
        quad.removeEventListener('click', removeElement);
    });

    gameBoard.displayTokenCounts();

    gameBoard.grid().forEach((quadElement) => {
        quadElement.addEventListener('drop', onDrop);
        quadElement.addEventListener('dragover', onDragOver);
    });
    if (gameBoard.checkForVictory()) {
        endGame();
    }
    else{
        players.toggleTurn();
        controller.makeElementsDraggable();
        gameBoard.displayWhosTurn();
    }
    players.displayGamePhase();
    gameBoard.updateGridColors();
}

export function onDrop(event: any) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const source = event.dataTransfer.getData('source');
    if (event.target.innerText != '' || removeToken) {
        return "";
    }
    else {
        utilities.getElementById(source)!.innerText = '';
        event.target.innerText = data;
        if (!check3Row(event.target, data)) {
            removeToken = true;
            utilities.removeTokenMessage();
            if (players.Player1.myTurn == true) {
                gameBoard.grid().forEach(quad => {
                    if ((quad as HTMLElement).innerText == 'o') {
                        quad.addEventListener('click', removeElement);
                    }
                });
            }
            else {
                gameBoard.grid().forEach(quad => {
                    if ((quad as HTMLElement).innerText == 'x') {
                        quad.addEventListener('click', removeElement);
                    }
                });
            }
        }
        else {
            gameBoard.grid().forEach((quadElement) => {
                quadElement.addEventListener('drop', onDrop);
                quadElement.addEventListener('dragover', onDragOver);
            });
            players.toggleTurn();
            controller.makeElementsDraggable();
            gameBoard.displayWhosTurn();
        }

    }
    event.dataTransfer.clearData();
    gameBoard.updateGridColors();
}

export function phase2AIMove() {
    setTimeout(function () {
        let tempSelected: Element;
        let selected: any;
        let target: any;
        let adjacent = 0;
        gameBoard.grid().filter(quadElement => (quadElement as HTMLElement).innerText == ((players.Player1.myTurn) ? 'x' : 'o')).forEach(Q => {
            tempSelected = Q;
            let neighbors = getNearbyQuads(tempSelected).filter((neighbor: { innerText: string; }) => neighbor.innerText == '');
            neighbors.forEach((n: any) => {
                if (getNearbyQuads(n).filter((neighbor: { innerText: string; }) => neighbor.innerText == ((players.Player1.myTurn) ? 'x' : 'o')).length >= adjacent) {
                    if (getNearbyQuads(n).filter((neighbor: { innerText: string; }) => neighbor.innerText == ((players.Player1.myTurn) ? 'x' : 'o')).length == adjacent) {
                        if(check4RowDrag(Q, n, ((players.Player1.myTurn) ? 'x' : 'o'))){
                            if (Math.random() > 0.5) {
                                selected = tempSelected;
                                target = n;
                            }
                        }
                    }
                    else {
                        if(check4RowDrag(Q, n, ((players.Player1.myTurn) ? 'x' : 'o'))){
                            adjacent = getNearbyQuads(n).filter((neighbor: { innerText: string; }) => neighbor.innerText == ((players.Player1.myTurn) ? 'x' : 'o')).length;
                            selected = tempSelected;
                            target = n;
                        }
                    }
                }
            });
        });

        if (target.innerText != '' || removeToken) {
            return "";
        }
        else {
            utilities.getElementById(selected.id)!.innerText = '';
            target.innerText = (players.Player1.myTurn) ? 'x' : 'o';
            if (!check3Row(target, (players.Player1.myTurn) ? 'x' : 'o')) {
                removeToken = true;
                alert('3 in a row! AI will remove token!');
                if (players.Player1.myTurn == true) {
                    gameBoard.grid().forEach(quad => {
                        if ((quad as HTMLElement).innerText == 'o') {
                            quad.addEventListener('click', removeElement);
                        }
                    });
                }
                else {
                    gameBoard.grid().forEach(quad => {
                        if ((quad as HTMLElement).innerText == 'x') {
                            quad.addEventListener('click', removeElement);
                        }
                    });
                }
                (gameBoard.grid().filter(Q => 
                    (Q as HTMLElement).innerText == ((players.Player1.myTurn) ? 'o' : 'x'))[Math.floor(Math.random() * (gameBoard.grid().filter(Q => (Q as HTMLElement).innerText == ((players.Player1.myTurn) ? 'o' : 'x')).length))] as HTMLInputElement).click();
            }
            else {
                gameBoard.grid().forEach((quadElement) => {
                    quadElement.addEventListener('drop', onDrop);
                    quadElement.addEventListener('dragover', onDragOver);
                });
                players.toggleTurn();
                controller.makeElementsDraggable();
                gameBoard.displayWhosTurn();
            }
        }
    }, 1000);
    gameBoard.updateGridColors();
}

export function initAIGame() {
    if (players.Player1.myTurn && players.Player1.ai || players.Player2.myTurn && players.Player2.ai) {
        (gameBoard.grid()[Math.floor(Math.random() * 30)] as HTMLInputElement).click();
    }
}


export function phase1AIMove() {
    setTimeout(function () {
        let available = gameBoard.emptyQs().filter(Q => check3Row(Q, (players.Player1.myTurn) ? 'x' : 'o'));
        let selected: any;
        let score = 0;
        available.forEach(Q => {
            if (getNearbyQuads(Q).filter((R: { innerText: string; }) => R.innerText == ((players.Player1.myTurn) ? 'x' : 'o')).length >= score) {
                if (getNearbyQuads(Q).filter((R: { innerText: string; }) => R.innerText == ((players.Player1.myTurn) ? 'x' : 'o')).length == score) {
                    if (Math.random() > 0.5) {
                        selected = Q;
                    }
                }
                else {
                    score = getNearbyQuads(Q).filter((R: { innerText: string; }) => R.innerText == ((players.Player1.myTurn) ? 'x' : 'o')).length;
                    selected = Q;
                }
            }
        });
        selected.click();
    }, 1000);
}

export function onDragOver(event: any) {
    event.preventDefault();
}

const endGame = () => { 
    let winner = (players.Player1.tokenCount > players.Player2.tokenCount) ? '1':'2';
    alert(`Game over!!!\nPlayer ${winner} wins!!! `);
    players.Player1.ai = false; players.Player2.ai = false; 
    players.displayGamePhase();
    gameBoard.grid().forEach((quadElement) => {
        quadElement.removeEventListener('dragstart', controller.onDragStart);
        quadElement.removeEventListener('dragover', onDragOver);
        quadElement.removeEventListener('drop', onDrop);
    })
    gameBoard.updateGridColors();
}
