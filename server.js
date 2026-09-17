const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
const server = http.createServer((req,res)=>{const requested=decodeURIComponent(req.url.split('?')[0]);const relative=requested==='/'?'/index.html':requested;const filePath=path.normalize(path.join(root,relative));if(!filePath.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden')}fs.readFile(filePath,(error,data)=>{if(error){res.writeHead(error.code==='ENOENT'?404:500);return res.end(error.code==='ENOENT'?'Not found':'Server error')}res.writeHead(200,{'Content-Type':types[path.extname(filePath).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)})});
server.listen(3000,'127.0.0.1',()=>console.log('Arez landing page running at http://127.0.0.1:3000'));
