const mongoose = require('mongoose');

// Define Room model
const Room = mongoose.model('Room', new mongoose.Schema({
    name: String,
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomType',
    },
    price: Number,
}));

module.exports = Room;