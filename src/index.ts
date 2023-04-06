import { boxPop, popTiming, shake, shakeTime, revealAns, revealTime } from "./utils/consts.js"
import { getElementById, loadUsable, range, selectRandom } from "./utils/functions.js"

let rowNumber   = 1
let tileNumber  = 0
let currentWord = ""
let solved      = false
let animating   = false
let usedWords:  string[] = []
let activeRow   = getElementById("row-1")
let usable:     string[] = []
let word        = ""

function addLetter(letter: string) {

    if(solved || animating || tileNumber == 5) return

    let tiles: HTMLCollection = activeRow.children

    tiles[tileNumber].innerHTML = letter
    tiles[tileNumber].setAttribute("style", "border-color: rgb(94, 94, 94);")

    tiles[tileNumber].animate(boxPop, popTiming)
    tileNumber++

    currentWord += letter
}

function delLetter() {

    if(tileNumber <= 0) return

    let tiles = activeRow.children

    tileNumber--
    tiles[tileNumber].innerHTML = ""
    tiles[tileNumber].setAttribute("style", "border-color: #313131;")

    currentWord = currentWord.slice(0, -1)
}

function onKeyPress(e: KeyboardEvent) {
    let tiles = activeRow.children

    if(solved || animating)
        return
        
    else if(e.key.length == 1 && e.key >= "a" && e.key <= "z")
        addLetter(e.key.toUpperCase())

    else if (e.key == "Backspace" && tileNumber > 0)
        delLetter()

    else if (e.key == "Enter" && tileNumber == 5 && rowNumber <= 6 && !solved)
        submitWord(tiles)
}

function worthy(selected: string[], word: string[], count: number, letter: string) {
    const writtenAmount  = selected.filter(x => x === letter).length
    const realAmount     = word.filter(x => x === letter).length
    let used: number     = 0
    let toBeUsed: number = 0

    if (writtenAmount <= realAmount) return true

    for(let i = 0; i < count; i++){
        if(selected[i] == letter){
            used++
        }
    }

    for(let i = count+1; i < 5; i++){
        if(selected[i] == word[i] && word[i] == letter){
            toBeUsed++
        }
    }

    return used + toBeUsed < realAmount
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function submitWord(tiles: HTMLCollection) {
    if(!usable.some(obj => obj == currentWord) || usedWords.some(obj => obj == currentWord)) {
        activeRow.animate(shake, shakeTime)
        return
    }

    let color = ""
    let element: HTMLElement
    
    rowNumber ++
    tileNumber = 0
    animating = true

    for(let i of range(0, 5)) {
        tiles[i].animate(revealAns, revealTime)
        await sleep(225)

        element = getElementById(`btn-${currentWord[i].toLowerCase()}`)

        if(currentWord[i] == word[i]){
            // Letter in place.
            color = "#2fb52f"

        } else if(word.split("").some(obj => obj == currentWord[i]) && worthy(currentWord.split(""), word.split(""), i, currentWord[i])) {
            // Correct letter, wrong place.
            color = "#e8e823"

        } else {
            // Plain wrong.
            color = "#313131"
        }
        tiles[i].setAttribute("style", `background: ${color}; border-color: ${color}`)

        if(element.style.background === "" || element.style.background == "rgb(232, 232, 35)" && color == "#2fb52f"){
            element.style.background = color
        }
    }

    if(currentWord == word) {
        solved = true
        alert("You won!")
        return
    }

    if(rowNumber <= 6){
        activeRow = getElementById(`row-${rowNumber}`)
        usedWords.push(currentWord)
        currentWord = ""

    } else if(!solved) {
        alert(`You lost, the word was: ${word}`)
    }
    animating = false
}

async function main() {
    usable = await loadUsable()
    word = await selectRandom()

    const btns = Array.from(document.getElementsByClassName("btn"))
    const btnSrc = getElementById("btn-enter")
    const btnDel = getElementById("btn-del")

    btns.forEach(x => x.addEventListener("click", () => addLetter(x.innerHTML)))
    btnSrc.addEventListener("click", () => submitWord(activeRow.children))
    btnDel.addEventListener("click", () => delLetter())
    
    addEventListener("keydown", onKeyPress)
}
main()
.then(() => console.log("initialized"))
.catch(e => console.log(e))