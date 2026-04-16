const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;

    outline.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, { duration: 400, fill: "forwards" });
});

// Magnetic Hover Effect
const hoverItems = document.querySelectorAll('a, button, .card');
hoverItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
        outline.style.transform = "translate(-50%, -50%) scale(1.5)";
        outline.style.background = "rgba(212, 175, 55, 0.1)";
        outline.style.borderColor = "transparent";
    });
    item.addEventListener("mouseleave", () => {
        outline.style.transform = "translate(-50%, -50%) scale(1)";
        outline.style.background = "transparent";
        outline.style.borderColor = "#d4af37";
    });
});