var Appointment = require("../models/appointment");
var isodate = require("isodate");

exports.insert = function (req, res) {
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    if (!startTime) {
        return res.status(400).send({ message: 'Start time should not be empty!' })
    }
    if (!endTime) {
        return res.status(400).send({ message: 'End time should not be empty!' })
    }

    Appointment.count({
        $or: [
            { $and: [{ startTime: { $eq: startTime } }, { endTime: { $eq: endTime } }] },
            { $and: [{ endTime: { $gt: startTime } }, { endTime: { $lte: endTime } }] }
        ]
        // $and: [{ endTime: { $gt: startTime } }, { endTime: { $lt: endTime } }]
    }).then(function (count) {
        if (count === 0) {
            const appointments = createHalfHourIntervals(startTime, endTime);
            Appointment.insertMany(appointments).then(function (data) {
                return res.status(200).send({ message: 'Appointment Created successfully!' })
            }).catch(function (error) {
                return res.status(500).send({ message: err.message })
            })

        } else {
            return res.status(422).send({ message: 'Appointment exist!' })
        }
    });
}
exports.update = function (req, res) {

    const _id = req.body._id;
    const name = req.body.name;
    const contactNumber = req.body.contactNumber;
    const description = req.body.description;

    if (!_id) {
        return res.status(400).send({ message: 'Invalid Appointment!' })
    }
    if (!name) {
        return res.status(400).send({ message: 'Name should not be empty!' })
    }
    if (!contactNumber) {
        return res.status(400).send({ message: 'Contact Number should not be empty!' })
    }

    Appointment.findOneAndUpdate({ _id },
        {
            $set: {
                name, contactNumber, description, status: "BOOKED"
            }
        },
        { new: true }).exec().then(function (data) {
            if (data != null) {
                return res.status(200).send({ message: 'Appointment updated successfully!' })
            }
            else {
                return res.status(500).send({ message: 'Invalid Appointment!' })
            }
        });
}

exports.get = function (req, res) {

    const date = req.params.date;
    if (!date) {
        return res.status(400).send({ message: 'Date should not be empty!' })
    }
    var startDate = new Date(date);
    var endDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    Appointment.find({ $and: [{ startTime: { $gte: isodate(startDate) } }, { endTime: { $lte: isodate(endDate) } }] }).then(function (data) {
        return res.status(200).send({ message: 'Success', data })
    });
}

exports.getBooked = function (req, res) {

    const date = req.params.date;
    if (!date) {
        return res.status(400).send({ message: 'Date should not be empty!' })
    }
    var startDate = new Date(date);
    var endDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    Appointment.find({ status: "BOOKED", $and: [{ startTime: { $gte: isodate(startDate) } }, { endTime: { $lte: isodate(endDate) } }] }).then(function (data) {
        return res.status(200).send({ message: 'Success', data })
    });
}
function createHalfHourIntervals(from, to) {
    var startTime = new Date(from);
    var endTime = new Date(to);
    var intervals = [];
    while (startTime < endTime) {
        if (intervals.length === 0) {
            intervals.push({
                startTime: new Date(from),
                endTime: new Date(startTime.setMinutes(startTime.getMinutes() + 30))
            });
        }
        else {
            const et = new Date(startTime.setMinutes(startTime.getMinutes() + 30));
            if (et <= endTime) {
                intervals.push({
                    startTime: intervals[intervals.length - 1].endTime,
                    endTime: et
                });
            }
        }
    }
    return intervals;
}
