// ===== WAIT FOR NAV TO BE READY =====
document.addEventListener("navReady", () => {
    const header = document.querySelector("header");
    const menuBtn = document.querySelector("#menu-btn");
    const closeMenuBtn = document.querySelector("#close-menu-btn");
    const firstNavLink = document.querySelector("#primary-nav a");
    const primaryNav = document.querySelector("#primary-nav");

    const updateMenuState = (isOpen) => {
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        primaryNav.setAttribute("aria-hidden", String(!isOpen));

        menuBtn.setAttribute("aria-label", "Open menu");
        closeMenuBtn.setAttribute("aria-label", "Close menu");

        const navLinks = primaryNav.querySelectorAll("a");
        navLinks.forEach(link => {
            if (isOpen) {
                link.removeAttribute("tabindex");
            } else {
                link.setAttribute("tabindex", "-1");
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

    const navContainer = document.querySelector(".nav-container");
    const navFocusTrap = createFocusTrap(navContainer);

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

    window.addEventListener("resize", throttleDebounce(syncMenuStateOnResize));
    window.addEventListener("load", syncMenuStateOnResize);
});

// ===== BACK-TO-TOP BUTTON VISIBILITY AND SCROLL BEHAVIOR =====
const backToTop = document.getElementById("backToTop");

const CONFIG = {
    BACK_TO_TOP_THRESHOLD: 200,
    THROTTLE_LIMIT_MS: 150,
    DEBOUNCE_DELAY_MS: 200,
};

const toggleBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle("show", window.scrollY > CONFIG.BACK_TO_TOP_THRESHOLD);
};

if (backToTop) {
    window.addEventListener("scroll", toggleBackToTop);
    window.addEventListener("resize", toggleBackToTop);

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("load", toggleBackToTop);
}

// ===== HYBRID THROTTLE + DEBOUNCE UTILITY =====
const throttleDebounce = (func, throttleLimit = CONFIG.THROTTLE_LIMIT_MS, debounceDelay = CONFIG.DEBOUNCE_DELAY_MS) => {
    let lastCall = 0;
    let timeoutId;

    return (...args) => {
        const now = performance.now();

        if (now - lastCall >= throttleLimit) {
            func.apply(this, args);
            lastCall = now;
        }

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), debounceDelay);
    };
};