# Prestige Estates - Luxury Real Estate Website

A premium, modern luxury real estate website built with Next.js 15, TypeScript, and Tailwind CSS. Showcasing exclusive properties in Ghana's most prestigious neighborhoods.

## ✨ Features

### Pages

- **Home** - Hero section with search, featured properties, testimonials, and locations
- **Properties** - Full property listings with advanced filtering
- **Property Details** - Detailed property information, image gallery, and contact form
- **Agents** - Meet our professional real estate team
- **About** - Company story, values, and statistics
- **Contact** - Contact form and business information

### Components

- Responsive Navbar with mobile menu
- Reusable Property Cards
- Advanced Search Bar
- Contact Forms
- Footer with social links
- Image Galleries

### Design

- **Color Scheme**: Black & Gold luxury theme
- **Typography**: Playfair Display (serif) + Inter (sans-serif)
- **Animations**: Smooth hover effects and transitions
- **Responsive**: Mobile-first design, works on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project folder:

```bash
cd luxury-real-estate
```

2. Install dependencies (already done):

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and visit:

```
http://localhost:3000
```

## 📁 Project Structure

```
luxury-real-estate/
├── app/
│   ├── about/page.tsx
│   ├── agents/page.tsx
│   ├── contact/page.tsx
│   ├── properties/
│   │   ├── [id]/page.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── PropertyCard.tsx
│   └── SearchBar.tsx
├── lib/data.ts
└── tailwind.config.ts
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Images**: Next.js Image component with Unsplash

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically

---

Built with ❤️ for luxury real estate in Ghana
