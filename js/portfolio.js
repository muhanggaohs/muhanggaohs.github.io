const year = document.getElementById("year");
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const profileTrigger = document.querySelector(".profile-trigger");
const profileDialog = document.querySelector(".profile-dialog");
const dialogClose = document.querySelector(".dialog-close");
const savedTheme = localStorage.getItem("theme");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
  themeLabel.textContent = dark ? "Dark" : "Light";
}

setTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", nextTheme);
  setTheme(nextTheme);
});
year.textContent = new Date().getFullYear();

profileTrigger.addEventListener("click", () => profileDialog.showModal());
dialogClose.addEventListener("click", () => profileDialog.close());
profileDialog.addEventListener("click", (event) => {
  if (event.target === profileDialog) profileDialog.close();
});

const commands = document.querySelectorAll(".typed-command");
const reveals = document.querySelectorAll(".terminal-reveal");
const clearLine = document.querySelector(".clear-line");
const reveal = (selector) => document.querySelectorAll(selector).forEach((element) => element.classList.add("is-visible"));
const typeCommand = (element, done) => {
  const text = element.dataset.text;
  let position = 0;
  const type = () => {
    element.textContent = text.slice(0, position++);
    if (position <= text.length) window.setTimeout(type, 65);
    else window.setTimeout(done, 350);
  };
  type();
};

const runTerminal = () => {
  commands.forEach((command) => { command.textContent = ""; });
  reveals.forEach((element) => element.classList.remove("is-visible"));
  window.setTimeout(() => typeCommand(commands[0], () => {
    reveal(".reveal-first");
    window.setTimeout(() => {
      reveal(".reveal-second");
      typeCommand(commands[1], () => {
        reveal(".reveal-third");
        window.setTimeout(() => clearLine.classList.add("is-visible"), 2400);
      });
    }, 520);
  }), 360);
};

runTerminal();
window.setInterval(runTerminal, 10500);

const filterButtons = document.querySelectorAll(".work-filters button");
const projects = document.querySelectorAll(".project");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    projects.forEach((project) => {
      project.hidden = filter !== "all" && project.dataset.category !== filter;
    });
  });
});
