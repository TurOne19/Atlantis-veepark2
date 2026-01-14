/* =====================================================
   MAIN.JS
   Header · Burger · Language dropdown · Smooth scroll
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       BURGER MENU (MOBILE)
    ========================= */
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".main-nav");

    if (burger && nav) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
            burger.classList.toggle("active");
        });

        // Close menu on link click
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                burger.classList.remove("active");
            });
        });
    }

    /* =========================
       MOBILE NAV STYLES (JS-INJECT)
       чтобы не плодить CSS
    ========================= */
    const style = document.createElement("style");
    style.innerHTML = `
        @media (max-width: 768px) {
            .main-nav {
                position: absolute;
                top: 72px;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                gap: 20px;
                padding: 24px;
                display: none;
                box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                z-index: 999;
            }
            .main-nav.active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);

    /* =========================
       LANGUAGE DROPDOWN
    ========================= */
    const langToggle = document.querySelector(".lang-current");
    const langMenu = document.querySelector(".lang-menu");

    if (langToggle && langMenu) {
        langToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            langMenu.classList.toggle("open");
        });

        document.addEventListener("click", () => {
            langMenu.classList.remove("open");
        });

        langMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                langMenu.classList.remove("open");
            });
        });
    }

    /* =========================
       SMOOTH SCROLL (ANCHORS)
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;

            e.preventDefault();

            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

});
