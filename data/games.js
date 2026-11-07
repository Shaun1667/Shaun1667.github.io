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

// 게임 id를 바꿨을 때 예전 주소(#예전id, game.html?id=예전id)도 새 게임으로 열리게
window.GAME_ALIASES = {
  "iron-and-ink": "steam-and-ink",
  "fortress": "tank-shooting"
};

window.GAMES = [
  {
    id: "dungeon",                       // 주소가 바뀌지 않게 id는 그대로
    title: "MoaDungeon",
    genre: "턴제 마법 로그라이크",
    status: "지스타 시연 빌드",
    type: "개인",
    period: "2026.05 ~",
    team: "1인 개발",
    role: "기획 · 프로그래밍 · 아트 연결",
    engine: "Unity 6.6 · URP",
    theme: "#8f7cff",
    summary: "속성과 상태가 맞물리는 턴제 마법 로그라이크. 물을 깔고 번개를 쏘듯 지형과 상태를 먼저 만들고 그 위에 마법을 얹으며 던전을 내려간다.",
    tags: ["로그라이크", "턴제", "속성 반응", "테스트"],
    cover: "games/dungeon/cover.jpg",
    preview: "",
    video: "",
    myWork: [
      "격자 기반 턴제 전투 — 한 번 행동 = 한 턴, 마나로 쓰는 속성 마법",
      "속성 · 상태 · 지형 반응 — 젖음 + 번개 = 감전, 얼음 = 빙결 · 둔화 등",
      "마법서와 마법 융합기로 같은 마법을 런마다 다르게 강화 · 변형하는 빌드",
      "구역 5개의 층 구성, 구역 시작층 상점, 붉은 칸으로 공격을 예고하는 보스",
      "명예의 전당, 개발자 디버그 창, 지스타 시연 모드(5층 보스에서 시연 완료)",
      "규칙 코드를 EditMode 테스트 600여 개로 고정"
    ],
    problems: [
      {
        title: "그래픽 방향이 정해지기 전에 규칙부터 만들어야 했다",
        problem: "고각도 2.5D로 갈지 2D 픽셀로 갈지 정해지지 않은 상태에서, 그래픽이 바뀔 때마다 전투 코드를 다시 짜면 개발이 멈춘다.",
        solution: "전투 · 상태 · 지형 · 마나 규칙을 Transform · 카메라 · 물리 없이 격자 위의 순수 로직으로 만들고, 로직은 '(3,4)에 화염 생성' 같은 이벤트만 내보내게 했다. 화면 쪽이 그 이벤트를 3D 이펙트나 스프라이트로 바꾸고, 그림은 ID로만 참조한다.",
        result: "그래픽을 바꿔도 규칙 코드와 테스트는 그대로 쓸 수 있다."
      }
    ],
    shots: ["games/dungeon/1.jpg", "games/dungeon/2.jpg"],
    links: [
      { label: "GitHub", url: "https://github.com/Shaun1667/Project_M" },
      { label: "itch.io", url: "https://namuletta.itch.io/narudungeon" }
    ]
  },

  {
    id: "steam-and-ink",
    title: "철과 묵",
    genre: "조선 스팀펑크 액션 · 보스전",
    status: "지스타 시연 빌드",
    type: "팀",
    period: "2026.09.30 ~ 11.05",
    team: "5인 팀",
    role: "팀장 · 통합 · 플레이어 전투 연출 · 이펙트",
    engine: "Unity 6.6 · URP · Cinemachine",
    theme: "#e0663f",
    summary: "철과 묵 — 1887년, 시간이 멈춘 한양. 증기통을 멘 무사가 환도와 화승총, 받아치기와 5초 시간 역행으로 폭주한 수신 현무를 잠재우는 3인칭 액션. 약 20분 분량의 시연 빌드.",
    tags: ["액션", "보스전", "팀 프로젝트", "팀장"],
    cover: "games/steam-and-ink/cover.jpg?v=2",
    coverPos: "50% 10%",                // 큰 화면에서 보일 위치 (가로 세로, CSS object-position). 비우면 가운데
    thumbPos: "0% 50%",                 // 아래 작은 썸네일에서 보일 위치. 0% = 왼쪽(로고 쪽)
    preview: "",
    video: "",
    myWork: [
      "팀장 · 통합 브랜치 관리 — 팀원 브랜치를 병합 · 확인한 뒤 main에 반영 (팀에서 커밋이 가장 많음)",
      "플레이어 근접 전투 — 환도 발도 · 납도, 받아치기 입력 · 판정 · 동심원 UI · 칼 패링 동작",
      "받아치기 성공 시 종이 ↔ 먹 화면 반전과 충격파, 낮은 체력 화면, 사망 셰이더, 서리 효과",
      "5초 시간 역행(되감기) 기능",
      "메인 맵 연출 — 근정전 · 조명 · 후처리, 수묵 구름, NavMesh로 보스방까지 길 안내",
      "인트로 시네머신 장면, 발자국 · 패링 사운드 연결",
      "빌드 마무리 — 해상도 · 디버그 입력 정리, 시연 자동 조종 · 녹화 도구"
    ],
    problems: [
      {
        title: "5명이 같은 씬 · 같은 플레이어를 고칠 때 생기는 충돌",
        problem: "여러 사람이 메인 씬과 공용 플레이어 프리팹을 동시에 고치면 병합 충돌이 나고 서로의 작업을 덮어쓰게 된다.",
        solution: "흐름을 '각자 브랜치 → 통합 브랜치에서 병합 · 확인 → main 반영'으로 정하고 통합 브랜치를 관리했다. 공용 플레이어 프리팹은 작업하는 사람의 폴더로 옮겨 고치고 끝나면 되돌리는 방식으로 한 번에 한 사람만 고치게 했다.",
        result: ""
      },
      {
        title: "넓은 메인 맵의 로딩과 프레임",
        problem: "궁궐 · 마을 소품이 많은 메인 맵은 정적 오브젝트와 메시 충돌체가 많아 로딩과 프레임이 무거웠다.",
        solution: "정적 오브젝트를 MeshBaker로 구역별로 합치고 원본은 끄고, 정적 배칭을 켜고, 일부 메시 충돌체를 박스 충돌체로 바꾼 뒤 NavMesh를 다시 구웠다.",
        result: ""
      }
    ],
    shots: [
      "games/steam-and-ink/1.jpg", "games/steam-and-ink/2.jpg", "games/steam-and-ink/3.jpg",
      "games/steam-and-ink/4.jpg", "games/steam-and-ink/5.jpg"
    ],
    links: [
      { label: "GitHub", url: "https://github.com/Shaun1667/Project-SteamAttack" }
    ]
  },

  {
    id: "five-rivers",
    title: "다섯 개의 강",
    genre: "1인칭 슈팅 · 서사 체험",
    status: "지스타 시연 빌드",
    type: "팀",
    period: "2026.10.25 ~ 11.05",
    team: "4인 팀",
    role: "아트 · 애니메이션 파트",
    engine: "Unity 6.3 · URP",
    theme: "#d6b46a",
    summary: "1950년 8월 다부동의 야간 방어전을 신병의 눈으로 겪는 1인칭 슈팅. 어두울 때 움직이고 조명탄이 밝아지면 엄폐 사격하며, 마지막에는 전사자의 이름과 편지를 읽는다. 지스타 관람객용 5~9분 체험 데모.",
    tags: ["FPS", "서사", "팀 프로젝트", "지스타"],
    cover: "games/five-rivers/cover.jpg",
    preview: "",
    video: "",
    myWork: [
      "아트 · 애니메이션 파트 브랜치 담당 — 요청서에 맞춰 회색 상자(그레이박스) 에셋을 실제 에셋으로 교체",
      "캐릭터 모델 교체 — 국군 주인공 · 병사 · 학도병, 북한군 소총수",
      "1인칭 팔 리깅, M1 소총 · 바주카 1인칭 동작(꺼내기 · 장전 · 발사 · 질주 · 보급)과 아군 · 적 3인칭 동작 등 애니메이션 20여 종",
      "무기(M1 · 바주카 · 모신나강 · PPSh-41) · 소품 · T-34-85 전차 모델, 글꼴 · 타이틀 배경 · 편지지 텍스처",
      "VFX 13종 — 총구 섬광, 조명탄, 흙 튐, 바주카 후폭풍 · 로켓 궤적, 전차 사격 · 피격 폭발 · 도탄 · 연기",
      "캐릭터 애니메이터 연결, 큰 FBX 파일을 위한 Git LFS 설정"
    ],
    problems: [
      {
        title: "파트 브랜치에서 넣은 에셋이 병합 때 끊기는 문제",
        problem: "회색 상자 에셋이 main에 있는 상태에서 아트 브랜치가 같은 에셋을 따로 추가하면, 병합할 때 같은 파일이 양쪽에 생기고 .meta의 GUID가 달라져 프리팹 연결이 끊긴다.",
        solution: "에셋을 넣기 전에 main을 파트 브랜치로 먼저 병합해 회색 상자 파일과 .meta를 받고, 같은 이름으로 덮어쓰도록 했다. 파트 브랜치에서는 코드 · 씬 · 프리팹을 고치지 않고, 연결은 main에서만 한다.",
        result: ""
      }
    ],
    shots: [
      "games/five-rivers/1.jpg", "games/five-rivers/2.jpg", "games/five-rivers/3.jpg",
      "games/five-rivers/4.jpg", "games/five-rivers/5.jpg", "games/five-rivers/6.jpg",
      "games/five-rivers/7.jpg"
    ],
    links: [
      { label: "GitHub (팀 저장소)", url: "https://github.com/jinsu-lee-code/fiveriver" }
    ]
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
    id: "tank-shooting",
    title: "TankShooting",
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
