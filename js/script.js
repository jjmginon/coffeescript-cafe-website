// ===== MOBILE MENU TOGGLE LOGIC =====
const header = document.querySelector("header");
const menuBtn = document.querySelector("#menu-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");
const firstNavLink = document.querySelector("#primary-nav a");
const primaryNav = document.querySelector("#primary-nav");

const updateMenuState = (isOpen) => {
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    closeMenuBtn.setAttribute("aria-expanded", String(isOpen));
    primaryNav.setAttribute("aria-hidden", String(!isOpen));
};

menuBtn.addEventListener("click", () => {
    const isOpen = header.classList.toggle("show-mobile-menu");
    updateMenuState(isOpen);

    if (isOpen && firstNavLink) {
        firstNavLink.focus(); // move focus into the menu
    }
});

closeMenuBtn.addEventListener("click", () => {
    header.classList.remove("show-mobile-menu");
    updateMenuState(false);
    menuBtn.focus();
});

// ===== BACK-TO-TOP BUTTON VISIBILITY AND SCROLL BEHAVIOR =====
const backToTop = document.getElementById("backToTop");

const toggleBackToTop = () => {
    if (!backToTop) return;

    const pageHeight = document.body.scrollHeight;
    const threshold = Math.max(100, pageHeight * 0.25);

    backToTop.classList.toggle("show", window.scrollY > threshold);
};

if (backToTop) {
    const optimizedToggle = throttleDebounce(toggleBackToTop, 150, 200);

    window.addEventListener("scroll", optimizedToggle);
    window.addEventListener("resize", optimizedToggle);

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("load", toggleBackToTop);
}

// ===== ESCAPE KEY CLOSE BEHAVIOR =====
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("show-mobile-menu")) {
        header.classList.remove("show-mobile-menu");
        updateMenuState(false);
        menuBtn.focus();
    }
});

// ===== GLOBAL FOCUS TRAP FOR MOBILE MENU =====
const navContainer = document.querySelector(".nav-container");
const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const trapFocus = (e) => {
    if (!header.classList.contains("show-mobile-menu")) return;

    const focusableElements = navContainer.querySelectorAll(focusableSelectors);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

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
};

document.addEventListener("keydown", trapFocus);

// ===== HYBRID THROTTLE + DEBOUNCE UTILITY =====
const throttleDebounce = (func, throttleLimit = 150, debounceDelay = 200) => {
    let inThrottle = false;
    let timeoutId;

    return (...args) => {
        // Throttle: run immediately if not in throttle window
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, throttleLimit);
        }

        // Debounce: schedule another run after user stops scrolling/resizing
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), debounceDelay);
    };
};