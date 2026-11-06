// ─────────────────────────────────────────────────────────────
//  포트폴리오 내용은 이 파일 하나에서 고친다.
//  새 게임 = GAMES 목록에 { ... } 하나 추가 + games/<id>/ 폴더에 이미지·영상.
//  목록 순서 = 화면 순서 (최신작을 맨 앞에 두는 걸 추천).
//  빈 칸("")이나 빈 목록([])은 화면에서 자동으로 숨겨진다.
// ─────────────────────────────────────────────────────────────

window.PROFILE = {
  name: "이름",                                  // TODO
  role: "Unity 게임 클라이언트 개발자",
  intro: "한두 문장 자기소개를 써주세요. 어떤 게임을 만들고 싶은지, 무엇을 잘하는지.", // TODO
  email: "",                                     // TODO 예: "me@example.com"
  links: [
    { label: "GitHub", url: "https://github.com/Shaun1667" },
    { label: "Notion", url: "" },                // TODO 이력서용 Notion 공개 링크
    { label: "itch.io", url: "" },
    { label: "YouTube", url: "" }
  ],
  skills: [
    { group: "엔진", items: ["Unity 6", "URP", "Input System", "uGUI"] },
    { group: "언어", items: ["C#"] },
    { group: "도구", items: ["Git", "SourceTree"] },
    { group: "설계", items: ["결정론적 시뮬레이션", "데이터 주도 설계", "EditMode 테스트"] }
  ]
};

window.GAMES = [
  {
    id: "moa-showdown",                 // 영문 · 숫자 · 하이픈. 주소에 쓰이므로 바꾸지 않기
    title: "MoaShowdown",
    genre: "8인 실시간 오토 배틀러",
    status: "개발 중",                   // "개발 중" | "완성" | "출시" | "중단" 등 자유
    type: "개인",                        // 필터 탭: "개인" | "팀" | "회사" | "학교"
    period: "2026.11 ~",
    team: "1인 개발",
    role: "기획 · 프로그래밍 전체",
    engine: "Unity 6 · URP · C#",
    theme: "#ffb84d",                    // 이 게임을 고르면 화면 강조색이 이 색으로 바뀜
    summary: "몬스터 팀을 3×2 격자에 배치해 8명이 동시에 겨루는 3D 오토 배틀러. 상점에서 몬스터를 사고 합쳐 팀을 키운다.",
    tags: ["오토 배틀러", "온라인", "결정론적 전투", "테스트"],
    cover: "",                           // 예: "games/moa-showdown/cover.jpg"
    preview: "",                         // 고를 때 재생되는 짧은 영상, 예: "games/moa-showdown/preview.mp4"
    video: "",                           // 상세 페이지 영상 (YouTube 주소 또는 mp4 경로)
    myWork: [
      "엔진과 분리된 전투 규칙 코드 — 고정 틱 · 정수 계산 · 시드 난수",
      "상점 · 골드 · 3마리 합체 · 대기석 배치",
      "8인 로비: 대진 · 공유 몬스터 풀 · 캐러셀 · PvE 라운드 · 봇",
      "전투 기록을 시간에 맞춰 재생하는 3D 화면과 코드로 만드는 UI",
      "수치는 데이터 에셋으로 분리, EditMode 테스트로 규칙 고정"
    ],
    problems: [
      {
        title: "8명이 전투를 각자 계산해도 결과가 같아야 했다",
        problem: "온라인에서 전투 전체를 주고받으면 무겁고, 각자 계산하면 PC마다 결과가 어긋날 수 있다.",
        solution: "전투 규칙을 엔진을 모르는 순수 C# 코드로 분리하고 float 대신 정수, 용도별 시드 난수, 고정 틱만 쓰도록 제한했다.",
        result: "라운드마다 팀 정보만 주고받고, 같은 입력이면 어느 PC에서든 같은 전투가 나온다."
      },
      {
        title: "공유 몬스터 풀에서 마리 수가 새지 않게",
        problem: "8명이 같은 풀에서 사고 · 팔고 · 탈락하면 몬스터가 사라지거나 복제되는 버그가 생기기 쉽다.",
        solution: "풀을 다루는 코드를 한 곳에 모으고 '풀 + 상점 + 보유 = 처음 총량' 규칙을 테스트로 고정했다.",
        result: "상점 · 판매 · 탈락 · 캐러셀을 추가할 때마다 같은 테스트로 바로 확인한다."
      },
      {
        title: "저장 형식이 바뀌어도 옛 데이터를 읽어야 했다",
        problem: "팀 정보 형식은 온라인 계약이라, 필드를 바꾸면 옛 버전 데이터를 못 읽게 된다.",
        solution: "형식에 버전 번호를 두고 읽을 때 한 단계씩 변환하도록 했으며, 옛 JSON 예시를 테스트에 남겨 지우지 않는다.",
        result: "형식을 고쳐도 이전 버전 데이터가 계속 읽힌다."
      }
    ],
    shots: [],                           // 예: ["games/moa-showdown/1.jpg", "games/moa-showdown/2.jpg"]
    links: [
      { label: "GitHub", url: "https://github.com/Shaun1667/MoaShowdown" }
    ]
  },

  {
    id: "five-rivers",
    title: "다섯 개의 강",
    genre: "FPS · 전쟁",
    status: "",                          // TODO
    type: "팀",                          // TODO 확인
    period: "",                          // TODO
    team: "",                            // TODO
    role: "",                            // TODO
    engine: "Unity",
    theme: "#8fbf6a",
    summary: "한 줄 소개를 써주세요.",     // TODO
    tags: ["FPS"],
    cover: "", preview: "", video: "",
    myWork: [], problems: [], shots: [], links: []
  },

  {
    id: "iron-and-ink",
    title: "철과 묵",
    genre: "액션 · 조선 스팀펑크",
    status: "",
    type: "팀",                          // TODO 확인
    period: "", team: "", role: "",
    engine: "Unity",
    theme: "#e0663f",
    summary: "한 줄 소개를 써주세요.",
    tags: ["액션"],
    cover: "", preview: "", video: "",
    myWork: [], problems: [], shots: [], links: []
  },

  {
    id: "cozy-village",
    title: "포근마을",
    genre: "힐링 · 생활 시뮬레이션",
    status: "",
    type: "팀",                          // TODO 확인
    period: "", team: "", role: "",
    engine: "Unity",
    theme: "#f4a7c0",
    summary: "한 줄 소개를 써주세요.",
    tags: ["생활 시뮬레이션"],
    cover: "", preview: "", video: "",
    myWork: [], problems: [], shots: [], links: []
  },

  {
    id: "dungeon",
    title: "던전 프로젝트",               // TODO 정식 이름
    genre: "턴제 · 로그라이크",
    status: "",
    type: "개인",                        // TODO 확인
    period: "", team: "", role: "",
    engine: "Unity",
    theme: "#8f7cff",
    summary: "한 줄 소개를 써주세요.",
    tags: ["로그라이크"],
    cover: "", preview: "", video: "",
    myWork: [], problems: [], shots: [], links: []
  }
];
