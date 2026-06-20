const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };

http.createServer((req, res) => {
    const file = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    fs.readFile(file, (err, data) => {
        if (err) { res.writeHead(404); res.end('Not found'); return; }
        const ext = path.extname(file);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
        res.end(data);
    });
}).listen(3000, () => console.log('Server running at http://localhost:3000'));
