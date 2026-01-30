// script.js (MODULE VERSION) ✅
import { config } from "./config.js";
import { applyTheme } from "./theme.js";

// Apply theme + set page title ASAP
applyTheme();
document.title = config?.pageTitle || "Valentine 💝";

// ---------------------------
// Validate configuration
// ---------------------------
function validateConfig() {
  const warnings = [];

  // Validate colors
  const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  if (config.colors) {
    Object.entries(config.colors).forEach(([key, value]) => {
      if (!isValidHex(value)) {
        warnings.push(`Invalid color for ${key}! Using default.`);
        config.colors[key] = getDefaultColor(key);
      }
    });
  }

  // Validate animation values
  if (config.animations?.floatDuration) {
    const dur = parseFloat(config.animations.floatDuration);
    if (!Number.isNaN(dur) && dur < 5) {
      warnings.push("Float duration too short! Setting to 5s minimum.");
      config.animations.floatDuration = "5s";
    }
  }

  if (typeof config.animations?.heartExplosionSize === "number") {
    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
      warnings.push("Heart explosion size should be between 1 and 3! Using default.");
      config.animations.heartExplosionSize = 1.5;
    }
  }

  // Log warnings if any
  if (warnings.length > 0) {
    console.warn("⚠️ Configuration Warnings:");
    warnings.forEach((warning) => console.warn("- " + warning));
  }
}

// Default color values
function getDefaultColor(key) {
  const defaults = {
    backgroundStart: "#ffafbd",
    backgroundEnd: "#ffc3a0",
    buttonBackground: "#ff6b6b",
    buttonHover: "#ff8787",
    textColor: "#ff4757",
  };
  return defaults[key];
}

// ---------------------------
// DOM init
// ---------------------------
window.addEventListener("DOMContentLoaded", () => {
  validateConfig();

  // Helper to safely set text
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el && typeof text === "string") el.textContent = text;
  };

  // Set texts from config
  setText("valentineTitle", `${config.valentineName}, my love...`);

  // First question texts
  setText("question1Text", config.questions?.first?.text);
  setText("yesBtn1", config.questions?.first?.yesBtn);
  setText("noBtn1", config.questions?.first?.noBtn);
  setText("secretAnswerBtn", config.questions?.first?.secretAnswer);

  // Second question texts
  setText("question2Text", config.questions?.second?.text);
  setText("startText", config.questions?.second?.startText);
  setText("nextBtn", config.questions?.second?.nextBtn);

  // Third question texts
  setText("question3Text", config.questions?.third?.text);
  setText("yesBtn3", config.questions?.third?.yesBtn);
  setText("noBtn3", config.questions?.third?.noBtn);

  // Create initial floating elements
  createFloatingElements();

  // Setup music player
  setupMusicPlayer();

  // Initialize love meter (only if the elements exist)
  setInitialPosition();
});

// ---------------------------
// Floating hearts and bears
// ---------------------------
function createFloatingElements() {
  const container = document.querySelector(".floating-elements");
  if (!container) return;

  // Create hearts
  (config.floatingEmojis?.hearts || []).forEach((heartEmoji) => {
    const div = document.createElement("div");
    div.className = "heart";
    div.innerHTML = heartEmoji;
    setRandomPosition(div);
    container.appendChild(div);
  });

  // Create bears
  (config.floatingEmojis?.bears || []).forEach((bearEmoji) => {
    const div = document.createElement("div");
    div.className = "bear";
    div.innerHTML = bearEmoji;
    setRandomPosition(div);
    container.appendChild(div);
  });
}

// Set random position for floating elements
function setRandomPosition(element) {
  element.style.left = Math.random() * 100 + "vw";
  element.style.animationDelay = Math.random() * 5 + "s";

  // If you want to use config.animations.floatDuration, you can.
  // Otherwise keep your original random duration:
  element.style.animationDuration = 10 + Math.random() * 20 + "s";
}

// ---------------------------
// Navigation between questions
// ---------------------------
function showNextQuestion(questionNumber) {
  document.querySelectorAll(".question-section").forEach((q) => q.classList.add("hidden"));
  const next = document.getElementById(`question${questionNumber}`);
  if (next) next.classList.remove("hidden");
}

// Move the "No" button
function moveButton(button) {
  const x = Math.random() * (window.innerWidth - button.offsetWidth);
  const y = Math.random() * (window.innerHeight - button.offsetHeight);
  button.style.position = "fixed";
  button.style.left = x + "px";
  button.style.top = y + "px";
}

