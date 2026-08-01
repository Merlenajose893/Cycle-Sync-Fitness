# 🌸 CycleSync – AI-Powered Fitness & Wellness Platform

> **Cycle-aware fitness, nutrition, and wellness powered by AI.**

CycleSync is a full-stack MERN application that delivers **personalized workout plans, nutrition guidance, and wellness recommendations** based on a user's **menstrual cycle phase**, fitness goals, and health profile.

Unlike traditional fitness apps, CycleSync adapts recommendations throughout the menstrual cycle, helping users train smarter, recover better, and maintain consistency with AI-generated, phase-aware guidance.

---

## ✨ Features

### 🔐 Secure Authentication
- JWT-based authentication
- User registration and login
- Protected routes
- Secure password hashing

---

### 👤 Personalized User Profiles
Create a profile with:

- Age
- Height & Weight
- Fitness goals
- Activity level
- Menstrual cycle details
- Dietary preferences
- Health conditions (e.g., PCOS)

---

### 🌸 Menstrual Cycle Tracking

Track and predict menstrual cycle phases:

- 🩸 Menstrual
- 🌱 Follicular
- 🌼 Ovulatory
- 🌙 Luteal

The application automatically adjusts recommendations according to the current phase.

---

### 🏋️ AI-Powered Workout Plans

Generate personalized workout plans based on:

- Current cycle phase
- Fitness goals
- Experience level
- Activity preferences

Examples include:

- Strength Training
- HIIT
- Cardio
- Recovery Sessions
- Yoga & Mobility
- Low-Impact Workouts

---

### 🥗 Personalized Nutrition Plans

Receive AI-generated meal recommendations tailored to:

- Hormonal changes
- Cycle phase
- Fitness goals
- Dietary preferences
- PCOS-friendly nutrition

Suggestions include:

- Daily meals
- Macronutrient balance
- Recovery nutrition
- Hydration guidance

---

### 🤖 AI Wellness Coach

Built using the OpenAI API.

The assistant can help users:

- Modify workout plans
- Suggest healthy meals
- Answer wellness questions
- Recommend recovery strategies
- Build healthy habits
- Provide motivation and guidance

---

### 📊 Progress Tracking

Monitor personal progress through:

- Weight logs
- Workout consistency
- Streak tracking
- Overall progress analytics

---

## 🧠 How It Works

```
User Profile
      │
      ▼
Cycle Phase Detection
      │
      ▼
AI Recommendation Engine
      │
      ├── Workout Plan
      ├── Nutrition Plan
      └── Wellness Guidance
      │
      ▼
Progress Tracking
```

---

# 🛠 Tech Stack

## Frontend

- React.js
- Axios
- CSS
- Tailwind CSS *(optional)*

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- Service–Repository Architecture

---

## Database

- MongoDB
- Mongoose

---

## AI

- OpenAI API
- AI-powered workout generation
- AI nutrition planning
- AI wellness chat assistant

---

# 🏗 Project Architecture

The backend follows a **Service–Repository Architecture** to maintain clean separation between business logic and database operations.

```
src/
│
├── controllers/      # Handles incoming requests
├── services/         # Business logic
├── repositories/     # Database layer
├── models/           # Mongoose schemas
├── routes/           # API endpoints
├── middlewares/      # Authentication & validation
├── utils/            # AI helpers & utilities
└── server.js
```

---

# 📂 Project Structure

```
CycleSync/
│
├── client/                # React Frontend
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── app.js
│   │
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/cyclesync.git

cd cyclesync
```

---

## 2. Install Backend Dependencies

```bash
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd client

npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OPENAI_API_KEY=your_openai_api_key
```

---

## 5. Start the Backend

```bash
npm run dev
```

---

## 6. Start the Frontend

```bash
cd client

npm start
```

---

# 🔌 REST API

## Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | User login |

---

## User Profile

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/api/profile` | Get profile |
| POST | `/api/profile` | Create/Update profile |

---

## Workout Plans

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/plan/workout` | Generate workout plan |

---

## Nutrition Plans

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/plan/diet` | Generate diet plan |

---

## AI Coach

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/chat` | AI wellness assistant |

---

## Progress

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/progress` | Add progress log |
| GET | `/api/progress` | View progress history |

---

# 🤖 AI Personalization

CycleSync generates recommendations using:

- User profile
- Current menstrual phase
- Fitness goals
- Health conditions (e.g., PCOS)
- Activity level
- Dietary preferences

### Example

| Cycle Phase | AI Recommendation |
|-------------|-------------------|
| 🩸 Menstrual | Gentle yoga, stretching, iron-rich foods |
| 🌱 Follicular | Strength training, high-protein meals |
| 🌼 Ovulatory | HIIT, intense workouts, balanced nutrition |
| 🌙 Luteal | Recovery workouts, magnesium-rich foods, hydration |

---

# 📊 Core Modules

- ✅ Authentication
- ✅ User Profiles
- ✅ Cycle Tracking
- ✅ Workout Recommendation Engine
- ✅ Nutrition Recommendation Engine
- ✅ AI Wellness Chat
- ✅ Progress Tracking

---

# 🔒 Security

- JWT Authentication
- Password Hashing
- Protected Routes
- Environment Variables
- MongoDB Validation
- Error Handling Middleware

---

# 📈 Future Enhancements

- 📅 Interactive menstrual calendar
- 📱 React Native mobile application
- 🔔 Smart notifications & reminders
- 🧬 Hormonal trend analysis
- 📊 Advanced analytics dashboard
- 📈 Wearable device integration
- ❤️ Apple Health & Google Fit sync
- 🧠 Retrieval-Augmented Generation (RAG) health knowledge system
- 🌍 Multi-language support

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push the branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Your Name**

- GitHub: https://github.com/your-username
- LinkedIn: https://linkedin.com/in/your-profile

---

## ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub!

It helps others discover the project and supports future development.

---

<p align="center">
  <b>🌸 Train Smarter • Eat Better • Live in Sync with Your Cycle 🌸</b>
</p>
