# FLAIR-IT 2K25

A modern React application for the FLAIR-IT 2025 event with an immersive intro sequence.

## Features

- **Intro Sequence**: 
  - Countdown animation (0-100%)
  - Netflix-style intro video
  - Smooth transition to main content
- **Background Music**: Ambient audio that plays during the main experience
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion

## Intro Sequence Flow

1. **Countdown Stage**: Shows a percentage counter from 0% to 100%
2. **Video Stage**: Plays the Netflix-style intro video in fullscreen
3. **Home Stage**: Transitions to the main website content

## Getting Started

```bash
npm install
npm run dev
```

## Dependencies

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM

## File Structure

- `src/components/IntroSequence.jsx` - Main intro sequence component
- `src/pages/Home.jsx` - Main home page content
- `public/videos/netflix.webm` - Intro video
- `public/audios/bg.mp3` - Background music
