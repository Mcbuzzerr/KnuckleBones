p1Dice = [[],[],[]];
p2Dice = [[],[],[]];

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

function findWinner() {
    let p1Score = 0;
    let p2Score = 0;
    p1Dice.forEach(column => {
        for(let i = 0; i < column.length; i++) {
            let scored = false;
            for(let j = i + 1; j < column.length; j++) {
                if (column[i] == column[j] && j > i) {
                    if (i == 0 && j == 1 && column[2] == column[i]){
                        //triple
                        p1Score += column[i] * 9;
                        scored = true;
                        i = column.length;
                    } else {
                        //double
                        p1Score += column[i] * 4;
                        scored = true;
                    }
                }
            }
            if (!scored) p1Score += column[i];
        }
    });
}


// Dicetray die
// roll button
// click drag from dicetray die to desired location
// new die is created at location

// dicetraydie.addEventListener('click', function() {})
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

