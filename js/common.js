// 두 페이지가 같이 쓰는 도구. 글은 전부 textContent로 넣는다 (데이터에 HTML이 섞여도 안전).
window.Site = (function () {
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function hexToRgb(hex) {
    const h = (hex || "").replace("#", "");
    const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
    const n = parseInt(full, 16);
    if (full.length !== 6 || isNaN(n)) return "124, 242, 200";
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(", ");
  }

  function setAccent(hex) {
    const root = document.documentElement.style;
    root.setProperty("--accent", hex || "#7cf2c8");
    root.setProperty("--accent-rgb", hexToRgb(hex));
  }

  function filled(v) {
    return Array.isArray(v) ? v.length > 0 : typeof v === "string" ? v.trim() !== "" : v != null;
  }

  // 이미지가 없을 때 강조색 + 제목 글자로 그리는 대체 그림
  function placeholder(game, className) {
    const box = el("div", (className || "") + " placeholder");
    box.style.setProperty("--ph-rgb", hexToRgb(game.theme));
    box.appendChild(el("span", "", game.title));
    return box;
  }

  function youtubeId(url) {
    const m = (url || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : null;
  }

  // 미리보기 영상 > 표지 > 대체 그림 순서로 고른다
  function media(game, opts) {
    const o = opts || {};
    if (o.allowVideo && filled(game.preview)) {
      const v = el("video");
      v.src = game.preview;
      v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
      if (filled(game.cover)) v.poster = game.cover;
      return v;
    }
    if (filled(game.cover)) {
      const img = el("img", o.className);
      img.src = game.cover;
      img.alt = game.title;
      img.loading = o.lazy ? "lazy" : "eager";
      return img;
    }
    return placeholder(game, o.className);
  }

  function pad(n) { return String(n).padStart(2, "0"); }

  // ── 8비트 효과음 (기본 꺼짐, 켠 상태는 이 브라우저에만 기억) ──
  const SOUND_KEY = "portfolio.sound";
  let soundOn = false;
  try { soundOn = localStorage.getItem(SOUND_KEY) === "on"; } catch (e) { /* 저장소 막힘: 꺼진 채로 */ }
  let audio = null;

  function setSound(on) {
    soundOn = on;
    try { localStorage.setItem(SOUND_KEY, on ? "on" : "off"); } catch (e) { /* 무시 */ }
  }

  function tone(freq, at, dur) {
    const o = audio.createOscillator();
    const g = audio.createGain();
    o.type = "square";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.05, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g).connect(audio.destination);
    o.start(at);
    o.stop(at + dur + 0.02);
  }

  function sfx(name) {
    if (!soundOn) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const t = audio.currentTime;
      if (name === "move") tone(880, t, 0.05);
      else if (name === "start") [523, 659, 784, 1047].forEach((f, i) => tone(f, t + i * 0.06, 0.09));
      else if (name === "toggle") { tone(660, t, 0.05); tone(990, t + 0.05, 0.06); }
    } catch (e) { /* 소리 못 냄: 무시 */ }
  }

  return { el, setAccent, filled, placeholder, youtubeId, media, pad, sfx, setSound, isSoundOn: () => soundOn };
})();
