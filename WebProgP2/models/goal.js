/*Define variables*/
var mongoose = require("mongoose");

/*Define Schema*/
var GoalSchema = new mongoose.Schema({
	key:{type:String, unique: true, required: true},
	value:String,
});

/*Define Model*/
module.exports = mongoose.model("Goal", GoalSchema);
