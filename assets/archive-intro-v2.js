// 제공받은 CV의 역할, 날짜, 후보·공개 예정 표기를 보존합니다.
// 공개 연락 이메일은 제공받은 후에만 추가합니다.
const profile = {
  name: "정다운",
  studio: "새벽소리",
  email: "",
  education: [
    { school: "동아방송예술대학", detail: "작곡 졸업" },
    { school: "연세대학교 커뮤니케이션대학원", detail: "미디어아트" },
  ],
};

const categories = [
  { id: "sound-art", label: "사운드 아트·전시" },
  { id: "performance", label: "공연 음악" },
  { id: "screen", label: "영상·광고" },
  { id: "composition", label: "프로듀싱·작곡·편곡" },
  { id: "engineering", label: "믹싱·마스터링" },
  { id: "live", label: "연주" },
  { id: "post", label: "포스트 프로덕션" },
  { id: "education", label: "강의·연구" },
];

const group = (category, rows) =>
  rows.map(([id, year, title, description, url]) => ({
    id,
    category,
    year,
    title,
    description,
    ...(url ? { url } : {}),
  }));
const musicalMix = (id, year, title, format) => ({
  id,
  category: "post",
  year,
  title: `${title} — ${format}`,
  description: `공간소리 소속 Sound Engineer · 뮤지컬 실황 ${format} 믹스 참여`,
});

