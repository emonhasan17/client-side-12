# 💉 Blood Donation Website

A responsive web application to help users find blood donors by blood group and location.  
Built with **React** and **Tailwind CSS** for a modern, mobile-friendly interface.

---

## 🌐 Live Demo
🔗 [View Live Demo](https://pulse-link-5be7a.web.app)

---


---

## 🛠 Technologies Used

<p>
  <img src="https://skillicons.dev/icons?i=react,tailwind" alt="React, Tailwind CSS" />
</p>

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express, MongoDB  
- **Middleware:** CORS for API security and cross-origin requests  
---

## Dependencies
- React 
- Express 
- MongoDB Driver  
- Firebase SDK  
- Axios  
- React Router DOM  
- Tailwind CSS  

## ✨ Features

- Search donors by blood group and location (district, upazila)  
- Dynamic filtering of donors  
- Responsive design for mobile and desktop  
- RESTful API backend with Node.js and Express  
- Data stored securely in MongoDB  
- CORS enabled for secure cross-origin requests  
---

## Getting Started

Follow these steps to run the project locally:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/food-sharing-website.git
    cd food-sharing-website
    ```

2. **Install dependencies for client and server:**
    ```bash
    cd client
    npm install

    cd ../server
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the `/server` folder and add:
    ```
    MONGO_URI=your_mongodb_connection_string
    FIREBASE_API_KEY=your_firebase_api_key
    ...
    ```

4. **Run the backend server:**
    ```bash
    cd server
    npm start
    ```

5. **Run the frontend client:**
    ```bash
    cd ../client
    npm start
    ```

6. **Open the browser and go to:**
    ```
    http://localhost:3000
    ```
