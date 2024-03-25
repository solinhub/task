const RoomType = require("../models/room-type");

// RoomType controller functions
const createRoomType = async (req, res) => {
    try {
        const { name } = req.body;
        const roomType = new RoomType({ name });
        await roomType.save();
        res.status(201).json(roomType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllRoomTypes = async (req, res) => {
    try {
        const roomTypes = await RoomType.find();
        res.json(roomTypes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports={ createRoomType, getAllRoomTypes };