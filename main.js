const cardsContainer = document.querySelector("#cards-container"),
    resetButton = document.querySelector("#main-menu-button"),
    easyLevelButton = document.querySelector("#easy"),
    veryEasyLevelButton = document.querySelector("#very-easy"),
    mediumLevelButton = document.querySelector("#medium"),
    hardLevelButton = document.querySelector("#hard"),
    veryHardLevelButton = document.querySelector("#very-hard"),
    expertLevelButton = document.querySelector("#expert"),
    gameLevel = document.querySelector("#game-level"),
    game = document.querySelector("#game"),
    itemsContainer = document.querySelector("#items-container"),
    level = document.querySelector("#level"),
    hearts = document.querySelector("#hearts"),
    scores = document.querySelector("#scores"),
    hints = document.querySelector("#hints"),
    timer1 = document.querySelector("#timer"),
    questionWindow = document.querySelector("#question-window"),
    cancelButton = document.querySelector("#cancel"),
    exitButton = document.querySelector("#exit"),
    h2 = document.querySelector("h2");

let startingMinutes = 1,
    playerScores = 0,
    numberOfHearts = 3,
    numberOfHints = 2;

const veryEasy = ['😀', '😀', '😊', '😊', '😍', '😍', '🥰', '🥰'],

    easy = ['😀', '😀', '😊', '😊', '😍', '😍', '🥰', '🥰', '😎', '😎',
        '😜', '😜', '🤩', '🤩', '😂', '😂'],

    medium = ['😀', '😀', '😊', '😊', '😍', '😍', '🥰', '🥰', '😎', '😎',
        '😜', '😜', '🤩', '🤩', '😂', '😂', '😄', '😄', '🚗', '🚗', '👕', '👕',
        '👖', '👖', '🧥', '🧥', '👟', '👟', '👜', '👜', '🧢', '🧢', '👔', '👔', '🚙', '🚙'],

    hard = ['🚗', '🚗', '👕', '👕', '👖', '👖', '🧥', '🧥', '👟', '👟', '👜',
        '👜', '🧢', '🧢', '👔', '👔', '🚙', '🚙', '🚕', '🚕', '👗', '👗', '👞', '👞', '👒', '👒',
        '👚', '👚', '👢', '👢', '🧤', '🧤', '🧣', '🧣', '🧦', '🧦', '🕶️',
        '🕶️', '👘', '👘', '👡', '👡', '🧢', '🧢', '🧵', '🧵', '🚚', '🚚', '🛵', '🛵', '🛴', '🛴',
        '🚲', '🚲', '🚁', '🚁', '🦣', '🦣', '🦋', '🦋', '🪱', '🪱', '🐍', '🐍'],

    veryHard = ['😊', '😊', '😍', '😍', '🌳', '🌳', '🌸', '🌸', '🌞', '🌞', '😂', '😂', '🌺', '🌺',
        '🌲', '🌲', '😃', '😃', '🍃', '🍃', '🍂', '🍂', '😇', '😇', '🌷', '🌷', '🌼', '🌼', '😎', '😎',
        '🌻', '🌻', '🌵', '🌵', '🌙', '🌙',
        '😌', '😌', '🍁', '🍁', '😜', '😜', '🍄', '🍄', '🌰', '🌰', '😊', '😊', '🍀', '🍀', '🌾', '🌾',
        '😘', '😘', '🌿', '🌿', '🌺', '🌺', '🌼', '🌼', '😂', '😂', '🌸', '🌸',
        '🍃', '🍃', '🍂', '🍂', '😇', '😇', '🌳', '🌳', '🌷', '🌷', '🌻', '🌻', '🌲', '🌲', '😎',
        '😎', '🌞', '🌞', '🌵', '🌵', '🌙', '🌙', '😌', '😌', '🌾', '🌾', '🚣🏼‍♀️', '🚣🏼‍♀️', '🥁', '🥁', '🪇', '🪇', '🏵️', '🏵️', '🎗️', '🎗️'],

    expert = ['💍', '💍', '👑', '👑', '🎓', '🎓', '💅🏻', '💅🏻', '💃🏻', '💃🏻', '👻', '👻', '☃️', '☃️',
        '⛹🏻‍♂️', '⛹🏻‍♂️', '⛹🏻‍♀️', '⛹🏻‍♀️', '⛹🏾‍♀️', '⛹🏾‍♀️', '🪁', '🪁', '🎾', '🎾', '🥎', '🥎', '⚾', '⚾', '🏐', '🏐',
        '🎱', '🎱', '🏈', '🏈', '🏀', '🏀', '⚽', '⚽', '🌁', '🌁', '🌉', '🌉', '🌌', '🌌', '🌃', '🌃',
        '🏙️', '🏙️', '🏠', '🏠', '🌅', '🌅', '🌄', '🌄', '🌠', '🌠', '🎆', '🎆', '🎇', '🎇', '🌇', '🌇',
        '🌆', '🌆', '🏫', '🏫', '🏨', '🏨', '🏦', '🏦', '🏥', '🏥', '🏤', '🏤', '🏣', '🏣', '🏬', '🏬',
        '🏚️', '🏚️', '🏘️', '🏘️', '🏡', '🏡', '🏠', '🏠', '🛖', '🛖', '⛺', '⛺',
        '🏕️', '🏕️', '🗻', '🗻', '🏔️', '🏔️', '⛰️', '⛰️', '🪚', '🪚', '⛏️', '⛏️', '🛠️', '🛠️', '⚒️', '⚒️', '🔨',
        '🔨', '💡', '💡', '🔦', '🔦', '🕯️', '🕯️', '🪔', '🪔', '🧯', '🧯', '🛢️', '🛢️', '💸', '💸', '💵', '💵',
        '💴', '💴', '💶', '💶', '💷', '💷', '💰', '💰', '🪙', '🪙', '🧲', '🧲', '💣', '💣', '🧨', '🧨', '🪓', '🪓',
        '🔪', '🔪', '🗡️', '🗡️', '⚔️', '⚔️', '🩸', '🩸', '💉', '💉', '🛁', '🛁', '🛀🏻', '🛀🏻', '⚗️', '⚗️', '🪥', '🪥',
        '🧼', '🧼', '🪒', '🪒', '🪮', '🪮', '🧽', '🧽', '🪣', '🪣', '🧴', '🧴', '🛎️', '🛎️', '🔑', '🔑', '🗝️', '🗝️',
        '🎎', '🎎', '🎉', '🎉', '🌶️', '🌶️', '🫑', '🫑', '🌽', '🌽', '🫒', '🫒', '🧄', '🧄', '🍇', '🍇', '🥨', '🥨', '🍅', '🍅', '🍆', '🍆'];


