export enum wordle {
    grey,
    yellow,
    green
}

export function worthy(word: string, written: string) {
    let out: number[] = []

    for (let i = 0; i < word.length; i++) {
        const idx = word.indexOf(written[i])

        if (idx === i) {
            out.push(i)
            word = word.replace(written[i], '0')

        } else if (idx !== -1 && written[idx] === word[idx]) {
            out.push(-1)

        } else {
            out.push(idx)
            word = word.replace(written[i], '0')
        }

        out[i] = out[i] === -1 ? wordle.grey : out[i] === i ? wordle.green : wordle.yellow
    }

    return out
}