 <!--
  Aaranya Silks — Project README
  No external image embeds or third-party badge dependencies.
-->

<div align="center">

# ✦ AARANYA SILKS ✦

### Where Indian Heritage Meets Contemporary Elegance

*A luxury-inspired digital boutique experience for sarees, occasion wear, and handcrafted fashion.*

**Traditional soul. Modern presentation. Thoughtful shopping experience.**

[Explore Repository](https://github.com/Martish-cloud/Aaranya-Silks) · [Browse Source Code](https://github.com/Martish-cloud/Aaranya-Silks/tree/main/src)

---

</div>

## 🌺 About the Project

**Aaranya Silks** is a fashion-focused e-commerce-style web application designed to showcase Indian ethnic wear through an immersive, editorial-style storefront.

The experience combines a premium maroon, cream, and gold-inspired visual identity with animated transitions, curated product displays, collection storytelling, and shopping-oriented interactions.

Built using React and TypeScript, the application uses a component-based architecture to create a structured and maintainable shopping experience.

> ✨ This README intentionally avoids externally hosted images, GIFs, and badge services to keep the repository overview independent of fragile image URLs.

## 🧵 Explore the Experience

<details open>
<summary><strong>01 · The Boutique Homepage</strong></summary>

- Immersive hero section and virtual boutique showroom
- Announcement bar and primary navigation
- Animated promotional marquee
- Curated category strip and editorial carousel
- Dedicated bridal collection with a dramatic visual treatment
- Daily trends and seasonal fashion highlights
- New-arrival product grid and outfit gallery
- Signature collections and craftsmanship storytelling
- Customer review carousel
- Instagram-inspired fashion gallery
- Newsletter invitation and branded footer

</details>

<details>
<summary><strong>02 · Fashion Discovery & Product Browsing</strong></summary>

- Catalogue page for browsing products
- Individual product detail pages
- Quick-view modal
- Search interface
- Wishlist drawer
- Curated collections and outfit categories

The source includes fashion categories such as sarees, blouses, babycon dresses, crop tops, and one-shoulder outfits. Actual availability and prices depend on the current catalogue data.

</details>

<details>
<summary><strong>03 · Shopping & Order Interface</strong></summary>

The application includes interface components for:

- Shopping cart drawer
- Checkout modal
- Customer authentication modal
- Delivery availability checker
- Order tracking modal
- Order history modal
- Toast notifications for user feedback

**Backend note:** These components establish that shopping and order-related interfaces exist in the application. They do not, by themselves, confirm a production payment gateway, OTP provider, inventory service, shipping API, or persistent order-management backend.

</details>

<details>
<summary><strong>04 · Motion & Visual Direction</strong></summary>

- Framer Motion transitions for page changes and interface feedback
- Editorial, carousel-led presentation
- Animated promotional elements and layered section transitions
- Distinct cream and dark bridal section palettes
- Lucide icons for interface controls
- Responsive styling with Tailwind CSS

The visual direction aims to combine premium fashion presentation with the richness of Indian textile heritage.

</details>

## 🛍️ Product & Collection Themes

| Theme | Experience |
|---|---|
| Sarees & handloom | Heritage-inspired product presentation |
| Bridal wear | Dedicated bridal collection feature |
| Contemporary outfits | Modern silhouettes and occasion styling |
| Seasonal edits | Trend-led editorial sections |
| Signature collections | Craftsmanship and brand storytelling |
| Style inspiration | Lookbook and social-gallery presentation |

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| TypeScript | Typed application development |
| Vite | Development server and production builds |
| Tailwind CSS 4 | Utility-first styling |
| Framer Motion | Page transitions and interface animations |
| Lucide React | Interface icons |
| canvas-confetti | Confetti effects where used |
| Cloudflare Wrangler | Deployment configuration included in the repository |

## 🏗️ Project Structure

```text
Aaranya-Silks/
├── public/                 # Public assets and hosting configuration
├── src/
│   ├── assets/             # Application assets
│   ├── components/         # Pages, collections, modals and UI
│   ├── context/            # Shared shopping/application state
│   ├── data/               # Catalogue and application data
│   ├── services/           # Service-layer code
│   ├── types/              # TypeScript types
│   ├── utils/              # Shared utilities
│   ├── App.tsx             # Main application composition
│   ├── App.css             # Application styles
│   ├── index.css           # Global styles
│   └── main.tsx            # Application entry point
├── index.html
├── package.json
├── vite.config.ts
└── wrangler.jsonc
```

## 🚀 Run Locally

### Prerequisites

- Node.js **20.19 or newer**
- npm

### Installation

```bash
git clone https://github.com/Martish-cloud/Aaranya-Silks.git
cd Aaranya-Silks
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

### Build & Quality Checks

```bash
npm run build
npm run lint
npm run preview
```

- `npm run build` — runs TypeScript project builds and generates the production bundle.
- `npm run lint` — runs Oxlint.
- `npm run preview` — previews the production build locally after building.

## 🔌 Backend & Production Readiness

The repository contains dedicated `context`, `services`, `data`, and `types` directories. The application also includes cart, checkout, authentication, delivery-checking, order-history, and order-tracking interfaces.

For a real store launch, verify the following:

- [ ] Persistent database for customers, products, inventory, and orders
- [ ] Secure authentication and OTP/email/SMS provider, if required
- [ ] Payment gateway integration and server-side payment verification
- [ ] Order creation and status updates through a trusted backend
- [ ] Shipping integration and delivery-serviceability validation
- [ ] Server-side validation, secrets management, and error handling
- [ ] Privacy policy, terms, returns, shipping, and contact information
- [ ] Production build and end-to-end checkout testing

These are **production-readiness checks**, not claims that particular integrations are absent or present. Verify each item against the service implementations and deployed environment before describing it as operational.

## 🔐 Configuration & Security

- Never commit API keys, payment secrets, private tokens, or customer data.
- Keep privileged credentials on the server rather than exposing them in frontend code.
- Treat payment and order status as untrusted until verified server-side.
- Review hosting rules, redirects, and environment configuration before deployment.

## 🌿 Design Philosophy

Aaranya Silks brings together the richness of Indian textiles and the clarity of modern digital commerce. Its design emphasizes visual storytelling, discoverable collections, and a considered shopping journey—from editorial inspiration to product exploration.

## 📌 Project Status

| Area | Status |
|---|---|
| Application | React + TypeScript storefront |
| Build tooling | Vite |
| UI motion | Framer Motion |
| Commerce interfaces | Cart, checkout, wishlist and order-related UI components |
| Production integrations | Require independent verification |

---

<div align="center">

### ✦ Crafted for the elegance of Indian fashion ✦

[Repository](https://github.com/Martish-cloud/Aaranya-Silks) · [Source Code](https://github.com/Martish-cloud/Aaranya-Silks/tree/main/src)

<sub>Designed for reliable rendering without external image dependencies.</sub>

</div>
