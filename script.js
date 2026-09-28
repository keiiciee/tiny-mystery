"use strict";

/* =========================================
   TINY MYSTERY
   Complete Game Engine
========================================= */


/* =========================================
   SETTINGS
========================================= */

const STORAGE_KEY = "tinyMysteryData";
const THEME_KEY = "tinyMysteryTheme";
const SOUND_KEY = "tinyMysterySound";

const POINTS_CORRECT = 100;
const POINTS_WRONG = -30;
const CLUE_PENALTY = 10;


/* =========================================
   DOM
========================================= */

const homeScreen =
    document.getElementById("homeScreen");

const caseScreen =
    document.getElementById("caseScreen");

const resultScreen =
    document.getElementById("resultScreen");

const startButton =
    document.getElementById("startButton");

const nextCaseButton =
    document.getElementById("nextCaseButton");

const homeFromResultButton =
    document.getElementById(
        "homeFromResultButton"
    );

const howToPlayButton =
    document.getElementById(
        "howToPlayButton"
    );

const closeInfoButton =
    document.getElementById(
        "closeInfoButton"
    );

const closeInfoAction =
    document.getElementById(
        "closeInfoAction"
    );

const soundButton =
    document.getElementById(
        "soundButton"
    );

const themeButton =
    document.getElementById(
        "themeButton"
    );

const accusationButton =
    document.getElementById(
        "accuseButton"
    );

const closeAccusationButton =
    document.getElementById(
        "closeAccusationButton"
    );

const accusationModal =
    document.getElementById(
        "accusationModal"
    );

const accusationOptions =
    document.getElementById(
        "accusationOptions"
    );

const infoModal =
    document.getElementById(
        "infoModal"
    );

const caseTitle =
    document.getElementById(
        "caseTitle"
    );

const caseNumber =
    document.getElementById(
        "caseNumber"
    );

const caseStory =
    document.getElementById(
        "caseStory"
    );

const suspectsGrid =
    document.getElementById(
        "suspectsGrid"
    );

const cluesGrid =
    document.getElementById(
        "cluesGrid"
    );

const scoreElement =
    document.getElementById(
        "score"
    );

const streakElement =
    document.getElementById(
        "streak"
    );

const clueCountElement =
    document.getElementById(
        "clueCount"
    );

const resultIcon =
    document.getElementById(
        "resultIcon"
    );

const resultLabel =
    document.getElementById(
        "resultLabel"
    );

const resultTitle =
    document.getElementById(
        "resultTitle"
    );

const resultText =
    document.getElementById(
        "resultText"
    );

const earnedPoints =
    document.getElementById(
        "earnedPoints"
    );

const resultCorrect =
    document.getElementById(
        "resultCorrect"
    );

const resultClues =
    document.getElementById(
        "resultClues"
    );

const resultStreak =
    document.getElementById(
        "resultStreak"
    );

const newBest =
    document.getElementById(
        "newBest"
    );

const homeSolved =
    document.getElementById(
        "homeSolved"
    );

const homeStreak =
    document.getElementById(
        "homeStreak"
    );

const homeBest =
    document.getElementById(
        "homeBest"
    );

const toast =
    document.getElementById(
        "toast"
    );


/* =========================================
   PLAYER DATA
========================================= */

let playerData = {
    solved: 0,
    streak: 0,
    bestScore: 0
};


/* =========================================
   GAME STATE
========================================= */

let currentCase = null;

let currentCaseNumber = 0;

let totalScore = 0;

let cluesOpened = 0;

let caseFinished = false;

let soundEnabled = true;

let audioContext = null;

let toastTimeout = null;


/* =========================================
   MYSTERIES
========================================= */

