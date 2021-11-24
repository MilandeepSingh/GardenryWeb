var mysql = require('mysql');
var url=require('url');
const http = require('http');
const express = require('express')

const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/newNote',function(req,res){
  console.log(req.url);
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Minibr@vo1",
  database: 'gardenry'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

 con.query("SET SESSION time_zone = '+11:00';", function(){})

const requestListener = (req,res)=>{
  var pathname=url.parse(req.url).pathname;
  switch(pathname){
      case '/allplants':
        console.log(pathname)
        con.query("SELECT * FROM allplants", function (err, result, fields) {
          if (err) throw err;
          var responseData = result;
        const jsonContent = JSON.stringify(responseData);
        
        res.end(jsonContent);
        });
          
      break;

      case '/myplants':
        console.log(pathname)
        con.query("SELECT * FROM myplants", function (err, result, fields) {
          if (err) throw err;
          var responseData = result;
      
          
        const jsonContent = JSON.stringify(responseData);
        
        res.end(jsonContent);
        });
          
      break;

      case '/notes':
        console.log(pathname)
        con.query("SELECT * FROM notes", function (err, result, fields) {
          if (err) throw err;
          var responseData = result;
          
      
          
        const jsonContent = JSON.stringify(responseData);
        console.log(jsonContent)
        res.end(jsonContent);
        });
          
      break;

      case '/newNote':
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(req.url);
        var q = url.parse(req.url, true).query;
        var txt = q.note;
        res.end(txt);
        console.log(txt)
        con.query("INSERT INTO notes values ('"+txt+"',CURRENT_TIMESTAMP)", function (err, result, fields) {
          if (err) throw err;
          var responseData = result;
          
        const jsonContent = JSON.stringify(responseData);
        console.log(jsonContent)
        res.end(jsonContent);
        });
        break;

        case '/newPlant':
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(req.url);
        var q = url.parse(req.url, true).query;
        var plantname = q.plant;
        var qty = q.qty;
        res.end(txt);
        console.log(txt)
        con.query("INSERT INTO MyPlants values ('"+plantname+"','"+ qty +"')", function (err, result, fields) {
          if (err) throw err;
          var responseData = result;
          
        const jsonContent = JSON.stringify(responseData);
        console.log(jsonContent)
        res.end(jsonContent);
        });
        break;

      default:
          console.log(pathname)
          res.end(JSON.stringify([{plantname:"PP"}]));
      break;
  }

}

  
const server = http.createServer(requestListener);
  
server.listen(3001,'localhost', function(){
    console.log("Server is Listening at Port 3001!");
});

//   con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });

//   var sql = "CREATE TABLE IF NOT EXISTS customers (name VARCHAR(255), address VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });

//   var sql = "CREATE TABLE IF NOT EXISTS customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

  var sql = "create table if not exists Notes(note varchar(1000), sma timestamp, primary key(sma));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table notes created");
  });

  var sql = "create table if not exists MyPlants(plantname varchar(255) , qty int, primary key(plantname));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table MyPlants created");
  });

  var sql = "create table if not exists AllPlants(plantname varchar(255) , sciname varchar(255), primary key(plantname));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table AllPlants created");
  });

});
