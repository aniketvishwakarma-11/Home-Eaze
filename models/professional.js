const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  profession: {
    type: String,
    enum: ["Cleaning", "Cooking", "Babysitting"], 
    required: true
  },
  pricing: {
    perHour: { type: Number, required: true },
    perDay: { type: Number, required: true },
    perWeek: { type: Number, required: true },
    perMonth: { type: Number, required: true }
  },
  experience: {
    type: Number,
    min: 0,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  contact: {
    type: String,
    default: "Not Provided"
  },
  image: {
    type: String,
    default: "https://randomuser.me/api/portraits/men/1.jpg",
    set: v =>
      v === "" ? "https://randomuser.me/api/portraits/men/1.jpg" : v
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
