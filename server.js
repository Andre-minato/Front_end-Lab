const http = require('http');
var static = require('node-static');
var path = new static.Server(`${__dirname}/localhost`)
var home = new static.Server(`${__dirname}/localhost`)
var cadastro = new static.Server(`${__dirname}/localhost`)
var user = new static.Server(`${__dirname}/localhost`)
var lab = new static.Server(`${__dirname}/localhost`)
var reserva = new static.Server(`${__dirname}/localhost`)
var cadastroLab = new static.Server(`${__dirname}/localhost`)
var boleto = new static.Server(`${__dirname}/localhost`)

http.createServer(function(req, res) {
    
    if (req.url == "/cadastro") {
        req.addListener('end', function() {
            cadastro.serve(req, res);
        }).resume()
    }
    if (req.url == "/home") {
        req.addListener('end', function() {
            home.serve(req, res);
        }).resume()
    }
    if (req.url == "/user") {
        req.addListener('end', function() {
            user.serve(req, res)
        }).resume()
    }
    if (req.url == "/lab") {
        req.addListener('end', function() {
            lab.serve(req, res)
        }).resume()
    }
    if (req.url == "/reserva") {
        req.addListener('end', function() {
            reserva.serve(req, res)
        }).resume()
    }
    if (req.url == "/cadastroLab") {
        req.addListener('end', function() {
            cadastroLab.serve(req, res)
        }).resume()
    }
    if (req.url == "/boleto") {
        req.addListener('end', function() {
            boleto.serve(req, res)
        }).resume()
    }
    else {
        req.addListener('end', function() {
            path.serve(req, res);
        }).resume()
    }

}).listen(8000)

console.log('Servidor iniciado na porta: 8000.......')


