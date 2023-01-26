var mongoose = require('mongoose')
var medicineSchema = mongoose.Schema({
    
    medicinename: {
        type: String,
      
    },
    medicinevolume: {
        type: String,
      
    },
    medicineprice: {
        type: Number,
      
    },
    medicineimage: {
        type: String,
    },
    createdAt: {type: Date, default: Date.now}
})
module.exports = mongoose.model('medicine',medicineSchema)