const originalEntries = [
  ...group("sound-art", [
    [
      "hexnut-fragments",
      "2025",
      "HEXNUT — 파편의 숨",
      "GMAP 광주미디어아트센터 · 전시 및 사운드 디자인",
      "https://youtu.be/NHQVm3LUUVc?si=hr-gxHZQdDrXJ3w2",
    ],
    [
      "already-part-of-exhibition",
      "2025",
      "이미 당신도 전시의 일부",
      "기획전 · 정금형 작업실 겸 수장고, 부천 · 전시 및 사운드 디자인",
    ],
    [
      "lee-sujin-solo",
      "2023",
      "이수진 작가 개인전",
      "서울 · 사운드 디자인 참여",
      "https://www.instagram.com/p/CyNhbW5puEX/?igsh=MWR4NWo2eDExZmJpdw==",
    ],
  ]),
  ...group("performance", [
    [
      "three-leaf-clover",
      "2026",
      "세잎클로버",
      "창작 뮤지컬 · 원작 소설 『시한부』 · 극단 지우 · 음악감독",
    ],
    [
      "burning-up",
      "2024",
      "버닝업",
      "창작 뮤지컬 · 극단 지우 · 음악감독, 작편곡 및 사운드 디자인",
      "https://www.rouvket.com/49",
    ],
    [
      "yeonjeok",
      "2023",
      "연적",
      "연극 · 대학로 유니플렉스 · 극단 지우 · 음악감독, 작편곡",
      "https://m.search.naver.com/search.naver?sm=mtp_sug.top&where=m&query=연극+연적&acq=연극+연적&acr=1&qdt=0",
    ],
    [
      "fantastic-laundry",
      "2023",
      "판타스틱 런드리",
      "창작 뮤지컬 · 주) 브라더후드 · 음악감독, 작편곡 및 사운드 디자인",
    ],
  ]),
  ...group("screen", [
    [
      "humanoid-billy",
      "2026",
      "휴머노이드 로봇 빌리",
      "광고음악",
      "https://youtu.be/ZdZdz524-B0?si=cIMjzIEyhMuXUAdb",
    ],
    [
      "kt-cloud-brand-film",
      "2026",
      "KT cloud 브랜드 필름",
      "광고음악 · 제공 이력 기준 2026 상반기 릴리즈 예정",
    ],
    [
      "twinkling-watermelon",
      "2023",
      "반짝이는 워터멜론",
      "tvN 청춘 밴드 드라마 · 편곡 참여, 연주 코칭",
    ],
    [
      "omyung",
      "2015",
      "오명",
      "김의석 감독 · 단편영화 음악감독 · 제20회 부산국제영화제 와이드앵글-한국단편경쟁 부문 후보, 제36회 청룡영화제 단편영화상 부문 후보",
    ],
    [
      "jeongsuk",
      "2011",
      "정숙씨, 가슴을",
      "김은영 감독 · 단편영화 음악감독 · 제29회 부산국제단편영화제 공식경쟁부문 후보",
    ],
    ["butterfly", "2011", "ButterFly", "VideoDance 작품 감독"],
    ["mrs-a", "2011", "Mrs_A", "한예종 단편영화 · 음악감독"],
    ["welcome", "2011", "어서오세요", "단편영화 · 음악감독"],
    ["lost-time", "2011", "당신이 잃어버린 시간", "단편영화 · 음악감독"],
    ["art-society", "2011", "아트소사이어티", "로드다큐 · 음악감독"],
    ["kafa-prologue", "2011", "한국영화아카데미 영화제 프롤로그", "음악 제작"],
  ]),
  ...group("records", [
    [
      "my-satan-book-ost",
      "2026",
      "나의 사탄 — Book OST",
      "베스트셀러 작가 백은별 · 프로듀싱 및 작편곡",
      "https://youtu.be/YOPfdLOFGfk?si=QV6LHVr97n2F1yqV",
    ],
    ["bearose-2026", "2026", "베어로즈 — EP 1st", "Mix & Mastering"],
    ["yunaone-tidal-mind", "2025", "유나원 — Tidal mind", "편곡, 연주 참여"],
    ["yunaone-green-heart", "2025", "유나원 — 초록의 마음으로", "편곡 참여"],
    [
      "summer-night-lawn",
      "2025",
      "여름밤잔디",
      "경북음악창작소 제작지원 사업 · Mix & Mastering",
    ],
    ["bearose-2025", "2025", "베어로즈 — EP 1st", "Mastering"],
    [
      "sogeumji-ep",
      "2023",
      "소금지 — EP",
      "수록곡 「그냥 그대로」, 「이름」 · Mix & Mastering",
    ],
    ["cho-sukyung-swim", "2023", "조수경 — 헤엄치고 싶다면", "Mix & Mastering"],
    [
      "joy-avenue-hymns",
      "2022",
      "조이애비뉴 — Hymns from Joy Avenue",
      "EP 앨범 · Mix & Mastering",
    ],
    ["juha-got-ya", "2022", "주하 — Got ya", "디지털 싱글앨범 · Mix"],
    ["juha-wave", "2022", "주하 — 파도", "디지털 싱글앨범 · 편곡, Mix"],
    ["juha-avocado", "2021", "주하 — 아보카도", "디지털 싱글앨범 · Mix"],
    [
      "enigmata-highway",
      "2021",
      "에니그마타 — Highway",
      "디지털 싱글 · 편곡 참여",
    ],
    [
      "chae-suhyun-2020",
      "2020",
      "채수현 — 태풍이 지나가고 / 환상의 빛",
      "싱글 앨범 · 2020.04.24 발매 · 믹싱 & 마스터링",
      "https://www.youtube.com/playlist?list=OLAK5uy_l-Z-NYtTxEcx4rqvqfAWz2QZrTt9tYJmU",
    ],
    ["juha-seonju", "2020", "주하 — 선주", "디지털 싱글앨범 · 편곡, Mix"],
    ["juha-fishbowl", "2019", "주하 — 어항", "디지털 싱글앨범 · Mix"],
    [
      "juha-false-adult",
      "2019",
      "주하 — 거짓어른",
      "EP 앨범 · 수록곡 「앵무새」, 「들꽃」, 「마음이란게」, 「두려워」, 「어항」 · Mix",
    ],
    ["chae-suhyun-depression", "2018", "채수현 — 우울증", "Mix"],
    ["girlsonmood", "2018", "girlsonmood — baby dream night", "편곡"],
    ["collor-butterfly", "2017", "Collor — 나비 (Feat. 난아진)", "편곡 참여"],
    [
      "chae-suhyun-great-night",
      "2017",
      "채수현 — 멋진밤",
      "편곡, Artwork Design",
    ],
    [
      "eungyo-understand",
      "2016",
      "은교 — Understand",
      "EP 앨범 · 수록곡 「그럼에도」, 「잠들지 못하는 그대」 · 편곡, Mix",
    ],
    [
      "no-tomorrow-no-regret",
      "2014",
      "No Tomorrow, No Regret",
      "정규앨범 · 전체 수록곡 건반 연주, 편곡",
    ],
    [
      "myvatn-shake",
      "2015",
      "Myvatn — 흔들기",
      "디지털 싱글 · MV 제작, 작사, 작곡, 편곡, 믹스",
      "https://www.youtube.com/watch?v=mriKZW-qpb8",
    ],
    [
      "myvatn-bury",
      "2016",
      "Myvatn — BURY",
      "디지털 싱글 · MV 제작, 작사, 작곡, 편곡, 믹스",
      "https://www.youtube.com/watch?v=eFWTkYrUmdQ",
    ],
    [
      "myvatn-like-you-lady",
      "2016",
      "Myvatn — Like you lady",
      "디지털 싱글 · 노래, MV 제작, 작사, 작곡, 편곡, 믹스",
      "https://www.youtube.com/watch?v=Qm4Ksg0Spy8",
    ],
    ["myvatn-rain", "2016", "Myvatn — Rain", "디지털 싱글 · 편곡, 믹스",
      "https://www.youtube.com/watch?v=HwoVsixFQU4",
    ],
    ["gangto-band", "—", "강토밴드", "컨츄리 밴드 · 전곡 건반 연주, 편곡"],
    ["becovered", "—", "BECOVERED", "CCM 밴드 · 싱어, 편곡, 믹스"],
    [
      "chae-suhyun-collaboration",
      "—",
      "채수현",
      "유재하 음악경연대회 출신 싱어송라이터 · 편곡, 믹스",
    ],
    [
      "juha-collaboration",
      "—",
      "주하",
      "싱어송라이터 · 전 앨범 편곡 또는 믹스",
    ],
    ["joy-avenue-collaboration", "—", "조이애비뉴", "유튜버 · 앨범 믹스"],
  ]),
  ...group("live", [
    [
      "just-j-min",
      "2025",
      "Just J-Min",
      "제이민 첫번째 콘서트 · 건반 연주",
      "https://www.ticketlink.co.kr/product/54001",
    ],
    [
      "john-cameron-mitchell",
      "2024",
      "존 카메론 미첼 내한 공연",
      "건반 연주",
      "https://tickets.interpark.com/goods/24016208",
    ],
    [
      "hedwig",
      "2019–2024",
      "헤드윅",
      "뮤지컬 · 미르코 역(앵그리인치 밴드) · 2019 홍익대 대학로 아트센터, 2021 충무아트센터, 2024 샤롯데 씨어터",
    ],
    [
      "baek-space",
      "2023",
      "백지영 — BAEK SPACE",
      "전국투어 콘서트 · 편곡 참여",
    ],
    ["go-baek", "2022", "백지영 — GO BAEK", "전국투어 콘서트 · 편곡 참여"],
    ["yoon-soho", "2019", "윤소호 콘서트", "뮤지컬 배우 윤소호 · 건반 세션"],
  ]),
  ...group("post", [
    [
      "tomorrows-apple",
      "2026",
      "내일 건네줄, 사과",
      "김윤서 작가 · 영화 사운드 믹싱",
    ],
  ]),
  ...[
    ["sisyphus-2026", "2026", "시지프스", "OST"],
    ["pirates-2025", "2025", "해적", "OST"],
    ["hook-2024", "2024", "후크", "OST"],
    ["nanseol-2024", "2024", "난설", "OST"],
    ["mio-fratello-2024", "2024", "미오프라텔로", "DVD"],
    ["ludwig-2023", "2023", "Ludwig", "OST"],
    ["pirates-2023", "2023", "해적", "DVD"],
    ["ending-note-2022", "2022", "엔딩노트", "OST / DVD"],
    ["mio-fratello-2022", "2022", "미오프라텔로", "OST / DVD"],
    ["nanseol-2022", "2022", "난설", "OST"],
    ["v-ever-after-2022", "2022", "브이에버애프터", "OST / DVD"],
    ["therese-raquin-2022", "2022", "테레즈 라캥", "OST"],
    ["anna-tchaikovsky-2022", "2022", "안나 차이코프스키", "OST"],
    ["ludwig-2021", "2021", "Ludwig", "DVD"],
    ["myeongdong-romance-2021", "2021", "명동 로망스", "DVD"],
    ["brothers-karamazov-2021", "2021", "브라더스 까라마조프", "DVD"],
    ["pirates-2021", "2021", "해적", "OST / DVD"],
    ["pungwolju-2021", "2021", "풍월주", "OST"],
    ["flaming-sonata-2020", "2020", "광염소나타", "OST"],
    ["nanseol-2020", "2020", "난설", "DVD"],
    ["mio-fratello-2020", "2020", "미오 프라텔로", "OST"],
  ].map((row) => musicalMix(...row)),
  ...group("education", [
    [
      "daelim-mentoring",
      "2026",
      "대림대학교 방송음향기술과",
      "2026.10 · 음반제작프로젝트관리(믹스 & 마스터링) 멘토링",
    ],
    [
      "yonsei-composition-lectures",
      "2025",
      "연세대학교 작곡과 특강",
      "2025.05 · 1차 「독립 아티스트의 앨범 프로듀싱」, 2차 「인공지능과 사운드」",
    ],
    [
      "yonsei-sound-art-research",
      "2025",
      "딥러닝 기반 사운드 아트 사례 연구",
      "연세대 커뮤니케이션 대학원 학술제",
    ],
    ["jam-music-academy", "2016–현재", "JAM Music Academy", "강사"],
  ]),
];


