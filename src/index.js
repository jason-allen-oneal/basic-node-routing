const http = require("http");
const fs = require("fs");
const Router = require("./router");

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end();
    console.log('favicon requested');
    return;
  }

  try {
    const content = Router.request(req);
    Router.render(res, content);
  } catch(e) {
    Router.render(res, e.message);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});