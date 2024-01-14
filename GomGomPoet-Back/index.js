const fs = require('fs');
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');
const { fetchEventSource } = require('@fortaine/fetch-event-source');
const { DB, CLOVA, PORT } = require('./constants');

const express = require('express');
const cors = require('cors');

const connection = mysql.createConnection(DB);
connection.connect();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('web-build'));

app.post('/poem', async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    let { type, input } = req.body;
    let isPoem = type === 'poem';
    let poemBody = isPoem ? CLOVA.POEM : CLOVA.ACROSTICPOEM;
    poemBody = JSON.stringify(poemBody).replace('{input}', input);
    let letterBody = isPoem ? CLOVA.POEM_LETTER : CLOVA.ACROSTICPOEM_LETTER;
    letterBody = JSON.stringify(letterBody).replace('{input}', input);
    let poemContent;
    let letterContent;
    await fetchEventSource(CLOVA.URL, {
        method: 'POST',
        headers: CLOVA.HEADERS,
        body: poemBody,
        onmessage: ({ id, event, data }) => {
            data = JSON.parse(data);
            data.type = 'poem';
            res.write(`id: ${id}\n`);
            res.write(`event: ${event}\n`);
            res.write(`data: ${JSON.stringify(data)}\n\n`);
            if (event === 'result') {
                poemContent = data.message.content;
            }
        }
    });
    letterBody = letterBody.replace('{content}', poemContent.replaceAll('\n', '\\n'));
    await fetchEventSource(CLOVA.URL, {
        method: 'POST',
        headers: CLOVA.HEADERS,
        body: letterBody,
        onmessage: ({ id, event, data }) => {
            data = JSON.parse(data);
            data.type = 'letter';
            res.write(`id: ${id}\n`);
            res.write(`event: ${event}\n`);
            res.write(`data: ${JSON.stringify(data)}\n\n`);
            if (event === 'result') {
                letterContent = data.message.content;
            }
            if (event === 'signal' && data === '{"data":"[DONE]"}') {
                res.end();
            }
        }
    });
    let uuid = uuidv4().replaceAll('-', '');
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    connection.query('INSERT INTO history (uuid, type, input, poem, letter, poem_prompt, letter_prompt, image, color, ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [uuid, type, input, poemContent, letterContent, poemBody, letterBody, 1, 'FFFFFF', ip]);
})

const createFileName = (date) => {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    let milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}_${milliseconds}.json`;
}

app.get('/history', (req, res) => {
    fs.readdir('./history', async (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        files.sort().reverse();
        for (let i=0; i<files.length; i++) {
            let data = await fs.readFileSync('./history/' + files[i], 'utf8');
            data = JSON.parse(data);
            files[i] = data;
        }
        return res.send(files);
    })
})

app.post('/history', (req, res) => {
    let date = new Date();
    req.body.date = date;
    fs.writeFile('./history/' + createFileName(date), JSON.stringify(req.body, null, 2), err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        return res.send('OK');
    })
})

app.post('/logging', (req, res) => {
    let date = new Date();
    req.body.date = date;
    let isPoem = req.body.type === 'poem';
    req.body.poem_prompt = JSON.parse(replaceParams(isPoem ? CLOVA.POEM : CLOVA.ACROSTICPOEM, req.body));
    req.body.content = req.body.poem;
    req.body.letter_prompt = JSON.parse(replaceParams(isPoem ? CLOVA.POEM_LETTER : CLOVA.ACROSTICPOEM_LETTER, req.body));
    delete req.body.content;
    fs.writeFile('./logs/' + createFileName(date), JSON.stringify(req.body, null, 2), err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        return res.send('OK');
    })
})

app.listen(PORT, '0.0.0.0', () => console.log('Server is running on port ' + PORT));