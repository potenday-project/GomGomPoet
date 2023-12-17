const fs = require('fs');
const https = require('https');
const { HTTPS, CLOVA, PORT } = require('./constants');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('web-build'));

const getStream = async (res, body) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    let clovaRes = await fetch(CLOVA.URL, {
        method: 'POST',
        headers: CLOVA.HEADERS,
        body
    });
    let stream = clovaRes.body;
    let reader = stream.getReader();
    let decoder = new TextDecoder();
    while (true) {
        let { done, value } = await reader.read();
        if (done) {
            res.end();
            break;
        }
        res.write(decoder.decode(value, { stream: true }));
    }
}

const replaceParams = (body, params) => {
    body = JSON.stringify(body);
    params.input = params.input.replaceAll('\n', '');
    for (let param in params) {
        body = body.replace(`{${param}}`, params[param]);
    }
    return body;
}

app.post('/poem', async (req, res) => {
    await getStream(res, replaceParams(CLOVA.POEM, req.body));
})

app.post('/acrosticpoem', async (req, res) => {
    await getStream(res, replaceParams(CLOVA.ACROSTICPOEM, req.body));
})

app.post('/poem/letter', async (req, res) => {
    await getStream(res, replaceParams(CLOVA.POEM_LETTER, req.body));
})

app.post('/acrosticpoem/letter', async (req, res) => {
    await getStream(res, replaceParams(CLOVA.ACROSTICPOEM_LETTER, req.body));
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

const init = () => console.log('Server is running on port ' + PORT);

if (HTTPS) {
    const server = https.createServer(HTTPS, app);
    server.listen(PORT, init);
} else {
    app.listen(PORT, init);
}