"use strict";

const app = document.getElementById("app");
let practicals = [];
const unitNames = [
  "Java Fundamentals",
  "OOP Concepts",
  "Interfaces, Exceptions & Threads",
  "Strings, GUI & JDBC"
];

function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function shell(className) {
  const screen = make("section", "screen " + (className || ""));
  const wrap = make("div", "wrap");
  screen.append(wrap);
  app.replaceChildren(screen);
  return { screen, wrap };
}
function addHeading(parent, eyebrow, title, subtitle) {
  parent.append(make("div", "eyebrow", eyebrow), make("h1", "", title));
  if (subtitle) parent.append(make("p", "lead", subtitle));
}
function cardLink(href, number, title, description) {
  const link = make("a", "card list-card");
  link.href = href;
  link.append(make("span", "list-number", number));
  const copy = make("span");
  copy.append(make("h3", "", title), make("p", "", description));
  link.append(copy, make("span", "chevron", "›"));
  return link;
}
function updateDock(route) {
  const section = route.startsWith("unit/") ? "theory" :
    route.startsWith("practical/") ? "practicals" : route.split("/")[0] || "home";
  document.querySelectorAll(".dock a").forEach(link => {
    const active = link.dataset.nav === section;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}
function backButton(href) {
  const link = make("a", "back-button", "‹  Back");
  link.href = href;
  return link;
}
function renderHome() {
  const { wrap } = shell();
  const hero = make("section", "hero");
  hero.append(make("div", "eyebrow", "UGICT22J301  ·  JAVA"));
  hero.append(make("h1", "", "Understand Java. Build with confidence."));
  hero.append(make("p", "lead", "A focused study companion for core concepts, clear examples and practical programs."));
  const actions = make("div", "hero-actions");
  const theory = make("a", "button primary", "Explore theory");
  theory.href = "#theory";
  const practice = make("a", "button secondary", "View practicals");
  practice.href = "#practicals";
  actions.append(theory, practice);
  hero.append(actions);
  wrap.append(hero);

  const head = make("div", "section-head");
  const title = make("div");
  title.append(make("h2", "", "Your study path"), make("p", "", "Four units, then hands-on practice."));
  const more = make("a", "text-link", "All units  ›");
  more.href = "#theory";
  head.append(title, more);
  wrap.append(head);

  const grid = make("div", "grid");
  const tiles = [
    ["▤", "Theory units", "Four complete syllabus-aligned units.", "#theory"],
    ["⌘", "Java practicals", practicals.length + " programs with source and output.", "#practicals"],
    ["↗", "Works offline", "Add it to your Home Screen from Safari.", "#about"]
  ];
  tiles.forEach(([icon, titleText, desc, href]) => {
    const link = make("a", "card");
    link.href = href;
    const top = make("div", "card-top");
    top.append(make("span", "card-icon", icon), make("span", "chevron", "›"));
    link.append(top, make("h3", "", titleText), make("p", "", desc));
    grid.append(link);
  });
  wrap.append(grid);
}
function renderTheory() {
  const { wrap } = shell();
  addHeading(wrap, "UGICT22J301  ·  THEORY", "Theory units", "Work through the syllabus in four clear, self-contained lessons.");
  const list = make("div", "list");
  unitNames.forEach((title, index) => {
    list.append(cardLink("#unit/" + (index + 1), String(index + 1).padStart(2, "0"), title,
      "Read concepts, examples, comparisons and viva answers."));
  });
  wrap.append(list);
}
function renderUnit(number) {
  const index = number - 1;
  if (index < 0 || index >= unitNames.length) return renderTheory();
  const screen = make("section", "lesson-screen");
  const bar = make("div", "lesson-bar");
  bar.append(backButton("#theory"), make("span", "", "UNIT " + String(number).padStart(2, "0")));
  const frame = document.createElement("iframe");
  frame.className = "lesson-frame";
  frame.title = unitNames[index] + " lesson";
  frame.loading = "eager";
  frame.src = "./assets/theory/unit" + number + ".html";
  screen.append(bar, frame);
  app.replaceChildren(screen);
}
function renderPracticals() {
  const { wrap } = shell();
  addHeading(wrap, "UGICT22J301  ·  LAB", "Practical laboratory", "Choose a program to review its purpose, copy its Java source and check the expected output.");
  const list = make("div", "list");
  practicals.forEach((item, index) => {
    const title = item.title.replace(/^\d+\.\s*/, "");
    list.append(cardLink("#practical/" + (index + 1), String(index + 1).padStart(2, "0"), title, item.explanation));
  });
  wrap.append(list);
}
async function copyText(value, button) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
    } else {
      const input = document.createElement("textarea");
      input.value = value;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.append(input);
      input.select();
      const copied = document.execCommand("copy");
      input.remove();
      if (!copied) throw new Error("Copy failed");
    }
    button.textContent = "Copied";
  } catch {
    button.textContent = "Select code to copy";
  }
  window.setTimeout(() => { button.textContent = "Copy code"; }, 1600);
}
function renderPractical(number) {
  const index = number - 1;
  const item = practicals[index];
  if (!item) return renderPracticals();
  const { wrap } = shell();
  const head = make("div", "page-heading");
  head.append(backButton("#practicals"));
  const mark = make("div");
  mark.append(make("div", "eyebrow", "PRACTICAL " + String(number).padStart(2, "0") + " / " + practicals.length),
    make("h1", "detail-title", item.title.replace(/^\d+\.\s*/, "")));
  head.append(mark);
  wrap.append(head);

  wrap.append(make("div", "section-label", "OVERVIEW"));
  wrap.append(make("div", "card body-card", item.explanation));

  wrap.append(make("div", "section-label", "JAVA PROGRAM"));
  const codeCard = make("div", "card code-card");
  const codeHead = make("div", "code-head");
  codeHead.append(make("span", "", "JAVA  ·  SOURCE CODE"));
  const copy = make("button", "copy-button", "Copy code");
  copy.type = "button";
  copy.addEventListener("click", () => copyText(item.code, copy));
  codeHead.append(copy);
  const scroll = make("div", "code-scroll");
  scroll.setAttribute("role", "region");
  scroll.setAttribute("aria-label", "Scrollable Java source code");
  scroll.tabIndex = 0;
  const pre = make("pre");
  pre.append(make("code", "", item.code));
  scroll.append(pre);
  codeCard.append(codeHead, scroll);
  wrap.append(codeCard);

  wrap.append(make("div", "section-label", "EXPECTED OUTPUT"));
  const output = make("pre", "output");
  output.textContent = item.output;
  wrap.append(output);
}
function renderAbout() {
  const { wrap } = shell();
  addHeading(wrap, "ABOUT", "Made for learning Java", "A simple companion for studying the UGICT22J301 course.");
  const about = make("section", "card about-card");
  about.append(make("p", "credit", "Designed & Developed by Haris Shameem."));
  about.append(make("p", "", "Questions, feedback or a new connection? Reach out through any of these links."));
  const contacts = make("div", "contact-list");
  const links = [
    ["Gmail", "harryisfedup2@gmail.com", "https://mail.google.com/mail/?view=cm&fs=1&to=harryisfedup2%40gmail.com"],
    ["Instagram", "@harryisfedup", "https://www.instagram.com/harryisfedup/"],
    ["GitHub", "harryisfedup2", "https://github.com/harryisfedup2"]
  ];
  links.forEach(([label, value, href]) => {
    const link = make("a", "contact-link");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(make("span", "", label), make("strong", "", value));
    contacts.append(link);
  });
  about.append(contacts);
  wrap.append(about);

  const note = make("div", "install-note");
  note.textContent = "Install on iPhone: open this site in Safari, tap Share, then Add to Home Screen. It opens in its own window and lessons remain available offline after they have loaded once.";
  wrap.append(note);
}
function render() {
  const route = (location.hash.slice(1) || "home").replace(/^\/+/, "");
  updateDock(route);
  if (route === "home") renderHome();
  else if (route === "theory") renderTheory();
  else if (route === "practicals") renderPracticals();
  else if (route === "about") renderAbout();
  else if (/^unit\/\d+$/.test(route)) renderUnit(Number(route.split("/")[1]));
  else if (/^practical\/\d+$/.test(route)) renderPractical(Number(route.split("/")[1]));
  else { location.hash = "#home"; }
}
window.addEventListener("hashchange", render);
fetch("./practicals.json")
  .then(response => {
    if (!response.ok) throw new Error("Unable to load practicals");
    return response.json();
  })
  .then(data => {
    practicals = data;
    render();
  })
  .catch(() => {
    practicals = [];
    render();
    const screen = app.querySelector(".screen .wrap");
    if (screen) screen.append(make("p", "install-note", "Practical programs could not be loaded. Reopen the app while connected to the internet."));
  });
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
