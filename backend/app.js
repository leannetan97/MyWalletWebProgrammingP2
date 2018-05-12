//Requiring Express module and save Express in var app
var express = require("express");
var app = express();

app.set("view engine", "ejs");

//Define Routes
/*Route 1: Root “/”
Visiting "/" should print "Hi there, welcome to my Lab10 solution!" */
app.get("/", function(req,res){
    res.send("Hi, welcome to myWallet");   
});


app.get("/report/2018", function(req, res){
    res.render("report2018");
});

app.get("/report/2017", function(req, res){
    res.render("report2017");
});

app.get("/report/2016", function(req, res){
    res.render("report2016");
});


/*If a user visits any other route, print:
"Sorry, page not found...What are you doing with your life?" */
//Apply "*" route matcher 
app.get("*", function(req,res){
    res.send("Sorry, page not found...What are you doing with your life?");
});

//Tell Express to listen for request (start server) on a particular port 
app.listen(3000, function(){ 
    console.log('Server has started!!!');
});



