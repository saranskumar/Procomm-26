# PROCOMM '26 — IEEE Communications Project Competition

[![Live Site](https://img.shields.io/badge/Live_Site-procomm.comsoc.ieeekerala.org-0b1a30?style=for-the-badge&logo=google-chrome&logoColor=white)](https://procomm.comsoc.ieeekerala.org)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![IEEE ComSoc](https://img.shields.io/badge/IEEE-ComSoc_Kerala_Chapter-00629B?style=for-the-badge&logo=ieee&logoColor=white)](https://comsoc.ieeekerala.org)

> **24 HOURS &bull; REAL PROBLEMS &bull; REAL PROTOTYPES**  
> The official web platform for **PROCOMM '26**, the flagship 24-hour communications project competition organized by **IEEE ComSoc Kerala Chapter** & **IEEE Kerala Section**, hosted at **Saintgits College of Engineering (Autonomous), Kottayam, Kerala** on **September 5–6, 2026**.

---

## 🌐 Official Links

- **Primary Custom Domain**: [https://procomm.comsoc.ieeekerala.org](https://procomm.comsoc.ieeekerala.org)
- **GitHub Pages Mirror**: [https://saranskumar.github.io/Procomm-26/](https://saranskumar.github.io/Procomm-26/)

---

## 🎯 Competition Tracks & Problem Statements

PROCOMM '26 presents five official engineering problem statements targeting industrial safety, structural health monitoring, and IoT automation:

1. **Smart Safety Helmet for Industrial Workers** — Real-time sensor integration for hazard detection, impact alerts, and wireless worker status monitoring.
2. **Smart Water Tank Health Monitoring System** — Automated water quality, level detection, leak prevention, and remote telemetry dashboard.
3. **Smart Rubber Plantation Worker Safety System** — Wearable safety devices designed for outdoor agricultural and plantation workers in high-risk zones.
4. **Machine Health Monitoring System Using Standard Industrial Protocols** — Industrial IoT protocol integration (Modbus/MQTT/OPC-UA) for predictive machine diagnostics.
5. **Smart Bridge Structural Health Monitoring System** — Strain gauge, vibration analysis, and structural integrity telematics for bridge safety.

---

## ✨ Features & Architecture

### 🎨 Bichrome Editorial Design System
- **Curated Palette**: Deep Navy (`#0b1a30`), Frost Ice (`#f3f7fa`), Dark Frost (`#c8d5e3`), Golden Ochre (`#c8923a`).
- **Typography Hierarchy**: *Cormorant Garamond* (display headers), *Instrument Sans* (body), and *DM Mono* (editorial tags).
- **Organic Aesthetics**: Dynamic wave dividers, native arched column card shapes, subtle glassmorphism, and micro-interactions powered by Framer Motion.

### 📝 Team Registration Portal (`/register`)
- **Dynamic Team Size**: Dropdown selector supporting **1 to 4 team members** with real-time form field rendering.
- **Member Details**: Full name, college/institution, semester (S1–S8), email, and WhatsApp contact.
- **IEEE & ComSoc Membership Toggles**: Radio button selectors for IEEE/ComSoc status with conditional IEEE Membership ID inputs.
- **Proposal Document Upload**: Drag-and-drop / file picker PDF uploader for project proposals.
- **Form Progress Auto-Save**: Real-time `localStorage` auto-saving (`procomm26_registration_draft`) ensuring no progress is lost on page reloads.
- **WhatsApp Group Integration**: Post-submission call-to-action directing registered teams to join the official WhatsApp announcement group.

### 🚀 SEO & GEO (Generative Engine Optimization)
- **Rich Meta & OpenGraph**: Configured OpenGraph sharing cards and Twitter Cards with custom preview graphics.
- **Local Geo Tags**: `geo.region` (`IN-KL`), `geo.placename` (`Kottayam, Kerala, India`), and coordinates (`9.5290; 76.5511`).
- **Schema.org JSON-LD**: Embedded `Hackathon` / `Event` structured data for Google Search rich snippets and AI Search engines (ChatGPT, Perplexity, Gemini, Claude).
- **Dynamic Sitemap & Robots**: Generated `sitemap.xml` and `robots.txt` compatible with static export (`output: "export"`).

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack, Static Export) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 + Custom CSS design tokens |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Validation** | Zod |
| **Package Manager** | pnpm v10+ |
| **CI/CD** | GitHub Actions (`.github/workflows/deploy.yml`) |
| **Hosting** | GitHub Pages (`procomm.comsoc.ieeekerala.org`) |

---

## 📁 Project Structure

```
Procomm-26/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Actions deployment workflow
├── public/
│   ├── CNAME                    # GitHub Pages custom domain configuration
│   ├── logo/                    # Official IEEE, ComSoc, and PROCOMM logo assets
│   ├── Saintgits-College.jpg    # Host venue imagery
│   └── whatsapp-icon-white.png  # WhatsApp branding assets
├── src/
│   ├── app/
│   │   ├── about/               # About PROCOMM '26 & organizers page
│   │   ├── contact/             # Contact & organizing committee page
│   │   ├── problem/             # Problem statements & competition workflow page
│   │   ├── register/            # Team registration form & declaration page
│   │   ├── globals.css          # Global CSS variables & editorial design system
│   │   ├── layout.tsx           # Base layout, metadata, & Schema.org JSON-LD
│   │   ├── page.tsx             # Main landing page
│   │   ├── robots.ts            # Robots.txt generator
│   │   └── sitemap.ts           # Sitemap.xml generator
│   └── components/
│       ├── DesktopNavbar.tsx    # Header navigation bar
│       ├── FinalCTA.tsx         # Call-to-action registration section
│       ├── Footer.tsx           # Footer with links, social icons & venue details
│       ├── Header.tsx           # Navbar wrapper
│       ├── Hero.tsx             # Parallax hero section with typography
│       ├── MobileNavbar.tsx     # Mobile drawer navigation
│       ├── TimelineSection.tsx  # Key dates & roadmap
│       └── TracksOverview.tsx   # Index directory of problem statements
├── next.config.ts               # Next.js static export configuration
└── package.json                 # Project dependencies & scripts
```

---

## 💻 Getting Started

### Prerequisites

Ensure you have **Node.js v20+** and **pnpm v10+** installed:
```bash
node -v
pnpm -v
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saranskumar/Procomm-26.git
   cd Procomm-26
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development Server

Start the local development server:
```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build & Static Export

To verify TypeScript types and generate the static export bundle (`out/` directory):
```bash
pnpm run build
```

---

## 🚢 Deployment

Deployment is fully automated via GitHub Actions. Whenever changes are pushed to the `main` branch:

1. `.github/workflows/deploy.yml` runs a static export build (`pnpm run build`).
2. Creates a `.nojekyll` file to bypass Jekyll processing.
3. Automatically deploys the static output to GitHub Pages at **[procomm.comsoc.ieeekerala.org](https://procomm.comsoc.ieeekerala.org)**.

---

## 🏛️ Organizing Committee & Host Venue

- **Organized By**: [IEEE Communications Society (ComSoc) Kerala Chapter](https://comsoc.ieeekerala.org) & IEEE Kerala Section
- **Host Venue**: [Saintgits College of Engineering (Autonomous)](https://saintgits.org/saintgits-college-of-engineering/), Kottukulam Hills, Pathamuttam, Kottayam, Kerala — 686532
- **Website**: [https://procomm.comsoc.ieeekerala.org](https://procomm.comsoc.ieeekerala.org)

---

&copy; 2026 IEEE ComSoc Kerala Chapter. All rights reserved.