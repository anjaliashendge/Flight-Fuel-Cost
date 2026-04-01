document.addEventListener("DOMContentLoaded", () => {
    const aircraftData = window.aircraftData;
    const manufacturer = document.getElementById("manufacturer");
    const aircraft = document.getElementById("aircraft");
    const toggle = document.getElementById("themeSwitch");
    const icon = document.getElementById("themeIcon");

    // Initialize Theme
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    if(icon) icon.textContent = savedTheme === "dark" ? "🌙" : "☀️";

    // Theme Toggle
    if(toggle) {
        toggle.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme");
            const newTheme = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            icon.textContent = newTheme === "dark" ? "🌙" : "☀️";
        });
    }

    // Aircraft Selection
    if(manufacturer) {
        manufacturer.addEventListener("change", () => {
            aircraft.innerHTML = '<option disabled selected>Select aircraft</option>';
            const selected = manufacturer.value;
            if (aircraftData[selected]) {
                Object.keys(aircraftData[selected]).forEach(model => {
                    const opt = document.createElement("option");
                    opt.value = model; opt.textContent = model;
                    aircraft.appendChild(opt);
                });
            }
        });
    }

    document.getElementById("flightForm")?.addEventListener("submit", () => {
        document.getElementById("loading").classList.remove("d-none");
    });
});