# 🍽️ TinderFood – Social Recipe Discovery App

**TinderFood** is a next-gen, AI-powered recipe and social networking platform built for food lovers. Discover new recipes, connect with fellow foodies, save your favorites, and chat with friends—all in one place.

Whether you're a home cook, foodie, or culinary adventurer, TinderFood personalizes your experience and brings the joy of cooking into your daily life.

---

## 🌟 Features

### 🔥 Core Features

- **User Authentication**:

  - Secure login and registration using JWT
  - Token-based session management
  - Profile management and customization

- **Personalized Recipe Discovery**:

  - Explore thousands of global recipes
  - Save favorite recipes to your profile
  - View detailed nutritional information
  - Infinite scroll for seamless browsing

- **AI Cooking Assistant**:

  - Ask questions about ingredients or methods
  - Suggest substitutions and alternatives
  - Convert measurements and optimize cooking time

### 🧑‍🤝‍🧑 Social Features

- **Foodie Network**:

  - Find and connect with other food lovers
  - View other users’ profiles and saved recipes
  - Add friends and expand your foodie circle

- **Real-time Chat**:

  - Built-in live messaging system using WebSockets
  - Chat with your foodie friends about recipes, tips, or anything else

---

## 🛠️ Tech Stack

### 🔧 Backend

- **Node.js + Express**
- **MongoDB + Mongoose** (for database)
- **JWT** (authentication & session)
- **WebSocket (Socket.io)** (real-time chat)
- **Spoonacular API** (recipe data & nutritional info)

### 🎨 Frontend

- **React + TypeScript**
- **Tailwind CSS + Shadcn UI**
- **React Hot Toast** (notifications)
- **React Query** (for data fetching)
- **Responsive Design** for all devices

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/47anjan/tinderfood.git
cd tinderfood
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root and add:

```env
OPENAI_API_KEY=openai_key
NEXT_PUBLIC_API_BASE_URL=backend_url
NEXT_PUBLIC_API_KEY==your_spoonacular_key
```

### 4. Start Development Server

```bash
npm run dev
```

Frontend will run at `http://localhost:3000`
Backend will run at `http://localhost:5000`

---

## 💬 Example AI Prompts

- “Suggest a vegetarian alternative for this recipe”
- “What can I use instead of cream?”
- “How many calories does this meal have?”
- “Which recipes match my dietary preference?”

---

## 🔐 Authentication Flow

- JWT-based signup/login
- Secure password handling
- Authenticated routes with middleware
- Role-based access control (if applicable)

---

## 👥 Social & Messaging Features

- Discover and view other foodie profiles
- Send and accept friend requests
- Real-time chat system powered by WebSockets
- Share and discuss favorite recipes

---

## 🤝 Contributing

We welcome all contributions!

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License – see [LICENSE](LICENSE) for more info.

---

## 📧 Contact

Got feedback or ideas? Reach out at:
**[anjankarmakar15@gmail.com](mailto:anjankarmakar15@gmail.com)**

---

**Happy Cooking. Happy Connecting. 🍜**
_Where Recipes Meet Friendships – TinderFood_
