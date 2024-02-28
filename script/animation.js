// this script is straight from https://gist.github.com/umcconnell/f5af0e6be7e1bf3466fba08cd265a9c0
// thanks homie!
// i changed it around a bit tho :P

// Adapted from https://stackoverflow.com/questions/34848505/how-to-make-a-loading-animation-in-console-application-written-in-javascript-or

/**
 * Create and display a loader in the console.
 *
 * @param {string} [text=""] Text to display after loader
 * @param {array.<string>} [chars=["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"]]
 * Array of characters representing loader steps
 * @param {number} [delay=100] Delay in ms between loader steps
 * @example
 * let loader = loadingAnimation("Loading…");
 *
 * // Stop loader after 1 second
 * setTimeout(() => clearInterval(loader), 1000);
 * @returns {number} An interval that can be cleared to stop the animation
 */
function loadingAnimation(
    text = "",
    chars = ["░", "░", "▒", "▓", "▓", "█", "█", "█", "█", "█", "█", "█", "█", "▓", "▓", "▒", "░", "░", " ", " ", " ", " ", " ", " ", " ", " "],
    delay = 50
) {
    let x = 0;

    return setInterval(function() {
        process.stdout.clearLine();  // Clear the current line
        process.stdout.cursorTo(0);  // Move cursor to beginning of line
        process.stdout.write(chars[x++] + " " + text);
        x = x % chars.length;
    }, delay);
}


/**
 * Display a done symbol and clear the loading animation.
 *
 * @param {number} interval The interval returned by the loadingAnimation function
 * @param {string} text Text to display after the done symbol
 * @param {string} doneSymbol Symbol to display when animation is done
 */
function clearLoadingAnimation(interval, text, doneSymbol = "█") {
    clearInterval(interval);
    process.stdout.clearLine();  // Clear the current line
    process.stdout.cursorTo(0);  // Move cursor to beginning of line
    console.log(doneSymbol + " " + text);
}

module.exports = { loadingAnimation, clearLoadingAnimation };