// 역할이 함께 기록된 작업은 여러 분야에 속하지만 원본 항목은 한 건만 유지합니다.
// 음반 작업과 기존 연주·편곡 작업의 크레딧을 기준으로 분류합니다.
const roleCategories = {
  composition: new Set([
    "my-satan-book-ost", "yunaone-tidal-mind", "yunaone-green-heart",
    "juha-wave", "enigmata-highway", "juha-seonju", "girlsonmood",
    "collor-butterfly", "chae-suhyun-great-night", "eungyo-understand",
    "no-tomorrow-no-regret", "myvatn-shake", "myvatn-bury",
    "myvatn-like-you-lady", "myvatn-rain", "gangto-band", "becovered",
    "chae-suhyun-collaboration", "juha-collaboration",
    "baek-space", "go-baek",
  ]),
  engineering: new Set([
    "bearose-2026", "summer-night-lawn", "bearose-2025", "sogeumji-ep",
    "cho-sukyung-swim", "joy-avenue-hymns", "juha-got-ya", "juha-wave",
    "juha-avocado", "chae-suhyun-2020", "juha-seonju", "juha-fishbowl",
    "juha-false-adult", "chae-suhyun-depression", "eungyo-understand",
    "myvatn-shake", "myvatn-bury", "myvatn-like-you-lady",
    "myvatn-rain", "becovered", "eungyo-collaboration",
    "chae-suhyun-collaboration", "juha-collaboration", "joy-avenue-collaboration",
  ]),
  live: new Set([
    "yunaone-tidal-mind", "no-tomorrow-no-regret", "gangto-band",
    "just-j-min", "john-cameron-mitchell", "hedwig", "yoon-soho",
  ]),
};

