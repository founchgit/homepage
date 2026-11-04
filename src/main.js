import "./style.css";
import { profile, categories, entries } from "./cv.js";

const escape = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const arrow = '<span aria-hidden="true">↗</span>';
const count = (n) => String(n).padStart(2, "0");
const categoryName = (id) =>
  categories.find((category) => category.id === id)?.label || "";
const safeUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
};

const disciplineDetails = {
  "sound-art": {
    subtitle: "SOUND ART & EXHIBITION",
    description:
      "소리와 공간, 매체의 관계를 다루는 전시와 사운드 디자인 작업입니다.",
  },
  performance: {
    subtitle: "MUSIC FOR THE STAGE",
    description:
      "뮤지컬과 연극의 장면을 따라 작곡, 편곡과 사운드 디자인을 이어갑니다.",
  },
  screen: {
    subtitle: "FILM, DRAMA & COMMERCIAL",
    description:
      "영화와 드라마, 브랜드 영상에 음악과 사운드로 참여한 작업입니다.",
    projects: ["humanoid-billy", "twinkling-watermelon", "omyung"],
  },
  records: {
    subtitle: "RECORDS & PRODUCTION",
    description:
      "Myvatn의 음악부터 아티스트와의 협업까지, 작곡과 음반 제작을 함께합니다.",
    projects: ["my-satan-book-ost", "myvatn-shake", "yunaone-tidal-mind"],
  },
  live: {
    subtitle: "LIVE & ARRANGEMENT",
    description: "공연과 콘서트에서 건반 연주와 편곡으로 함께한 무대입니다.",
  },
  post: {
    subtitle: "POST PRODUCTION",
    description:
      "영화의 사운드와 뮤지컬 실황 OST·DVD를 믹싱하며 장면의 소리를 다듬습니다.",
  },
  education: {
    subtitle: "TEACHING & RESEARCH",
    description:
      "음반 제작과 믹싱, 사운드 아트에 관한 경험을 강의와 연구로 나눕니다.",
  },
};

