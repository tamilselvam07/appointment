const appointment = require("./controllers/appointment");

exports.init = function (app) {
    app.post("/appointment", appointment.insert);
    app.put("/appointment", appointment.update);
    app.get("/appointment/:date", appointment.get);
    app.get("/appointment/booked/:date", appointment.getBooked);
};
