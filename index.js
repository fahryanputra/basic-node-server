const http = require("http");
const url = require("url");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const error404 = fs.readFile("./404.html", (err, data) => {
  if (err) throw err;
  res.write(data);
  return res.end();
});

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  let filename = "";

  if (q.pathname === "/") {
    filename = "./index.html";
  } else {
    filename = "." + q.pathname + ".html";
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, "Content-Type", "text/html");
      res.write(error404);
      return res.end();
    } else {
      res.writeHead(200, "Content-Type", "text/html");
      res.write(data);
      return res.end();
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