const mysteries = [

    {
        title: "The Missing Cookie",

        story:
            "The last chocolate chip cookie disappeared from the kitchen just before dinner. Three people were nearby. Someone is clearly not telling the whole story.",

        suspects: [

            {
                name: "Mia",
                avatar: "👩🏻",

                description:
                    "The baker's daughter.",

                statement:
                    "Mia says she was in the living room reading a book and never went into the kitchen.",

                detail:
                    "She says she left her book on the living room sofa."
            },

            {
                name: "Leo",
                avatar: "👦🏻",

                description:
                    "The family's youngest.",

                statement:
                    "Leo says he was outside playing and only came inside when dinner was ready.",

                detail:
                    "His shoes were still covered in a little grass."
            },

            {
                name: "Sam",
                avatar: "🧑🏻",

                description:
                    "The neighbor's kid.",

                statement:
                    "Sam says he was in the kitchen looking for a glass of water, but he didn't touch the cookie.",

                detail:
                    "He admits he was the last person seen near the counter."
            }

        ],

        clues: [

            {
                icon: "📖",
                title: "The Book",
                text:
                    "Mia's book was found open on the living room sofa. It had not been moved.",
                connection:
                    "This supports Mia's story."
            },

            {
                icon: "👟",
                title: "Grass",
                text:
                    "Leo's shoes were wet and covered with fresh grass.",
                connection:
                    "Leo had likely just come from outside."
            },

            {
                icon: "🍫",
                title: "Chocolate Smear",
                text:
                    "A small chocolate smear was found on the edge of the kitchen glass.",
                connection:
                    "Someone handling the cookie was using a glass."
            },

            {
                icon: "🥛",
                title: "The Glass",
                text:
                    "The glass belonged to Sam. He was the only suspect who admitted using one.",
                connection:
                    "Sam's story puts him directly beside the cookie."
            }

        ],

        answer: "Sam",

        explanation:
            "Sam was the only suspect who admitted being beside the kitchen counter, and the chocolate smear was found on his glass."
    },


    {
        title: "The Vanishing Necklace",

        story:
            "A necklace disappeared from a bedroom drawer while the family was downstairs. Nobody admits taking it, but one detail doesn't match.",

        suspects: [

            {
                name: "Ella",
                avatar: "👩🏼",

                description:
                    "The older sister.",

                statement:
                    "Ella says she was doing homework at the dining table.",

                detail:
                    "Her notebook was covered with fresh ink."
            },

            {
                name: "Noah",
                avatar: "👦🏼",

                description:
                    "The younger brother.",

                statement:
                    "Noah says he went upstairs to get his headphones.",

                detail:
                    "He says he never entered the bedroom."
            },

            {
                name: "Ava",
                avatar: "👩🏻",

                description:
                    "A family friend.",

                statement:
                    "Ava says she stayed downstairs the entire time.",

                detail:
                    "She was helping prepare snacks."
            }

        ],

        clues: [

            {
                icon: "🎧",
                title: "Headphones",
                text:
                    "Noah's headphones were still downstairs on the sofa.",
                connection:
                    "Noah's reason for going upstairs doesn't make sense."
            },

            {
                icon: "📓",
                title: "Homework",
                text:
                    "Ella's notebook had writing that appeared to have been done recently.",
                connection:
                    "Ella's story is supported."
            },

            {
                icon: "👣",
                title: "Footprints",
                text:
                    "A pair of small footprints led from the stairs toward the bedroom.",
                connection:
                    "Someone did go upstairs."
            },

            {
                icon: "🧣",
                title: "Scarf",
                text:
                    "A loose thread matching Noah's scarf was caught on the bedroom drawer.",
                connection:
                    "The drawer was likely opened by Noah."
            }

        ],

        answer: "Noah",

        explanation:
            "Noah claimed he went upstairs for his headphones, but the headphones were already downstairs. His scarf thread was also caught on the drawer."
    },


    {
        title: "The Broken Vase",

        story:
            "A favorite vase was found broken in the hallway. Three people were home, and each has a different explanation for what happened.",

        suspects: [

            {
                name: "Lena",
                avatar: "👩🏻",

                description:
                    "The plant lover.",

                statement:
                    "Lena says she was watering the plants in the garden.",

                detail:
                    "Her watering can was still outside."
            },

            {
                name: "Ben",
                avatar: "🧑🏻",

                description:
                    "The music fan.",

                statement:
                    "Ben says he was listening to music in his room.",

                detail:
                    "His headphones were connected to his phone."
            },

            {
                name: "Kai",
                avatar: "👦🏻",

                description:
                    "The energetic cousin.",

                statement:
                    "Kai says he was running through the hallway looking for his ball.",

                detail:
                    "He says he never touched the table."
            }

        ],

        clues: [

            {
                icon: "⚽",
                title: "The Ball",
                text:
                    "Kai's ball was found beside the broken vase.",
                connection:
                    "Kai was definitely playing near the vase."
            },

            {
                icon: "🎧",
                title: "Music",
                text:
                    "Ben's phone showed that music had been playing continuously.",
                connection:
                    "Ben's story is supported."
            },

            {
                icon: "💧",
                title: "Watering Can",
                text:
                    "Lena's watering can was wet and still sitting outside.",
                connection:
                    "Lena was likely outside."
            },

            {
                icon: "🪴",
                title: "Plant Pot",
                text:
                    "A plant pot near the hallway had been knocked slightly sideways.",
                connection:
                    "Something moving quickly had passed nearby."
            }

        ],

        answer: "Kai",

        explanation:
            "Kai admitted running through the hallway, and his ball was found directly beside the broken vase."
    },


    {
        title: "The Missing Lunch",

        story:
            "Someone took a packed lunch from the refrigerator. The owner had written their name on the container, but the lunch is nowhere to be found.",

        suspects: [

            {
                name: "Nina",
                avatar: "👩🏻",

                description:
                    "The early riser.",

                statement:
                    "Nina says she packed her own lunch and left it on the top shelf.",

                detail:
                    "She remembers seeing it before leaving."
            },

            {
                name: "Mark",
                avatar: "🧑🏻",

                description:
                    "The hungry one.",

                statement:
                    "Mark says he didn't open the refrigerator all morning.",

                detail:
                    "He says he ate breakfast outside."
            },

            {
                name: "Sophie",
                avatar: "👧🏻",

                description:
                    "The snack lover.",

                statement:
                    "Sophie says she opened the refrigerator for juice.",

                detail:
                    "She says she didn't see any lunch."
            }

        ],

        clues: [

            {
                icon: "🧃",
                title: "Juice",
                text:
                    "The juice bottle was on the bottom shelf.",
                connection:
                    "Sophie would have had to open the refrigerator."
            },

            {
                icon: "🥪",
                title: "Crumbs",
                text:
                    "Fresh sandwich crumbs were found on the kitchen table.",
                connection:
                    "Someone had recently eaten a sandwich."
            },

            {
                icon: "🧻",
                title: "Napkin",
                text:
                    "A napkin with mustard stains was found beside Mark's chair.",
                connection:
                    "Mark had probably eaten something with mustard."
            },

            {
                icon: "📝",
                title: "Name",
                text:
                    "Nina's name was still written clearly on the missing container's label.",
                connection:
                    "The container had not been thrown away."
            }

        ],

        answer: "Mark",

        explanation:
            "Mark said he never opened the refrigerator, but the mustard-stained napkin beside his chair suggests he had eaten the missing sandwich."
    },


    {
        title: "The Stolen Painting",

        story:
            "A small painting disappeared from the hallway wall. Nobody admits touching it, but someone left behind a very noticeable clue.",

        suspects: [

            {
                name: "Ruby",
                avatar: "👩🏼",

                description:
                    "The art student.",

                statement:
                    "Ruby says she was sketching in the living room.",

                detail:
                    "Her sketchbook was full of new drawings."
            },

            {
                name: "Evan",
                avatar: "👦🏻",

                description:
                    "The curious nephew.",

                statement:
                    "Evan says he was playing a video game upstairs.",

                detail:
                    "His controller battery was almost empty."
            },

            {
                name: "Maya",
                avatar: "👩🏻",

                description:
                    "The house guest.",

                statement:
                    "Maya says she was cleaning the hallway.",

                detail:
                    "She says she only wiped the floor."
            }

        ],

        clues: [

            {
                icon: "🎨",
                title: "Paint",
                text:
                    "A tiny streak of blue paint was found on the hallway wall.",
                connection:
                    "Someone who had recently handled art was nearby."
            },

            {
                icon: "📒",
                title: "Sketchbook",
                text:
                    "Ruby's sketchbook contained the same blue paint.",
                connection:
                    "Ruby had been using blue paint."
            },

            {
                icon: "🎮",
                title: "Controller",
                text:
                    "Evan's controller showed recent use.",
                connection:
                    "Evan had likely been upstairs playing."
            },

            {
                icon: "🧽",
                title: "Cleaning Cloth",
                text:
                    "Maya's cleaning cloth had no paint on it.",
                connection:
                    "There is no evidence she handled the painting."
            }

        ],

        answer: "Ruby",

        explanation:
            "Ruby had the same blue paint on her sketchbook, matching the paint streak left where the painting was removed."
    },


    {
        title: "The Missing Key",

        story:
            "A small brass key vanished from a desk. Three people were in the room, but only one had a reason to look through the desk drawer.",

        suspects: [

            {
                name: "Claire",
                avatar: "👩🏻",

                description:
                    "The organized friend.",

                statement:
                    "Claire says she was sorting papers on the desk.",

                detail:
                    "She says she never opened the drawer."
            },

            {
                name: "James",
                avatar: "🧑🏻",

                description:
                    "The curious visitor.",

                statement:
                    "James says he was looking for a pen.",

                detail:
                    "He admits checking several drawers."
            },

            {
                name: "Lily",
                avatar: "👧🏻",

                description:
                    "The younger visitor.",

                statement:
                    "Lily says she was drawing by the window.",

                detail:
                    "Her crayons were scattered across the floor."
            }

        ],

        clues: [

            {
                icon: "✏️",
                title: "The Pen",
                text:
                    "A pen was already sitting on the desk.",
                connection:
                    "James had no need to search for one."
            },

            {
                icon: "🗄️",
                title: "Drawer",
                text:
                    "The desk drawer had fresh fingerprints on its handle.",
                connection:
                    "Someone recently opened it."
            },

            {
                icon: "🖍️",
                title: "Crayons",
                text:
                    "Lily's crayons were still by the window.",
                connection:
                    "Lily likely stayed there."
            },

            {
                icon: "🔑",
                title: "Key Ring",
                text:
                    "A tiny scratch on the drawer matched the metal edge of the missing key.",
                connection:
                    "The key had been removed from that drawer."
            }

        ],

        answer: "James",

        explanation:
            "James said he was searching for a pen even though one was already on the desk, and he admitted checking drawers."
    }

];


