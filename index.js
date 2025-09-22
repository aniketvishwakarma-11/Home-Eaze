const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const { Professional, Booking ,User} = require("./models/professional.js");
 // ✅ Professional model         // ✅ User model         // ✅ Booking model
const port = 8080;
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const bcrypt = require("bcrypt");
const session = require("express-session"); // ✅ Session for login tracking
const Joi = require('joi');
const { bookingSchema } = require('./schema');
const ExpressError = require("./utils/ExpressError.js");



// ------------------ DATABASE ------------------
const MONOGO_URL = "mongodb://127.0.0.1:27017/home-fix";

main()
    .then(() => {
        console.log("✅ Connected to database");
    })
    .catch(err => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONOGO_URL);
}


// ------------------ APP SETUP ------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Session setup
app.use(session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
}));

const validateBooking = (req, res, next) => {
    const formData = {
        bookingDate: req.body.bookingDate,
        bookingTime: req.body.bookingTime,
        bookingType: req.body.bookingType,
        location: req.body.location,
    };
    const { error } = bookingSchema.validate(formData, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message).join(', ');
        return next(new ExpressError(errorMessages, 400)); // Changed order: message, statusCode
    }
    if (!req.params.id) {
        return next(new ExpressError('Professional ID is required', 400));
    }
    next();
};
// ------------------ ROUTES ------------------

// Home
app.get("/", (req, res) => {
    res.render("pages/index.ejs");
});

// Search Professionals
app.get("/search", async (req, res) => {
    const professionals = await Professional.find({});
    res.render("pages/search.ejs", { professionals });
});

app.post("/search", async (req, res) => {
    const searchQuery = req.body.query?.trim();
    console.log("Search Query:", searchQuery);

    let professionals;
    if (searchQuery) {
        professionals = await Professional.find({
            $or: [
                { profession: { $regex: searchQuery, $options: "i" } },
                { name: { $regex: searchQuery, $options: "i" } },
                { location: { $regex: searchQuery, $options: "i" } }
            ]
        });
    } else {
        professionals = await Professional.find({});
    }
    res.render("pages/search.ejs", { professionals });
});

// Professional Details
app.get("/search/:id", async (req, res) => {
    const { id } = req.params;
    const professional = await Professional.findById(id);
    res.render("pages/professional.ejs", { professional });
});

// Contact
app.get("/contactUs", (req, res) => {
    res.render("pages/contact.ejs");
});


// ------------------ AUTH ------------------

// Register Page
app.get("/register", (req, res) => {
    res.render("pages/register.ejs");
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send("Passwords do not match");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.redirect("/login");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Login Page
app.get("/login", (req, res) => {
    res.render("pages/login.ejs");
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid email or password");
        }

        // ✅ Save login state in session
        req.session.userId = user._id;
        req.session.userName = user.name;
        const professionals = await Professional.find({});
        // res.render("pages/search.ejs", { professionals });
        res.redirect("/search");
         
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Logout
app.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});


// ------------------ BOOKINGS ------------------

// Middleware: Check if logged in
function isLoggedIn(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    next();
}

// Booking Page
// Booking Page
app.get("/booking/:id", isLoggedIn, async (req, res) => {
    try {
        const professional = await Professional.findById(req.params.id);
        if (!professional) return res.status(404).send("Professional not found");
        res.render("pages/booking.ejs", { professional });
    } catch (err) {
        res.status(500).send(err.message);
    }
});



// Create Booking (with professional ID)
app.post("/booking/:id", isLoggedIn, validateBooking,async (req, res) => {
  console.log("POST route reached!");
  try {
    const { id } = req.params; // Professional ID
    console.log("Booking request for ID:", id);

    const professional = await Professional.findById(id);
    console.log("Found Professional:", professional);

    if (!professional) {
      return res.status(404).send("❌ Professional not found");
    }

    // Extract booking details from form/body
    const { bookingDate, bookingTime, bookingType, location } = req.body;

    // Create new booking document
    const newBooking = new Booking({
      userId: req.session.userId,        // ✅ correct
      professionalId: professional._id,  // ✅ correct
      bookingDate,
      bookingTime,
      bookingType,
      location
    });

    await newBooking.save();
    console.log("✅ Booking saved:", newBooking);

    // Redirect or render confirmation page
    res.redirect(`/myBookings`);
  } catch (err) {
    next(new ExpressError(err.message, 500));
  }
});
app.get("/myBookings", isLoggedIn, async (req, res) => {
  try {
    // const bookings = await Booking.find({ userId: req.session.userId }).populate("professionalId");
    const bookings = await Booking.find({ userId: req.session.userId })
      .populate("professionalId")   // shows professional details
      .populate("userId"); 
    res.render("pages/myBookings.ejs", { bookings });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// Update the 404 middleware
app.use((req, res, next) => {
    next(new ExpressError("Page Not Found", 404)); // Changed order: message, statusCode
});
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went Wrong" } = err;
    res.status(statusCode).render("pages/error.ejs", { message });
    // res.status(statusCode).send(message);
})
// ------------------ SERVER ------------------
app.listen(port, () => {
    console.log(`🚀 Listening on port: ${port}`);
});
