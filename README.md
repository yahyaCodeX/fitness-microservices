Since your project is now a complete, modern full-stack application featuring a **Neon Dark UI**, **AI-driven recommendations**, and **Microservices architecture**, your README should reflect that technical depth.

Here is a professional, well-structured `README.md` text you can copy and paste into your GitHub repository.

---

# ⚡ AI-Powered Fitness Tracker (Microservices)

A high-performance, full-stack fitness tracking application featuring a **Neon Dark UI** and **AI-driven performance analysis**. This project utilizes a microservices architecture to manage user activities and generate personalized health recommendations.

## 🚀 Key Features

* **Modern Neon UI**: An attractive, high-energy dark mode interface built with React and Material UI.
* **AI Performance Analysis**: Integration with AI services to provide feedback on duration, heart rate, and caloric efficiency.
* **Advanced Metrics**: Track specific data points like **Distance (km)**, **Heart Rate (bpm)**, and **Steps**.
* **Secure Authentication**: OAuth2 with PKCE flow integrated via Keycloak for robust security.
* **Microservices Architecture**: Separate services for Activity management and AI Recommendations, communicating through a unified Gateway.
* **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile viewing.

## 🛠️ Technology Stack

### Frontend

* **React 18** (Vite)
* **Material UI (MUI) v7**
* **React Router DOM v7**
* **Axios** (with interceptors for X-User-ID headers)

### Backend

* **Spring Boot 3**
* **Spring Security & OAuth2**
* **MongoDB** (Activity Service)
* **PostgreSQL** (Recommendation Service)
* **OpenAI/Gemini API** (AI Logic)

## 📦 Project Structure

```text
fitness-microservices/
├── fitness-frontend/       # React (Vite) + MUI Neon UI
├── activity-service/       # Spring Boot + MongoDB (Port 8083)
├── recommendation-service/ # Spring Boot + PostgreSQL (Port 8084)
└── api-gateway/            # Unified entry point

```

## ⚙️ Setup Instructions

### 1. Prerequisites

* Node.js (v18+)
* Java JDK 17+
* Docker (for Keycloak & Databases)

### 2. Frontend Setup

```bash
cd fitness-frontend
npm install
npm run dev

```

### 3. Backend Setup

* Ensure MongoDB and PostgreSQL are running.
* Configure `application.yml` in both services with your database credentials and AI API keys.
* Run each service using `./mvnw spring-boot:run`.

## 🔒 Authentication Configuration

The app uses **Keycloak** for Identity Management. Update your `authConfig.js` with your specific Realm settings:

```javascript
export const authConfig = {
    clientId: 'oauth2-pkce-client',
    authorizationEndpoint: 'http://localhost:8085/realms/fitness-app/...',
    tokenEndpoint: 'http://localhost:8085/realms/fitness-app/...',
    redirectUri: 'http://localhost:5173',
    scope: 'openid profile email offline_access',
};

```

---

## 📸 Screenshots

| Dashboard (Neon Dark) | AI Analysis Details |
| --- | --- |
| ![Dashboard] | ![Details] |

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any UI improvements or backend optimizations.

---

**Would you like me to generate a `LICENSE` file for you as well (e.g., MIT License) to include in your repository?**
