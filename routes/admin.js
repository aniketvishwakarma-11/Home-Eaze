const express = require('express');
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/login", async (req, res) => {
    res.render("admin/Adminlogin.ejs");
});

router.post("/login", wrapAsync(async (req, res, next) => {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            throw new ExpressError(400, "Email and password are required");
        }

        // Check credentials
        if (email === "admin@gmail.com" && password === "admin1") {
            // Create session
            req.session.isAdmin = true;
            req.session.email = email;
            console.log("Admin login successful:", { email, session: req.session });

            // Redirect to admin dashboard (adjust the path as needed)
            req.flash('success', 'Admin You are logged in');
            res.render("admin/AdminHome.ejs")
        } else {
            req.flash('error', 'Something is wrong');
            res.redirect("admin/Adminlogin")
        }
    
}));

module.exports = router;