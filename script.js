const PROJECTS = [
  {
    id: 1,
    title: "Netflix Clone UI",
    tag: "web",
    desc: "Responsive UI built with HTML & CSS. Hosted on GitHub Pages.",
    link: "#",
  },
  {
    id: 2,
    title: "To-Do List App",
    tag: "utility",
    desc: "Add, edit, remove tasks. Uses localStorage for persistence.",
    link: "#",
  },
  {
    id: 3,
    title: "Electricity Bot",
    tag: "utility",
    desc: "Telegram bot to fetch electricity balance using Python & Selenium.",
    link: "#",
  },
  {
    id: 4,
    title: "Study Planner",
    tag: "web",
    desc: "Planner UI with local storage tasks and progress view.",
    link: "#",
  },
];
let activeFilter = "all";
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";
  const sort = document.getElementById("sort").value;
  let list = [...PROJECTS];
  if (sort === "name") list.sort((a, b) => a.title.localeCompare(b.title));
  else list.sort((a, b) => b.id - a.id);
  if (activeFilter !== "all") list = list.filter((p) => p.tag === activeFilter);
  list.forEach((p) => {
    const el = document.createElement("div");
    el.className = "project";
    el.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;
    el.onclick = () => openModal(p);
    grid.appendChild(el);
  });
}
function applyFilter(tag) {
  activeFilter = tag;
  renderProjects();
}
function openModal(p) {
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalMeta").textContent = "Category: " + p.tag;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalLinks").innerHTML = `<a class="btn" href="${p.link}" target="_blank">Open demo / repo</a>`;
  document.getElementById("modalBack").style.display = "flex";
}
function closeModal(e) {
  if (e && e.target && e.target.id !== "modalBack") return;
  document.getElementById("modalBack").style.display = "none";
}
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !subject || !message)
    return alert("Sab fields bharein");
  const messages = JSON.parse(
    localStorage.getItem("portfolio_messages") || "[]"
  );
  messages.push({
    id: Date.now(),
    name,
    email,
    subject,
    message,
    date: new Date().toISOString(),
  });
  localStorage.setItem("portfolio_messages", JSON.stringify(messages));
  alert("Message saved locally.");
  document.getElementById("contactForm").reset();
}
function showMessages() {
  const messages = JSON.parse(
    localStorage.getItem("portfolio_messages") || "[]"
  );
  if (messages.length === 0) return alert("Koi saved message nahi mila.");
  let list = messages
    .map(
      (m) =>
        `● ${m.name} • ${new Date(m.date).toLocaleString()}\n   ${
          m.subject
        }\n   ${m.message}`
    )
    .join("\n\n");
  alert("Saved messages:\n\n" + list);
}
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  const fromTop = window.scrollY + 80;
  navLinks.forEach((link) => {
    const sec = document.querySelector(link.getAttribute("href"));
    if (!sec) return;
    link.classList.toggle(
      "active",
      sec.offsetTop <= fromTop && sec.offsetTop + sec.offsetHeight > fromTop
    );
  });
});
renderProjects();
