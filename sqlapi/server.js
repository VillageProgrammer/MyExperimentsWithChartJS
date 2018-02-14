//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
var dbConfig = {
    user:  "sa",
    password: "market@123",
    server: "DELL-PC",
	port: "1433",
    options: {
        instanceName: 'VILLAGEBOY',
        database: 'Test',  //the username above should have granted permissions in order to access this DB.
        debug: {
            packet: false,
            payload: false,
            token: false,
            data: false
        },
        //encrypt: true
    }
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){             
     // connect to your database
    sql.connect(dbConfig, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });          
}

//GET API
app.get("/api/status", function(req , res){
                var query = "select * from [ProcessStatus]";
                executeQuery (res, query);
});

//POST API
 app.post("/api/user", function(req , res){
                //var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password”);
                //executeQuery (res, query);
});

//PUT API
 app.put("/api/user/:id", function(req , res){
                //var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
                //executeQuery (res, query);
});

// DELETE API
 app.delete("/api/user /:id", function(req , res){
                //var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
                //executeQuery (res, query);
});