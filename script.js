
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#Reset");
let newGame = document.querySelector("#New");
let message = document.querySelector(".message");
let msg = document.querySelector("#msg");
let player1Score = 0;
let player2Score = 0;
let count = 0;
let player1 = true;

const winChance = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    player1 = true;
    enableBoxes();
    message.classList.add("hide");
}

const showWinner = (winner) => {
    msg.innerText = `WOW!, ${winner} wins this round!`;
    message.classList.remove("hide");
    disableBoxes();
    count++;
    if (winner === "O") {
        player1Score++;
    } else {
        player2Score++;
    }
    updateScore();
}

const updateScore = () => {
    document.getElementById('player1Score').innerText = `Player 1 Score: ${player1Score}`;
    document.getElementById('player2Score').innerText = `Player 2 Score: ${player2Score}`;
}

const checkWinner = () => {
    for (pattern of winChance) {
        let pval1 = boxes[pattern[0]].innerText;
        let pval2 = boxes[pattern[1]].innerText;
        let pval3 = boxes[pattern[2]].innerText;
        if (pval1 !== "" && pval2 !== "" && pval3 !== "") {
            if (pval1 === pval2 && pval2 === pval3) {
                console.log("winner", pval1);
                showWinner(pval1);
                return;
            }
        }
    }
    checkDraw();
}

const checkDraw = () => {
    let isDraw = true;
    for (box of boxes) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }
    if (isDraw) {
        msg.innerText = "It's a draw!";
        message.classList.remove("hide");
        disableBoxes();
    }
}

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = ''; // Clear the text content
    });
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (player1) {
            box.innerText = "O";
            player1 = false;
        } else {
            box.innerText = "X";
            player1 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

