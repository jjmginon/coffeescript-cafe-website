// ===== MOBILE MENU TOGGLE LOGIC =====
const header = document.querySelector("header");
const menuBtn = document.querySelector("#menu-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");
const firstNavLink = document.querySelector("#primary-nav a");
const primaryNav = document.querySelector("#primary-nav");

const updateMenuState = (isOpen) => {
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    primaryNav.setAttribute("aria-hidden", String(!isOpen));

    // Keep menuBtn as "Open menu" only
    menuBtn.setAttribute("aria-label", "Open menu");
    closeMenuBtn.setAttribute("aria-label", "Close menu");

    // Toggle tabindex for nav links
    const navLinks = primaryNav.querySelectorAll("a");
    navLinks.forEach(link => {
        if (isOpen) {
            link.removeAttribute("tabindex"); // restore natural tab order
        } else {
            link.setAttribute("tabindex", "-1"); // remove from tab order
        }
    });
};

menuBtn.addEventListener("click", () => {
    const isOpen = header.classList.toggle("show-mobile-menu");
    updateMenuState(isOpen);

    if (isOpen && firstNavLink) {
        navFocusTrap.enable();
        firstNavLink.focus();
    } else {
        navFocusTrap.disable();
    }
});

closeMenuBtn.addEventListener("click", () => {
    header.classList.remove("show-mobile-menu");
    updateMenuState(false);
    navFocusTrap.disable();
    menuBtn.focus();
});

// ===== BACK-TO-TOP BUTTON VISIBILITY AND SCROLL BEHAVIOR =====
const backToTop = document.getElementById("backToTop");

const toggleBackToTop = () => {
    if (!backToTop) return;

    // Use fixed threshold for consistency
    const threshold = 200; // pixels scrolled before showing button

    backToTop.classList.toggle("show", window.scrollY > threshold);
};

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
        updateMenuState(false);
        navFocusTrap.disable();
        menuBtn.focus();
    }
});

// ===== REUSABLE FOCUS TRAP HELPER =====
const createFocusTrap = (container) => {
    const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const trap = (e) => {
        if (e.key !== "Tab") return;

        const focusableElements = container.querySelectorAll(focusableSelectors);
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    };

    return {
        enable: () => document.addEventListener("keydown", trap),
        disable: () => document.removeEventListener("keydown", trap)
    };
};

// Create a focus trap specifically for the nav
const navContainer = document.querySelector(".nav-container");
const navFocusTrap = createFocusTrap(navContainer);

// ===== HYBRID THROTTLE + DEBOUNCE UTILITY =====
const throttleDebounce = (func, throttleLimit = 150, debounceDelay = 200) => {
    let lastCall = 0;
    let timeoutId;

    return (...args) => {
        const now = performance.now(); // swapped from Date.now()

        // Throttle: run if enough time has passed
        if (now - lastCall >= throttleLimit) {
            func.apply(this, args);
            lastCall = now;
        }

        // Debounce: always schedule a final run
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), debounceDelay);
    };
};

// ===== MENU STATE SYNC ON RESIZE =====
const syncMenuStateOnResize = () => {
    if (window.innerWidth >= 768) {
        header.classList.remove("show-mobile-menu");
        menuBtn.setAttribute("aria-expanded", "false");
        closeMenuBtn.setAttribute("aria-expanded", "false");
        primaryNav.removeAttribute("aria-hidden");
        navFocusTrap.disable();
    } else {
        updateMenuState(false);
    }
};

// Use throttleDebounce to optimize resize handling
window.addEventListener("resize", throttleDebounce(syncMenuStateOnResize));
window.addEventListener("load", syncMenuStateOnResize);