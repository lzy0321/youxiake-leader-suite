const overviewCard = document.querySelector("#overviewCard");
const profileCard = document.querySelector(".profile-card");
const overviewToggle = document.querySelector("#overviewToggle");
const overviewBody = document.querySelector("#overviewBody");
const collapsedSummary = document.querySelector("#collapsedSummary");
const toast = document.querySelector("#toast");
const storageKey = "leader-home-overview-state-v1";
const todayKey = new Date().toLocaleDateString("zh-CN", { timeZone: "Asia/Shanghai" });

let demoInTrip = false;
let toastTimer = null;
let activeOverviewPanel = "data";

// 将身份、积分和年度概况组合成首页顶部的一张完整数据卡。
profileCard.append(overviewCard);

function readDailyState() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    return stored?.date === todayKey ? stored : null;
  } catch {
    return null;
  }
}

function writeDailyState(next) {
  localStorage.setItem(storageKey, JSON.stringify({ date: todayKey, ...next }));
}

function currentState() {
  const stored = readDailyState();
  return {
    overviewExpanded: stored?.overviewExpanded ?? !demoInTrip
  };
}

function applyOverview(expanded, persist = true) {
  const state = currentState();
  overviewToggle.setAttribute("aria-expanded", String(expanded));
  overviewBody.hidden = !expanded;
  collapsedSummary.hidden = expanded;
  overviewToggle.querySelector(".overview-action").innerHTML = expanded ? "收起 <i>⌃</i>" : "展开 <i>⌄</i>";
  overviewCard.classList.toggle("is-collapsed", !expanded);
  if (persist) writeDailyState({ ...state, overviewExpanded: expanded });
}

function resetForTripMode(inTrip) {
  demoInTrip = inTrip;
  localStorage.removeItem(storageKey);
  applyOverview(!inTrip, true);
  document.querySelectorAll(".demo-button").forEach(button => {
    button.classList.toggle("active", (button.dataset.trip === "on") === inTrip);
  });
  showToast(inTrip ? "已模拟行程中：年度概况自动折叠" : "已模拟无行程：年度概况自动全览");
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

overviewToggle.addEventListener("click", () => {
  applyOverview(overviewToggle.getAttribute("aria-expanded") !== "true");
});
collapsedSummary.addEventListener("click", () => applyOverview(true));

document.querySelectorAll(".overview-tab").forEach(button => {
  button.addEventListener("click", () => {
    activeOverviewPanel = button.dataset.panel;
    document.querySelectorAll(".overview-tab").forEach(tab => {
      const active = tab === button;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll("[data-panel-content]").forEach(panel => {
      const active = panel.dataset.panelContent === activeOverviewPanel;
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });
  });
});

document.querySelectorAll(".demo-button").forEach(button => {
  button.addEventListener("click", () => resetForTripMode(button.dataset.trip === "on"));
});

document.addEventListener("click", event => {
  const link = event.target.closest("[data-href]");
  if (link) {
    window.location.href = link.dataset.href;
    return;
  }
  const action = event.target.closest("[data-toast]");
  if (action) showToast(action.dataset.toast);
});

document.querySelectorAll(".filters button").forEach(button => {
  button.addEventListener("click", () => button.classList.toggle("selected"));
});

document.querySelector("#searchButton").addEventListener("click", () => {
  const keyword = document.querySelector("#tripSearch").value.trim();
  showToast(keyword ? `正在搜索“${keyword}”` : "请输入线路名称");
});

const initial = currentState();
applyOverview(initial.overviewExpanded, false);
