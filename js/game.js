let p1Dice = [[],[],[]];
let p2Dice = [[],[],[]];
let currentRoll = 0;


function visRoll(){
    //roll 30 times
    //update on final roll
    let rolls = 0;
    let trayDie = document.getElementById("trayDie");
    let endRoll = rollDie();

    let interval = setInterval(function(){
        rolls++;
        let newRoll = rollDie();
        for(let i = 1; i <= 6; i++) {
            trayDie.classList.remove("die-" + i);
        }
        trayDie.classList.add("die-" + newRoll);
        
        if (rolls == 16) {
            clearInterval(interval);
            trayDie.classList.remove("die-" + newRoll);
            trayDie.classList.add("die-" + endRoll);
        }
    }, 73);
    document.getElementById("trayDie").addEventListener('mouseDown', (event) => { clickDragDie(event) });
    return endRoll;
}

const clickDragDie = (event) => {
    let die = event.target;


}

function rollDie() {
        return Math.floor(Math.random() * 6) + 1;
}

/**
 * places a die in a column for a player
 * 
 * @param {number} column 
 * which column to place the die in
 * @param {number} die 
 * the die's value
 * @param {boolean} player 
 * true if player 1, false if player 2
 * @returns 
 * true if successful, false if not
 */
function placeDie(column, die, player) {
    if (player) {
        if (p1Dice[column].length < 3) {
            p1Dice[column].push(die);
            for(let i = 0; i < p2Dice[column].length; i++) {
                if (die == p2Dice[column][i]) {
                    p2Dice[column].splice(i,1);
                    break;
                }   
            }
            return true;
        } else return false;
    } else {
        if (p2Dice[column].length < 3) {
            p2Dice[column].push(die);
            for(let i = 0; i < p1Dice[column].length; i++) {
                if (die == p1Dice[column][i]) {
                    p1Dice[column].splice(i,1);
                    break;
                }   
            }
            return true;
        } else return false;
    }
}

function checkEnd() {
    //check if all columns are full
    let p1Full = true;
    let p2Full = true;
    for(let i = 0; i < 3; i++) {
        if (p1Dice[i].length != 3) p1Full = false;
        if (p2Dice[i].length != 3) p2Full = false;
    }
    if (p1Full || p2Full) return true;
    else return false;
}

function findWinner() {
    let p1Score = score(p1Dice);
    let p2Score = score(p2Dice);
    if (p1Score == p2Score) return 3;
    else if (p1Score > p2Score) return 1;
    else if (p2Score > p1Score) return 2;
    else return 0;
}


// Dicetray die
// roll button
// click drag from dicetray die to desired location
// new die is created at location




function score(diceArray) {
    let score = 0;
    diceArray.forEach(column => {
        for(let i = 0; i < column.length; i++) {
            let scored = false;
            for(let j = i + 1; j < column.length; j++) {
                if (column[i] == column[j] && j > i) {
                    if (i == 0 && j == 1 && column[2] == column[i]){
                        //triple
                        score += column[i] * 9;
                        scored = true;
                        i = column.length;
                    } else {
                        //double
                        score += column[i] * 4;
                        scored = true;
                    }
                }
            }
            if (!scored) score += column[i];
        }
    });
    return score;
}

