var http = require('http');
var url = require('url');
var fs = require('fs');


fs.readFile('./404.html', function(err, data){
    global.err_data = data;
});

http.createServer(function(req, res){
    // fs.readFile('404.html', function())
    var q = url.parse(req.url, true);
    var filename = '.' + q.pathname;
    if (filename === "./")
        filename = "./index.html";

    console.log(filename);
    fs.readFile(filename, function(err, data){
        // if (err){
        //     // return res.end('404 Not found');
        //     res.writeHead(404, {'Content-Type': 'text/html'});
        //     res.write(err_data);
        //     return res.end();
        // }
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