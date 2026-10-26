const periodData = {
  month: [
    { label: "2026年10月", trips: 6, guests: 86, days: 14, hint: "统计本月已结束团期" },
    { label: "2026年9月", trips: 8, guests: 103, days: 19, hint: "统计当月已结束团期" },
    { label: "2026年8月", trips: 7, guests: 94, days: 17, hint: "统计当月已结束团期" }
  ],
  year: [
    { label: "2026年", trips: 63, guests: 812, days: 148, hint: "统计本年度已结束团期" },
    { label: "2025年", trips: 71, guests: 936, days: 172, hint: "统计当年已结束团期" },
    { label: "2024年", trips: 58, guests: 741, days: 139, hint: "统计当年已结束团期" }
  ],
  total: [
    { label: "全部时间", trips: 286, guests: 3680, days: 694, hint: "统计成为领队以来的全部已结束团期" }
  ]
};

const guests = [
  { name: "阿布", count: 8, colors: ["#ff8f79", "#d15571"] },
  { name: "小鹿", count: 7, colors: ["#55c7a4", "#27899b"] },
  { name: "石头", count: 6, colors: ["#60a8ed", "#5865c7"] },
  { name: "山茶", count: 5, colors: ["#f3bd55", "#d87937"] },
  { name: "夏至", count: 5, colors: ["#af7be9", "#6f5bc5"] },
  { name: "一木", count: 4, colors: ["#4cb7c5", "#3575a7"] },
  { name: "米粒", count: 4, colors: ["#f18c62", "#bd5c49"] },
  { name: "青禾", count: 3, colors: ["#72bd65", "#3d8a6d"] },
  { name: "小满", count: 3, colors: ["#e798bf", "#a65c98"] },
  { name: "北北", count: 3, colors: ["#7f96dc", "#595bab"] }
];

const leaders = [
  { name: "长风", displayName: "杭州站-长风", count: 12, colors: ["#5c90d8", "#3456a0"] },
  { name: "汽水", displayName: "郑州站-汽水", count: 10, colors: ["#f28c78", "#ba4f6e"] },
  { name: "太阳花", displayName: "成都站-太阳花", count: 9, colors: ["#eebf4f", "#dc7c35"] },
  { name: "知与", displayName: "苏州站-知与", count: 7, colors: ["#54bd9b", "#397d88"] },
  { name: "考拉", displayName: "南京站-考拉", count: 6, colors: ["#9a7dde", "#5e55ac"] }
];

const milestones = [
  { name: "北京站-山风", count: 50, initial: "山" },
  { name: "杭州站-阿布", count: 100, initial: "阿" },
  { name: "苏州站-小鹿", count: 300, initial: "鹿" }
];

let activePeriod = "year";
const periodIndices = { month: 0, year: 0, total: 0 };
let milestoneIndex = 0;
let toastTimer = null;
let milestoneTimer = null;

function renderPeople(target, people, suffix) {
  document.querySelector(target).innerHTML = people.map(person => `
    <div class="person">
      <span class="person-avatar" style="--avatar-a:${person.colors[0]};--avatar-b:${person.colors[1]}">${person.name.slice(0, 1)}</span>
      <strong>${person.displayName ?? person.name}</strong>
      <small>${person.count}${suffix}</small>
    </div>
  `).join("");
}

function renderPeriod() {
  const data = periodData[activePeriod][periodIndices[activePeriod]];
  document.querySelector("#periodLabel").textContent = data.label;
  document.querySelector("#tripCount").innerHTML = `${data.trips}<em>次</em>`;
  document.querySelector("#guestCount").innerHTML = `${data.guests}<em>人</em>`;
  document.querySelector("#dayCount").innerHTML = `${data.days}<em>天</em>`;
  document.querySelector("#periodHint").textContent = data.hint;
  const disabled = activePeriod === "total";
  document.querySelector("#periodPrev").hidden = disabled;
  document.querySelector("#periodNext").hidden = disabled;
}

function renderMilestone() {
  const item = milestones[milestoneIndex];
  document.querySelector("#milestoneAvatar").textContent = item.initial;
  document.querySelector("#milestoneName").textContent = item.name;
  document.querySelector("#milestoneText").textContent = `完成第 ${item.count} 次带团`;
  document.querySelector("#milestonePage").textContent = `${milestoneIndex + 1}/${milestones.length}`;
  document.querySelector("#milestoneDots").innerHTML = milestones.map((_, index) => `<i class="${index === milestoneIndex ? "active" : ""}"></i>`).join("");
}

function showToast(message) {
  clearTimeout(toastTimer);
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll(".period-tab").forEach(button => {
  button.addEventListener("click", () => {
    activePeriod = button.dataset.period;
    document.querySelectorAll(".period-tab").forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    renderPeriod();
  });
});

document.querySelector("#periodPrev").addEventListener("click", () => {
  const nextIndex = Math.min(periodIndices[activePeriod] + 1, periodData[activePeriod].length - 1);
  if (nextIndex === periodIndices[activePeriod]) return showToast("暂无更早数据");
  periodIndices[activePeriod] = nextIndex;
  renderPeriod();
});
document.querySelector("#periodNext").addEventListener("click", () => {
  const nextIndex = Math.max(periodIndices[activePeriod] - 1, 0);
  if (nextIndex === periodIndices[activePeriod]) return showToast("已是最新周期");
  periodIndices[activePeriod] = nextIndex;
  renderPeriod();
});

function moveMilestone(direction, manual = false) {
  milestoneIndex = (milestoneIndex + direction + milestones.length) % milestones.length;
  if (manual) clearInterval(milestoneTimer);
  renderMilestone();
}

document.querySelector("#milestonePrev").addEventListener("click", () => moveMilestone(-1, true));
document.querySelector("#milestoneNext").addEventListener("click", () => moveMilestone(1, true));
document.querySelector("#backButton").addEventListener("click", () => { window.location.href = "./index.html"; });

document.addEventListener("click", event => {
  const action = event.target.closest("[data-toast]");
  if (action) showToast(action.dataset.toast);
});

renderPeople("#guestList", guests, "次同行");
renderPeople("#leaderList", leaders, "次合作");
renderPeriod();
renderMilestone();
milestoneTimer = setInterval(() => moveMilestone(1), 5000);
