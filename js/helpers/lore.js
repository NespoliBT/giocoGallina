import { sentences } from '../sentences.js';

function getSentence(prevSentence) {
    let sentence = sentences[Math.floor(Math.random() * sentences.length)];

    if (sentence === prevSentence) {
        return getSentence(prevSentence);
    }

    return sentences[Math.floor(Math.random() * sentences.length)];
}

function getLore() {
    return getSentence();
}

export { getSentence };