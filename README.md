# Fit Freak

A modern fitness tracking platform built with the PRRTTS stack:
- **P**ostgreSQL for database
- **R**ust for desktop backend
- **R**eact (Next.js) for frontend
- **T**ypeScript for type safety
- **T**auri for desktop app
- **E**xpress.js for backend
- **S**equelize for ORM

[Live Demo](https://fit-freak.vercel.app)

## Platforms
- 🌐 Web application
- 🖥️ Desktop app (Windows, macOS, Linux)
- 📱 Android app (coming soon)

## Project Structure

This is a monorepo containing multiple applications:

```
.
├── apps/
│   ├── web/                    # Next.js web application
│   │   ├── app/               # App router pages
│   │   ├── components/        # Shared React components
│   │   └── lib/               # Utility functions and configs
│   │
│   ├── Mobile-Desktop/        # Tauri desktop application
│   │   ├── src-tauri/        # Rust-based backend
│   │   │   ├── src/          # Rust source code
│   │   │   └── tauri.conf.json # Tauri configuration
│   │   └── src/              # Frontend Next.js code
│   │
│   └── landing/              # Marketing website
│
├── server/                    # Express.js backend server
│   ├── controllers/          # Request handlers
│   ├── models/              # Sequelize models
│   ├── routes/              # API routes
│   └── services/            # Business logic
│
└── package.json             # Workspace configuration
```

## Features

- 🏃‍♂️ Activity tracking and monitoring
- 📊 Detailed fitness analytics and progress visualization
- 🎯 Goal setting and achievement tracking
- 👤 Personalized user onboarding
- 🔄 Cross-platform synchronization
- 🌙 Dark mode interface
- 🖥️ Native performance with Tauri
- 🔒 Secure authentication with JWT

## Tech Stack

### Frontend
- Next.js 13+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React Server Components
- Lucide icons

### Backend
- Express.js server
- PostgreSQL database
- Sequelize ORM
- JWT authentication
- REST API

### Desktop
- Tauri (Rust)
- Native OS integration
- Shared web components
- IPC communication

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Rust (for Tauri development)
- PostgreSQL
- yarn or npm
- Git
- [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/animeshchaudhri/fit-freak.git
cd fit-freak
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp apps/web/.env.example apps/web/.env
cp server/.env.example server/.env
```

4. Start the development servers:

```bash
# Start the web application
yarn web:dev

# Start the Tauri desktop application
cd apps/Mobile-Desktop
yarn tauri dev

# Start the backend server
yarn server:dev
```

## Building for Production

### Web App
```bash
cd apps/web
yarn build
```

### Desktop App
```bash
cd apps/Mobile-Desktop
yarn tauri build
```

This will create:
- Windows: `.msi` and `.exe` installers
- macOS: `.dmg` and `.app`
- Linux: `.AppImage`, `.deb`, and `.rpm`

## Authentication Flow

1. Users can sign up or log in
2. New users complete an onboarding process
3. Authentication state is managed via JWT tokens
4. Protected routes require valid authentication

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with the PRRTTS stack
- Cross-platform compatibility
- Modern development practices