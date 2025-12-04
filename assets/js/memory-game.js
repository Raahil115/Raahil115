document.addEventListener("DOMContentLoaded", () => {

    const board = document.getElementById("board");
    const movesSpan = document.getElementById("moves");
    const matchesSpan = document.getElementById("matches");
    const pairsTotalSpan = document.getElementById("pairsTotal");

    const btnStart = document.getElementById("startGame");
    const btnRestart = document.getElementById("restartGame");

    const difficultySelect = document.getElementById("difficulty");

    const overlay = document.getElementById("memoryOverlay");
    const winStats = document.getElementById("winStats");
    const playAgain = document.getElementById("playAgain");
    const closeOverlay = document.getElementById("closeOverlay");

    let moves = 0;
    let matches = 0;
    let totalPairs = 0;

    let firstCard = null;
    let lockBoard = false;

    const icons = ["🍎","🍌","🍇","🍒","🍑","🥝","🍉","🍍","🥥","🍓","🍈","🍋"];

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function startGame() {
        board.innerHTML = "";
        moves = 0;
        matches = 0;
        lockBoard = false;
        movesSpan.textContent = 0;
        matchesSpan.textContent = 0;

        let size = difficultySelect.value === "easy" ? 6 : 12;
        totalPairs = size;
        pairsTotalSpan.textContent = totalPairs;

        board.className = "memory-board " + (size === 6 ? "card-easy" : "card-hard");

        let selectedIcons = shuffle(icons).slice(0, size);
        let cardSet = shuffle([...selectedIcons, ...selectedIcons]);

        cardSet.forEach(icon => {
            const card = document.createElement("div");
            card.classList.add("memory-card");

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">${icon}</div>
                    <div class="card-back">?</div>
                </div>
            `;

            card.addEventListener("click", () => flipCard(card, icon));
            board.appendChild(card);
        });
    }

    function flipCard(card, icon) {
        if (lockBoard) return;
        if (card === firstCard) return;

        card.classList.add("flipped");

        if (!firstCard) {
            firstCard = card;
            return;
        }

        moves++;
        movesSpan.textContent = moves;

        let secondIcon = card.querySelector(".card-front").textContent;
        let firstIcon = firstCard.querySelector(".card-front").textContent;

        if (firstIcon === secondIcon) {
            card.classList.add("matched");
            firstCard.classList.add("matched");
            firstCard = null;

            matches++;
            matchesSpan.textContent = matches;

            if (matches === totalPairs) {
                setTimeout(showWinPopup, 500);
            }
        } else {
            lockBoard = true;
            setTimeout(() => {
                card.classList.remove("flipped");
                firstCard.classList.remove("flipped");
                firstCard = null;
                lockBoard = false;
            }, 900);
        }
    }

    function showWinPopup() {
        winStats.textContent = `You won in ${moves} moves!`;
        overlay.hidden = false;
    }

    playAgain.addEventListener("click", () => {
        overlay.hidden = true;
        startGame();
    });

    closeOverlay.addEventListener("click", () => {
        overlay.hidden = true;
    });

    btnStart.addEventListener("click", startGame);
    btnRestart.addEventListener("click", startGame);
});
