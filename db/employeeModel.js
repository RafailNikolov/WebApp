/**
 * Created by rafail on 7/21/16.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmployeeSchema = new Schema({
    first_name: String,
    last_name: String,
    e_mail: String,
    opt1: Boolean,
    opt2: Boolean,
    opt3: Boolean,
    opt4: Boolean,
    opt5: Boolean
});

module.exports = mongoose.model('Employee', EmployeeSchema);