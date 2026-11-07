(function () {
  const { el, setAccent, filled, media, pad, sfx, setSound, isSoundOn } = window.Site;
  const games = window.GAMES || [];
  const profile = window.PROFILE || {};
  const $ = id => document.getElementById(id);

  const ALL = "전체";
  let filter = ALL;
  let list = games;
  let index = 0;

  const detailUrl = g => "game.html?id=" + encodeURIComponent(g.id);

  // ── 프로필 ──
  $("playerName").textContent = profile.name || "";
  $("playerRole").textContent = profile.role || "";
  $("profileName").textContent = profile.name || "";
  $("profileIntro").textContent = profile.intro || "";
  const links = (profile.links || []).filter(l => filled(l.url));
  if (filled(profile.email)) links.push({ label: profile.email, url: "mailto:" + profile.email });
  links.forEach(l => {
    const a = el("a", "pbtn", l.label);
    a.href = l.url;
    if (!l.url.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noopener"; }
    $("profileLinks").appendChild(a);
  });
  (profile.skills || []).forEach(s => {
    const box = el("div", "skill-group");          // 바깥 창 안에 있으므로 테두리 없이
    box.appendChild(el("div", "ui", s.group));
    const row = el("div", "tags");
    (s.items || []).forEach(t => row.appendChild(el("span", "tag", t)));
    box.appendChild(row);
    $("skills").appendChild(box);
  });

  // ── 필터 탭 (데이터의 type에서 자동으로 만든다) ──
  const types = [ALL, ...new Set(games.map(g => g.type).filter(filled))];
  types.forEach(t => {
    const b = el("button", "pbtn", t);
    b.type = "button";
    b.addEventListener("click", () => applyFilter(t));
    $("filters").appendChild(b);
  });
  if (types.length <= 2) $("filters").hidden = true;

  function applyFilter(t, keepId) {
    filter = t;
    list = t === ALL ? games : games.filter(g => g.type === t);
    [...$("filters").children].forEach(b => b.classList.toggle("is-on", b.textContent === t));
    renderShelf();
    const keep = keepId ? list.findIndex(g => g.id === keepId) : -1;
    select(keep >= 0 ? keep : 0, true);
  }

  // ── 선반 ──
  function renderShelf() {
    const shelf = $("shelf");
    shelf.textContent = "";
    list.forEach((g, i) => {
      const slot = el("button", "slot");
      slot.type = "button";
      slot.setAttribute("role", "option");
      const frame = el("div", "slot-frame");
      frame.appendChild(media(g, { className: "slot-art", lazy: true, position: g.thumbPos }));
      const info = el("div", "slot-info");
      info.appendChild(el("div", "slot-title", g.title));
      frame.appendChild(info);
      slot.appendChild(frame);
      slot.addEventListener("mouseenter", () => select(i));
      slot.addEventListener("focus", () => select(i));
      // 마우스는 올리는 순간 선택돼 있으니 바로 시작, 터치는 첫 탭 = 선택 · 두 번째 탭 = 시작
      slot.addEventListener("click", () => (i === index ? start() : select(i)));
      shelf.appendChild(slot);
    });
    const next = el("div", "slot next");
    next.setAttribute("aria-hidden", "true");
    next.appendChild(el("div", "plus", "+"));
    next.appendChild(el("div", "ui", "NEXT GAME"));
    shelf.appendChild(next);
  }

  // ── 선택 ──
  function select(i, force) {
    if (!list.length) return showEmpty();
    i = (i + list.length) % list.length;
    if (i === index && !force) return;
    index = i;
    const g = list[i];
    if (!force) sfx("move");

    setAccent(g.theme);
    const screen = $("screen");
    $("screenMedia").textContent = "";
    $("screenMedia").appendChild(media(g, { allowVideo: true, position: g.coverPos }));
    $("gameTitle").textContent = g.title;
    $("gameGenre").textContent = [g.genre, g.period].filter(filled).join("  ·  ");
    $("gameSummary").textContent = g.summary || "";
    $("gameTags").textContent = "";
    (g.tags || []).forEach(t => $("gameTags").appendChild(el("span", "tag", t)));
    $("badge").hidden = !filled(g.status);
    $("badge").textContent = g.status || "";
    $("startBtn").href = detailUrl(g);

    screen.classList.remove("switching");
    void screen.offsetWidth;            // 애니메이션 다시 시작
    screen.classList.add("switching");

    [...$("shelf").querySelectorAll(".slot:not(.next)")].forEach((s, k) => {
      s.classList.toggle("is-active", k === i);
      s.setAttribute("aria-selected", k === i ? "true" : "false");
    });
    const active = $("shelf").children[i];
    if (active) active.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    history.replaceState(null, "", "#" + g.id);
  }

  function showEmpty() {
    $("gameTitle").textContent = "No Game";
    $("gameSummary").textContent = "data/games.js에 게임을 추가하세요.";
  }

  function start() {
    const g = list[index];
    if (!g) return;
    if (isSoundOn()) {                    // 시작음이 끝날 만큼만 기다렸다 이동
      sfx("start");
      setTimeout(() => { location.href = detailUrl(g); }, 280);
    } else {
      location.href = detailUrl(g);
    }
  }

  $("startBtn").addEventListener("click", e => { e.preventDefault(); start(); });

  // ── 효과음 켜기 · 끄기 ──
  function drawSound() {
    $("soundBtn").textContent = isSoundOn() ? "SOUND ON" : "SOUND OFF";
    $("soundBtn").setAttribute("aria-pressed", isSoundOn() ? "true" : "false");
    $("soundBtn").classList.toggle("is-on", isSoundOn());
  }
  $("soundBtn").addEventListener("click", () => { setSound(!isSoundOn()); sfx("toggle"); drawSound(); });
  drawSound();

  // ── 키보드 ──
  document.addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key;
    if (k === "ArrowRight" || k === "d" || k === "D") { select(index + 1); e.preventDefault(); }
    else if (k === "ArrowLeft" || k === "a" || k === "A") { select(index - 1); e.preventDefault(); }
    else if (k === "Home") { select(0); e.preventDefault(); }
    else if (k === "End") { select(list.length - 1); e.preventDefault(); }
    else if (k === "Enter" && !(e.target instanceof HTMLButtonElement)) { start(); }
    else if (k === "p" || k === "P") { $("profile").scrollIntoView({ behavior: "smooth" }); }
    else if (/^[1-9]$/.test(k) && Number(k) <= list.length) { select(Number(k) - 1); }
  });

  // 선반 위에서 세로 휠 = 가로 스크롤
  $("shelf").addEventListener("wheel", e => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      $("shelf").scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

  // 상세에서 돌아오면 주소의 #id로 그 게임을 다시 고른다
  const hashId = () => {
    const h = decodeURIComponent(location.hash.slice(1));
    return (window.GAME_ALIASES || {})[h] || h;   // 예전 주소도 열리게
  };
  index = -1;
  applyFilter(ALL, hashId());
  window.addEventListener("hashchange", () => {
    const i = list.findIndex(g => g.id === hashId());
    if (i >= 0) select(i);
    else if (games.some(g => g.id === hashId())) applyFilter(ALL, hashId());
  });
})();
