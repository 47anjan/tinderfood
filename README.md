# 🍔 TinderFood API – Backend for Social Recipe Discovery

**TinderFood API** is the robust backend service powering the TinderFood application—a next-gen, AI-powered recipe and social networking platform built for food lovers. This API handles user authentication, recipe management, social connections, and real-time chat functionality.

Whether you're building the frontend or integrating with our services, this API provides everything needed to create personalized culinary experiences and bring food enthusiasts together.

---

## 🌟 Features

### 🔥 Core API Features

- **User Authentication**:

  - Secure JWT-based login and registration
  - Token-based session management with HTTP-only cookies
  - Profile management and customization endpoints

- **Recipe Management**:

  - Save and retrieve favorite recipes
  - Recipe metadata storage and retrieval
  - User-specific recipe collections

- **AI Integration Ready**:
  - Structured endpoints for AI cooking assistant integration
  - User preference data for personalized recommendations
  - Dietary restriction and cuisine preference handling

### 🧑‍🤝‍🧑 Social API Features

- **Foodie Network**:

  - User discovery with advanced filtering
  - Connection request system (interested/accepted flow)
  - Friend management and social graph APIs

- **Real-time Chat**:
  - WebSocket-powered messaging system
  - Real-time notifications and typing indicators
  - Chat history persistence and retrieval

---

## 🛠️ Tech Stack

### 🔧 Backend Architecture

> 🔗 **Backend Repository**: [TinderFood Backend](https://github.com/47anjan/tiderfood-api)

- **Node.js + Express.js** (REST API framework)
- **MongoDB + Mongoose** (database & ODM)
- **JWT** (authentication & authorization)
- **Socket.io** (real-time WebSocket communication)
- **bcrypt** (password hashing & security)
- **CORS** (cross-origin resource sharing)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/47anjan/tinderfood-api.git
cd tinderfood-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root and add:

```env
PORT=5000
DB_CONNECTION=your_mongodb_connection_string
JTW_SECRET=your_super_secret_jwt_key
```

### 4. Start Development Server

```bash
node src/app.js
```

API will run at `http://localhost:5000`

---

## 🤝 Contributing

We welcome all contributions to make TinderFood API even better!

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/amazing-api-feature`
3. Commit your changes: `git commit -m 'Add amazing API feature'`
4. Push to branch: `git push origin feature/amazing-api-feature`
5. Open a Pull Request

---

## 📄 License

ISC License – see [LICENSE](LICENSE) for more info.

---

## 📧 Contact

Got feedback or ideas? Reach out at:
**[anjankarmakar15@gmail.com](mailto:anjankarmakar15@gmail.com)**

---

**Powering Culinary Connections. Enabling Food Discovery. 🍜**
_The Backend That Brings Food Lovers Together – TinderFood API_
