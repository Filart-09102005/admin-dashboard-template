# HK POS Dashboard

A modern, production-style POS (Point of Sale) dashboard built with React, Tailwind, Recharts, and Anime.js.  
The interface is optimized for smooth motion, responsive layouts, and polished light/dark theme transitions.

## Features

- **Structured page-load animation (Anime.js)** with progressive reveal:
  - Sidebar -> Header -> Title -> Stats -> Main Charts -> Secondary Widgets -> Table
- **Smooth theme switching** with animated morph-style transition (no abrupt flash)
- **Fully responsive layout**:
  - Mobile: off-canvas sidebar + compact header actions
  - Tablet/Desktop: collapsible sidebar and adaptive grid sections
- **POS-focused widgets**:
  - Revenue, Orders, Items Sold, Active Customers
  - Revenue Overview (Today/Week/Month)
  - Transactions Feed with status badges
  - Sales by Category and Payment Methods charts
  - Best Selling Items table with filtering
- **UX states included**:
  - Loading skeletons
  - Empty state fallbacks
  - Error state placeholders
- **Micro-interactions**:
  - Card hover lift
  - Button press feedback
  - Smooth sidebar collapse/expand transitions

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Anime.js](https://animejs.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utility**: `clsx`

## Getting Started

### Prerequisites

- Node.js 18+ recommended

### Install and Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── dashboard/
│   │   ├── DeviceChart.jsx      # Payment Methods donut chart
│   │   ├── OverviewChart.jsx    # Revenue chart with range selector
│   │   ├── RecentActivity.jsx   # Transactions feed
│   │   ├── SalesChart.jsx       # POS category bar chart
│   │   ├── StatCard.jsx         # Metric cards (with skeleton state)
│   │   └── TopProducts.jsx      # Best-selling items table
│   └── layout/
│       ├── Header.jsx           # Search, actions, sidebar + theme toggles
│       ├── Layout.jsx           # Animation orchestration + theme transition
│       └── Sidebar.jsx          # Responsive collapsible/off-canvas sidebar
├── pages/
│   └── Dashboard.jsx            # POS page composition and loading state
├── index.css                    # CSS variables, transitions, and global styles
└── main.jsx                     # React entry point
```

## Notes for Customization

- **Brand colors**: update `extend.colors.brand` in `tailwind.config.js`
- **Theme tokens**: adjust CSS variables in `src/index.css`
- **Sidebar menu**: edit `menuSections` in `src/components/layout/Sidebar.jsx`
- **POS data**: replace mock datasets in `src/components/dashboard/*`
