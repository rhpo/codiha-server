
const express = require('express');
const axios = require('axios');

require('dotenv').config();

const app = express();

app.all('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
});

// https://forms.gle/PjWuis7pUGidavpm6

async function notify(apiKey, title = "You got a new registration", message = "We have a new registration on our website",
    url = "https://www.google.com"
) {

    return new Promise((resolve, reject) => {
        axios.default.get(`http://xdroid.net/api/message?k=${encodeURIComponent(apiKey)}&u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}&m=${encodeURIComponent(message)}`)
            .then(function (response) {
                resolve(response);
            })
    });

}

let rahim = process.env.RAHIM_API_KEY;
let ramy = process.env.RAMY_API_KEY;

let broadcast = [rahim, ramy];

app.get('/notify', async (req, res) => {

    broadcast.forEach(async (apiKey) => {
        await notify(apiKey, "New Registration", "Someone is trying to register", "https://docs.google.com/forms/d/1GA0BZZR1M3397ta-cZyFWjV5x9MMM0fpu0jSFqApaLE/edit#responses");
    });

    res.send("Notification sent");

});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
