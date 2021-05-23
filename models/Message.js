const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    text: String,
    user: String
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;