// 1. Deposit Money
// 2. Determine number of lines to bet
// 3. Collect Bet Amount
// 4. Spin the Slot Machine
// 5. Check user winnings
// 6. Return user winnings
// 7. Play again/ Game over

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const  SYMBOLS_COUNT = { // symbol values
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOL_VALUES = { //multipler
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
};

const deposit = () => {
    while (true) { //infinty Loop
 const amountDeposit = prompt("Please enter deposit amount: ");
 const amountDepositNumber = parseFloat(amountDeposit);

 if (isNaN(amountDepositNumber) || amountDepositNumber <= 0) {
    console.log("Invalid deposit amount, try again.");
 } else {
    return amountDepositNumber;  
 }
}
};

const getNumberOfLines = () => { // () - is a return function
    while (true) { //infinty Loop
        const lines = prompt("Select number of lines(1-3): ");
        const numberOfLines  = parseFloat(lines);
       
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3)  {
           console.log("Invalid number of lines try again.");
        } else {
           return numberOfLines;  
        }
       }
};
 
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per lines: ");
        const numberBet = parseFloat(bet);
       
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance / lines))  {
           console.log("Invalid bet, try again.");
        } else {
           return numberBet;  
            }
       }
};

const spins = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol); // instering an new element inside an array. repensts a column
        }
    }

    const reels = [];   // [[]] nested Arrays (Array inside an array.)
        for (let i = 0;  i < COLS; i++) {
            reels.push([]);   
            const reelSymbols = [...symbols];
            for (let j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1)
            }
        } 
        return reels;
    };

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++ ) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != rows.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of  symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        } 
    }
     return winnings;
}
    const game = () => {
    let balance = deposit(); 

    while (true) {
    console.log("You have a balance of $" + balance);    
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines; 
    const reels = spins();
    const rows = transpose(reels);
    console.log(reels);
    console.log(rows);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString()); 

    if (balance <= 0) {
        console.log("You ran out of money!");
        break;
       
    }

    const playAgain = prompt("Do you want to play again (y/n)?");

    if (playAgain != "y") break;

}
};

game();