document.querySelector("#app").innerHTML = `
  <header class="site-header" id="top">
    <a class="wordmark" href="#top" aria-label="새벽소리 — 처음으로">새벽소리<span class="wordmark-dot" aria-hidden="true"></span></a>
    <span class="header-descriptor">정다운의 음악과 사운드</span>
    <button class="menu-toggle" aria-expanded="false" aria-controls="navigation" type="button"><span class="menu-label">메뉴</span><span class="menu-lines" aria-hidden="true"></span></button>
    <nav id="navigation" aria-label="주 메뉴">
      <a href="#selected">작업 <span>01</span></a>
      <a href="#about">소개 <span>02</span></a>
      <a href="#archive">아카이브 <span>03</span></a>
      <button class="nav-download" type="button" data-download>CV 다운로드 ${arrow}</button>
    </nav>
  </header>

  <main id="main">
    <section class="hero section-wrap" aria-labelledby="hero-title">
      <div class="hero-topline"><span class="eyebrow"><span class="live-dot" aria-hidden="true"></span> INDEPENDENT SOUND PRACTICE</span><span class="edition">PORTFOLIO / 2026</span></div>
      <div class="hero-heading"><h1 id="hero-title">소리로 짓는<br>장면과 감각<span class="title-stop">.</span></h1><div class="hero-index" aria-hidden="true"><span>( 정다운 )</span><span>ARTIST<br>COMPOSER<br>PRODUCER</span></div></div>
      <div class="hero-bottom"><p>공연의 장면에서 전시의 공간으로,<br>음반의 트랙에서 일상의 감각으로.<br>여러 매체를 오가며 소리의 가능성을 탐구합니다.</p><a class="round-link" href="#selected"><span>활동 분야 보기</span><span class="circle-arrow" aria-hidden="true">↓</span></a></div>
      <div class="hero-caption"><span>SOUND, IN MANY FORMS.</span><span>사운드 아트 · 작곡 · 프로듀싱 · 믹싱</span></div>
    </section>

    <section class="selected-section section-wrap" id="selected" aria-labelledby="selected-title">
      <div class="section-heading"><div><span class="section-number">01 / FIELDS OF PRACTICE</span><h2 id="selected-title">소리가 머무는 곳</h2></div><p>서로 다른 매체, 하나의 탐구.<br>활동 분야별로 작업을 만납니다.</p></div>
      <div class="discipline-tabs" role="tablist" aria-label="활동 분야">
        ${categories.map((category, i) => `<button class="discipline-tab" id="tab-${category.id}" type="button" role="tab" aria-selected="${i === 0}" aria-controls="panel-${category.id}" tabindex="${i === 0 ? 0 : -1}" data-discipline="${category.id}"><span>${escape(category.label)}</span><span class="discipline-tab-index" aria-hidden="true">${count(i + 1)}</span></button>`).join("")}
      </div>
      ${categories
        .map((category, i) => {
          const details = disciplineDetails[category.id];
          const categoryEntries = entries.filter(
            (entry) => entry.category === category.id,
          );
          const selectedEntries = details.projects
            ? details.projects
                .map((id) => categoryEntries.find((entry) => entry.id === id))
                .filter(Boolean)
            : categoryEntries.slice(0, 3);
          return `<div class="discipline-panel" id="panel-${category.id}" role="tabpanel" aria-labelledby="tab-${category.id}" tabindex="0" ${i === 0 ? "" : "hidden"}>
          <div class="discipline-intro"><span class="section-number">${details.subtitle}</span><h3>${escape(category.label)}</h3><p>${escape(details.description)}</p><a class="discipline-archive-link" href="#archive" data-category-link="${category.id}">이 분야 전체 이력 <span>${count(categoryEntries.length)} ${arrow}</span></a></div>
          <div class="discipline-projects" aria-label="${escape(category.label)} 대표 작업">${selectedEntries
            .map((entry) => {
              const url = safeUrl(entry.url);
              const content = `<span class="discipline-project-year">${escape(entry.year)}</span><div><h4>${escape(entry.title)}</h4><p>${escape(entry.description)}</p></div>${url ? '<span class="discipline-project-arrow" aria-hidden="true">↗</span>' : ""}`;
              return url
                ? `<a class="discipline-project" data-project-id="${entry.id}" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${escape(entry.title)} 관련 자료 (새 창)">${content}</a>`
                : `<article class="discipline-project" data-project-id="${entry.id}">${content}</article>`;
            })
            .join("")}</div>
        </div>`;
        })
        .join("")}
      <p class="section-footnote">↗ 표시가 있는 작업은 관련 자료로 연결됩니다.<span>전체 이력은 아래 아카이브에서 볼 수 있습니다.</span></p>
    </section>

    <section class="about-section" id="about" aria-labelledby="about-title"><div class="section-wrap about-grid">
      <div class="about-label"><span class="section-number">02 / ABOUT</span><h2 id="about-title">정다운<span>새벽소리 대표</span></h2><div class="artist-signature" aria-hidden="true">sound<br><em>in between.</em></div></div>
      <div class="about-content"><p class="about-lead">음악과 사운드를 매개로<br>공연, 전시, 영상, 음반을<br>가로지르는 작업을 합니다.</p><p class="about-copy">새벽소리 대표 정다운은 작곡과 음악감독, 사운드 디자인, 음반 프로듀싱과 믹싱을 바탕으로 활동합니다. 일렉트로닉 듀오 Myvatn의 작업부터 뮤지컬과 연극, 미디어아트 전시까지, 다양한 형식 안에서 소리와 장면의 관계를 다룹니다.</p><p class="about-copy">창작과 연주, 사운드 엔지니어링을 함께 이어가며, 강의와 연구를 통해 음악 제작과 사운드 아트의 경험을 나눕니다.</p>
        <dl class="education-list">${profile.education.map((item) => `<div><dt>${escape(item.school)}</dt><dd>${escape(item.detail)}</dd></div>`).join("")}</dl>
        <div class="practice-tags" aria-label="작업 분야"><span>Sound art</span><span>Composition</span><span>Production</span><span>Mixing</span></div>
      </div>
    </div></section>

    <section class="archive-section section-wrap" id="archive" aria-labelledby="archive-title">
      <div class="section-heading"><div><span class="section-number">03 / ARCHIVE & CV</span><h2 id="archive-title">이어온 작업들<span class="heading-count">${entries.length}</span></h2></div><button class="text-button" data-download type="button">전체 CV 다운로드 <span aria-hidden="true">↓</span></button></div>
      <div class="archive-layout">
        <aside class="archive-sidebar" aria-label="작업 분야"><p class="sidebar-label">DISCIPLINES</p><div class="category-list" role="group" aria-label="분야별 이력 필터"><button type="button" class="category-button active" data-category="all" aria-pressed="true"><span>전체 작업</span><span>${count(entries.length)}</span></button>${categories.map((category) => `<button type="button" class="category-button" data-category="${category.id}" aria-pressed="false"><span>${escape(category.label)}</span><span>${count(entries.filter((entry) => entry.category === category.id).length)}</span></button>`).join("")}</div><p class="archive-note">작업 연도는 제공된 이력 기준입니다.<br>연도 미기재 작업은 ‘—’로 표시합니다.</p></aside>
        <div class="archive-main"><form class="search-form" role="search"><label for="archive-search" class="sr-only">작업명, 연도, 참여 역할 검색</label><span class="search-icon" aria-hidden="true"></span><input id="archive-search" type="search" placeholder="작업명, 연도, 참여 역할 검색" autocomplete="off"><button type="button" class="clear-search" hidden aria-label="검색어 지우기">×</button></form><div class="archive-results-top"><p id="result-status" role="status" aria-live="polite"></p><span>YEAR / PROJECT</span></div><div id="archive-results"></div><button id="load-more" class="load-more" type="button"></button></div>
      </div>
    </section>
  </main>

  <footer class="site-footer section-wrap"><div class="footer-top"><div><span class="section-number">SAEBYEOKSORI / SOUND PRACTICE</span><p>다음 장면에서도,<br>소리는 이어집니다<span>.</span></p></div><a href="#top" class="back-top" aria-label="맨 위로 이동">맨 위로 <span aria-hidden="true">↑</span></a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${escape(profile.name)} · ${escape(profile.studio)}</span><span>사운드 아트 · 음악 · 그 사이의 것들</span><button type="button" data-download>CV 저장 ${arrow}</button></div></footer>
  <div id="notification" class="notification" role="status" aria-live="polite"></div>
`;

