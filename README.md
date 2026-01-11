# TeamConnect

TeamConnect is a professional, high-performance communication and operational intelligence platform built with the latest web technologies. It features real-time chat, a comprehensive analytics dashboard, and seamless authentication.

## 🚀 Teck Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Class-based Dark Mode)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Backend Service**: [Firebase](https://firebase.google.com/) (Authentication & Realtime Database)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Persistence**: [Redux Persist](https://github.com/rt2zz/redux-persist)

## ✨ Key Features

- **Real-time Private Messaging**: Instant, secure communication between registered users using Firebase Realtime Database.
- **Operational Dashboard**: A centralized view of system analytics, user activities, and live metrics.
- **Dynamic User Discovery**: Automatic synchronization of registered users into the chat contact list.
- **Responsive & Premium UI**: A mobile-first, high-conversion design with professional typography and smooth transitions.
- **Advanced Dark Mode**: Fully integrated theme system that respects system preferences and persists user choices.
- **Optimized Data Fetching**: Utilizes RTK Query for efficient client-side caching and synchronization.

## 🏗️ Architectural Decisions

### Why Next.js App Router (No `getServerSideProps`)?
TeamConnect utilizes the latest **Next.js 15 App Router** architecture. 
- **Server Components**: We no longer use `getServerSideProps` as data fetching is handled directly within Server Components. This reduces client-side JavaScript and improves performance.
- **Streaming**: Supports Suspense-based streaming for dashboard components, providing a faster initial page load.

### Why Firebase instead of Socket.io?
We selected **Firebase Realtime Database** for our messaging engine for several key reasons:
- **Serverless Architecture**: Unlike Socket.io, which requires a dedicated, always-on Node.js server to manage WebSockets, Firebase is completely serverless.
- **Real-time Sync**: Firebase provides industry-standard mobile/web synchronization out of the box, handling offline states and reconnection automatically.
- **Scalability**: Firebase scales effortlessly without the need for manual load balancing or Redis adapters required by Socket.io in production.

## 📂 Project Structure

- `/app`: Contains the main application routes (Dashboard, Chat, Call, Login/Signup) using the App Router.
- `/components`:
    - `/layout`: Global navigation elements (Sidebar, MobileHeader).
    - `/chat`: Real-time messaging interface.
    - `/dashboard`: Analytics cards, tables, and sync indicators.
- `/context`: React Context providers for Authentication and Chat state.
- `/store`: Redux Toolkit store configuration, slices, and RTK Query API definitions.
- `/services`: Centralized API service layers for data fetching.
- `/lib`: Helper utilities and Firebase configuration.

## 🛠️ Getting Started

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## 📄 License

This project is private and intended for internal use.
