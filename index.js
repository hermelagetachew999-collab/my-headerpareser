
require('dotenv').config();
const express = require('express');
const cors= require('cors');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ origin: '*' })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
function getClientIp(req) {
  // Most hosting platforms set X-Forwarded-For
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  } return (
    req.headers['x-real-ip'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket && req.connection.socket.remoteAddress) ||
    ''
  ).replace(/^::ffff:/, '');   // strip IPv4-mapped IPv6 prefix
}
app.get('/api/whoami', (req, res) => {
  const ipaddress = getClientIp(req);
  const language  = req.headers['accept-language'] || '';
  const software  = req.headers['user-agent'] || '';

  res.json({ ipaddress: req.get('x-forwarded-for') ? req.get('x-forwarded-for').split(',')[0].trim() : req.ip, language: req.get('accept-language'), software:req.get('user-agent') });
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Header parser running on http://localhost:${PORT}`);
});
// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