let activeCategory = "all";
let search = "";
let limit = 12;
const results = document.querySelector("#archive-results");
const more = document.querySelector("#load-more");
const searchInput = document.querySelector("#archive-search");

const disciplineTabs = [
  ...document.querySelectorAll('[role="tab"][data-discipline]'),
];
function selectDiscipline(tab) {
  disciplineTabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute("aria-controls")).hidden =
      !selected;
  });
}
disciplineTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectDiscipline(tab));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % disciplineTabs.length;
    if (event.key === "ArrowLeft")
      next = (index - 1 + disciplineTabs.length) % disciplineTabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = disciplineTabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectDiscipline(disciplineTabs[next]);
    disciplineTabs[next].focus({ preventScroll: true });
    disciplineTabs[next].scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "instant",
    });
  });
});

function getMatches() {
  const terms = search
    .trim()
    .toLocaleLowerCase("ko")
    .split(/\s+/)
    .filter(Boolean);
  return entries.filter((entry) => {
    const text =
      `${entry.year} ${entry.title} ${entry.description} ${categoryName(entry.category)}`.toLocaleLowerCase(
        "ko",
      );
    return (
      (activeCategory === "all" || activeCategory === entry.category) &&
      terms.every((term) => text.includes(term))
    );
  });
}

function renderArchive() {
  const matches = getMatches();
  const visible = matches.slice(0, limit);
  document.querySelector("#result-status").textContent =
    `${activeCategory === "all" ? "전체 작업" : categoryName(activeCategory)} · ${matches.length}개${matches.length > visible.length ? ` 중 ${visible.length}개 표시` : ""}`;
  if (!matches.length) {
    results.innerHTML =
      '<div class="empty-state"><span aria-hidden="true">—</span><h3>일치하는 작업이 없습니다.</h3><p>다른 검색어를 입력하거나 전체 작업을 확인해 보세요.</p><button type="button" class="text-button" id="reset-search">전체 작업 보기 ↗</button></div>';
    document
      .querySelector("#reset-search")
      .addEventListener("click", resetArchive);
  } else {
    let previousCategory = "";
    results.innerHTML = visible
      .map((entry) => {
        const categoryHeader =
          activeCategory === "all" && previousCategory !== entry.category
            ? `<p class="archive-category-heading">${escape(categoryName(entry.category))}</p>`
            : "";
        previousCategory = entry.category;
        const url = safeUrl(entry.url);
        return `${categoryHeader}<article class="archive-entry"><span class="entry-year">${escape(entry.year)}</span><div class="entry-details"><h3>${escape(entry.title)}</h3><p>${escape(entry.description)}</p></div>${url ? `<a class="entry-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${escape(entry.title)} 관련 자료 (새 창)">↗</a>` : ""}</article>`;
      })
      .join("");
  }
  more.hidden = visible.length >= matches.length;
  more.textContent = `작업 더 보기 (${visible.length} / ${matches.length}) +`;
}

