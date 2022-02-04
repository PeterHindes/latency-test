const fs = require("fs");
const http = require('http');
const mime = require('mime');

const started = Date.now();
const skeleton = fs.readFileSync("skeleton.html").toString();
const drop = fs.readFileSync("drop.js").toString();

const html = fs.readFileSync("sitefiles/index.html").toString();
const js = fs.readFileSync("sitefiles/script.js").toString();
const css = fs.readFileSync("sitefiles/style.css").toString();

const requestListener = function (req, res) {
  console.log(req.url);
  if (req.url == '/favicon.ico') {
    res.setHeader('Content-Type', 'image/x-icon');
    fs.createReadStream("sitefiles/favicon.ico").pipe(res);

  } else if (req.url == '/bundle' || req.url == '/') {
    res.setHeader('Content-Type', mime.getType(html))
    res.writeHead(200);
    res.end(
      html
        .replace("<!-- scriptflag -->", "<script>"+js+"</script>")
        .replace("<!-- styleflag -->", "<style>"+css+"</style>")
    );

  } else if (req.url == '/dropb') {
    res.writeHead(200);
    if () { // Cookies show up to date
      res.end(
        skeleton
          .replace("<!-- scriptflag -->", 
            "<script>"+
            "const loadFromLocal = true;"+
            "</script>"+
            "<script>"+drop+"</script>"
          )
      );
    } else {
      res.end(
        skeleton
          .replace("<!-- scriptflag -->", 
            "<script>"+
            "const loadFromLocal = false;"+
            "const html = "+html+"; "+
            "const js = "+js+";"+ // need to escape multiline
            "const css = "+css+";"+
            "</script>"+
            "<script>"+drop+"</script>"
          )
      );
    }
  } else if (req.url.indexOf("singles") > -1) {
    console.log("SINGLES");

    if (req.url.indexOf("css") > -1) { // singles/any.css matches
      console.log("singcss");
      res.setHeader('Content-Type', mime.getType(css))
      res.writeHead(200);
      res.end(css);

    } else if (req.url.indexOf("js") > -1) {
      console.log("singjs");
      res.setHeader('Content-Type', mime.getType(js))
      res.writeHead(200);
      res.end(js);

    } else {
      res.setHeader('Content-Type', mime.getType(html));
      res.writeHead(200);
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
