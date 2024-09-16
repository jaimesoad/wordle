import { wordle } from './findWord.js'

export function randomNumber(len: number) {
    return Math.floor(Math.random() * len)
}

export async function Get<T>(path: string) {
    const response = await fetch(path)
    return <T>(await response.json())
}

export async function selectRandom() {
    const usableJSON = await Get<string[]>("data/usable.json")

    return usableJSON[randomNumber(usableJSON.length)]
}

export async function loadUsable() {
    return await Get<string[]>("data/dict.json")
}

interface rangeOptions {
    step?: number,
    inclusive?: boolean
}

export function range(first: number, last: number, options: rangeOptions = {step: 1, inclusive: false}) {
    let out: number[] = []

    for (let i = first; options.inclusive ? i <= last : i < last; i++) {
        out.push(i)
    }

    return out
}

export function getElementById(id: string) {
    const elem = document.getElementById(id)

    if (elem === null) throw ("element is null")

    return elem
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function RowColors(input: number[]): string {
    return input.map(n => n == wordle.green ? '🟩' : n == wordle.yellow ? '🟨' : '⬜️').join('') + "\n"
}