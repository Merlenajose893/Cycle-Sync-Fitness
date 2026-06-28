🧠 CycleSync – AI-Powered Fitness & Wellness Platform

A full-stack fitness and wellness platform that aligns workouts, nutrition, and lifestyle recommendations with menstrual cycle phases.
Built using the MERN stack with AI-driven personalization to deliver phase-aware health insights and adaptive plans.

🚀 Features
🔐 Authentication & User Profiles
Secure login/signup (JWT-based)
Personalized onboarding (age, weight, goals, cycle details)
🌸 Menstrual Cycle Tracking
Track cycle phases (Menstrual, Follicular, Ovulatory, Luteal)
Predict upcoming phases and adjust recommendations
🏋️ Phase-Based Workout Plans
AI-generated workouts tailored to cycle phase + goals
Strength, HIIT, recovery, and low-intensity variations
🥗 Personalized Nutrition Plans
Diet recommendations aligned with hormonal changes
PCOS-friendly options and dietary preferences
🤖 AI Wellness Coach
Chat-based assistant for:
plan adjustments
quick meal/workout suggestions
habit guidance
📊 Progress Tracking
Weight logs, streak tracking
Basic analytics for consistency and improvement
🧠 Tech Stack

Frontend

React.js
CSS / Tailwind (if used)
Axios

Backend

Node.js
Express.js
Service-Repository Architecture

Database

MongoDB (Mongoose)

AI Integration

OpenAI API (for plan generation & chat)
🏗️ Architecture

The backend follows a Service-Repository pattern for scalability and separation of concerns:

src/
 ├── controllers/   # Request handling
 ├── services/      # Business logic
 ├── repositories/  # DB access layer
 ├── models/        # Mongoose schemas
 ├── routes/        # API routes
 ├── middlewares/   # Auth, validation
 └── utils/         # Helpers (AI, formatting)
⚙️ Installation & Setup
1. Clone the repo
git clone https://github.com/your-username/cyclesync.git
cd cyclesync
2. Install dependencies
npm install
cd client
npm install
3. Setup environment variables

Create a .env file in root:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
OPENAI_API_KEY=your_api_key
4. Run the app
# backend
npm run dev

# frontend
cd client
npm start
🔌 API Overview
Auth
POST /api/auth/signup
POST /api/auth/login
Profile
GET /api/profile
POST /api/profile
Plans
POST /api/plan/workout
POST /api/plan/diet
Chat
POST /api/chat
Progress
POST /api/progress
GET /api/progress
🧪 Sample AI Use Case

The system dynamically generates plans based on:

User profile (age, weight, goal)
Cycle phase
Health conditions (e.g., PCOS)

Example:

During the luteal phase → lower intensity workouts + magnesium-rich foods

📈 Future Improvements
📅 Calendar-based cycle visualization
🔔 Smart reminders & notifications
🧬 Hormone-based deeper insights
📱 Mobile app (React Native)
🧠 Advanced RAG-based health knowledge system
