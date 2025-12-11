# FreshForks

FreshForks is a web-based application that allows users to discover, share, and review healthy meals and recipes. The platform encourages nutritious cooking by making it easy to browse meals, view full recipes, and interact with other users through ratings and comments.

In addition to user-submitted meals, FreshForks includes Maria the Mealbot, an AI-powered chatbot that provides meal and recipe suggestions to help users find new food ideas.

---

## Features

- User registration and login with secure password hashing
- View a list of all available meals
- View detailed meal pages including ingredients, recipes, and ratings
- Rate and comment on meals 
- Add new meals 
- Search meals 
- AI chatbot (Maria the MealBot) for meal recommendations

---

## Technologies Used

- **Node.js** and **Express** – server-side application logic
- **EJS** – templating engine for dynamic pages
- **MySQL** – relational database for users, meals, and ratings
- **bcrypt** – password hashing
- **express-session** – session management and authentication
- **Axios** – API requests to OpenAI
- **OpenAI API** – AI-powered meal recommendation chatbot
- **HTML & CSS** – frontend structure and styling

---

## Database Structure

The application uses three main tables:
- `users` – stores user account information
- `meals` – stores meal and recipe data
- `ratings` – links users to meals with ratings and optional comments

---

