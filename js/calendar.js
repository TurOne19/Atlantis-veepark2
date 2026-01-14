/* =====================================================
   CALENDAR.JS
   Atlantis H2O — Opening hours calendar
===================================================== */

/*
СТАТУСЫ:
- closed     → suletud
- short      → 10:00–18:00
- normal     → 10:00–22:00
- late       → 14:00–22:00
- extended   → 10:00–21:00
*/

const calendarConfig = {
    0: { default: "normal", special: { 1: "normal", 6: "late", 13: "late", 20: "late", 27: "late" } },
    1: { default: "normal", special: { 3: "late", 10: "late", 17: "late", 24: "late" } },
    2: { default: "normal", special: { 2: "late", 9: "late", 16: "late", 23: "late", 30: "late" } },
    3: { default: "normal", special: { 6: "late", 13: "late", 20: "late", 27: "late" } },
    4: { default: "normal", special: { 4: "late", 11: "late", 18: "late", 25: "late" } },
    5: { default: "normal" },
    6: { default: "normal" },
    7: { default: "normal", special: { 31: "extended" } },
    8: {
        default: "closed",
        special: {
            5: "late", 6: "normal", 7: "extended",
            12: "late", 13: "normal", 14: "extended",
            19: "late", 20: "normal", 21: "extended",
            26: "late", 27: "normal", 28: "extended"
        }
    },
    9: { default: "normal", special: { 4: "late", 31: "late" } },
    10: {
        default: "closed",
        special: {
            1: "normal", 2: "normal",
            8: "late", 9: "normal", 10: "normal",
            15: "late", 16: "normal", 17: "normal",
            22: "late", 23: "normal", 24: "normal",
            29: "late", 30: "normal"
        }
    },
    11: {
        default: "closed",
        special: {
            6: "late", 7: "normal", 8: "normal",
            13: "late", 14: "normal", 15: "normal",
            20: "late", 21: "normal", 22: "normal",
            25: "normal", 26: "normal", 27: "normal", 28: "normal"
        }
    }
};

const hoursMap = {
    closed: "Suletud",
    short: "10:00–18:00",
    normal: "10:00–22:00",
    late: "14:00–22:00",
    extended: "10:00–21:00"
};

const monthNames = [
    "Jaanuar", "Veebruar", "Märts", "Aprill",
    "Mai", "Juuni", "Juuli", "August",
    "September", "Oktoober", "November", "Detsember"
];

let currentDate = new Date();

const calendarMonth = document.getElementById("calendarMonth");
const calendarGrid = document.getElementById("calendarGrid");
const navButtons = document.querySelectorAll(".calendar-nav");

/* =====================================================
   RENDER CALENDAR
===================================================== */
function renderCalendar(date) {
    if (!calendarGrid || !calendarMonth) return;

    calendarGrid.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();

    calendarMonth.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay() || 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty cells before first day
    for (let i = 1; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "calendar-cell empty";
        calendarGrid.appendChild(emptyCell);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("div");
        const status =
            calendarConfig[month]?.special?.[day] ||
            calendarConfig[month]?.default ||
            "closed";

        cell.className = `calendar-cell ${status}`;
        cell.textContent = day;
        cell.title = hoursMap[status];

        calendarGrid.appendChild(cell);
    }
}

/* =====================================================
   NAVIGATION
===================================================== */
navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        currentDate.setMonth(
            currentDate.getMonth() + (action === "next" ? 1 : -1)
        );
        renderCalendar(currentDate);
    });
});

/* =====================================================
   INIT
===================================================== */
renderCalendar(currentDate);
