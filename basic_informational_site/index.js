var http = require('http');
var url = require('url');
var fs = require('fs');


http.createServer(function(req, res){
    var q = url.parse(req.url, true);
    var filename = '.' + q.pathname;
    if (filename === "./")
        filename = "./index.html";

    console.log(filename);
    fs.readFile(filename, function(err, data){

        if (err){
            fs.readFile("./404.html", function(err, data){
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }

    });
    
}).listen(8080);

console.log('Opening Port 8080');
