// The full data set with up to 12 characters
// var acss_data = require('./data/acss_data.json');

// Truncated data set with up to 7 characters (for testing)
var acss_data = require('./data/acss_data_truncated.json');

const normalize_string = (str) => {
    const elements = str.split('');
    const unique_elements = elements
        .reduce((acc, curr) => acc.includes(curr) ? acc : acc + curr, "")
        .split('');
    const indices = elements.map((element) => unique_elements.indexOf(element));
    return indices.join('');
}

const acss = (str, alphabet = 9, debug = false) => {
    const allowed_alphabets = [2, 4, 5, 6, 9];

    if (typeof str !== 'string') {
        throw new Error('Input is not a string');
    }
    if (str.length > 10) {
        throw new Error('String is too long (more than 10 characters)');
    }
    if (!allowed_alphabets.includes(alphabet)) {
        throw new Error('Alphabet must be one of 2, 4, 5, 6 or 9');
    }
    const string = normalize_string(str);
    const index = allowed_alphabets.indexOf(alphabet);
    const complexity = acss_data[string][index];

    if (String(complexity) === 'NA') {
        throw new Error('ACSS is not available. Try increasing the alphabet.');
    }

    const probability = Math.pow(2, -complexity)

    if (debug) {
        console.log([
            { "String": str },
            { "Normalized string": string },
            { "Alphabet index": index },
            { "ACSS lookup": acss_data[string] },
            { "Complexity value": complexity },
            { "Algorithmic probability": probability }
        ]);
    }

    return probability;
}




acss("123sd", 9, true)
acss("eghwert", 9, true)
acss("weethsn", 9, true)

// Does not work with truncated data
// acss("werrwethsn", 9, true)