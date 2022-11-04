const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    carname: {
        type: String,
    },
    brand: {
        type: String,
    },
    description: {
        type: String,
    },
    // variance: {
    //     type: [Variance],
    // }
});

module.exports = mongoose.model('Cars', UserSchema)
