const http = require("http");
const sever = http.createServer((req, res) => {
  console.log("run request");
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Hello World</h1>");
  res.end();
});
sever.listen(5001, "localhost", () => {
  console.log("server is running");
});
