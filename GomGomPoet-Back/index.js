const https = require('https');
const { HTTPS, CLOVA, PORT } = require('./constants');
const express = require('express');
const app = express();
app.use(express.json());
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

const init = () => console.log('Server is running on port ' + PORT);

if (HTTPS) {
    const server = https.createServer(HTTPS, app);
    server.listen(PORT, init);
} else {
    app.listen(PORT, init);
}