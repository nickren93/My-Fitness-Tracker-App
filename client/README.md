# My Fitness Tracker

A full-stack fitness tracking application built with React (frontend) and Flask (backend).
Users can create accounts, log workouts, and track progress over time.

---

## 🚀 Features

- **User Authentication**:  
  - Signup, Login, and Logout with session management.  
  - Passwords hashed securely with **Flask-Bcrypt**.  

- **Workouts**:  
  - Browse available workouts.  
  - Select workouts when creating logs.  

- **Logs**:  
  - Record personal workout logs with notes and dates.  
  - View your history of logged workouts.  

- **Frontend**:  
  - Built with **React 18** and **React Router v7**.  
  - Form validation using **Formik** + **Yup**.  
  - Conditional navigation and protected routes.  

- **Backend**:  
  - REST API with **Flask-RESTful**.  
  - Database models with **Flask-SQLAlchemy**.  
  - Database migrations using **Flask-Migrate**.  
  - CORS support with **Flask-CORS**.  

---

## 🛠️ Tech Stack

**Frontend**  
- React 18  
- React Router DOM v7  
- Formik + Yup  
- Create React App (CRA)  

**Backend**  
- Flask  
- Flask-SQLAlchemy  
- Flask-Migrate  
- Flask-RESTful  
- Flask-Bcrypt  
- Flask-CORS  
- Faker (for seed data)  

**Database**  
- SQLite (default, can swap for PostgreSQL/MySQL)  

---

## 📂 Project Structure

my-fitness-tracker/
├── client/ # React frontend
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── components/ # React components (NavBar, LoginForm, Home, etc.)
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
├── server/ # Flask backend
│ ├── app.py # Flask entrypoint
│ ├── models.py # SQLAlchemy models (User, Workout, Log)
│ ├── migrations/ # Flask-Migrate migration files
│ └── Pipfile
│
└── README.md

---

## ⚙️ Setup & Installation

### Frontend (React)
1. Navigate to the frontend folder: 
   cd client

2. Install dependencies:  
   npm install

3. Run database migrations:  
   flask db upgrade

3. Start the Flask server:  
   npm start

### Backend (Flask)
1. Navigate to the backend folder:  
   ```bash
   cd server

2. Install dependencies:  
   pipenv install
   pipenv shell

3. Run database migrations:  
   flask db upgrade

   note: The frontend runs on http://localhost:3000 and proxies API requests to the Flask backend on http://localhost:5555.

---

## 🔑 API Endpoints

### GET /check_session → check if user is logged in

### POST /login → log in user

### DELETE /logout → log out user

### POST /signup → create new user

### GET /workouts → get all workouts

### GET /logs → get user logs

### POST /logs → create new log

---

##  📝 Example Usage

1. Sign Up / Login → create account or log in

2. Create a Log → choose a workout, add notes & date

3. View Logs → see list of your past logs

---

## 📌 Future Improvements

1. Add workout categories (e.g., cardio, strength).

2. Track sets, reps, and weights.

3. Add charts to visualize progress.

4. Deploy to cloud (Heroku/Render for backend + Netlify/Vercel for frontend).

---

## 👨‍💻 Author

### Developed by Nick Ren ✨

































In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
