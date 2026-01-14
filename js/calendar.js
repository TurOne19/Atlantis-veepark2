const calendarGrid = document.getElementById("calendarGrid");
const calTitle = document.getElementById("calTitle");

const prevBtn = document.getElementById("calPrev");
const nextBtn = document.getElementById("calNext");

const monthNames = [
  "Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni",
  "Juuli","August","September","Oktoober","November","Detsember"
];

let current = new Date();

/* НАСТРОЙКА РАСПИСАНИЯ */
const rules = {
  default: "open",
  weekends: "late",
  closedMonths: [8,10,11] // september, november, december
};

function renderCalendar() {
  calendarGrid.innerHTML = "";

  const year = current.getFullYear();
  const month = current.getMonth();

  calTitle.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay() || 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i < firstDay; i++) {
    calendarGrid.innerHTML += `<div class="calendar-day empty"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    let status = rules.default;

    if (rules.closedMonths.includes(month)) status = "closed";
    if (date.getDay() === 6 || date.getDay() === 0) status = rules.weekends;

    calendarGrid.innerHTML += `
      <div class="calendar-day ${status}" title="${status}">
        ${day}
      </div>
    `;
  }
}

prevBtn.onclick = () => {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
};

nextBtn.onclick = () => {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
