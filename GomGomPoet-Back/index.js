const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
const { fetchEventSource } = require('@fortaine/fetch-event-source');
const { DB, CLOVA, PORT } = require('./constants');

const express = require('express');
const cors = require('cors');

let connection;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('web-build'));

app.get('/share/:uuid', async (req, res) => {
    res.sendFile('index.html', { root: './web-build' });
})

app.get('/api/share/:uuid', async (req, res) => {
    let [result] = await connection.query('SELECT uuid, type, input, poem, letter, image, color FROM history WHERE uuid = ?', [req.params.uuid]);
    res.send(result[0]);
})

app.post('/api/share/:uuid/image/:image/color/:color', async (req, res) => {
    let { uuid, image, color } = req.params;
    await connection.query('UPDATE history SET image = ?, color = ? WHERE uuid = ?', [image, color, uuid]);
    res.sendStatus(200);
})

app.post('/api/poem', async (req, res) => {
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
        }
    });
    let uuid = uuidv4().replaceAll('-', '');
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    await connection.query('INSERT INTO history (uuid, type, input, poem, letter, poem_prompt, letter_prompt, image, color, ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [uuid, type, input, poemContent, letterContent, poemBody, letterBody, 80, '000000', ip]);
    res.write(`id: ${uuidv4()}\n`);
    res.write(`event: uuid\n`);
    res.write(`data: ${uuid}\n\n`);
    res.end();
})

app.listen(PORT, '0.0.0.0', async () => {
    console.log('Server is running on port ' + PORT);
    connection = await mysql.createConnection(DB);
})