veryEasyLevelButton.addEventListener("click", _e => {
    Play(veryEasy);
});

easyLevelButton.addEventListener("click", e => {
    Play(easy);
});

mediumLevelButton.addEventListener("click", e => {
    Play(medium);
});

hardLevelButton.addEventListener("click", e => {
    Play(hard);
});

veryHardLevelButton.addEventListener("click", e => {
    Play(veryHard);
});

expertLevelButton.addEventListener("click", e => {
    Play(expert);
});

function Play(arr) {
    gameLevel.classList.add("hidden");
    game.classList.remove("hidden");

    arr = arr.sort(() => (Math.random() > 0.5) ? 2 : -1);

    for (let i = 0; i < arr.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = arr[i];
        itemsContainer.appendChild(box);
        switch (arr.length) {
            case 8: {
                itemsContainer.style.setProperty('--item-size', '2em');
                itemsContainer.style.setProperty('--items-columns', '4');
                level.textContent = "Very Easy 🐣";
                h2.style.color = "#0aaaaa";

            }; break;
            case 16: {
                itemsContainer.style.setProperty('--item-size', '2em');
                itemsContainer.style.setProperty('--items-columns', '4');
                level.textContent = "Easy 🐤";
                h2.style.color = "#c7ff43";
            }; break;
            case 36: {
                itemsContainer.style.setProperty('--item-size', '1em');
                itemsContainer.style.setProperty('--items-columns', '6');
                level.textContent = "Medium 👶🏻";
                h2.style.color = "#05ee0d";
                startingMinutes = 2;
            }; break;
            case 64: {
                itemsContainer.style.setProperty('--item-size', '1em');
                itemsContainer.style.setProperty('--items-columns', '8');
                level.textContent = "Hard 🏃🏻‍♀️";
                h2.style.color = "#00c855";
                startingMinutes = 10;
            }; break;
            case 100: {
                itemsContainer.style.setProperty('--item-size', '1em');
                itemsContainer.style.setProperty('--items-columns', '10');
                level.textContent = "Very Hard ⚔️";
                h2.style.color = "#0028ff";
                startingMinutes = 15;
            }; break;
            default: {
                itemsContainer.style.setProperty('--item-size', '1em');
                itemsContainer.style.setProperty('--items-columns', '20');
                level.textContent = "Expert 😎";
                h2.style.color = "#ff0040";
                startingMinutes = 30;
            }; break;
        }

        box.onclick = function () {
            //i want when clicking on an open card again i want to close it
            this.classList.add("opened-box");
            setTimeout(function () {
                if (document.querySelectorAll(".opened-box").length > 1) {
                    if (document.querySelectorAll(".opened-box")[0].innerHTML == document.querySelectorAll(".opened-box")[1].innerHTML) {
                        document.querySelectorAll(".opened-box")[0].classList.add("box-match");
                        document.querySelectorAll(".opened-box")[1].classList.add("box-match");

                        document.querySelectorAll(".opened-box")[1].classList.remove("opened-box");
                        document.querySelectorAll(".opened-box")[0].classList.remove("opened-box");
                        playerScores++;
                        scores.textContent = `Scores: ${playerScores}`;

                        for (let i = 0; i < hearts.textContent.length; i++) {
                            if (hearts.textContent[i] == "💙") numberOfHearts++;
                        }

                        for (let i = 0; i < hints.textContent.length; i++) {
                            if (hints.textContent[i] == "💎") numberOfHints++;
                        }

                        if (playerScores % 3 == 0) {
                            // alert(numberOfHearts)
                            if (numberOfHearts < 3)
                                hearts.textContent += " 💙";
                        } else if (numberOfHints < 3) {
                            hints.textContent += " 💎";
                        }

                        if (document.querySelectorAll(".box-match").length == arr.length) {
                            alert("You Won!, Click Okay to Play again.");
                            window.location.reload();
                        }
                    }
                    else {
                        // setInterval(function () {
                        //     document.querySelectorAll(".open-box")[0].classList.add("opened-box");
                        //     document.querySelectorAll(".open-box")[1].classList.add("opened-box");
                        // }, 250)
                        document.querySelectorAll(".opened-box")[1].classList.remove("opened-box");
                        document.querySelectorAll(".opened-box")[0].classList.remove("opened-box");
                    }
                }
            }, 1500);
        }
    }

    hints.addEventListener("click", e => {
        let waitTime = 0;
        switch (level.textContent) {
            case "Very Easy 🐣": waitTime = 200; break;
            case "Easy 🐤": waitTime = 1000; break;
            case "Medium 👶🏻": waitTime = 2000; break;
            case "Hard 🏃🏻‍♀️": waitTime = 3000; break;
            case "Very Hard ⚔️": waitTime = 5000; break;
            case "Expert 😎": waitTime = 10000; break;
        }

        if (numberOfHints > 0) {
            alert(numberOfHints)
            for (let i = 0; i < arr.length; i++) {
                setTimeout(function () {
                    document.querySelectorAll(".item")[i].classList.add("opened-box");
                }, 500);
            }

            for (let j = 0; j < arr.length; j++) {
                setTimeout(function () {
                    document.querySelectorAll(".item")[j].classList.remove("opened-box");
                }, waitTime);
            }
            numberOfHints--;
            hints.textContent = hints.textContent.slice(0, -2);
            alert(numberOfHints)
        }
    });

    resetButton.addEventListener("click", _e => {
        questionWindow.classList.remove("hidden");
        cancelButton.addEventListener("click", e => {
            questionWindow.classList.add("hidden");
        });
        exitButton.addEventListener("click", e => {
            window.location.reload();
        });
    });

    let time = startingMinutes * 60;
    setInterval(UpdateCountDownTimer, 1000);

    function UpdateCountDownTimer() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        timer1.textContent = `Timer: ${minutes}:${seconds}`;
        if (seconds < 10) {
            timer1.style.color = "red";
        }
        time--;
        if (minutes == 0 && seconds == 0) {
            alert("Time is finished");
            window.location.reload();
        }
    }
}

