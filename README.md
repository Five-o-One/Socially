# Socially

A social media frontend project built as the final project of a frontend bootcamp.

Socially is inspired by platforms such as X and focuses on building a professional, responsive, data-driven social media experience. The project is divided into two phases: first, implementing the UI from the provided design; second, connecting that UI to a real backend API and implementing application behavior.

## Features

### Authentication

* User registration
* User login
* User logout
* Session handling
* Authentication-aware application flow

### Posts

* View posts in the feed
* Create posts
* Delete posts
* Like / unlike posts
* Comment on posts

### Users

* View user profiles
* View a user's posts
* View posts liked by a user
* Follow / unfollow users
* Update user profile
* Discover recommended users

### Notifications

* View notifications
* Mark notifications as read

### UI / UX

* Responsive layouts
* Light and dark themes
* Reusable UI components
* Loading states
* Error states
* Empty states
* Confirmation modals
* User information modals
* Skeleton/spinner states where appropriate

---

## Pages

The project requires the following primary pages:

| Page          | Description                        |
| ------------- | ---------------------------------- |
| Login         | Authenticate an existing user      |
| Register      | Create a new account               |
| Home / Feed   | Display posts from users           |
| Notifications | Display user notifications         |
| Profile       | Display user information and posts |

Additional UI components and flows support interactions such as comments, following users, editing profiles, and confirmation dialogs.

---

## Tech Stack

### Core

* **React 19**
* **TypeScript**
* **Vite**
* **React Router**
* **Tailwind CSS**

### State & Data

* **TanStack Query / React Query** — server state and API data
* **Zustand** — client/application state

### UI & Utilities

* **react-hot-toast** — toast notifications
* **Tailwind CSS v4** — styling
* **ESLint** — code quality

The current project uses React Router for routing and does **not** use TanStack Router.

---

## Getting Started

### Prerequisites

Make sure you have a recent version of Node.js installed.

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd socially
npm install
```

### Development

Start the Vite development server:

```bash
npm run dev
```

### Production Build

Create a production build:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

Run ESLint:

```bash
npm run lint
```

---

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Type-check and build the application |
| `npm run lint`    | Run ESLint                           |
| `npm run preview` | Preview the production build         |

---

## License
