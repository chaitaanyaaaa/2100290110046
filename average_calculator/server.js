const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const WINDOW_SIZE = 10;
const TIMEOUT = 500; // in milliseconds

let numberStore = {
    'p': [],
    'f': [],
    'e': [],
    'r': []
};

const THIRD_PARTY_SERVER = 'http://example.com/numbers';

async function fetchNumbers(numberType) {
    try {
        const response = await axios.get(`${THIRD_PARTY_SERVER}/${numberType}`, { timeout: TIMEOUT });
        return response.data;
    } catch (error) {
        return [];
    }
}

function calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

app.get('/numbers/:numberid', async (req, res) => {
    const numberid = req.params.numberid;

    if (!numberStore[numberid]) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const newNumbers = await fetchNumbers(numberid);

    const previousState = [...numberStore[numberid]];
    newNumbers.forEach(num => {
        if (!numberStore[numberid].includes(num)) {
            numberStore[numberid].push(num);
            if (numberStore[numberid].length > WINDOW_SIZE) {
                numberStore[numberid].shift();
            }
        }
    });

    const currentState = [...numberStore[numberid]];

    const avg = calculateAverage(numberStore[numberid]);

    const response = {
        windowPrevState: previousState,
        windowCurrState: currentState,
        numbers: newNumbers,
        avg: avg.toFixed(2)
    };

    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
