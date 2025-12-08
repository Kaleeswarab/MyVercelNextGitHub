const http = require("http");

function requestHandler(req, res) {
  if (req.url == "/health" && req.method == "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "Ok" }));
    return;
  }

  if (req.url == "/" && req.method == "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "Requested message with the server URL" })
    );
    return;
  }

  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ message: "Error while checking the URL" }));
  return;
}

if (require.main == "module") {
  const port = process.env.port || 3000;
  const server = http.createServer(requestHandler);
  server.listen(port, () => {
    console.log(`Server Listening on ${port}`);
  });
}

module.exports = requestHandler;
