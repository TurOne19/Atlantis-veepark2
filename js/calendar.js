const grid = document.getElementById("calendarGrid");
const monthLabel = document.getElementById("calMonth");

const prev = document.getElementById("calPrev");
const next = document.getElementById("calNext");

const months = [
  "Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni",
  "Juuli","August","September","Oktoober","November","Detsember"
];

let date = new Date(2026, 0);

/* РАСПИСАНИЕ */
const schedule = {
  default: "normal",
  lateDays: [13,20,27],
};

function render() {
  grid.innerHTML = "";
  const y = date.getFullYear();
  const m = date.getMonth();

  monthLabel.textContent = `${months[m]} ${y}`;

  const firstDay = new Date(y, m, 1).getDay() || 7;
  const days = new Date(y, m + 1, 0).getDate();

  for (let i = 1; i < firstDay; i++) {
    grid.innerHTML += `<div class="calendar-day empty"></div>`;
  }

  for (let d = 1; d <= days; d++) {
    let type = schedule.default;
    if (schedule.lateDays.includes(d)) type = "late";

    grid.innerHTML += `<div class="calendar-day ${type}">${d}</div>`;
  }
}

prev.onclick = () => {
  date.setMonth(date.getMonth() - 1);
  render();
};

next.onclick = () => {
  date.setMonth(date.getMonth() + 1);
  render();
};

render();
