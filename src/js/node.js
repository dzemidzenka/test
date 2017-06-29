let files = require('fs');
let https = require('https');

files.writeFile(__dirname + "/index1.html", "test", () => {
    console.log(2 + 2);
});


let url = "https://lorempixel.com/200/200/";
let file = files.createWriteStream(__dirname + "/image1.jpg");
let request = https.get(url, response => {
    response.pipe(file);
});



var http = require('https')
var path = require('path')

var options = {
  hostname: 'api.github.com',
  path: '/repos/nodejs/node/contents/lib',
  method: 'GET',
  headers: { 'Content-Type': 'application/json', 
             'user-agent': 'nodejs/node' 
  }
}

var req = http.request(options, (res) => {
  res.setEncoding('utf8')
  var body = ""
  res.on('data', (data) => { body += data })
  res.on('end', () => {
    var list = []
    body = JSON.parse(body)
    body.forEach( (f) => {
      if (f.type === 'file' && f.name[0]!=='_' && f.name[0]!=='.') {
        list.push(path.basename(f.name,'.js'))
      }
    })
    console.log(list)
  })
})
req.on('error', (e) => { throw (e) } )
req.end()