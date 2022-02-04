const fs = require("fs");
const http = require('http');

const html = fs.readFileSync("sitefiles/index.html").toString();
const js = fs.readFileSync("sitefiles/script.js").toString();
const css = fs.readFileSync("sitefiles/style.css").toString();
//const ico = fs.readFileSync("sitefiles/favicon.ico").toString();

const requestListener = function (req, res) {
  console.log(req.url);
  if (req.url == '/favicon.ico') {
    res.setHeader('Content-Type', 'image/x-icon');

    // Serve your favicon and finish response.
    //
    // You don't need to call `.end()` yourself because
    // `pipe` will do it automatically.
    fs.createReadStream("sitefiles/favicon.ico").pipe(res);
  } else if (req.url == '/bundle') {
    res.writeHead(200);
    res.end(
        html
          .replace("<!-- scriptflag -->", "<script>"+js+"</script>")
          .replace("<!-- styleflag -->", "<style>"+css+"</style>")
    );
  } else if (req.url.indexOf("singles") > -1) {
    res.writeHead(200);
    console.log("SINGLES");
    if (req.url.indexOf("css") > -1) {
      console.log("singcss");
      res.end(css);
    } else if (req.url.indexOf("js") > -1) {
      console.log("singjs");
      res.end(js);
    } else {
      res.end(
        html
          .replace("<!-- scriptflag -->", "<script src=\"/singles/any.js\"></script>")
          .replace("<!-- styleflag -->", "<link rel=\"stylesheet\" href=\"/singles/mystyle.css\">")
      );
    }
  }
}

const server = http.createServer(requestListener);
server.listen(8080);
