# Socially

Socially is a responsive social media frontend built with React and TypeScript. It provides a focused social experience for publishing posts, interacting with other users, managing profiles, and receiving notifications.

This project was developed as the final project of Quera's Frontend Bootcamp. It includes both the interface and the application behavior connected to a remote backend.

## Features

### Authentication

- Register a new account
- Sign in and sign out
- Restore the current session on page load
- Display authenticated and guest navigation states

### Posts and interactions

- Browse posts in the home feed
- Create and delete posts
- Like and unlike posts
- Add and delete comments
- Update feed, profile, and interaction data through cached queries

### Profiles and users

- View profiles by username or user ID
- View a user's posts
- View posts liked by a user
- Follow and unfollow users
- Edit the current user's name, bio, location, and website
- Browse recommended users

### Notifications and interface

- View like, comment, and follow notifications
- Mark unread notifications as read
- Switch between light and dark themes
- Use responsive desktop and mobile navigation
- Show loading, error, empty, confirmation, and fallback states

## Application Routes

| Route                | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `/`                  | Home feed with posts and authenticated post creation |
| `/login`             | Login form for existing users                        |
| `/register`          | Registration form for new users                      |
| `/notifications`     | Notifications for the current user                   |
| `/profile/:username` | Profile page loaded by username                      |
| `/profile/id/:id`    | Profile page loaded by user ID                       |
| `*`                  | Not-found page for unknown routes                    |

## Tech Stack

### Core

- **React 19** - UI library
- **TypeScript** - Static typing
- **Vite** - Development server and production build tool
- **React Router** - Client-side routing
- **Tailwind CSS v4** - Styling and design utilities

### State and data

- **TanStack Query** - Server-state fetching, caching, mutations, and optimistic updates
- **Zustand** - Client-side theme and follow state
- **Axios** - HTTP requests to the backend

### Form and interface utilities

- **React Hook Form** - Login, registration, and profile forms
- **Lucide React** - Icon library included in the project dependencies
- **react-hot-toast** - User feedback notifications
- **ESLint** - Code quality checks

## Getting Started

### Requirements

- Node.js with a recent LTS version
- pnpm

### Installation

```bash
git clone <repository-url>
cd socially
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Vite will print the local development URL in the terminal, usually `http://localhost:5173`.

### Create a production build

```bash
pnpm build
```

This command runs the TypeScript project build and creates the optimized Vite output in `dist/`.

### Preview the production build

```bash
pnpm preview
```

### Run lint checks

```bash
pnpm lint
```

## Backend API

Socially currently uses an experimental remote backend:

```text
https://socially-nextjs-six.vercel.app
```

The frontend communicates with this service through the shared Axios client in `src/api/base.ts`. Requests use cookies through `withCredentials`, so authentication depends on the remote service and its session configuration.

The API currently supports these areas:

| Area           | Operations                                              |
| -------------- | ------------------------------------------------------- |
| Authentication | Login, registration, session lookup, logout             |
| Posts          | List, create, like/unlike, delete                       |
| Comments       | Create and delete comments                              |
| Users          | Find profiles, recommendations, user posts, liked posts |
| Relationships  | Follow and unfollow users                               |
| Profiles       | Update profile information                              |
| Notifications  | List notifications and mark them as read                |

This backend is used for development and demonstration purposes. It may change, become unavailable, or return different data without notice. The frontend does not currently expose a separate environment-variable configuration for changing the API base URL.

## Project Structure

```text
src/
├── api/          Backend request functions grouped by feature and HTTP method
├── assets/       Static application assets and SVG icons
├── components/   Reusable UI components
├── constants/    Shared notification and modal configuration
├── hooks/        Query and mutation hooks for application behavior
├── layout/       Shared navigation, sidebars, and routed page structure
├── lib/          Shared library configuration, including the QueryClient
├── pages/        Route-level screens
├── store/        Zustand client state
└── types/        Shared TypeScript models and API contracts
```

The `src/README.md` file contains a short explanation of the source directory structure.

## Data Flow

1. Pages and components call custom hooks from `src/hooks/`.
2. Hooks call the typed request functions in `src/api/`.
3. API functions use the shared Axios client and return typed responses.
4. TanStack Query stores server data and manages loading and error states.
5. Mutations update or invalidate related queries; several post, like, follow, comment, and notification actions use optimistic updates.
6. Zustand stores client-only preferences and follow information that should remain available between sessions.

## Project Status

The project provides a working frontend for the main social media flows. Because it relies on an experimental remote backend, the availability and exact behavior of data-dependent features are not guaranteed outside the development environment.

## License

Socially is released under the [MIT License](LICENSE).

Copyright (c) 2026 Five-o-One.
