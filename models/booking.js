const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  bookingTime: {
    type: String, // storing as string (e.g., "10:30 AM") since mongoose has no "Time" type
    required: true,
  },
  bookingType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
