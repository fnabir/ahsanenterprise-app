<div align="center">
  <img src="./apps/web/public/logo.png" alt="Ahsan Enterprise logo" width="50" />
  <p>
    <div style="font-size:28px;font-weight:600">AHSAN ENTERPRISE</div>
    <div>Monorepo for Next.js and React Native Apps</div>
  </p>
  <p>An admin dashboard built with TurboRepo for cross-platform applications to track and maintain all jobs, generate bill for each job adn admin tasks.</p>
</div>

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)
![Expo](https://img.shields.io/badge/Expo-SDK%2057-1B1F23?logo=expo)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Nativewind](https://img.shields.io/badge/NativeWind-latest-7C3AED)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
[![License](https://img.shields.io/badge/License-Proprietary-crimson)](LICENSE.md)

</div>

---

## Features

- **Cross‑platform apps** built with Next.js (web) and Expo (mobile)
- **Shared UI library** with platform‑specific components (.web.tsx / .native.tsx)
- **Shared core logic** (pure TypeScript, domain‑driven)
- **Shared design system** (TailwindCSS + NativeWind tokens)
- **Shared TypeScript types** powered by Zod schemas
- **Firebase data layer** with repository pattern
- **Turborepo pipelines** for build, lint, dev, and caching
- **Unified package management** using pnpm workspaces
- **Consistent styling** across web and mobile
- **Scalable folder structure** for long‑term maintainability

## Tech Stack

| Technology                                                                                       | Purpose                          | Version       |
| ------------------------------------------------------------------------------------------------ | -------------------------------- | ------------- |
| ![Turborepo](https://img.shields.io/badge/-Turborepo-000?logo=turbo&logoColor=white)             | Monorepo build system            | Latest        |
| ![Next.js](https://img.shields.io/badge/-Next.js-000?logo=next.js)                               | React framework for web          | 16.x          |
| ![Expo](https://img.shields.io/badge/-Expo-1B1F23?logo=expo&logoColor=white)                     | React Native platform            | 57.x          |
| ![React](https://img.shields.io/badge/-React-20232A?logo=react&logoColor=61DAFB)                 | Framework                        | 19.x          |
| ![Tailwind](https://img.shields.io/badge/-TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)   | UI library                       | 4.x           |
| ![NativeWind](https://img.shields.io/badge/-NativeWind-7C3AED)                                   | Cross-platform styling           | 5.x (Preview) |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)   | Type safety                      | 6.x           |
| ![pnpm](https://img.shields.io/badge/-pnpm-F69220?logo=pnpm&logoColor=white)                     | Package manager                  | 11.x          |
| ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-000?logo=framer&logoColor=white)  | Web animations (Next.js)         | 13.x          |
| ![LegendappMotion](https://img.shields.io/badge/-LegendappMotion-000?logo=react&logoColor=white) | Native animations (React Native) | 2.x           |

## Packages Overview

ui/ — Cross‑platform UI components

- Shared components for web + native
- Platform‑specific files (Button.web.tsx, Button.native.tsx)
- Component‑specific hooks inside each component folder
- Domain‑specific UI grouped by feature

core/ — Domain logic

- Pure TypeScript
- No React, no Firebase
- Business rules, calculations, transformations

utils/ — Helper utilities

- Grouped by category (date.ts, string.ts, array.ts)
- Reusable across all apps and packages

database/ — Firebase repositories

- Firestore client + converters
- Repository pattern (projectRepo.ts, transactionRepo.ts)
- Emulator‑friendly for Jest testing

styles/ — Design system

- Tailwind + NativeWind tokens
- Colors, spacing, typography, radius
- Shared across web + mobile

config/ — Shared configuration

- Base tsconfig
- Shared ESLint + Prettier configs
- Centralized tooling

## Project Structure

```
ahsanenterprise-app/
├── apps/
│   ├── mobile/          # Expo React Native app
│   └── web/             # Next.js web app
├── packages/
│   ├── config/          # Shared tsconfig/eslint/prettier
│   ├── core/            # App logic functions
│   ├── firebase/        # Firebase repositories + converters
│   ├── styles/          # Tailwind + NativeWind tokens
│   ├── types/           # Types and Interfaces
│   ├── ui/              # Shared component library
│   ├── utils/           # date, string, number, array, format
│   └── validators/      # zod form schemas and types
├── turbo.json           # Turborepo configuration
├── pnpm-workspace.yaml
└── tsconfig.json
```

## Testing

This monorepo uses Jest across all packages:

UI → React Testing Library + React Native Testing Library  
Core → ts-jest  
Database → Firebase emulator  
API Client → mocked repositories  
Utils → pure unit tests

Tests live next to the code they test, following a domain‑driven pattern.

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm 11+
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

```bash
# Clone the repository
git clone https://github.com/fnabir/ahsanenterprise-app.git
cd ahsanenterprise-app

# Install dependencies
pnpm install
```

### Development

```bash
# Start all apps (web + mobile)
pnpm dev

# Start individual apps
pnpm --filter web dev      # Next.js web app
pnpm --filter mobile dev   # Expo mobile app
```

### Platform-Specific Commands

```bash
# Mobile development
cd apps/mobile
pnpm ios       # iOS simulator
pnpm android   # Android emulator
pnpm web       # Web browser

# Web development
cd apps/web
pnpm dev       # Development server
pnpm build     # Production build
pnpm start     # Production server
```

## Commands

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `pnpm dev`         | Start all apps in development |
| `pnpm build`       | Build all apps for production |
| `pnpm lint`        | Lint all workspaces           |
| `pnpm check-types` | TypeScript type checking      |

## Documentation

### Core Technologies

- **[Next.js](https://nextjs.org/docs)** - React framework with App Router
- **[Expo](https://docs.expo.dev/)** - React Native development platform
- **[Turborepo](https://turbo.build/repo/docs)** - High-performance build system
- **[React Native](https://reactnative.dev/docs/getting-started)** - Cross-platform mobile development
- **[TypeScript](https://www.typescriptlang.org/docs/)** - Type-safe JavaScript

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/docs)** - Utility-first CSS framework
- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS for React Native

### Development Tools

- **[pnpm](https://pnpm.io/motivation)** - Fast, disk space efficient package manager
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - File-based routing for React Native

## Resources

- [Turborepo docs](https://turbo.build/repo/docs)
- [NativeWind docs](https://www.nativewind.dev/)
- [Expo docs](https://docs.expo.dev/)
- [Next.js docs](https://nextjs.org/docs)

## Author

Built by [Farhan Noor Abir](https://github.com/fnabir).

---

**Built with Turborepo • Next.js • Expo • TailwindCSS • NativeWind**