/* =========================================
   DATA STORAGE
========================================= */

function loadPlayerData() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    STORAGE_KEY
                )
            );

        if (
            saved &&
            typeof saved === "object"
        ) {

            playerData = {
                solved:
                    Number(saved.solved) || 0,

                streak:
                    Number(saved.streak) || 0,

                bestScore:
                    Number(saved.bestScore) || 0
            };
        }

    } catch (error) {

        playerData = {
            solved: 0,
            streak: 0,
            bestScore: 0
        };
    }
}


function savePlayerData() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                playerData
            )
        );

    } catch (error) {

        console.warn(
            "Could not save game data."
        );
    }
}


/* =========================================
   SCREEN CONTROL
========================================= */

function showScreen(screen) {

    homeScreen.classList.remove(
        "active"
    );

    caseScreen.classList.remove(
        "active"
    );

    resultScreen.classList.remove(
        "active"
    );

    screen.classList.add(
        "active"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   RANDOM CASE
========================================= */

function getRandomCase() {

    let available =
        mysteries.filter(
            mystery =>
                mystery !== currentCase
        );

    if (
        available.length === 0
    ) {

        available = mysteries;
    }

    return available[
        Math.floor(
            Math.random() *
            available.length
        )
    ];
}


/* =========================================
   START MYSTERY
========================================= */

function startMystery() {

    initAudio();

    currentCase =
        getRandomCase();

    currentCaseNumber++;

    totalScore = 0;

    cluesOpened = 0;

    caseFinished = false;

    renderCase();

    showScreen(
        caseScreen
    );

    playTone(
        560,
        0.08,
        "sine",
        0.035
    );
}


/* =========================================
   RENDER CASE
========================================= */

function renderCase() {

    caseTitle.textContent =
        currentCase.title;

    caseNumber.textContent =
        currentCaseNumber;

    caseStory.textContent =
        currentCase.story;

    scoreElement.textContent =
        totalScore;

    streakElement.textContent =
        playerData.streak;

    clueCountElement.textContent =
        `0/${currentCase.clues.length}`;

    renderSuspects();

    renderClues();
}


/* =========================================
   RENDER SUSPECTS
========================================= */

function renderSuspects() {

    suspectsGrid.innerHTML = "";

    currentCase.suspects.forEach(
        (suspect, index) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "suspect-card";

            card.innerHTML = `
                <div class="suspect-avatar">
                    ${suspect.avatar}
                </div>

                <div>
                    <h4>
                        ${escapeHTML(
                            suspect.name
                        )}
                    </h4>

                    <p>
                        ${escapeHTML(
                            suspect.description
                        )}
                    </p>
                </div>

                <button
                    class="inspect-button"
                    type="button"
                    data-suspect="${index}"
                >
                    Inspect
                </button>
            `;

            suspectsGrid.appendChild(
                card
            );
        }
    );
}


/* =========================================
   RENDER CLUES
========================================= */

function renderClues() {

    cluesGrid.innerHTML = "";

    currentCase.clues.forEach(
        (clue, index) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "clue-card";

            card.dataset.clue =
                index;

            card.innerHTML = `
                <div class="clue-icon">
                    ${clue.icon}
                </div>

                <h4>
                    ${escapeHTML(
                        clue.title
                    )}
                </h4>

                <p>
                    Tap to investigate.
                </p>
            `;

            cluesGrid.appendChild(
                card
            );
        }
    );
}


