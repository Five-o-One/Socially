# Socially

Socially is a responsive social-media frontend built with React, TypeScript, and Vite. It includes the core flows you would expect from a small social network: authentication, a post feed, likes, comments, profiles, follows, notifications, and light/dark themes.

The project was created as the final project for Quera’s Frontend Bootcamp. It connects to a remote demonstration API, so data-dependent features require that service to be available.

## What you can do

- Create an account, sign in, restore a session, and sign out
- Browse the home feed and publish or delete posts
- Like posts and add or delete comments
- Open profiles by username or user ID
- View a user’s posts and liked posts
- Follow and unfollow users
- Edit your name, bio, location, and website
- Search for users and browse follow recommendations
- View like, comment, and follow notifications
- Mark notifications as read
- Switch between light and dark themes
- Use the responsive desktop and mobile layouts

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Home feed and post composer |
| `/login` | Sign in |
| `/register` | Create an account |
| `/notifications` | View and manage notifications |
| `/profile/:username` | View a profile by username |
| `/profile/id/:id` | View a profile by user ID |
| `*` | Not-found page |

## Tech stack

- React 19 and React Router
- TypeScript
- Vite
- Tailwind CSS 4
- TanStack Query for server state, caching, and mutations
- Zustand for persisted client preferences such as theme
- Axios for API requests
- React Hook Form for authentication and profile forms
- ESLint, Lucide React, and react-hot-toast

## Run locally

### Prerequisites

- Node.js (a current LTS release is recommended)
- pnpm

### Install

```bash
git clone <repository-url>
cd socially
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Vite prints the local URL, normally `http://localhost:5173`.

### Other commands

```bash
pnpm build    # Type-check and create a production build in dist/
pnpm preview  # Serve the production build locally
pnpm lint     # Run ESLint
```

## Backend

The frontend currently uses the following remote API:

```text
https://socially-nextjs-six.vercel.app
```

The Axios client is defined in [`src/api/base.ts`](src/api/base.ts). Requests include cookies with `withCredentials`, which allows the backend to maintain authenticated sessions.

The API provides endpoints for:

- Authentication and session management
- Posts, likes, and comments
- User lookup, search, recommendations, and profiles
- Following relationships
- Notifications and read status

The API URL is currently hard-coded and there is no separate environment-variable configuration. The service is intended for development and demonstration, and may be unavailable or change without notice.

## Project structure

```text
src/
├── api/          Typed backend request functions
├── assets/       Images and SVG icons
├── components/   Reusable UI components
├── constants/    Shared application configuration
├── hooks/        Query and mutation hooks
├── layout/       Navigation, sidebars, and routed layout
├── lib/          Shared libraries and error handling
├── pages/        Route-level screens
├── store/        Persisted Zustand client state
├── types/        Shared TypeScript contracts
└── utils/        Small reusable utilities
```

The application flow is intentionally layered:

1. Pages and components use hooks from `src/hooks/`.
2. Hooks call the typed request functions in `src/api/`.
3. TanStack Query caches server data and coordinates loading, error, and mutation states.
4. Zustand stores client-only preferences, such as the selected theme.

## License

Socially is available under the [MIT License](LICENSE).

Copyright (c) 2026 Five-o-One.
