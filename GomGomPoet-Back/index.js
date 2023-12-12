const https = require('https');
const { HTTPS_KEY, HTTPS_CERT, PORT } = require('./constants');
const express = require('express');
const app = express();

app.use(express.static('web-build'));

app.get('/test', (req, res) => {
    res.send('Hello World!');
});

const init = () => console.log('Server is running on port ' + PORT);

if (HTTPS_KEY && HTTPS_CERT) {
    let options = { key: HTTPS_KEY, cert: HTTPS_CERT };
    const server = https.createServer(options, app);
    server.listen(PORT, init);
} else {
    app.listen(PORT, init);
}