# 🍽️ TinderFood Frontend – Social Recipe Discovery App

**TinderFood Frontend** is a modern React application that powers the user interface for our social recipe discovery platform. Built with cutting-edge technologies, it delivers a seamless, responsive experience for food lovers to discover recipes, connect with friends, and explore culinary adventures.

---

## 🌟 Features

### 🎨 User Interface

- **Modern Design System**:

  - Clean, intuitive interface built with Tailwind CSS
  - Shadcn UI components for consistency
  - Fully responsive design across all devices

- **Recipe Discovery**:
  - Infinite scroll recipe feed
  - Advanced search and filtering
  - Recipe detail views with nutritional information
  - Save/unsave recipes with visual feedback
  - Interactive recipe card

### 🔐 Authentication UI

- **Secure Login/Register**:
  - Modern authentication forms
  - Real-time form validation
  - JWT token management
  - Protected route handling
  - User profile management interface

### 🧑‍🤝‍🧑 Social Features

- **User Profiles**:

  - View and edit personal profiles
  - Browse other users' saved recipes
  - Friend management system
  - Profile customization options

- **Real-time Chat**:
  - Live messaging interface
  - WebSocket-powered real-time updates
  - Chat history and message status
  - Real time notifications

### 🤖 AI Integration

- **Smart Cooking Assistant**:
  - Interactive chat interface for AI queries
  - Nutritional analysis display
  - Cooking tips and guidance

---

## 🛠️ Tech Stack

### 🔧 Backend

- Node.js + Express
- MongoDB + Mongoose (for database)
- JWT (authentication & session)
- WebSocket (Socket.io) (real-time chat)
- Spoonacular API (recipe data & nutritional info)

### 🎨 Frontend

- React + TypeScript
- Tailwind CSS + Shadcn UI
- React Hot Toast
- Context API & Redux Toolkit - Global state management
- React Query (for data fetching)
- Responsive Design for all devices

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Backend server running (see backend README)
  > 🔗 **Backend Repository**: [TinderFood Backend](https://github.com/47anjan/tiderfood-api)

### 1. Clone the Repository

```bash
git clone https://github.com/47anjan/tinderfood.git
cd tinderfood/frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the frontend directory:

```env
OPENAI_API_KEY=
NEXT_PUBLIC_API_BASE_URL://localhost:5000
NEXT_PUBLIC_API_KEY=your_spoonacular_key
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
# or
yarn build
```

---

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow coding standards and run linting
4. Write tests for new features
5. Commit changes: `git commit -m 'feat: add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Standards

- Use TypeScript for all new code
- Follow React best practices
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed

---

## 📜 Demo

### Home

![Alt text](/public/demo/app1.png)

### Home with notification

![Alt text](/public/demo/app2.png)

### Recipe details page

![Alt text](/public/demo/app3.png)

### Chat with recipe

![Alt text](/public/demo/app4.png)

### Profile page (dashboard)

![Alt text](/public/demo/app5.png)

### cooking preference page (dashboard)

![Alt text](/public/demo/app6.png)

### Connections page (dashboard)

![Alt text](/public/demo/app7.png)

### View profile (dashboard)

![Alt text](/public/demo/app8.png)

### Chat page

![Alt text](/public/demo/app9.png)

---

## 📄 License

MIT License – see [LICENSE](../LICENSE) for details.

---

## 📧 Support

Need help or have questions?

- **Email**: [anjankarmakar15@gmail.com](mailto:anjankarmakar15@gmail.com)
- **Issues**: [GitHub Issues](https://github.com/47anjan/tinderfood/issues)

---

**🍜 Happy Cooking, Happy Coding!**
_Building delicious user experiences – TinderFood Frontend_
