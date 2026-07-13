# Architecture & Design Decisions

## 1. Design System & Aesthetics
- **Theme & Colors**:
  - Background (Cream/Beige): `#f3ebd9`
  - Accent/Primary (Warm Dark Brown): `#5d3a1a`
  - Outline/Border (Double-Border styling): `#5d3a1a`
  - Inner Text highlights: Cream/White for 3D outline effect.
- **Typography**:
  - Main Display Font: Google Fonts `'Syne'` or `'Clash Display'` (or a fallback like uppercase bold serif with custom CSS text-shadows) to emulate the 3D retro font.
  - Secondary/Body Font: `'Inter'` or `'Outfit'` for crisp readability.
- **Graphic Assets**:
  - An inline, responsive vector SVG building sketch that mirrors the campus building in Image 1 to maintain crisp rendering at all viewport sizes and load instantly.

## 2. Interactive Loading Screen
- A state-driven intro overlay (`useState` or standard React timing) that renders the progress loading screen.
- After simulating a 100% load sequence, it fades out. A cookie/sessionStorage flag will ensure it doesn't interrupt repeat visits, keeping the developer/user experience smooth.

## 3. Next.js Routing and Form Submission
- A single-page layout for simplicity and fast loading.
- API route `/api/contact` handles form submissions using standard Vercel serverless functions with Zod validation.
