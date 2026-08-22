# ProofLoop

> Turn your goals into measurable experiments. Track your progress. Prove your work.

ProofLoop is a full-stack experiment tracking platform that helps users turn personal goals into measurable experiments and track their progress through daily evidence.

Instead of simply recording whether a task was completed, ProofLoop allows users to upload proof of their practice and uses AI to analyze whether the submitted evidence supports the activity they claimed.

---

## 🚀 Why ProofLoop?

When people work toward long-term goals, it is easy to lose track of consistency and progress.

Traditional productivity applications usually answer:

> "Did you complete today's task?"

ProofLoop goes one step further:

> "Can you provide evidence that you actually practiced, and does that evidence support what you claimed?"

The goal is to make progress more measurable, observable and honest.

---

## ✨ Features

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- Protected API routes
- User-specific experiments and activity data

### 🧪 Experiment Tracking

Users can create experiments around measurable goals.

Each experiment contains information such as:

- Goal
- Baseline
- Prediction
- Target
- Duration
- Target unit
- Experiment status

### 📝 Daily Logs

Users can record their daily practice and progress.

Daily logs can contain:

- Activity performed
- Duration
- Date
- Uploaded evidence
- Additional information about the practice

### 🤖 AI-Powered Proof Verification

ProofLoop uses AI to analyze uploaded evidence.

The verification process considers whether the submitted proof is consistent with:

- The claimed activity
- The recorded duration
- The expected evidence

The system then produces a verification result that can be used as part of the experiment's progress tracking.

### 📊 Progress & Insights

ProofLoop calculates useful experiment metrics including:

- Current score
- Improvement
- Average improvement
- Prediction progress
- Remaining days
- Projected score
- Performance trajectory

The system can classify the current trajectory as:

- Ahead
- On track
- Behind

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB
- Mongoose

### Authentication

- JWT
- Protected middleware

### AI

- Gemini API

### File Handling

- Multer

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │                     │
                    │  Dashboard          │
                    │  Experiments        │
                    │  Daily Logs         │
                    │  Insights            │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │    Express Server   │
                    │                     │
                    │  Routes             │
                    │  Controllers        │
                    │  Middleware         │
                    │  Services           │
                    └───────┬─────┬───────┘
                            │     │
                  ┌─────────┘     └──────────┐
                  ▼                          ▼
          ┌───────────────┐          ┌────────────────┐
          │    MongoDB    │          │   Gemini AI    │
          │               │          │                │
          │ Users         │          │ Proof analysis │
          │ Experiments   │          │ Verification   │
          │ Daily Logs    │          │                │
          └───────────────┘          └────────────────┘
```
