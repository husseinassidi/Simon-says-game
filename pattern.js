import sounds from './sounds.js';

function playRandomSound(usedSounds) {
    let availableSounds = sounds.filter(sound => !usedSounds.has(sound));
    if (availableSounds.length === 0) {
        throw new Error("Not enough unique sounds to assign.");
    }
    const randomIndex = Math.floor(Math.random() * availableSounds.length);
    const selectedSound = availableSounds[randomIndex];
    usedSounds.add(selectedSound);
    return selectedSound;
}

export default function generateRandomPattern(arr, gamePattern, level) {
            gamePattern.length = 0; 


    let patternLength;
    switch (level) {
           case 0:
            patternLength = 3;
            break;
        case 1:
            patternLength = 6;
            break;
        case 2:
             patternLength = 8;
            break;
        case 3:
             patternLength = 12;
            break;
        default:
                 patternLength = 3; 
    }
            
          patternLength = Math.min(patternLength, arr.length * arr[0].length);

    const usedButtons = new Set();
    const usedSounds = new Set();

    for (let i = 0; i < patternLength; i++) {
        let buttonId;
        do {
            const randomRow = Math.floor(Math.random() * arr.length);
            const randomCol = Math.floor(Math.random() * arr[randomRow].length);
            buttonId = arr[randomRow][randomCol];
        } while (usedButtons.has(buttonId));
        
        usedButtons.add(buttonId);
        const sound = playRandomSound(usedSounds);
        
        gamePattern.push({ buttonId, sound });
    }

}
