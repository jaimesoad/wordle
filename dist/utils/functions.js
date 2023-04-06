var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function randomNumber(len) {
    return Math.floor(Math.random() * len);
}
export function Get(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(path);
        return (yield response.json());
    });
}
export function selectRandom() {
    return __awaiter(this, void 0, void 0, function* () {
        const usableJSON = yield Get("data/usable.json");
        return usableJSON[randomNumber(usableJSON.length)];
    });
}
export function loadUsable() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Get("data/dict.json");
    });
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
//# sourceMappingURL=functions.js.map