import getColorArray, { create2DArray } from './colorArray.js';
import generateRandomPattern from './pattern.js'; 
import sounds from './sounds.js'; 

let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
const levels = [
    { level_id: 1, columns: 2, rows: 2 },
    { level_id: 2, columns: 3, rows: 3 },
    { level_id: 3, columns: 4, rows: 4 },
    { level_id: 4, columns: 5, rows: 5 }
];
let lostAudio= new Audio('./sounds/wrong.mp3')

let currentLevel = levels[level];
let rows = currentLevel.rows;
let columns = currentLevel.columns;
let colorArray = create2DArray(rows, columns);
getColorArray(colorArray);

function playSound(soundUrl) {
    const audio = new Audio(soundUrl);
    audio.play();
}

function runLevel(arr) {
    let delay = 0;
    const soundDuration = 1500; // Duration for the sound and visual effect in milliseconds

    arr.forEach(item => {
        setTimeout(() => {
            let button = document.getElementById(item.buttonId);
            if (button) {
                button.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)';
                playSound(item.sound);
                setTimeout(() => {
                    button.style.boxShadow = '';
                }, soundDuration);
            } else {
                console.warn(`Button with ID ${item.buttonId} not found`);
            }
        }, delay);
        delay += soundDuration; // Increase delay for the next item to ensure no overlap
    });
}

function handleClick(event) {
    const clickedId = event.target.id;
    if (clickedId) {
        userClickedPattern.push(clickedId);

   
        console.log('Clicked ID:', clickedId);
        console.log('User Pattern:', userClickedPattern);
        console.log('Game Pattern:', gamePattern);

   
        if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1].buttonId) {
            console.log('lost');
            document.body.style.backgroundColor = 'red';
            document.querySelector("#level-title").textContent = "You have Alzheimer's";

            setTimeout(() => {
                resetGame();                
            }, 3000);
        } else if (userClickedPattern.length === gamePattern.length) {

            console.log('Success');

            nextLevel();
        }
    }
}


function resetGame() {
    started = false;
    gamePattern = [];
    userClickedPattern = [];
    document.querySelector("#level-title").textContent = "Press A Key to Start";
    document.body.style.backgroundColor = '';
    document.querySelectorAll('.btn').forEach(button => {
        button.removeEventListener('click', handleClick);
    });
}

function nextLevel() {
    gamePattern = [];
    userClickedPattern = [];


    level++;
    if (level >= levels.length) {
        console.log('Game Completed!');
        resetGame();
        return;
    }
    currentLevel = levels[level];
    rows = currentLevel.rows;
    columns = currentLevel.columns;
    colorArray = create2DArray(rows, columns);
    getColorArray(colorArray);
    generateRandomPattern(colorArray, gamePattern, level);
    runLevel(gamePattern);
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', handleClick);
    });
    document.querySelector("#level-title").textContent = `Level ${currentLevel.level_id}`;

}

document.addEventListener('keypress', () => {
    if (!started) {
        document.querySelector("#level-title").textContent = `Level ${currentLevel.level_id}`;
        generateRandomPattern(colorArray, gamePattern, level);
        runLevel(gamePattern);
        started = true;

    
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', handleClick);
        });
    }
});
