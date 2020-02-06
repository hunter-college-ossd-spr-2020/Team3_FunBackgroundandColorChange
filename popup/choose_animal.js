/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page.
*/
function listenForClicks() {
document.addEventListener("click", (e) => {

function animalsandcolors(tabs) {
browser.tabs.insertCSS({code: hidePage}).then(() => {
// let url = animalNameToURL(e.target.textContent);
browser.tabs.sendMessage(tabs[0].id, {
command: "animalsandcolors",
animalURL: url
});
});
}

/**
* Just log the error to the console.
*/
function reportError(error) {
console.error(`Could not add animal picture and color: ${error}`);
}

if (e.target.classList.contains("animalsandcolors")) {
browser.tabs.query({active: true, currentWindow: true})
.then(animalsandcolors)
.catch(reportError);
}
});
}

/**
* There was an error executing the script.
* Display the popup's error message, and hide the normal UI.
*/
function reportExecuteScriptError(error) {
document.querySelector("#popup-content").classList.add("hidden");
document.querySelector("#error-content").classList.remove("hidden");
console.error(`Failed to execute animal picture and color content script: ${error.message}`);
}

/**
* When the popup loads, inject a content script into the active tab,
* and add a click handler.
* If we couldn't inject the script, handle the error.
*/
browser.tabs.executeScript({file: "/content_scripts/animalsandcolors.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);