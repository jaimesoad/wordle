export var wordle;
(function (wordle) {
    wordle[wordle["grey"] = 0] = "grey";
    wordle[wordle["yellow"] = 1] = "yellow";
    wordle[wordle["green"] = 2] = "green";
})(wordle || (wordle = {}));
export function worthy(word, written) {
    let out = [];
    for (let i = 0; i < word.length; i++) {
        const idx = word.indexOf(written[i]);
        if (word[i] === written[i]) {
            out.push(i);
            word = word.replace(written[i], '0');
        }
        else if (idx !== -1 && written[idx] === word[idx]) {
            out.push(-1);
        }
        else {
            out.push(idx);
            word = word.replace(written[i], '0');
        }
        out[i] = out[i] === -1 ? wordle.grey : out[i] === i ? wordle.green : wordle.yellow;
    }
    return out;
}
//# sourceMappingURL=findWord.js.map