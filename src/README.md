# `src` folder structure

The `src` directory contains the application's UI, data access, state, and shared TypeScript contracts.

- **`api/`**: Functions for communicating with the backend API.
- **`assets/`**: Static assets such as icons, images, fonts, and media.
- **`components/`**: Reusable UI components such as buttons, cards, modals, and post controls.
- **`constants/`**: Shared values such as notification messages and modal configuration.
- **`hooks/`**: Custom React hooks for queries, mutations, authentication, and shared application logic.
- **`layout/`**: Shared page structure, navigation, sidebars, and routed content.
- **`lib/`**: Shared library configuration, including the TanStack Query client.
- **`pages/`**: Route-level screens such as Home, Login, Register, Profile, and Notifications.
- **`store/`**: Global client state managed with Zustand, including theme and follow state.
- **`types/`**: Shared TypeScript interfaces, request models, and API response types.
