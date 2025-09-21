const mongoose = require("mongoose");
const { Schema } = mongoose;

/* ---------------------- Professional Schema ---------------------- */
const professionalSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  profession: {
    type: String,
    enum: [
      "Cleaning",
      "Cooking",
      "Babysitting",
      "Laundry",
      "Dish Washing",
      "Gardening",
      "senior-citizen caretaking",
      "General Help"
    ],
    required: true,

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
    required: true
  },
  image: {
    type: String,
    default: "https://randomuser.me/api/portraits/men/1.jpg",
    set: v =>
      v === "" ? "https://randomuser.me/api/portraits/men/1.jpg" : v
  }
});

/* ---------------------- Booking Schema ---------------------- */
const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  professionalId: {
    type: Schema.Types.ObjectId,
    ref: "Professional",
    required: true
  },
  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true },
  bookingType: { type: String, required: true },
  location: { type: String, required: true }
});


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });
/* ---------------------- Models ---------------------- */
const Professional = mongoose.model("Professional", professionalSchema);
const Booking = mongoose.model("Booking", bookingSchema);
const User = mongoose.model("User",userSchema);

/* ---------------------- Exports ---------------------- */
//
// module.exports = mongoose.model("Professional", professionalSchema);

module.exports = { Professional, Booking,User };