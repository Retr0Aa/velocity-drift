# Velocity Drift

Velocity Drift is a fast-paced browser arcade game built with React, Vite, and the HTML5 canvas. You pilot a drifting rocket, dodge obstacles, collect score pickups, and pass through portals that flip the direction of the run mid-game.

## Features

- Canvas-based endless runner gameplay
- Keyboard and mouse controls for vertical movement
- Collectible score pickups
- Obstacles, wall gaps, and portal direction swaps
- Unlockable rocket skins stored in `localStorage`
- Best score persistence between sessions
- Dedicated menu screens for skins, options, credits, and how to play
- Custom fonts, sound effects, and visual effects

## Built With

- React 19
- Vite 7
- React Router
- Sass

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Play

- Hold the left mouse button and drag up or down to steer
- You can also use `W` / `S` or `Arrow Up` / `Arrow Down`
- Collect blue pickups to increase your score
- Avoid red obstacles and wall segments
- Fly through portals to reverse the direction of the run

## Game Systems

- Skins unlock based on your saved best score
- The equipped skin is saved in `localStorage` under `equippedSkin`
- The best score is saved in `localStorage` under `bestScore`
- The game is currently desktop-only; mobile devices see a fallback message instead of the app

## Project Structure

```text
src/
  App.jsx              App routes and global click sound handling
  main.jsx             App bootstrap and mobile-device guard
  skins.js             Unlockable skin definitions
  pages/
    MainMenu.jsx
    Game.jsx
    SkinsMenu.jsx
    OptionsMenu.jsx
    CreditsMenu.jsx
    HowToPlay.jsx
public/
  fonts/               Custom typography assets
  sounds/              UI and gameplay sound effects
  images/              Gameplay images such as the portal
```

## Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## Deployment

This project includes a [`netlify.toml`](/Users/alexanderbuchkov/Desktop/Programming/velocity-drift/netlify.toml) file with a catch-all redirect so client-side routes work correctly on Netlify.

## Credits

- Developer: Alexander Buchkov
- Designer: Emmanuel Olimpiev
- Title font: League Gothic
- UI text font: Built Titling