/* =========================================
   SUSPECT INSPECTION
========================================= */

function inspectSuspect(index) {

    if (caseFinished) {
        return;
    }

    const suspect =
        currentCase.suspects[index];

    showToast(
        `${suspect.name}: ${suspect.statement}`
    );

    playTone(
        480,
        0.06,
        "sine",
        0.025
    );
}


/* =========================================
   CLUE INSPECTION
========================================= */

function inspectClue(index) {

    if (caseFinished) {
        return;
    }

    const card =
        cluesGrid.querySelector(
            `[data-clue="${index}"]`
        );

    if (
        !card ||
        card.classList.contains(
            "locked"
        )
    ) {
        return;
    }

    const clue =
        currentCase.clues[index];

    card.classList.add(
        "locked"
    );

    card.innerHTML = `
        <div class="clue-icon">
            ${clue.icon}
        </div>

        <h4>
            ${escapeHTML(
                clue.title
            )}
        </h4>

        <p>
            ${escapeHTML(
                clue.text
            )}
        </p>
    `;

    cluesOpened++;

    clueCountElement.textContent =
        `${cluesOpened}/${currentCase.clues.length}`;

    totalScore =
        Math.max(
            0,
            totalScore - CLUE_PENALTY
        );

    scoreElement.textContent =
        totalScore;

    showToast(
        `${clue.connection} (-${CLUE_PENALTY} points)`
    );

    playTone(
        700,
        0.08,
        "sine",
        0.025
    );
}


