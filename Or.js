const mongoose = require("mongoose");
const { Booking, Professional } = require("./models/professional");

async function cleanOrphanedBookings() {
  try {
    const bookings = await Booking.find().populate("professionalId");
    const orphanedBookings = bookings.filter(booking => !booking.professionalId);
    const orphanedIds = orphanedBookings.map(booking => booking._id);

    if (orphanedIds.length > 0) {
      const result = await Booking.deleteMany({ _id: { $in: orphanedIds } });
      console.log(`Deleted ${result.deletedCount} orphaned bookings`);
    } else {
      console.log("No orphaned bookings found");
    }
  } catch (err) {
    console.error("Error cleaning orphaned bookings:", err);
  } finally {
    mongoose.connection.close();
  }
}

// Connect to the database and run the cleanup
mongoose.connect("mongodb://127.0.0.1:27017/home-fix", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => cleanOrphanedBookings())
  .catch(err => console.error("MongoDB connection error:", err));