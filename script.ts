let rowNumber   = 1
let tileNumber  = 0
let currentWord = ""
let solved      = false
let animating   = false
let usedWords:  string[] = []
let activeRow   = document.getElementById("row-1")

/*const btnSearch = () => {
    if(rowNumber <= 6 && tileNumber == 5 && !solved) {
        let tiles = activeRow.children

        submitWord(tiles)
    }
}*/

const addLetter = (letter: string) => {

    if(solved || animating || tileNumber == 5) return

    let tiles: HTMLCollection = activeRow.children

    tiles[tileNumber].innerHTML = letter
    tiles[tileNumber].setAttribute("style", "border-color: rgb(94, 94, 94);")

    tiles[tileNumber].animate(boxPop, popTiming)
    tileNumber++

    currentWord += letter
}

const delLetter = () => {

    if(tileNumber <= 0) return

    let tiles = activeRow.children

    tileNumber--
    tiles[tileNumber].innerHTML = ""
    tiles[tileNumber].setAttribute("style", "border-color: #313131;")

    currentWord = currentWord.slice(0, -1)
}

async function selectRandom() {
    const url        = "data/usable.json"
    const request    = new Request(url)
    const response   = await fetch(request)
    const usableJSON = await response.json()

    const val: string = usableJSON[Math.floor(Math.random()*usableJSON.length)]

    return val
}

function loadUsable() {
    let usableJSON: string[] = []

    fetch("data/dict.json")
    .then(response => {
        return response.json()
    })
    .then(jsonData => usableJSON.push(...jsonData))

    return usableJSON
}

const usable = loadUsable()

const randWord = selectRandom()

let word = ""
randWord.then(value => word = value)

const boxPop = [
    { transform: "scale(1)" },
    { transform: "scale(1.2)" }
]

const popTiming = {
    duration: 75,
    iterations: 1
}

const revealAns = [
    { transform: "rotateX(0deg)" },
    { transform: "rotateX(90deg)" },
    { transform: "rotateX(0deg)" }
]

const revealTime = {
    duration: 450,
    iterations: 1
}

const shake = [
    { transform: "translateX(0)" },
    { transform: "translateX(2px)" },
    { transform: "translateX(-2px)" },
    { transform: "translateX(0)" }

]

const shakeTime = {
    duration: 100,
    iterations: 3
}

addEventListener("keydown", (e) => {
    let tiles = activeRow.children

    if(solved || animating){
        return
        
    } else if(e.key.length == 1 && e.key >= "a" && e.key <= "z") {

        addLetter(e.key.toUpperCase())

    }else if(e.key == "Backspace" && tileNumber > 0) {
        delLetter()


    }else if(e.key == "Enter" && tileNumber == 5 && rowNumber <= 6 && !solved) {
        submitWord(tiles).then(r => r)
        
    }
})

function worthy(selected: string[], word: string[], count: number, letter: string) {
    const writtenAmount  = selected.filter(x => x === letter).length
    const realAmount     = word.filter(x => x === letter).length
    let used: number     = 0
    let toBeUsed: number = 0

    if(writtenAmount <= realAmount){
        return true
    }

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

    for(let i = 0; i < 5; i++) {
        tiles[i].animate(revealAns, revealTime)
        await sleep(225)

        element = document.getElementById(`btn-${currentWord[i].toLowerCase()}`)

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
    }

    if(rowNumber <= 6){
        activeRow = document.getElementById(`row-${rowNumber}`)
        usedWords.push(currentWord)
        currentWord = ""

    } else if(!solved) {
        alert(`You lost, the word was: ${word}`)
    }
    animating = false
}