// ---------------------------
// Love meter
// ---------------------------
const loveMeter = document.getElementById("loveMeter");
const loveValue = document.getElementById("loveValue");
const extraLove = document.getElementById("extraLove");

function setInitialPosition() {
  if (!loveMeter || !loveValue) return;
  loveMeter.value = 100;
  loveValue.textContent = "100";
  loveMeter.style.width = "100%";
}

if (loveMeter) {
  loveMeter.addEventListener("input", () => {
    if (!loveValue) return;

    const value = parseInt(loveMeter.value, 10);
    loveValue.textContent = String(value);

    // If you don't have loveMessages in config, provide defaults so it won't crash
    const loveMessages = config.loveMessages || {
      normal: "Aww 🥹",
      high: "Okay wow 😳💕",
      extreme: "MAXIMUM LOVE MODE 🥵💘",
    };

    if (value > 100) {
      if (extraLove) {
        extraLove.classList.remove("hidden");
      }

      const overflowPercentage = (value - 100) / 9900;
      const extraWidth = overflowPercentage * window.innerWidth * 0.8;
      loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
      loveMeter.style.transition = "width 0.3s";

      if (extraLove) {
        // Show different messages based on the value
        if (value >= 5000) {
          extraLove.classList.add("super-love");
          extraLove.textContent = loveMessages.extreme;
        } else if (value > 1000) {
          extraLove.classList.remove("super-love");
          extraLove.textContent = loveMessages.high;
        } else {
          extraLove.classList.remove("super-love");
          extraLove.textContent = loveMessages.normal;
        }
      }
    } else {
      if (extraLove) {
        extraLove.classList.add("hidden");
        extraLove.classList.remove("super-love");
      }
      loveMeter.style.width = "100%";
    }
  });
}

// (Optional) keep these if you want extra safety:
window.addEventListener("load", setInitialPosition);

// ---------------------------
// Celebration
// ---------------------------
function celebrate() {
  document.querySelectorAll(".question-section").forEach((q) => q.classList.add("hidden"));
  const celebrationEl = document.getElementById("celebration");
  if (celebrationEl) celebrationEl.classList.remove("hidden");

  // Set celebration messages
  const c = config.celebration || {};
  const title = c.title || "Yay!";
  const message = c.message || ""; // your config currently doesn't include message, so this won't crash
  const emojis = c.emojis || "💖";

  const titleEl = document.getElementById("celebrationTitle");
  const msgEl = document.getElementById("celebrationMessage");
  const emojisEl = document.getElementById("celebrationEmojis");

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;
  if (emojisEl) emojisEl.textContent = emojis;

  createHeartExplosion();
}

// Heart explosion animation
function createHeartExplosion() {
  const container = document.querySelector(".floating-elements");
  if (!container) return;

  const hearts = config.floatingEmojis?.hearts || ["❤️"];
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement("div");
    const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
    heart.innerHTML = randomHeart;
    heart.className = "heart";
    container.appendChild(heart);
    setRandomPosition(heart);
  }
}

// ---------------------------
// Music Player
// ---------------------------
function setupMusicPlayer() {
  const musicControls = document.getElementById("musicControls");
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const musicSource = document.getElementById("musicSource");

  // If any missing, bail out quietly
  if (!musicControls || !musicToggle || !bgMusic || !musicSource) return;

  // Only show controls if music is enabled in config
  if (!config.music?.enabled) {
    musicControls.style.display = "none";
    return;
  }

  // Set music source and volume
  musicSource.src = config.music.musicUrl || "";
  bgMusic.volume = typeof config.music.volume === "number" ? config.music.volume : 0.5;
  bgMusic.load();

  // Try autoplay if enabled
  if (config.music.autoplay) {
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log("Autoplay prevented by browser");
        musicToggle.textContent = config.music.startText || "Play music";
      });
    }
  } else {
    musicToggle.textContent = config.music.startText || "Play music";
  }

  // Toggle music on button click
  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.textContent = config.music.stopText || "Stop music";
    } else {
      bgMusic.pause();
      musicToggle.textContent = config.music.startText || "Play music";
    }
  });
}

// ---------------------------
// Make functions available to HTML onclick=""
//
// If your HTML uses onclick="showNextQuestion(2)" etc,
// you need these on window in module mode.
// ---------------------------
window.showNextQuestion = showNextQuestion;
window.moveButton = moveButton;
window.celebrate = celebrate;
