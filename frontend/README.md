# Nexus Analytics - Frontend UI

The frontend for the Nexus Analytics application is built with **React**, **TypeScript**, and **Vite**, featuring a premium design system powered by **Tailwind CSS** and **shadcn/ui**.

## 🛠️ Features
- **Modern React**: React 18 with high-performance HMR using Vite (SWC).
- **TypeScript**: Full type safety for reliable application development.
- **Tailwind CSS**: Utility-first CSS for custom, responsive, and beautiful UI designs.
- **shadcn/ui**: Accessible, high-quality component architecture.
- **Lucide Icons**: Crisp, professional iconography.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- `npm` (Node package manager)

### Installation
1.  **Clone and Navigate**: Navigate into the `frontend/` directory.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```

### Running the UI
To start the React development server:
```bash
npm run dev -- --port 3000
```
- **Local Application URL**: `http://localhost:3000`

---

## 📂 Frontend Architecture

```text
frontend/
├── src/
│   ├── components/      # UI components (shadcn/ui, layout)
│   ├── hooks/           # Custom React hooks (Data fetching)
│   ├── lib/             # Utilities (clsx, tailwind-merge)
│   ├── services/        # API communication (Axios/Fetch)
│   ├── App.tsx         # Main application hub
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles (Tailwind)
├── tailwind.config.js   # Tailwind design configuration
└── vite.config.ts      # Vite build configuration
```

## 🎨 Design Aesthetics
The Nexus Analytics UI focuses on a **premium, dark-mode first** aesthetic. It uses smooth gradients, subtle micro-animations, and a curated color palette to provide a state-of-the-art user experience.
