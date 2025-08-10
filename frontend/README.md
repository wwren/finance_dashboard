# Finance Dashboard Frontend

A modern, responsive finance dashboard built with Next.js 15, TypeScript, and TanStack Table for displaying S&P 500 stock data with advanced sorting and filtering capabilities.

## 📄 Pages

- **Dashboard**: Main index page with S&P 500 stock table
- **My List**: Personal stock watchlist page


## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: CSS Modules
- **Table Library**: TanStack Table (React Table v8)
- **Icons**: React Icons (FontAwesome)
- **Fonts**: Geist (Sans & Mono)
- **Build Tool**: Turbopack (dev mode)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── (dashboard)/          # Main index page and my-list page, shared layout
│   │   ├── components/           # Shared components
│   │   ├── data/                 # Data files
│   │   ├── globals.css           # Global styles
│   │   └── layout.tsx            # Root layout
│   └── lib/                      # Utility functions
├── public/                        # Static assets
├── package.json                   # Dependencies
└── tsconfig.json                 # TypeScript config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 24+ 
- npm (Node Package Manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd finance_dashboard/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Styling

- **CSS Modules**: Scoped styling for components
- **Responsive Design**: Mobile-first approach
- **Color Scheme**: Professional dark/light theme
- **Typography**: Geist font family for modern readability

## 🔧 Configuration

### TypeScript
- Strict mode enabled
- Path aliases configured (`@/` points to `src/`)
- Next.js 15 optimizations

### Next.js
- App Router architecture
- Turbopack for faster development
- Optimized font loading
- Static generation support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using Next.js and modern web technologies
