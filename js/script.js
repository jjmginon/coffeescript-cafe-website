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