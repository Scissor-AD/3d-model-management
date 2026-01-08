# 3D Model Management

A modern, responsive website for 3D Model Management - a design technology service provider specializing in laser scanning, BIM modeling, point cloud processing, and as-built documentation.

## Features

- **Responsive Design**: Fully responsive layout optimized for desktop and mobile devices
- **Sticky Control Bar**: Expandable bottom control bar with:
  - INFO section (Teams, Allied, Careers, Link)
  - LEGAL section (Privacy Policy, Terms of Service, Cookie Policy)
  - SERVICES section with expandable accordion items
  - Multi-step intake form wizard (6 steps)
- **Mobile Drawer**: Control bar transforms into a full-screen drawer on mobile
- **Modern Typography**: Bebas Neue for display text, DM Sans for body copy
- **Grid Pattern Background**: Subtle grid pattern for visual depth

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Fonts**: Google Fonts (Bebas Neue, DM Sans, JetBrains Mono)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 3d-model-management
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and CSS variables
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Home page component
├── components/
│   ├── Navigation.tsx   # Top navigation bar
│   ├── ControlBar.tsx   # Sticky bottom control bar
│   └── IntakeFormWizard.tsx # Multi-step form wizard
```

## Customization

### Colors
Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --background: #FAFAFA;
  --foreground: #0D0D0D;
  --accent: #0D0D0D;
  --border: #E0E0E0;
  --muted: #737373;
  /* ... */
}
```

### Fonts
Fonts are loaded via Google Fonts in `globals.css`. Update the `--font-display`, `--font-body`, and `--font-mono` variables to change fonts.

## Deployment

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## License

MIT
