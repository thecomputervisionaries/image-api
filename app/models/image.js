/* @TODO
	Upate model with any relevant features and info
*/
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ImageSchema   = new Schema({
	name: String,
	img_id: String,
	classification: String
});

module.exports = mongoose.model('Image', ImageSchema);