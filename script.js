/* ---- DATA: yahan apni details badalni hain ---- */
const skills = [
  {group:"Data Analysis", items:["SQL","Excel"]},
  {group:"Visualization", items:["Power BI","Tableau"]},
  {group:"Soft Skills", items:["Communication","Attention to Detail","Teamwork","Adaptability","Curiosity"]},
  {group:"Digital Skills", items:["Computer Handling","Google Search","Prompt Writing"]}
];
const projects = [
  {tool:"Power BI", title:"WOW Momo Store Sales Dashboard", sub:"Sales performance dashboard",
   desc:"Interactive dashboard tracking sales, top-selling items and trends for a momo store.",
   tags:["Power BI","DAX","Excel"], link:"https://github.com/saad-git26/wow-momo-sales-dashboard"},
  {tool:"Tableau", title:"Snitch Sales Dashboard", sub:"Fashion sales analysis",
   desc:"Tableau dashboard analysing sales by category, region and time period.",
   tags:["Tableau","Excel"], link:""},
  {tool:"Python", title:"Python Project", sub:"Coming soon",
   desc:"Currently working on a data analysis project using Pandas and Matplotlib.",
   tags:["Python","Pandas","Matplotlib"], link:""}
];
const education = [
  {deg:"B.Sc", where:"Lal Bahadur Shastri College, Satara", year:"2018", mark:"First Class"},
  {deg:"12th (HSC)", where:"Lal Bahadur Shastri College, Satara", year:"2014", mark:"Second Class"},
  {deg:"10th (SSC)", where:"Maharaja Sayajirao Vidyalaya, Satara", year:"2012", mark:"First Class"}
];

/* ---- Render ---- */
// Skills: tree design. wire = Diwali-light wali line, leaf = ek pill + uski connector line
document.getElementById("skill-list").innerHTML = skills.map(g =>
  `<div class="tree"><h3>${g.group}</h3><div class="wire v"></div>
   <div class="branches">${g.items.map(i=>`<div class="leaf"><div class="pill-box">${i}</div></div>`).join("")}</div></div>`).join("");

document.getElementById("project-list").innerHTML = projects.map(p =>
  `<article class="card proj"><span class="pill">${p.tool}</span><h3>${p.title}</h3>
   <p class="muted">${p.sub}</p><p>${p.desc}</p>
   <div class="chips">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
   ${p.link?`<a class="btn ghost gh" href="${p.link}" target="_blank">GitHub</a>`:""}</article>`).join("");

document.getElementById("edu-list").innerHTML = education.map(e =>
  `<div class="card tl-item"><h3>${e.deg} <span class="pill">${e.mark}</span></h3><p class="muted">${e.where} (${e.year})</p></div>`).join("");


/* ---- Dark mode (choice yaad rakhta hai) ---- */
const store = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
                set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
const root = document.documentElement, themeBtn = document.getElementById("theme");
const setTheme = t => { root.dataset.theme = t; themeBtn.textContent = t === "dark" ? "☀" : "☾"; store.set("theme", t); };
setTheme(store.get("theme") || "dark");
themeBtn.onclick = () => setTheme(root.dataset.theme === "dark" ? "light" : "dark");

/* ---- Mobile menu ---- */
const menu = document.getElementById("menu");
document.getElementById("burger").onclick = () => menu.classList.toggle("open");
menu.querySelectorAll("a").forEach(a => a.onclick = () => menu.classList.remove("open"));

/* ---- Active nav link ---- */
const links = [...menu.querySelectorAll("a")];
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id]").forEach(s => io.observe(s));

/* ---- Scroll progress bar ---- */
addEventListener("scroll", () => {
  const h = document.documentElement;
  document.getElementById("progress").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
});

document.getElementById("year").textContent = new Date().getFullYear();

/* ---- Scroll video: 240 frames ---- */
const FRAMES = 240, canvas = document.getElementById("bg"), ctx = canvas.getContext("2d");
const imgs = new Array(FRAMES);
let current = 0, target = 0;
function resizeCanvas() {
  const r = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * r; canvas.height = innerHeight * r;
  draw(Math.round(current));
}
function draw(i) {
  while (i > 0 && !(imgs[i] && imgs[i].complete)) i--;
  const im = imgs[i]; if (!im || !im.complete) return;
  const s = Math.max(canvas.width / im.width, canvas.height / im.height);
  const w = im.width * s, h = im.height * s;
  ctx.drawImage(im, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
}
function load(i) {
  const im = new Image();
  im.src = `frames/f${String(i + 1).padStart(3, "0")}.webp`;
  im.onload = () => { if (i === 0) draw(0); };
  imgs[i] = im;
}
for (let i = 0; i < FRAMES; i++) load(i);
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0;
  target = p * (FRAMES - 1);
}
function loop() {
  current += (target - current) * 0.15;
  if (Math.abs(target - current) < 0.01) current = target;
  draw(Math.round(current));
  requestAnimationFrame(loop);
}
addEventListener("scroll", onScroll, { passive: true });
addEventListener("resize", resizeCanvas);
resizeCanvas(); onScroll(); loop();
