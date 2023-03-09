let p1Dice = [[null, null, null],[null, null, null],[null, null, null]];
let p2Dice = [[null, null, null],[null, null, null],[null, null, null]];
let currentRoll = 0;
let turns = 0;


function visRoll(){
    //roll 30 times
    //update on final roll
    let rolls = 0;
    let trayDie = document.createElement("div");
    trayDie.classList.add("die");
    trayDie.id = "trayDie";
    for (let i = 1; i <= 6; i++) {
        let pip = document.createElement("div");
        pip.classList.add("pip");
        pip.classList.add("centerInsides");
        pip.innerHTML = i;
        trayDie.appendChild(pip);
    }

    document.getElementById("diceTray").appendChild(trayDie);
    let endRoll = rollDie();
    console.log("endRoll: " + endRoll)

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
    trayDie.addEventListener('mousedown', clickDragDie);
    return endRoll;
}

const clickDragDie = (event) => {
    console.log("clickDragDie() called");
    if (event.target.id != "trayDie") return;
    let die = event.target;
    let tray = document.getElementById("diceTray");

    document.body.appendChild(die);
    die.style.position = 'absolute';
    die.style.zIndex = 1000;
    die.style.top = event.clientY - 30 + 'px';
    die.style.left = event.clientX - 30 + 'px';

    const onMouseUp = (event) => {
        //Place die in row
        document.body.removeChild(die);
        if (document.elementFromPoint(event.clientX, event.clientY).classList.contains("item") && document.elementFromPoint(event.clientX, event.clientY).innerHTML == "") {
            let tile = document.elementFromPoint(event.clientX, event.clientY);
            document.body.appendChild(die);
            let tileID = tile.id.split("-");
            let column = tileID[2];
            let row = tileID[1];
            let tileOwner = tileID[0];
            if (turns % 2 == 0 && tileOwner == "p1") {
                let value = die.classList[1].split("-")[1];
                die.id = ""
                placeDie(column, row, value, true)
                render()
                if (checkEnd()) {
                    switch (findWinner()) {
                        case 1:
                            popup(`Player 1 wins! With a score of ${score2(p1Dice)}`)
                            break;
                        case 2:
                            popup(`Player 2 wins! With a score of ${score2(p2Dice)}`)
                            break;
                        case 3:
                            popup(`A tie has occured! Score: ${score2(p1Dice)}`)
                            break;
                    }
                }
                let scoreBoard = document.getElementById("player1score")
                scoreBoard.innerText = score(p1Dice)
                
            }
            else if (turns % 2 == 1 && tileOwner == "p2") {
                let value = die.classList[1].split("-")[1];
                die.id = ""
                placeDie(column, row, value, false)
                render()
                if (checkEnd()) {
                    switch (findWinner()) {
                        case 1:
                            popup(`Player 1 wins! With a score of ${score2(p1Dice)} Loser Score: ${score(p2Dice)}`)
                            break;
                        case 2:
                            popup(`Player 2 wins! With a score of ${score2(p2Dice)} Loser Score: ${score(p1Dice)}`)
                            break;
                        case 3:
                            popup(`A tie has occured! Score: ${score2(p1Dice)}`)
                            break;
                        default:
                            popup("Something horrible has occured. Contact your loved ones. You should never have come here.")
                            break;
                    }
                }
                let scoreBoard = document.getElementById("player2score")
                scoreBoard.innerText = score(p2Dice)
            } else {
                tray.appendChild(die);
                die.style.position = 'relative';
                die.style.zIndex = 0;
                die.style.top = 0;
                die.style.left = 0;
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
                console.log("not your turn");
                return;
            }
            die.remove();
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
            die.removeEventListener('mousedown', clickDragDie);
            turns++;
        } else {
            tray.appendChild(die);
            die.style.position = 'relative';
            die.style.zIndex = 0;
            die.style.top = 0;
            die.style.left = 0;
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
            console.log("not a tile");
        }
    }

    const onMouseMove = (event) => {
        die.style.top = (event.clientY - 30)+ 'px';
        die.style.left = (event.clientX - 30)+ 'px';
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

const render = () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let tile = document.getElementById("p1-" + i + "-" + j);
            tile.innerHTML = "";
            if (p1Dice[i][j] == null) {
                continue;
            }

            let die = document.createElement("div");
            die.classList.add("die");
            die.classList.add("die-" + p1Dice[i][j]);
            for (let i = 1; i <= 6; i++) {
                let pip = document.createElement("div");
                pip.classList.add("pip");
                pip.classList.add("centerInsides");
                pip.innerHTML = i;
                die.appendChild(pip);
            }

            tile.appendChild(die);
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let tile = document.getElementById("p2-" + i + "-" + j);
            tile.innerHTML = "";
            if (p2Dice[i][j] == null) continue;

            let die = document.createElement("div");
            die.classList.add("die");
            die.classList.add("die-" + p2Dice[i][j]);
            for (let i = 1; i <= 6; i++) {
                let pip = document.createElement("div");
                pip.classList.add("pip");
                pip.classList.add("centerInsides");
                pip.innerHTML = i;
                die.appendChild(pip);
            }

            tile.appendChild(die);
        }
    }
}

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

/**
 * places a die in a column for a player
 * 
 * @param {number} column 
 * which column to place the die in
 * @param {number} row 
 * which row to place the die in
 * @param {number} die 
 * the die's value
 * @param {boolean} player 
 * true if player 1, false if player 2
 * @returns 
 * true if successful, false if not
 */
function placeDie(column, row, die, player) {
    if (player) {
        console.log(column)
        p1Dice[row][column] = Number(die);
        for(let i = 0; i < p2Dice[row].length; i++) {
            if (die == p2Dice[row][i]) {
                p2Dice[row][i] = null;
                continue;
            }   
        }
        return true;
    } else {
        p2Dice[row][column] = Number(die);
        for(let i = 0; i < p1Dice[row].length; i++) {
            if (die == p1Dice[row][i]) {
                p1Dice[row][i] = null;
                continue;
            }   
        }
        return true;
    }
}


function checkEnd() {
    //check if all columns are full
    let p1Full = true;
    let p2Full = true;
    for(let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (p1Dice[i][j] == null) p1Full = false;
            if (p2Dice[i][j] == null) p2Full = false;
        }
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

//Flawed
function score(diceArray) {
    let score = 0;
    for (let i = 0; i < diceArray.length; i++) {
        let rowScore = 0;
        let rowStr = diceArray[i].join("");
        let triple = false;
        let double = false;
        for (let j = 0; j < diceArray[i].length; j++) {
            if (diceArray[i][j] == null) continue;
            if (rowStr.includes(diceArray[i][j].toString().repeat(3)) && !triple) {
                rowScore += diceArray[i][j] * 9;
                break;
            } else if (rowStr.includes(diceArray[i][j].toString().repeat(2)) && (!triple && !double)) {
                rowScore += diceArray[i][j] * 4;
                break;
            } else {
                rowScore += diceArray[i][j];
            }
        }
        score += rowScore;
    }
    return score;
}

function score2(diceArray) {
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
                        score += column[i] * 3;
                        scored = true;
                    }
                }
            }
            if (!scored) score += column[i];
        }
    });
    return score;
}

