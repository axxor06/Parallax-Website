const text = document.getElementById("text");
const leaf = document.getElementById("leaf");
const hill4 = document.getElementById("hill4");
const hill5 = document.getElementById("hill5");
const hill1 = document.getElementById("hill1");

const aboutHill = document.querySelector(".about-hill img");

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

let ticking = false;

function updateParallax() {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector(".parallax").offsetHeight;

    const heroScroll = Math.min(scrollY, heroHeight);

    text.style.transform =
        `translate(-50%, calc(-50% + ${heroScroll * 0.55}px))`;

    leaf.style.transform =
        `translateX(${heroScroll * 0.22}px)`;

    hill5.style.transform =
        `translateX(${heroScroll * 0.08}px)`;

    hill4.style.transform =
        `translateX(${-heroScroll * 0.10}px)`;

    hill1.style.transform =
        `translateY(${heroScroll * 0.18}px)`;

    if (aboutHill) {
        const aboutSection = document.getElementById("about");
        const aboutTop = aboutSection.offsetTop;
        const aboutProgress = scrollY - aboutTop;

        if (aboutProgress > -window.innerHeight && aboutProgress < aboutSection.offsetHeight) {
            aboutHill.style.transform =
                `translate(-50%, ${aboutProgress * -0.18}px)`;
        }
    }

    updateNavigation();

    ticking = false;
}

function updateNavigation() {
    const scrollPosition = window.scrollY + window.innerHeight * 0.35;

    let currentSection = "home";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        const target = link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });


navLinks.forEach(link => {
    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


window.addEventListener("load", updateParallax);
window.addEventListener("resize", updateParallax);