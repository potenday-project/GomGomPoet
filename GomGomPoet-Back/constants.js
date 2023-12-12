const fs = require('fs');

let HTTPS_KEY_FILE = '/etc/letsencrypt/live/mynameis-21170422-f9d8f836f555.kr.lb.naverncp.com/privkey.pem';
let HTTPS_CERT_FILE = '/etc/letsencrypt/live/mynameis-21170422-f9d8f836f555.kr.lb.naverncp.com/fullchain.pem';

let HTTPS_KEY;
let HTTPS_CERT;

try {
    HTTPS_KEY = fs.readFileSync(HTTPS_KEY_FILE);
    HTTPS_CERT = fs.readFileSync(HTTPS_CERT_FILE);
} catch(e) {}

module.exports = {
    HTTPS_KEY,
    HTTPS_CERT,
    PORT: 3000
}