/* =========================================
   ACCUSATION MODAL
========================================= */

function openAccusation() {

    if (caseFinished) {
        return;
    }

    accusationOptions.innerHTML = "";

    currentCase.suspects.forEach(
        (suspect, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type = "button";

            button.className =
                "accusation-option";

            button.innerHTML = `
                <div
                    class="accusation-option-avatar"
                >
                    ${suspect.avatar}
                </div>

                <div>
                    <strong>
                        ${escapeHTML(
                            suspect.name
                        )}
                    </strong>

                    <small>
                        ${escapeHTML(
                            suspect.description
                        )}
                    </small>
                </div>
            `;

            button.addEventListener(
                "click",
                () => {

                    closeAccusation();

                    makeAccusation(
                        index
                    );
                }
            );

            accusationOptions.appendChild(
                button
            );
        }
    );

    accusationModal.classList.add(
        "active"
    );

    accusationModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function closeAccusation() {

    accusationModal.classList.remove(
        "active"
    );

    accusationModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


/* =========================================
   MAKE ACCUSATION
========================================= */

function makeAccusation(index) {

    if (caseFinished) {
        return;
    }

    caseFinished = true;

    const chosen =
        currentCase.suspects[index];

    const correct =
        chosen.name ===
        currentCase.answer;

    let earned = 0;

    if (correct) {

        earned =
            POINTS_CORRECT -
            (
                cluesOpened *
                CLUE_PENALTY
            );

        earned =
            Math.max(
                10,
                earned
            );

        /*
            Streak bonus.
        */

        const newStreak =
            playerData.streak + 1;

        const streakBonus =
            Math.min(
                100,
                Math.max(
                    0,
                    newStreak - 1
                ) * 20
            );

        earned += streakBonus;

        totalScore =
            earned;

        playerData.streak =
            newStreak;

        playerData.solved++;

        if (
            totalScore >
            playerData.bestScore
        ) {

            playerData.bestScore =
                totalScore;
        }

        savePlayerData();

        showResult(
            true,
            earned,
            chosen
        );

        playSuccessSound();

    } else {

        earned =
            POINTS_WRONG;

        totalScore =
            earned;

        playerData.streak = 0;

        savePlayerData();

        showResult(
            false,
            earned,
            chosen
        );

        playFailSound();
    }
}


/* =========================================
   RESULT
========================================= */

function showResult(
    correct,
    earned,
    chosen
) {

    if (correct) {

        resultIcon.textContent =
            "🏆";

        resultLabel.textContent =
            "CASE SOLVED";

        resultTitle.textContent =
            "You got it!";

        resultText.textContent =
            currentCase.explanation;

        resultCorrect.textContent =
            "Yes";

        resultCorrect.style.color =
            "var(--green)";

    } else {

        resultIcon.textContent =
            "🕵️";

        resultLabel.textContent =
            "NOT THIS TIME";

        resultTitle.textContent =
            "The culprit was " +
            currentCase.answer;

        resultText.textContent =
            currentCase.explanation;

        resultCorrect.textContent =
            "No";

        resultCorrect.style.color =
            "var(--red)";
    }

    earnedPoints.textContent =
        earned >= 0
            ? `+${earned}`
            : `${earned}`;

    resultClues.textContent =
        cluesOpened;

    resultStreak.textContent =
        playerData.streak;

    const previousBest =
        playerData.bestScore;

    const isBest =
        correct &&
        earned >= previousBest &&
        earned > 0;

    /*
        We calculate whether the
        latest score is the best
        based on saved score.
    */

    if (
        correct &&
        earned ===
        playerData.bestScore
    ) {

        newBest.classList.remove(
            "hidden"
        );

    } else {

        newBest.classList.add(
            "hidden"
        );
    }

    showScreen(
        resultScreen
    );

    updateHomeStats();
}


/* =========================================
   HOME STATS
========================================= */

function updateHomeStats() {

    homeSolved.textContent =
        playerData.solved;

    homeStreak.textContent =
        playerData.streak;

    homeBest.textContent =
        playerData.bestScore;
}


/* =========================================
   HOME
========================================= */

function goHome() {

    closeAccusation();

    showScreen(
        homeScreen
    );

    updateHomeStats();
}


/* =========================================
   INFO MODAL
========================================= */

function openInfo() {

    infoModal.classList.add(
        "active"
    );

    infoModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function closeInfo() {

    infoModal.classList.remove(
        "active"
    );

    infoModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


/* =========================================
   THEME
========================================= */

function loadTheme() {

    const saved =
        localStorage.getItem(
            THEME_KEY
        );

    if (saved === "dark") {

        document.body.classList.add(
            "dark"
        );

        themeButton.textContent =
            "☀️";

    } else {

        document.body.classList.remove(
            "dark"
        );

        themeButton.textContent =
            "🌙";
    }
}


function toggleTheme() {

    const dark =
        document.body.classList.toggle(
            "dark"
        );

    localStorage.setItem(
        THEME_KEY,
        dark
            ? "dark"
            : "light"
    );

    themeButton.textContent =
        dark
            ? "☀️"
            : "🌙";
}


/* =========================================
   SOUND
========================================= */

function initAudio() {

    if (!soundEnabled) {
        return;
    }

    if (!audioContext) {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            return;
        }

        audioContext =
            new AudioContext();
    }

    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();
    }
}


function playTone(
    frequency,
    duration = 0.08,
    type = "sine",
    volume = 0.035
) {

    if (!soundEnabled) {
        return;
    }

    initAudio();

    if (!audioContext) {
        return;
    }

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type =
        type;

    oscillator.frequency.setValueAtTime(
        frequency,
        audioContext.currentTime
    );

    gain.gain.setValueAtTime(
        volume,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime +
        duration
    );

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime +
        duration
    );
}


function playSuccessSound() {

    playTone(
        620,
        0.08,
        "sine",
        0.035
    );

    setTimeout(() => {

        playTone(
            820,
            0.1,
            "sine",
            0.035
        );

    }, 80);

    setTimeout(() => {

        playTone(
            1040,
            0.13,
            "sine",
            0.035
        );

    }, 170);
}


function playFailSound() {

    playTone(
        190,
        0.15,
        "sawtooth",
        0.025
    );
}


function toggleSound() {

    soundEnabled =
        !soundEnabled;

    localStorage.setItem(
        SOUND_KEY,
        String(soundEnabled)
    );

    soundButton.textContent =
        soundEnabled
            ? "🔊"
            : "🔇";

    if (soundEnabled) {

        initAudio();

        playTone(
            600,
            0.08,
            "sine",
            0.03
        );

        showToast(
            "Sound on 🔊"
        );

    } else {

        showToast(
            "Sound off 🔇"
        );
    }
}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    clearTimeout(
        toastTimeout
    );

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    toastTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2800);
}


