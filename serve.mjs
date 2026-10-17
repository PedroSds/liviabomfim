import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {join, extname} from 'node:path';
const root=join(import.meta.dirname,'dist');
const mime={'.html':'text/html; charset=utf-8','.jpg':'image/jpeg','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const path=join(root,pathname==='/'?'index.html':pathname.replace(/^\//,''));
  if(!path.startsWith(root)){res.writeHead(403);res.end();return}
  try{const data=await readFile(path);res.writeHead(200,{'content-type':mime[extname(path)]||'application/octet-stream'});res.end(data)}catch{res.writeHead(404);res.end('Not found')}
}).listen(51876,'127.0.0.1',()=>console.log('http://127.0.0.1:51876/'));
