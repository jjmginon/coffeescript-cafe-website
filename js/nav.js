// ===== NAVIGATION INJECTION =====
document.addEventListener("DOMContentLoaded", () => {
    const navMount = document.querySelector(".nav-mount");

    if (navMount) {
        navMount.innerHTML = `
      <nav class="header__nav" aria-label="Main navigation">
        <div class="header__div logo-container">
          <img class="header__img"
               src="img/logo/coffeescript-cafe-logo-transparent-300x249.webp"
               alt="CoffeeScript Café logo"
               width="300"
               height="249"
               fetchpriority="high">
          <h1 class="header__h1">CoffeeScript Café</h1>
        </div>
        <div class="header__div nav-container">
          <button id="close-menu-btn"
                  aria-label="Close menu"
                  aria-controls="primary-nav"
                  aria-expanded="true">
            <span class="sr-only">Close menu</span>
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                 width="32"
                 height="32"
                 fill="none"
                 stroke="currentColor"
                 stroke-width="2"
                 stroke-linecap="round"
                 stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <ul id="primary-nav" class="header__ul" aria-hidden="true">
            <li><a class="header__a" href="/">Home</a></li>
            <li><a class="header__a" href="menu.html">Menu</a></li>
            <li><a class="header__a" href="about.html">About</a></li>
            <li><a class="header__a" href="contact.html">Contact</a></li>
          </ul>
        </div>
        <button id="menu-btn"
                aria-label="Open menu"
                aria-controls="primary-nav"
                aria-expanded="false"
                aria-haspopup="true">
          <span class="sr-only">Open menu</span>
          <svg xmlns="http://www.w3.org/2000/svg"
               width="32"
               height="32"
               fill="currentColor"
               viewBox="0 0 24 24">
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
        </button>
      </nav>
    `;
        document.dispatchEvent(new Event("navReady"));
    }
});