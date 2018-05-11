var express = require("express");
var app = express();



app.get("/MyWallet", function(req, res){  
    res.render("home.ejs",{
    	title: 'MyWallet'});
});

app.get("/home", function(req, res){  
    res.render("Login_home.ejs",{
    	title: 'MyWallet'});
});


app.get("/mygoal", function(req, res){
    res.render("goal.ejs",{
    	title: 'MyGoal'});
});

app.listen(3000, function(){ 
    console.log('Server has started!!!');
})

app.use(express.static("public"));

