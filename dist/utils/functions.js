import { wordle } from './findWord.js';
export function randomNumber(len) {
    return Math.floor(Math.random() * len);
}
export async function Get(path) {
    const response = await fetch(path);
    return (await response.json());
}
export async function selectRandom() {
    const usableJSON = await Get("data/usable.json");
    return usableJSON[randomNumber(usableJSON.length)];
}
export async function loadUsable() {
    return await Get("data/dict.json");
}
export function range(first, last, options = { step: 1, inclusive: false }) {
    let out = [];
    for (let i = first; options.inclusive ? i <= last : i < last; i++) {
        out.push(i);
    }
    return out;
}
export function getElementById(id) {
    const elem = document.getElementById(id);
    if (elem === null)
        throw ("element is null");
    return elem;
}
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function RowColors(input) {
    return input.map(n => n == wordle.green ? '🟩' : n == wordle.yellow ? '🟨' : '⬜️').join('') + "\n";
}
//# sourceMappingURL=functions.js.map