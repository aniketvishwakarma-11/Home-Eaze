# 🏠 HomeFix - Home Services Booking Platform

*Book trusted home services instantly — cleaning, cooking, babysitting, and more.*

---

## 🌐 Live Demo

**Visit the live application:**  
[👉 https://home-eaze.onrender.com/](https://home-eaze.onrender.com/)

---

## 📖 Project Overview

**HomeFix** is a full-stack web application that connects users with verified home service professionals.  
Whether you need cleaning, cooking, babysitting, laundry, dishwashing, or gardening — HomeFix brings trusted help right to your doorstep.

### ✨ Key Highlights
- User & Professional registration/login  
- Service browsing and search  
- Secure booking system  
- Professional profiles with ratings  
- Admin dashboard for platform management  

---

## 🚀 Features

| Feature                        | Description |
|--------------------------------|--------------|
| **User Authentication**        | Secure registration and login for users and professionals |
| **Professional Profiles**      | Detailed profiles with services, ratings, and availability |
| **Service Search & Filters**   | Find professionals by category, location, rating, etc. |
| **Booking System**             | Book services with date, time, and special instructions |
| **Admin Dashboard**            | Manage users, professionals, bookings, and reviews |
| **Responsive Design**          | Fully functional on mobile and desktop |

---

## 🧠 Technologies Used

| Layer         | Technology                          |
|---------------|--------------------------------------|
| **Backend**   | Node.js, Express.js                  |
| **Frontend**  | HTML, CSS, EJS (Embedded JavaScript) |
| **Database**  | MongoDB (with Mongoose ODM)          |
| **Auth**      | Passport.js (Local Strategy)         |
| **Deployment**| Render                               |
| **Others**    | dotenv, bcrypt, express-session      |

---

## ⚙️ Installation (Local Setup)

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/aniketvishwakarma-11/Home-fix.git
cd Home-fix
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Set Up Environment Variables
Create a .env file in the root directory:
```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/homefix_db
SESSION_SECRET=your_super_secret_key_here
NODE_ENV=development
```
⚠️ Note: Replace DATABASE_URL with your MongoDB connection string (local or Atlas).

### 4️⃣ Start the Server
```bash
npm start
```
or
```bash
node index.js
```
Then visit:
👉 http://localhost:3000

☁️ Deployment
The project is deployed on Render:
🔗 Live URL: https://home-eaze.onrender.com/

⚠️ Note: Free Render deployments may experience cold starts.
First load might take a few seconds.
		

👥 User Roles
Role	Permissions
User	Register, login, search, book services, leave reviews
Professional	Create profile, manage availability, accept bookings
Admin	Full control: manage users, approve professionals, view analytics

🔮 Future Enhancements
💳 Payment Integration (Razorpay / Stripe)

🔔 Real-time Notifications

💬 Chat between User & Professional

📍 Location-based Search (Geocoding)

📱 Mobile App (React Native)

🤝 Contributing
Contributions are welcome! 🎉
To contribute:

Fork the repository

Create a new feature branch

Commit your changes

Open a Pull Request

### 📬 Contact & Support

👨‍💻 Developer: Aniket Vishwakarma <br>
📧 Email: aniketvis675@gmail.com<br>
🔗 GitHub: github.com/aniketvishwakarma-11<br>

⭐ Show Your Support
If you like this project, don’t forget to give it a ⭐ star on GitHub!
