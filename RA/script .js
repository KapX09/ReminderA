// script.js

const waterMessages = [
  "Time to drink some water!",
  "Refill your bottle and sip it!",
  "Stay refreshed. Have a drink!",
  "Keep going — hydrate yourself!",
  "Small sips make a big difference."
];

const affirmations = [
  "You are doing great today!",
  "Keep smiling, you're amazing!",
  "Breathe. You're in control.",
  "You’ve got this!",
  "Shine your light, you matter."
];

const dailyTips = [
  "Take a moment to stretch every hour.",
  "Deep breaths reduce stress.",
  "A positive mindset boosts energy.",
  "Keep a gratitude journal.",
  "Smile often—it improves mood."
];

// Show messages in log
function showMessage(msg) {
  const log = document.getElementById("reminderLog");
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const p = document.createElement("p");
  p.textContent = `[${time}] ${msg}`;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
  incrementStreak();
}

// Motivation streak counter
let streak = 0;
function incrementStreak() {
  streak++;
  document.getElementById("streakCount").textContent = streak;
}

// Schedule reminders (simulated every 10 seconds for demo)
function scheduleReminders() {
  const totalReminders = 10; // 5 water + 5 affirmations
  const dayDurationMs = 12 * 60 * 60 * 1000; // 12 hours in ms
  const interval = dayDurationMs / totalReminders;

  for (let i = 1; i <= totalReminders; i++) {
    const delay = i * interval; // const delay = i * 10000; // 10 sec intervals
    setTimeout(() => {
      // Even index reminders are affirmations, odd are water messages
      const msg = i % 2 === 0
        ? affirmations[Math.floor(Math.random() * affirmations.length)]
        : waterMessages[Math.floor(Math.random() * waterMessages.length)];
      showMessage(msg);
    }, delay);
  }
}


// Greet user and show main app
function startApp() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) return alert("Enter your name.");
  document.getElementById("greetingSection").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");
  document.getElementById("greetingText").textContent = `Hi ${name}! Let’s keep you hydrated and positive today`;
  showDailyTip();
}

// Update live clock every second
function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
setInterval(updateClock, 1000);

// Show random daily tip
function showDailyTip() {
  const tip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
  document.getElementById("dailyTipText").textContent = tip;
}

// Reset app to initial state
function resetApp() {
  // Clear reminders and streak
  document.getElementById("reminderLog").innerHTML = "";
  streak = 0;
  document.getElementById("streakCount").textContent = 0;

  // Show greeting, hide main app
  document.getElementById("greetingSection").classList.remove("hidden");
  document.getElementById("mainApp").classList.add("hidden");

  // Clear input
  document.getElementById("nameInput").value = "";

  // Reset dark mode toggle and body class
  document.getElementById("themeToggle").checked = false;
  document.body.classList.remove("dark-mode");
  localStorage.removeItem("darkMode");
}

// Dark mode toggle handling
function toggleDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.removeItem("darkMode");
  }
}

// Initialize theme based on localStorage
function initTheme() {
  const saved = localStorage.getItem("darkMode");
  if (saved === "enabled") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggle").checked = true;
  }
}

// Event listeners on window load
window.onload = () => {
  initTheme();

  document.getElementById("startBtn").addEventListener("click", () => {
    showMessage("Reminders set for the day! will be shown here");
    scheduleReminders();
  });

  document.getElementById("resetBtn").addEventListener("click", resetApp);

  document.getElementById("themeToggle").addEventListener("change", e => {
    toggleDarkMode(e.target.checked);
  });
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker Registered'))
    .catch(err => console.log('Service Worker registration failed:', err));
}