/* =========================================
   EVENT LISTENERS
========================================= */

startButton.addEventListener(
    "click",
    startMystery
);

nextCaseButton.addEventListener(
    "click",
    startMystery
);

homeFromResultButton.addEventListener(
    "click",
    goHome
);

howToPlayButton.addEventListener(
    "click",
    openInfo
);

closeInfoButton.addEventListener(
    "click",
    closeInfo
);

closeInfoAction.addEventListener(
    "click",
    closeInfo
);

accusationButton.addEventListener(
    "click",
    openAccusation
);

closeAccusationButton.addEventListener(
    "click",
    closeAccusation
);

soundButton.addEventListener(
    "click",
    toggleSound
);

themeButton.addEventListener(
    "click",
    toggleTheme
);


/* =========================================
   SUSPECT EVENT DELEGATION
========================================= */

suspectsGrid.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-suspect]"
            );

        if (!button) {
            return;
        }

        const index =
            Number(
                button.dataset.suspect
            );

        inspectSuspect(index);
    }
);


/* =========================================
   CLUE EVENT DELEGATION
========================================= */

cluesGrid.addEventListener(
    "click",
    event => {

        const card =
            event.target.closest(
                "[data-clue]"
            );

        if (!card) {
            return;
        }

        const index =
            Number(
                card.dataset.clue
            );

        inspectClue(index);
    }
);


/* =========================================
   MODAL BACKDROPS
========================================= */

infoModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            infoModal
        ) {

            closeInfo();
        }
    }
);

accusationModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            accusationModal
        ) {

            closeAccusation();
        }
    }
);


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeInfo();

            closeAccusation();
        }
    }
);


/* =========================================
   LOAD SETTINGS
========================================= */

function loadSettings() {

    const savedSound =
        localStorage.getItem(
            SOUND_KEY
        );

    if (
        savedSound !== null
    ) {

        soundEnabled =
            savedSound !== "false";
    }

    soundButton.textContent =
        soundEnabled
            ? "🔊"
            : "🔇";

    loadTheme();
}


/* =========================================
   INITIALIZE
========================================= */

loadPlayerData();

loadSettings();

updateHomeStats();

showScreen(
    homeScreen
);
