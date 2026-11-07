(function () {
  const { el, setAccent, filled, media, youtubeId } = window.Site;
  const games = window.GAMES || [];
  const $ = id => document.getElementById(id);

  const rawId = new URLSearchParams(location.search).get("id");
  const id = (window.GAME_ALIASES || {})[rawId] || rawId;   // 예전 주소도 열리게
  const at = games.findIndex(g => g.id === id);
  const g = games[at];
  const body = $("body");

  if (!g) {
    $("hero").hidden = true;
    const box = el("div", "missing");
    box.appendChild(el("div", "accent", "GAME NOT FOUND"));
    body.appendChild(box);
    return;
  }

  document.title = g.title + " · Portfolio";
  setAccent(g.theme);
  $("back").href = "index.html#" + encodeURIComponent(g.id);

  // ── 맨 위: 영상(YouTube · mp4) > 미리보기 영상 > 표지 > 대체 그림 ──
  const heroMedia = $("heroMedia");
  const yt = youtubeId(g.video);
  if (yt) {
    const f = el("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + yt + "?rel=0";
    f.title = g.title + " 영상";
    f.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    heroMedia.appendChild(f);
    $("hero").classList.add("has-video");
  } else if (filled(g.video)) {
    const v = el("video");
    v.src = g.video; v.controls = true; v.playsInline = true;
    if (filled(g.cover)) v.poster = g.cover;
    heroMedia.appendChild(v);
    $("hero").classList.add("has-video");
  } else {
    heroMedia.appendChild(media(g, { allowVideo: true, position: g.coverPos }));
  }
  $("status").textContent = g.status || "";
  $("title").textContent = g.title;
  $("genre").textContent = g.genre || "";

  // ── 본문 ──
  if (filled(g.summary)) body.appendChild(el("p", "lead", g.summary));

  const metaRows = [["기간", g.period], ["인원", g.team], ["내 역할", g.role], ["엔진 · 기술", g.engine]];
  const meta = el("dl", "meta");
  metaRows.forEach(([k, v]) => {
    const box = el("div", "window");
    box.appendChild(el("dt", "ui", k));
    box.appendChild(el("dd", filled(v) ? "" : "todo", filled(v) ? v : "작성 필요"));
    meta.appendChild(box);
  });
  body.appendChild(meta);

  function block(label, title) {
    const sec = el("section", "block");
    const h = el("h2");
    h.appendChild(el("span", "num", label));
    h.appendChild(el("span", "", title));
    sec.appendChild(h);
    body.appendChild(sec);
    return sec;
  }

  if (filled(g.myWork)) {
    const ul = el("ul", "work");
    g.myWork.forEach(w => ul.appendChild(el("li", "window", w)));
    block("01", "내가 한 일").appendChild(ul);
  }

  if (filled(g.problems)) {
    const sec = block("02", "문제 해결");
    g.problems.forEach((p, i) => {
      const q = el("article", "quest window");
      const head = el("div", "quest-head");
      head.appendChild(el("span", "ui-l", "QUEST " + (i + 1)));
      head.appendChild(el("h3", "", p.title));
      q.appendChild(head);
      const grid = el("div", "quest-body");
      [["문제", p.problem], ["해결", p.solution], ["결과", p.result]].forEach(([k, v]) => {
        if (!filled(v)) return;
        const cell = el("div");
        cell.appendChild(el("div", "ui", k));
        cell.appendChild(el("p", "", v));
        grid.appendChild(cell);
      });
      q.appendChild(grid);
      sec.appendChild(q);
    });
  }

  if (filled(g.shots)) {
    const grid = el("div", "shots");
    g.shots.forEach(src => {
      const b = el("button", "window");
      b.type = "button";
      const img = el("img");
      img.src = src; img.alt = g.title + " 스크린샷"; img.loading = "lazy";
      b.appendChild(img);
      b.addEventListener("click", () => openLightbox(src));
      grid.appendChild(b);
    });
    block("03", "스크린샷").appendChild(grid);
  }

  const links = (g.links || []).filter(l => filled(l.url));
  if (links.length) {
    const row = el("div", "link-row");
    links.forEach(l => {
      const a = el("a", "pbtn", l.label);
      a.href = l.url; a.target = "_blank"; a.rel = "noopener";
      row.appendChild(a);
    });
    block("04", "링크").appendChild(row);
  }

  // ── 이전 · 다음 게임 ──
  if (games.length > 1) {
    const pager = el("nav", "pager");
    const prev = games[(at - 1 + games.length) % games.length];
    const next = games[(at + 1) % games.length];
    [[prev, "◀ 이전 게임"], [next, "다음 게임 ▶"]].forEach(([x, label], k) => {
      const a = el("a", "window");
      a.href = "game.html?id=" + encodeURIComponent(x.id);
      if (k === 1) a.style.textAlign = "right";
      a.appendChild(el("small", "", label));
      a.appendChild(document.createTextNode(x.title));
      pager.appendChild(a);
    });
    body.appendChild(pager);
  }

  // ── 스크린샷 크게 보기 ──
  function openLightbox(src) {
    $("lightboxImg").src = src;
    $("lightbox").classList.add("open");
  }
  $("lightbox").addEventListener("click", () => $("lightbox").classList.remove("open"));

  document.addEventListener("keydown", e => {
    if (e.key !== "Escape" && e.key !== "Backspace") return;
    if ($("lightbox").classList.contains("open")) { $("lightbox").classList.remove("open"); return; }
    location.href = $("back").href;
  });
})();
