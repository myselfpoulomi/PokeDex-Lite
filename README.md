# PokeDex-Lite

A lightweight Pokédex web app built with **React + Vite**, powered by the public **PokéAPI**, with optional **Google sign-in** and per-user favorites stored locally.

## Getting started

### Prerequisites

- **Node.js** (recommended: current LTS)
- **npm** (comes with Node)

### Install dependencies

This repo’s frontend lives in `client/`.

```bash
cd client
npm install
```

### Environment variables (optional)

Google sign-in is enabled when `VITE_GOOGLE_CLIENT_ID` is present.

Create `client/.env`:

```bash
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

Notes:
- Vite only exposes env vars to the browser when they start with `VITE_`.
- If you skip this env var, the app still runs, but login will show a prompt to configure it.

### Run the app

```bash
cd client
npm run dev
```

Vite will print the local dev URL in your terminal (typically `http://localhost:5173`).

### Production build (optional)

```bash
cd client
npm run build
npm run preview
```

## Technologies used (and why)

- **React**: Component-based UI with hooks for state and effects.
- **Vite**: Fast dev server + build tooling; simple env handling via `import.meta.env`.
- **React Router (`react-router-dom`)**: Client-side routing (`/` for Pokédex, `/login` for sign-in).
- **Tailwind CSS + `@tailwindcss/vite`**: Utility-first styling with rapid iteration and consistent design tokens.
- **Google OAuth (`@react-oauth/google`)**: Drop-in Google sign-in UI; enabled only when a client ID is provided.
- **JWT payload parsing (`jwt-decode`)**: Extracts basic profile info (name/email/picture) from Google’s ID token for a simple frontend-only session.
- **Toasts (`sonner`)**: Lightweight, modern notifications (e.g., adding/removing favorites).
- **Icons (`lucide-react`)**: Clean icon set for UI affordances (logout/user).
- **ESLint**: Basic linting to catch common mistakes and keep code style consistent.

## How it works (high level)

- **Data source**: Pokémon data is fetched from the public [PokéAPI](https://pokeapi.co/).
- **Session**: After a successful Google login, the app stores a small user object in `localStorage` and broadcasts a custom `window` event so different components can react to login/logout.
- **Favorites**: Favorite Pokémon IDs are stored in `localStorage`, keyed by the logged-in user’s normalized email (so each user gets their own favorites on the same browser).

## Challenges faced (and how they were solved)

- **Vite env vars not available in runtime**: Vite requires the `VITE_` prefix for browser-exposed vars. The app reads `import.meta.env.VITE_GOOGLE_CLIENT_ID` and conditionally enables the Google provider; when missing, the UI falls back gracefully with setup instructions.

- **Keeping favorites in sync across components**: Since session and favorites live in `localStorage`, the app uses a custom `POKEDEX_SESSION_EVENT` and a `ref` to avoid stale-state issues when toggling favorites quickly, keeping UI and storage consistent.

- **Fetching lots of Pokémon details efficiently**: PokéAPI returns a list plus per-Pokémon detail URLs. The app batches detail fetches with `Promise.all` and maintains explicit `loading`/`error` state so the UI stays responsive and failures are handled cleanly.

## Scripts

From `client/`:

- **`npm run dev`**: Start the development server
- **`npm run build`**: Create a production build
- **`npm run preview`**: Preview the production build locally
- **`npm run lint`**: Run ESLint
