/*Define variables*/
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


/*Define Schema*/
var UserSchema = new mongoose.Schema({
	username:{type:String, unique: true, required: true},
	name:String,
	password:String
});

UserSchema.plugin(passportLocalMongoose);

/*Define Model*/
module.exports = mongoose.model("User", UserSchema);
