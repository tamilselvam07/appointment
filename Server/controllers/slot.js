const Slot = require("../models/slot");

exports.insert = function (req, res) {

    const slot = new Slot(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    slot.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Slot Created successfully!');
    });
}
