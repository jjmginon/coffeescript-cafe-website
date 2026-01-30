// ===== MOBILE MENU TOGGLE LOGIC =====
const header = document.querySelector("header");
const menuBtn = document.querySelector("#menu-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");
const firstNavLink = document.querySelector("#primary-nav a");

menuBtn.addEventListener("click", () => {
    const isOpen = header.classList.toggle("show-mobile-menu");

    menuBtn.setAttribute("aria-expanded", String(isOpen));

    if (isOpen && firstNavLink) {
        firstNavLink.focus(); // move focus into the menu
    }
});

closeMenuBtn.addEventListener("click", () => {
    header.classList.remove("show-mobile-menu");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.focus();
});

// ===== BACK-TO-TOP BUTTON VISIBILITY AND SCROLL BEHAVIOR =====
const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {
    if (!backToTop) return;

    const pageHeight = document.body.scrollHeight;
    const threshold = Math.max(100, pageHeight * 0.25);

    backToTop.classList.toggle("show", window.scrollY > threshold);
}

if (backToTop) {
    window.addEventListener("scroll", toggleBackToTop);
    window.addEventListener("resize", toggleBackToTop);

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("load", toggleBackToTop);
}

// ===== ESCAPE KEY CLOSE BEHAVIOR =====
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("show-mobile-menu")) {
        header.classList.remove("show-mobile-menu");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.focus();
    }
});

// ===== GLOBAL FOCUS TRAP FOR MOBILE MENU =====
const navContainer = document.querySelector(".nav-container");
const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function trapFocus(e) {
    if (!header.classList.contains("show-mobile-menu")) return;

    const focusableElements = navContainer.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // If focus is outside the navContainer, bring it back in
    if (!navContainer.contains(document.activeElement)) {
        e.preventDefault();
        firstElement.focus();
        return;
    }

    // Handle cycling inside the menu
    if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

document.addEventListener("keydown", trapFocus);