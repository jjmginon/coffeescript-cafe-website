# CoffeeScript Café

[![Netlify Status](https://api.netlify.com/api/v1/badges/a43edff0-0691-41cb-bdec-3c94e1e5b783/deploy-status)](https://app.netlify.com/projects/coffeescript-cafe-website/deploys)

CoffeeScript Café is a multi-page responsive café website inspired by the fusion of **code and coffee culture**.
It showcases a fictional developer-themed café offering beverages like **Java Coffee**, **Tea++**, and **BubbleSort Milk Tea**.

The project demonstrates modern HTML, CSS, and vanilla JavaScript practices with a strong focus on:

- Accessibility (ARIA, focus management, semantic HTML)
- Responsive design
- Performance optimization
- Clean UI/UX structure
- Reusable JavaScript utilities

---

## Live Pages

- `index.html` — Home
- `menu.html` — Menu
- `about.html` — About Us
- `contact.html` — Contact

---

## Tech Stack

- **HTML5** (Semantic structure & SEO meta tags)
- **CSS3**
  - CSS Variables
  - Flexbox & Grid
  - Responsive Media Queries
  - Reduced Motion Support
  - Animations

- **Vanilla JavaScript**
  - Dynamic navigation injection
  - Accessible mobile menu
  - Focus trap implementation
  - Back-to-top button
  - Hybrid throttle + debounce utility
- **Google Fonts**
  - Fira Sans Condensed
  - Raleway

---

## Project Structure

```
CoffeeScript-Cafe/
│
├── css/
│   └── styles.css
├── img/
│   ├── about/
│   ├── bubble-tea/
│   ├── coffee/
│   ├── contact/
│   ├── favicon/
│   ├── frappe/
│   ├── home/
│   ├── logo/
│   └── tea/
├── js/
│   ├── nav.js
│   └── script.js
├── favicon.ico
├── about.html
├── contact.html
├── index.html
├── menu.html
└── README.md
```

---

## Features

### Responsive Navigation (Injected via JavaScript)

- Navigation is dynamically injected (`nav.js`)
- Mobile slide-in menu
- Accessible ARIA attributes
- Escape key support
- Focus trapping within mobile nav
- Resize state synchronization

---

### Back-to-Top Button

- Appears after scrolling past 200px
- Smooth scroll behavior
- Optimized visibility toggling
- Accessible focus states

---

### Modern CSS Architecture

- CSS custom properties (variables)
- Component-style class naming
- Hover, focus-visible, and active states
- Reduced motion media query support
- Smooth entry animations

---

### Accessibility Enhancements

- Semantic HTML (`article`, `figure`, `address`, `time`)
- Screen reader-only text utilities
- ARIA-expanded / ARIA-hidden synchronization
- Keyboard navigation support
- Focus-visible styling

---

### Performance Considerations

- Image `srcset` for responsive images
- `fetchpriority` for important images
- Deferred JavaScript loading
- Hybrid throttle + debounce utility for resize handling
- Preloaded fonts

---

## JavaScript Highlights

### 1. Navigation Injection

The navigation is dynamically mounted into `.nav-mount`, allowing centralized nav management across pages.

### 2. Focus Trap Utility

Reusable focus trap ensures keyboard users remain inside the mobile navigation while it is open.

### 3. Hybrid Throttle + Debounce

A performance-optimized utility that combines:

- Throttling for immediate responsiveness
- Debouncing for final stable execution

---

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/jjmginon/coffeescript-cafe-website.git
```

2. Open `index.html` in your browser.

No build tools or dependencies required — this is a fully static project.

---

## Purpose of the Project

This project demonstrates:

- Frontend fundamentals mastery
- Accessibility best practices
- Clean component structure
- Practical JavaScript DOM manipulation
- Real-world responsive design implementation

---

## Author

**JJ Ginon**
