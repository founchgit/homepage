import "./style.css";
import { profile, categories, entries, compareEntries } from "./cv.js";

const escape = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
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

document.querySelector("#app").innerHTML = `
  <main id="main">
    <section class="archive-section section-wrap" id="archive" aria-labelledby="archive-title">
      <div class="section-heading"><div class="artist-heading"><h1 id="archive-title">${escape(profile.name)} : DAWN</h1><p class="artist-role">사운드 아티스트 · 작곡가 · 프로듀서 · 사운드 엔지니어</p><div class="artist-education" aria-label="학력">${profile.education.map((item) => `<p>${escape(item.school)} ${escape(item.detail)}</p>`).join("")}</div><div class="artist-contact"><p>새벽소리 · 사업자등록번호 <span class="business-number">102-17-67120</span></p><a class="instagram-link" href="https://www.instagram.com/jeongdawn/" target="_blank" rel="noopener noreferrer" aria-label="인스타그램 @jeongdawn (새 창)" title="Instagram @jeongdawn"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle></svg><span class="sr-only">@jeongdawn</span></a></div></div>
        <section class="featured" aria-label="대표작">
          <div class="featured-media"></div>
          <div class="featured-controls">
            <span>대표작 <span class="featured-count"></span></span>
            <div class="featured-buttons">
              <button type="button" data-step="-1" aria-label="이전 대표작">‹</button>
              <button type="button" class="featured-toggle">일시정지</button>
              <button type="button" data-step="1" aria-label="다음 대표작">›</button>
            </div>
          </div>
        </section>
      </div>
      <div class="archive-layout">
        <aside class="archive-sidebar" aria-label="작업 분야"><p class="sidebar-label">DISCIPLINES</p><div class="category-list" role="group" aria-label="분야별 이력 필터"><button type="button" class="category-button active" data-category="all" aria-pressed="true"><span>전체 작업</span><span>${count(entries.length)}</span></button>${categories.map((category) => `<button type="button" class="category-button" data-category="${category.id}" aria-pressed="false"><span>${escape(category.label)}</span><span>${count(entries.filter((entry) => entry.categories.includes(category.id)).length)}</span></button>`).join("")}</div></aside>
        <div class="archive-main"><form class="search-form" role="search"><label for="archive-search" class="sr-only">작업명, 연도, 참여 역할 검색</label><span class="search-icon" aria-hidden="true"></span><input id="archive-search" type="search" placeholder="작업명, 연도, 참여 역할 검색" autocomplete="off"><button type="button" class="clear-search" hidden aria-label="검색어 지우기">×</button></form><div class="archive-results-top"><p id="result-status" role="status" aria-live="polite"></p><span>YEAR / PROJECT</span></div><div id="archive-results"></div><button id="load-more" class="load-more" type="button"></button></div>
      </div>
    </section>
  </main>
  <div id="notification" class="notification" role="status" aria-live="polite"></div>
`;


const featuredVideos = ["S72bNOe3V0c", "OOTew75xRYU", "mriKZW-qpb8"];
const featured = document.querySelector(".featured");
const featuredMedia = featured.querySelector(".featured-media");
const featuredCount = featured.querySelector(".featured-count");
const featuredToggle = featured.querySelector(".featured-toggle");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let featuredIndex = 0;
let featuredPaused = motionPreference.matches;
let featuredTimer;

function showFeatured(step = 0) {
  featuredIndex = (featuredIndex + step + featuredVideos.length) % featuredVideos.length;
  const id = featuredVideos[featuredIndex];
  featuredMedia.innerHTML = `
    <a class="featured-video" href="https://www.youtube.com/watch?v=${id}"
      target="_blank" rel="noopener noreferrer"
      aria-label="대표작 ${featuredIndex + 1} 유튜브에서 재생 (새 창)">
      <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="">
      <span class="featured-play" aria-hidden="true">▶</span>
    </a>`;
  featuredCount.textContent = `${featuredIndex + 1} / ${featuredVideos.length}`;
}

function scheduleFeatured() {
  clearInterval(featuredTimer);
  featuredToggle.textContent = featuredPaused ? "자동 넘김 켜기" : "일시정지";
  if (!featuredPaused) {
    featuredTimer = setInterval(() => {
      if (!featuredMedia.matches(":hover, :focus-within") && !document.hidden) showFeatured(1);
    }, 7000);
  }
}

featured.querySelectorAll("[data-step]").forEach((button) => {
  button.addEventListener("click", () => {
    showFeatured(Number(button.dataset.step));
    scheduleFeatured();
  });
});
featuredToggle.addEventListener("click", () => {
  featuredPaused = !featuredPaused;
  scheduleFeatured();
});
motionPreference.addEventListener("change", (event) => {
  featuredPaused = event.matches;
  scheduleFeatured();
});
showFeatured();
scheduleFeatured();

let activeCategory = "all";
let search = "";
let limit = 12;
const results = document.querySelector("#archive-results");
const more = document.querySelector("#load-more");
const searchInput = document.querySelector("#archive-search");

function getMatches() {
  const terms = search
    .trim()
    .toLocaleLowerCase("ko")
    .split(/\s+/)
    .filter(Boolean);
  const matches = entries.filter((entry) => {
    const text =
      `${entry.year} ${entry.title} ${entry.description} ${entry.categories.map(categoryName).join(" ")}`.toLocaleLowerCase(
        "ko",
      );
    return (
      (activeCategory === "all" || entry.categories.includes(activeCategory)) &&
      terms.every((term) => text.includes(term))
    );
  });
  return matches.sort(compareEntries);
}

function renderArchive() {
  const matches = getMatches();
  const visible = matches.slice(0, limit);
  document.querySelector("#result-status").textContent =
    `${activeCategory === "all" ? "전체 작업" : categoryName(activeCategory)} · ${matches.length}개${matches.length > visible.length ? ` 중 ${visible.length}개 표시` : ""}`;
  if (!matches.length) {
    results.innerHTML =
      '<div class="empty-state"><span aria-hidden="true">—</span><h2>일치하는 작업이 없습니다.</h2><p>다른 검색어를 입력하거나 전체 작업을 확인해 보세요.</p><button type="button" class="text-button" id="reset-search">전체 작업 보기 ↗</button></div>';
    document
      .querySelector("#reset-search")
      .addEventListener("click", resetArchive);
  } else {
    results.innerHTML = visible
      .map((entry) => {
        const url = safeUrl(entry.url);
        return `<article class="archive-entry"><span class="entry-year">${escape(entry.year)}</span><div class="entry-details"><h2>${escape(entry.title)}</h2><p>${escape(entry.description)}</p></div>${url ? `<a class="entry-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${escape(entry.title)} 관련 자료 (새 창)">↗</a>` : ""}</article>`;
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
      .filter((entry) => entry.categories.includes(category.id))
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