function setCategory(id) {
  activeCategory = id;
  limit = 12;
  document.querySelectorAll("[data-category]").forEach((button) => {
    const selected = button.dataset.category === id;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  renderArchive();
}

function resetArchive() {
  search = "";
  searchInput.value = "";
  document.querySelector(".clear-search").hidden = true;
  setCategory("all");
  searchInput.focus();
}

document
  .querySelectorAll("[data-category]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      setCategory(button.dataset.category),
    ),
  );
document.querySelectorAll("[data-category-link]").forEach((link) =>
  link.addEventListener("click", () => {
    search = "";
    searchInput.value = "";
    document.querySelector(".clear-search").hidden = true;
    setCategory(link.dataset.categoryLink);
  }),
);
document
  .querySelector(".search-form")
  .addEventListener("submit", (event) => event.preventDefault());
searchInput.addEventListener("input", () => {
  search = searchInput.value;
  limit = search.trim() ? Infinity : 12;
  document.querySelector(".clear-search").hidden = !search;
  renderArchive();
});
document.querySelector(".clear-search").addEventListener("click", () => {
  searchInput.value = "";
  search = "";
  limit = 12;
  document.querySelector(".clear-search").hidden = true;
  renderArchive();
  searchInput.focus();
});
more.addEventListener("click", () => {
  const previousCount = results.querySelectorAll(".archive-entry").length;
  limit += 12;
  renderArchive();
  const firstNew = results.querySelectorAll(".archive-entry")[previousCount];
  if (firstNew) {
    firstNew.setAttribute("tabindex", "-1");
    firstNew.focus({ preventScroll: true });
  }
});

const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.querySelector(".menu-label").textContent = "메뉴";
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
  document.querySelector(".menu-label").textContent = open ? "닫기" : "메뉴";
});
navigation
  .querySelectorAll("a, button")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);

function downloadCV() {
  const lines = [
    profile.name,
    `${profile.studio} · 음반 제작업 대표`,
    "",
    "학력",
    ...profile.education.map((item) => `${item.school} / ${item.detail}`),
  ];
  categories.forEach((category) => {
    lines.push("", `■ ${category.label}`, "");
    entries
      .filter((entry) => entry.category === category.id)
      .forEach((entry) => {
        lines.push(`${entry.year} | ${entry.title}`, `  ${entry.description}`);
        if (safeUrl(entry.url)) lines.push(`  ${entry.url}`);
      });
  });
  const file = new Blob(["\uFEFF", lines.join("\n")], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "정다운_새벽소리_CV.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  const notification = document.querySelector("#notification");
  notification.textContent = "전체 이력을 담은 CV 파일을 저장합니다.";
  notification.classList.add("visible");
  clearTimeout(downloadCV.timer);
  downloadCV.timer = setTimeout(
    () => notification.classList.remove("visible"),
    3500,
  );
}
document
  .querySelectorAll("[data-download]")
  .forEach((button) => button.addEventListener("click", downloadCV));

// 인쇄 시 검색/페이지 제한 없이 전체 CV를 보여주고, 종료 후 보던 상태를 복원합니다.
let printState;
window.addEventListener("beforeprint", () => {
  printState = { activeCategory, search, limit };
  activeCategory = "all";
  search = "";
  limit = Infinity;
  renderArchive();
});
window.addEventListener("afterprint", () => {
  if (printState) {
    ({ activeCategory, search, limit } = printState);
    renderArchive();
  }
});
renderArchive();
