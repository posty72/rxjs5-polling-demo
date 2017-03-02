const express = require('express');
const router = express.Router();

const names = [
    'Josh',
    'Andres',
    'Tia',
    'Hal',
    'Anton',
    'JP',
    'Thijs'
];

const colours = [
    'green',
    'blue',
    'red',
    'pink',
    'black',
    'yellow'
];

const things = [
    'hat',
    'shirt',
    'pair of shoes',
    'turtleneck sweater'
];

let randomString = `${getRandomItem(names)} has a ${getRandomItem(colours)} ${getRandomItem(things)}`;

setInterval(() => {
    randomString = `${getRandomItem(names)} has a ${getRandomItem(colours)} ${getRandomItem(things)}`;
}, getRandomInt(3000, 10000)); // eslint-disable-line

/* GET home page. */
router.get('/', function(req, res) {
    res.json({
        'randomString': randomString
    });
});

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;
