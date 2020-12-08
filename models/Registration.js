const mongoose = require('mongoose'); 
const {Schema, model} = mongoose;

const registrationSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  registerDate: Date
},
{
  timestamps: true 
}
)

module.exports = model('Registration', registrationSchema);