const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    name: { type: String, required: false },
    contactNumber: { type: String, required: false },
    description: { type: String, required: false },
    status: { type: String, required: true, default: 'OPEN' },
});


module.exports = mongoose.model('Appointment', appointmentSchema);