const entries = originalEntries.map((entry) => {
  const memberships = entry.category === "records" || entry.category === "live"
    ? Object.entries(roleCategories)
        .filter(([, ids]) => ids.has(entry.id))
        .map(([category]) => category)
    : [entry.category];
  if (!memberships.length) throw new Error(`작업 분야 누락: ${entry.id}`);
  return { ...entry, category: memberships[0], categories: memberships };
}).sort((a, b) =>
  categories.findIndex((item) => item.id === a.category)
  - categories.findIndex((item) => item.id === b.category)
);


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
      <div class="section-heading"><div class="artist-heading"><h1 id="archive-title">${escape(profile.name)} : DAWN</h1><p class="artist-role">사운드 아티스트 · 작곡가 · 프로듀서</p><div class="artist-education" aria-label="학력">${profile.education.map((item) => `<p>${escape(item.school)} ${escape(item.detail)}</p>`).join("")}</div><div class="artist-contact"><p>새벽소리 · 사업자등록번호 <span class="business-number">102-17-67120</span></p><a class="instagram-link" href="https://www.instagram.com/jeongdawn/" target="_blank" rel="noopener noreferrer" aria-label="인스타그램 @jeongdawn (새 창)" title="Instagram @jeongdawn"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle></svg><span class="sr-only">@jeongdawn</span></a></div></div></div>
      <div class="archive-layout">
        <aside class="archive-sidebar" aria-label="작업 분야"><p class="sidebar-label">DISCIPLINES</p><div class="category-list" role="group" aria-label="분야별 이력 필터"><button type="button" class="category-button active" data-category="all" aria-pressed="true"><span>전체 작업</span><span>${count(entries.length)}</span></button>${categories.map((category) => `<button type="button" class="category-button" data-category="${category.id}" aria-pressed="false"><span>${escape(category.label)}</span><span>${count(entries.filter((entry) => entry.categories.includes(category.id)).length)}</span></button>`).join("")}</div></aside>
        <div class="archive-main"><form class="search-form" role="search"><label for="archive-search" class="sr-only">작업명, 연도, 참여 역할 검색</label><span class="search-icon" aria-hidden="true"></span><input id="archive-search" type="search" placeholder="작업명, 연도, 참여 역할 검색" autocomplete="off"><button type="button" class="clear-search" hidden aria-label="검색어 지우기">×</button></form><div class="archive-results-top"><p id="result-status" role="status" aria-live="polite"></p><span>YEAR / PROJECT</span></div><div id="archive-results"></div><button id="load-more" class="load-more" type="button"></button></div>
      </div>
    </section>
  </main>
  <div id="notification" class="notification" role="status" aria-live="polite"></div>
`;

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
  if (activeCategory === "all") return matches;
  const latestYear = (entry) => Math.max(0, ...(entry.year.match(/\d{4}/g) || []).map(Number));
  return matches.sort((a, b) => latestYear(b) - latestYear(a));
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
    let previousCategory = "";
    results.innerHTML = visible
      .map((entry) => {
        const categoryHeader =
          activeCategory === "all" && previousCategory !== entry.category
            ? `<p class="archive-category-heading">${escape(categoryName(entry.category))}</p>`
            : "";
        previousCategory = entry.category;
        const url = safeUrl(entry.url);
        return `${categoryHeader}<article class="archive-entry"><span class="entry-year">${escape(entry.year)}</span><div class="entry-details"><h2>${escape(entry.title)}</h2><p>${escape(entry.description)}</p></div>${url ? `<a class="entry-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${escape(entry.title)} 관련 자료 (새 창)">↗</a>` : ""}</article>`;
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

