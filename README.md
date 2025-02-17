# BloodHope 💉❤️

![BloodHope Banner](https://i.ibb.co.com/KcQncVJj/Screenshot-2025-02-05-104055.png)  

## Overview 🌍  

**BloodHope** is a user-friendly platform designed to **connect blood donors with those in need**. By simplifying and promoting the donation process, BloodHope helps save lives and strengthens community ties.  

🔗 **Live Project Links:**  
- [BloodHope Live Site](https://blood-hope-2fafa.web.app/)  
- [BloodHope Alternative Live Site](https://blood-hope1.netlify.app/)  


## Features ⚙️  

✅ **User Registration & Authentication** – Secure sign-up & login using **JWT authentication**.  
✅ **Blood Donation Requests** – Users can request blood by specifying **blood type, quantity, and urgency**.  
✅ **Donor Management** – Admins can manage **donor information** and track donations.  
✅ **Search Functionality** – Find donors or requests based on **blood type & location**.  
✅ **Role-Based Access Control** – Ensuring **data privacy** with roles like **Admin, Donor, Volunteer**.  
✅ **Dashboard** – A powerful **admin panel** to track **donations & requests**.  
✅ **Content Management** – Manage **announcements, FAQs, and donation guidelines**.  
✅ **Campaign Support** – Organize **blood donation campaigns** to encourage community participation.  
✅ **Donation History Tracking** – Users can view their **past donations and requests**.  
✅ **Responsive Design** – Fully **mobile-friendly** experience.  

---

## Technologies Used 💻  

The project is built using modern web technologies:  

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Firebase (Authentication, Database)  
- **State Management:** React Query  
- **Payments:** Stripe API (for donations)  
- **Animations:** AOS, Lottie React  

---

## Dependencies 📦  

```json
"dependencies": {
  "@headlessui/react": "^2.2.0",
  "@material-tailwind/react": "^2.1.10",
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.1",
  "aos": "^2.3.4",
  "axios": "^1.7.9",
  "firebase": "^11.1.0",
  "jodit-react": "^4.1.2",
  "lottie-react": "^2.4.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-helmet-async": "^2.0.5",
  "react-hot-toast": "^2.5.1",
  "react-icons": "^5.4.0",
  "react-modal": "^3.16.3",
  "react-router-dom": "^6.28.1",
  "react-simple-typewriter": "^5.0.1",
  "react-slick": "^0.30.3",
  "react-spinners": "^0.15.0",
  "slick-carousel": "^1.8.1",
  "sweetalert2": "^11.15.10"
}
```

---

## Installation Guide 🛠️  

To run the project locally, follow these steps:  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/BloodHope.git
cd BloodHope
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Set Up Firebase  
- Create a **Firebase** project.  
- Enable **Authentication** and **Firestore Database**.  
- Copy your Firebase config and create a `.env` file:  

```sh
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

### 4️⃣ Start the Development Server  
```sh
npm start
```

The app will run at **http://localhost:3000/**.  

---

## Admin Credentials 🔑  

Use the following credentials to log in as an **Admin**:  

- **Email:** mira@mira.com  
- **Password:** Mira12  

⚠️ *Change these credentials after deployment for security reasons.*  

---

🚀 *Feel free to contribute, open issues, and improve the platform!*  

