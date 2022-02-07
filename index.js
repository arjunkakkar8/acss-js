// The full data set with up to 12 characters
// var acss_data = require('./data/acss_data.json');

// Truncated data set with up to 7 characters (for testing)
// const acss_data = require('./data/acss_data_truncated.json');

require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.zvszj.mongodb.net/acss?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

const normalize_string = (str) => {
    const elements = str.split('');
    const unique_elements = elements
        .reduce((acc, curr) => acc.includes(curr) ? acc : acc + curr, "")
        .split('');
    const indices = elements.map((element) => unique_elements.indexOf(element));
    return indices.join('');
}

const lookup_score = async (id) => {
    const cursor = client.db('acss')
        .collection('scores')
        .find({ "_id": id });

    const results = await cursor.toArray();

    if (results.length === 0) {
        throw new Error('This entry is not available in the database');
    }

    return results[0].score;
}

const acss = async (str, alphabet = 9, debug = false) => {
    const allowed_alphabets = [2, 4, 5, 6, 9];

    if (typeof str !== 'string') {
        throw new Error('Input is not a string');
    }
    if (str.length > 12) {
        throw new Error('String is too long (more than 12 characters)');
    }
    if (!allowed_alphabets.includes(alphabet)) {
        throw new Error('Alphabet must be one of 2, 4, 5, 6 or 9');
    }
    const string = normalize_string(str);
    const index = allowed_alphabets.indexOf(alphabet);
    const scores = await lookup_score(string);
    const complexity = scores[index];

    if (String(complexity) === 'NA') {
        throw new Error('ACSS is not available. Try increasing the alphabet.');
    }

    const probability = Math.pow(2, -complexity)

    if (debug) {
        console.log([
            { "String": str },
            { "Normalized string": string },
            { "Alphabet index": index },
            { "DB ACSS lookup": scores },
            { "Complexity value": complexity },
            { "Algorithmic probability": probability }
        ]);
    }

    return probability;
}


const main = async () => {
    await client.connect();

    await acss("123sd", 6, true)
    await acss("eghwert", 9, true)
    await acss("weethsn", 9, true)

    client.close();
}

main();



// Does not work with truncated data
// acss("werrwethsn", 9, true)