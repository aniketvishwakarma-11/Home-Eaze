const express = require("express");
const router = express.Router();
const {Professional} = require("../models/professional");

// 📌 Create Professional Form
router.get("/create", (req, res) => {
    res.render("admin/createProfessional.ejs");
});

// 📌 Handle Create Professional
router.post("/create", async (req, res) => {
    try {
        const { 
            name, 
            profession, 
            pricing, 
            experience, 
            location, 
            availability, 
            contact, 
            image 
        } = req.body;

        const newPro = new Professional({
            name,
            profession,
            pricing: {
                perHour: pricing?.perHour,
                perDay: pricing?.perDay,
                perWeek: pricing?.perWeek,
                perMonth: pricing?.perMonth
            },
            experience,
            location,
            availability: availability === "true" || availability === true,
            contact,
            image
        });

        await newPro.save();
        req.flash("success", "✅ Professional created successfully!");
        res.redirect("/professional/list");
    } catch (err) {
        console.error(err);
        req.flash("error", "❌ Error creating professional!");
        res.redirect("/professional/create");
    }
});

// 📌 View All Professionals
router.get("/list", async (req, res) => {
    try {
        const professionals = await Professional.find({});
        res.render("admin/listProfessional.ejs", { professionals });
    } catch (err) {
        console.error(err);
        req.flash("error", "❌ Error fetching professionals!");
        res.redirect("/admin/dashboard");
    }
});

// 📌 Edit Professional Form
router.get("/edit/:id", async (req, res) => {
    try {
        const professional = await Professional.findById(req.params.id);
        if (!professional) {
            req.flash("error", "❌ Professional not found!");
            return res.redirect("/professional/list");
        }
        res.render("admin/editProfessional.ejs", { professional });
    } catch (err) {
        console.error(err);
        req.flash("error", "❌ Error finding professional!");
        res.redirect("/professional/list");
    }
});

// 📌 Handle Edit Professional
router.post("/edit/:id", async (req, res) => {
    try {
        const { 
            name, 
            profession, 
            pricing, 
            experience, 
            location, 
            availability, 
            contact, 
            image 
        } = req.body;

        await Professional.findByIdAndUpdate(req.params.id, {
            name,
            profession,
            pricing: {
                perHour: pricing?.perHour,
                perDay: pricing?.perDay,
                perWeek: pricing?.perWeek,
                perMonth: pricing?.perMonth
            },
            experience,
            location,
            availability: availability === "true" || availability === true,
            contact,
            image
        });

        req.flash("success", "✅ Professional updated successfully!");
        res.redirect("/professional/list");
    } catch (err) {
        console.error(err);
        req.flash("error", "❌ Error updating professional!");
        res.redirect(`/professional/edit/${req.params.id}`);
    }
});

// In routes/adminProfessional.js
router.post("/delete/:id", async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.id);
    if (!professional) {
      console.log(`Professional with ID ${req.params.id} not found`);
      req.flash("error", "Professional not found!");
      return res.redirect("/professional/list");
    }
    console.log(`Deleting professional ${professional._id}`);
    await professional.deleteOne(); // Ensure deleteOne is used
    req.flash("success", "Professional and related bookings deleted!");
    res.redirect("/professional/list");
  } catch (err) {
    console.error("Error deleting professional:", err);
    req.flash("error", "Error deleting professional!");
    res.redirect("/professional/list");
  }
});


module.exports = router;
