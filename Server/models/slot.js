const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotSchema = new Schema({
    date: { type: Date, required: true },
    startTime: { type: TimeRanges, required: true },
    endTime: { type: true, required: true },
    description: { type: String, required: false },
    status: { type: String, required: false },
});


module.exports = mongoose.model('Slot', slotSchema);