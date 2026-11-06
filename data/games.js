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
  },

  {
    id: "moa-world",
    title: "MoaWorld",
    genre: "온라인 오픈월드 · 생명체 수집",
    status: "프로토타입",
    type: "개인",
    period: "2026.10.07 ~ 10.12",
    team: "1인 개발",
    role: "기획 · 프로그래밍 · 아트 연결",
    engine: "Unity 6.6 · URP · Netcode for GameObjects",
    theme: "#6fd36b",
    summary: "귀여운 생명체 '모아'를 발견하고 포획해 함께 싸우는 온라인 오픈월드. 호스트 PC가 방을 열고 최대 20명이 한 월드를 탐험한다.",
    tags: ["온라인", "오픈월드", "수집", "멀티플레이"],
    cover: "games/moa-world/2.jpg",
    preview: "",
    video: "",
    myWork: [
      "기획서 작성 — 핵심 루프(탐험 → 전투 → 포획 → 상점), 포획 권한 · 보상 분배 규칙",
      "호스트 방식 멀티플레이(Netcode for GameObjects) — 같은 네트워크의 방 찾기, 접속 실패 안내",
      "호수 · 숲 · 황무지 · 산 바이옴으로 나뉜 월드 생성",
      "모아 21종 — 블렌더 자동 리깅으로 뼈대 애니메이션, 종마다 공격 이펙트",
      "모아가 스킬 쿨타임마다 자동으로 싸우는 전투, 물 · 불 · 풀 · 노말 속성",
      "모아볼 포획 · 모아 코인 · 상점 · 모아 박스(회복 · 편성) UI, 낮 · 밤 순환",
      "트레이너 캐릭터(남 · 여) 리깅과 던지기 · 소환 애니메이션"
    ],
    problems: [],                        // TODO 겪은 문제와 해결을 1~2개 써주세요
    shots: [
      "games/moa-world/cover.jpg", "games/moa-world/1.jpg", "games/moa-world/3.jpg",
      "games/moa-world/4.jpg", "games/moa-world/5.jpg", "games/moa-world/6.jpg",
      "games/moa-world/7.jpg", "games/moa-world/8.jpg", "games/moa-world/9.jpg"
    ],
    links: [
      { label: "GitHub", url: "https://github.com/Shaun1667/MoaWorld" }
    ]
  },

  {
    id: "fortress",
    title: "Fortress",
    genre: "턴제 포격 · 탱크 대전",
    status: "프로토타입",
    type: "개인",
    period: "2026.10.15 ~ 10.16",
    team: "1인 개발",
    role: "기획 · 프로그래밍",
    engine: "Unity 6.6 · URP",
    theme: "#e0a84a",
    summary: "탱크가 번갈아 각도와 힘을 정해 포탄을 쏘는 턴제 포격 대전. 포탄이 떨어진 자리의 지형이 부서진다.",
    tags: ["턴제", "물리", "AI 상대"],
    cover: "", preview: "", video: "",
    myWork: [
      "포탄이 떨어지면 지형이 깎이는 파괴 지형",
      "탱크 4종(캐논 · 미사일 · 드릴러 · 바머)과 무기 3종 — 분열 · 연쇄 폭발 등 특수 동작 조합",
      "컴퓨터 상대 — 난이도 쉬움 · 보통 · 어려움",
      "지형 · 탱크 · 카메라를 실행 중에 코드로 생성"
    ],
    problems: [
      {
        title: "컴퓨터 상대가 어디를 쏴야 할지 계산하기",
        problem: "바람 · 지형 · 무기마다 궤적이 달라서 공식 하나로는 맞히는 각도와 힘을 구하기 어렵다.",
        solution: "실제 포탄과 같은 물리로 여러 각도 · 힘을 미리 시뮬레이션하고, 목표에 가장 가깝게 떨어지는 샷을 고르게 했다. 자기 자신이 폭발 범위에 들어가는 샷은 피한다.",
        result: ""
      }
    ],
    shots: [],
    links: []                            // GitHub 저장소가 비공개라 링크 없음
  },

  {
    id: "last-striker",
    title: "LastStriker",
    genre: "레일 슈터 · 건 슈팅",
    status: "완성",
    type: "개인",
    period: "2026.09.30 ~ 10.04",
    team: "1인 개발",
    role: "기획 · 프로그래밍",
    engine: "Unity 6.6 · URP",
    theme: "#ff5d73",
    summary: "정해진 경로를 따라 자동으로 나아가며, 조준과 방패로 몰려오는 적을 처치하는 레일 슈터. 마지막에 부위 파괴 보스가 나온다.",
    tags: ["슈팅", "보스전", "완성작"],
    cover: "", preview: "", video: "",
    myWork: [
      "레일 카메라 · 자동 이동, 조준 · 사격 · 방패 · 수류탄",
      "적 13종 — 저격수 · 돌격 · 자폭 드론 · 방패병 · 수리병 · 지휘관 등, 머리 · 약점 판정",
      "부위별 체력과 판정을 가진 보스 — 팔 공격 · 부하 소환",
      "웨이브 · 스테이지 진행, 점수, 타이틀 · 일시정지 · 이어하기 · 엔딩 · 결과 화면"
    ],
    problems: [],                        // TODO
    shots: [],
    links: [
      { label: "GitHub", url: "https://github.com/Shaun1667/LastStriker" }
    ]
  },

  {
    id: "pirate-king",
    title: "PirateKing",
    genre: "해적 · 바다 (기획 중)",       // TODO 장르 확인
    status: "개발 초기",
    type: "개인",
    period: "2026.09.21 ~",
    team: "1인 개발",
    role: "",
    engine: "Unity 6.6 · URP",
    theme: "#3fb6e8",
    summary: "한 줄 소개를 써주세요.",     // TODO
    tags: ["바다"],
    cover: "", preview: "", video: "",
    myWork: [], problems: [], shots: [],
    links: [
      { label: "GitHub", url: "https://github.com/Shaun1667/PirateKing" }
    ]
  },

  {
    id: "speed-car",
    title: "SpeedCar",
    genre: "무한 주행 · 아케이드",
    status: "프로토타입",
    type: "개인",
    period: "2026.09.16 ~ 09.19",
    team: "1인 개발",
    role: "기획 · 프로그래밍",
    engine: "Unity 6.6 · URP",
    theme: "#ffd23f",
    summary: "끝없이 이어지는 도로에서 점점 빨라지는 차를 몰며 다른 차들을 피하는 아케이드 주행 게임.",
    tags: ["레이싱", "무한 맵"],
    cover: "", preview: "", video: "",
    myWork: [
      "도로 조각을 이어 붙여 끝없이 이어지는 도로",
      "시간이 지날수록 빨라지는 차, 차선 이동",
      "도로 조각마다 다니는 교통 차량 생성 · 속도 조절, 충돌 처리"
    ],
    problems: [
      {
        title: "맵 크기 제한 없이 계속 달리게 하기",
        problem: "긴 도로를 통째로 만들어 두면 맵이 무거워지고 언젠가 끝이 난다.",
        solution: "도로를 조각(프리팹)으로 나누고, 조각 시작 지점의 트리거를 지날 때마다 다음 조각을 앞쪽 끝에 이어 붙였다. 조각이 여러 개면 무작위로 고른다.",
        result: "필요한 만큼만 도로를 만들면서 끝없이 달릴 수 있다."
      }
    ],
    shots: [],
    links: [
      { label: "GitHub", url: "https://github.com/Shaun1667/SpeedCar" }
    ]
  }
];
