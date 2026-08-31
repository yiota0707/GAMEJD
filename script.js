console.log("Deans Games loaded 💚");

(() => {

"use strict";

/* ==========================================================
   CONFIG
   ========================================================== */

const START_DATE = "2026-08-30";
const TOTAL_DAILY_DAYS = 200;


/* ==========================================================
   HELPERS
   ========================================================== */

const $ = selector =>
  document.querySelector(selector);

const $$ = selector =>
  [...document.querySelectorAll(selector)];


/* ==========================================================
   SCREENS
   ========================================================== */

const screens = {
  home: $("#homeScreen"),
  game: $("#gameScreen"),
  pause: $("#pauseScreen"),
  archive: $("#archiveScreen"),
  stats: $("#statsScreen"),
  win: $("#winScreen")
};


/* ==========================================================
   GAME INFORMATION
   ========================================================== */

const GAME_META = {

  queens: {
    title: "Queens",
    icon: "♛",
    color: "linear-gradient(135deg,#d9e8dd,#a8cbb8)",
    featured: true,
    difficulty: "VERY HARD",
    time: "8–20 min",
    tags: "Logic · Regions · Deduction",
    blurb:
      "Place one queen in every row, column and coloured region — without queens touching diagonally."
  },

  circuit: {
    title: "Circuit",
    icon: "◫",
    color: "linear-gradient(135deg,#e3efce,#c7dda5)",
    difficulty: "VERY HARD",
    time: "8–20 min",
    tags: "Spatial · Deduction · Numbers",
    blurb:
      "Resolve a network of linked number-pair constraints."
  },

  route: {
    title: "Route",
    icon: "↗",
    color: "#ddebef",
    difficulty: "HARD",
    time: "6–15 min",
    tags: "Pathfinding · Planning",
    blurb:
      "Build a precise route through ordered checkpoints without trapping yourself."
  },

  cipher: {
    title: "Cipher",
    icon: "⌨",
    color: "#e8e0f1",
    difficulty: "VERY HARD",
    time: "8–18 min",
    tags: "Deduction · Codes",
    blurb:
      "Decode a six-symbol system from overlapping positional evidence."
  },

  eclipse: {
    title: "Eclipse",
    icon: "◐",
    color: "#efdcd7",
    difficulty: "VERY HARD",
    time: "8–20 min",
    tags: "Logic · Binary · Deduction",
    blurb:
      "Fill an 8×8 grid with suns and moons using balance and adjacency rules."
  },

  balance: {
    title: "Balance",
    icon: "⚖",
    color: "#efe4d3",
    difficulty: "VERY HARD",
    time: "8–18 min",
    tags: "Numbers · Partition · Deduction",
    blurb:
      "Partition eight weights using totals plus parity and spread constraints."
  },

  signal: {
    title: "Signal",
    icon: "⌁",
    color: "linear-gradient(135deg,#dfece4,#b8d4c5)",
    difficulty: "VERY HARD",
    time: "7–18 min",
    tags: "Patterns · Maths · Lateral",
    blurb:
      "Crack multi-step transformations, second differences and chained ordering rules."
  }

};

/* ==========================================================
   RULES
   ========================================================== */

const RULES = {

  queens: `
    <div class="rule-row">
      <div class="rule-icon">♛</div>
      <div>
        <strong>Place exactly nine queens.</strong>
        <br>
        Each row must contain exactly one queen.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">↕</div>
      <div>
        <strong>One queen in every column.</strong>
        <br>
        Two queens can never share a column.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">▦</div>
      <div>
        <strong>One queen in every coloured region.</strong>
        <br>
        Each coloured area must contain exactly one queen.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">×</div>
      <div>
        <strong>Queens may not touch diagonally.</strong>
        <br>
        Queens in neighbouring rows cannot sit in neighbouring columns.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">•</div>
      <div>
        <strong>Use crosses to eliminate cells.</strong>
        <br>
        Tap once for ×, twice for a queen, and a third time to clear the square.
      </div>
    </div>
  `,

  circuit: `
    <div class="rule-row">
      <div class="rule-icon">↻</div>
      <div>
        <strong>Flip every pair.</strong>
        <br>
        Each number-pair can face one of two directions.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">Σ</div>
      <div>
        <strong>Read every condition.</strong>
        <br>
        Several totals must work at the same time.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">✓</div>
      <div>
        <strong>Everything must agree.</strong>
        <br>
        One incorrect orientation can break several rules.
      </div>
    </div>
  `,

  route: `
    <div class="rule-row">
      <div class="rule-icon">A→B</div>
      <div>
        <strong>Build one continuous path.</strong>
        <br>
        Start at A and finish at B.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">①</div>
      <div>
        <strong>Visit checkpoints in order.</strong>
        <br>
        1 must appear before 2, then 3.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">#</div>
      <div>
        <strong>Match the exact path length.</strong>
        <br>
        A correct-looking route can still be too short or too long.
      </div>
    </div>
  `,

  cipher: `
    <div class="rule-row">
      <div class="rule-icon">6</div>
      <div>
        <strong>Find the six-symbol code.</strong>
        <br>
        Every symbol appears exactly once.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">◎</div>
      <div>
        <strong>Combine all the clues.</strong>
        <br>
        Clues can describe ordering, adjacency, distance and forbidden positions.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">≠</div>
      <div>
        <strong>No single clue gives the answer.</strong>
        <br>
        The complete order appears only when the clues are used together.
      </div>
    </div>
  `,

  eclipse: `
    <div class="rule-row">
      <div class="rule-icon">☀</div>
      <div>
        <strong>Fill every square with a sun or moon.</strong>
        <br>
        Tap once for Sun, twice for Moon, and a third time to clear.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">2</div>
      <div>
        <strong>No more than two matching symbols may touch in a line.</strong>
        <br>
        Three Suns or three Moons can never appear consecutively, horizontally or vertically.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">4·4</div>
      <div>
        <strong>Every row and column is balanced.</strong>
        <br>
        On the 8×8 board, each row and column contains exactly four Suns and four Moons.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">✓</div>
      <div>
        <strong>There is one correct answer.</strong>
        <br>
        Use deduction from the fixed clues. You never need an extra row-uniqueness rule.
      </div>
    </div>
  `,

  balance: `
    <div class="rule-row">
      <div class="rule-icon">⚖</div>
      <div>
        <strong>Split all eight weights.</strong>
        <br>
        Each tray must contain exactly four weights.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">Σ</div>
      <div>
        <strong>Hit both target totals.</strong>
        <br>
        Both trays have an exact required sum.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">◐</div>
      <div>
        <strong>Watch parity too.</strong>
        <br>
        Each tray has a required number of odd weights.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">↔</div>
      <div>
        <strong>Match the required spread.</strong>
        <br>
        The difference between the largest and smallest weight matters.
      </div>
    </div>
  `,

  signal: `
    <div class="rule-row">
      <div class="rule-icon">?</div>
      <div>
        <strong>Discover the hidden system.</strong>
        <br>
        Each round can use a different type of reasoning.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">∆</div>
      <div>
        <strong>Look deeper than the first difference.</strong>
        <br>
        Second differences and alternating operations can appear.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">⇄</div>
      <div>
        <strong>Some rules have multiple stages.</strong>
        <br>
        Ordering and transformations may need to be combined.
      </div>
    </div>
  `,

  special: `
    <div class="rule-row">
      <div class="rule-icon">🏁</div>
      <div>
        <strong>Jack Special.</strong>
        <br>
        Bonus rounds occasionally use cars, Formula 1 and fantasy themes.
      </div>
    </div>
  `

};


/* ==========================================================
   STATE
   ========================================================== */

const state = {

  gameKey: null,

  mode: "daily",

  dateKey: todayKey(),

  puzzle: null,

  selected: [],

  attempts: 0,

  hints: 0,

  elapsed: 0,

  timerId: null,

  timerBase: 0,

  practiceCounter: 0,

  queensMarks: null,

  circuitRotations: null,

  routePath: null,

  cipherGuess: null,

  eclipseMarks: null,

  balanceLeft: [],

  balanceRight: [],

  signalAnswer: ""

};


/* ==========================================================
   STATS
   ========================================================== */

const storageKey =
  "deansGamesStatsV2";


function defaultStats() {

  return {

    solved: 0,

    played: 0,

    perfect: 0,

    bestSeconds: null,

    completedDaily: {},

    lastSolvedDate: null,

    streak: 0

  };

}


function loadStats() {

  try {

    return (

      JSON.parse(
        localStorage.getItem(
          storageKey
        )
      )

      ||

      defaultStats()

    );

  }

  catch {

    return defaultStats();

  }

}


let stats =
  loadStats();


function saveStats() {

  localStorage.setItem(

    storageKey,

    JSON.stringify(
      stats
    )

  );

}


/* ==========================================================
   DATE FUNCTIONS
   ========================================================== */

function todayKey(
  date = new Date()
) {

  return [

    date.getFullYear(),

    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    ),

    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    )

  ].join("-");

}


function dateFromKey(
  key
) {

  const [
    y,
    m,
    d
  ] =
    key
      .split("-")
      .map(Number);

  return new Date(
    y,
    m - 1,
    d,
    12,
    0,
    0
  );

}


function prettyDate(
  key
) {

  return dateFromKey(
    key
  ).toLocaleDateString(

    "en-GB",

    {

      weekday: "short",

      day: "numeric",

      month: "short"

    }

  );

}


function dailyNumber(
  key
) {

  const start =
    dateFromKey(
      START_DATE
    );

  const current =
    dateFromKey(
      key
    );

  const raw =
    Math.floor(

      (
        current -
        start
      )

      /

      86400000

    );

  return (

    (
      raw %
      TOTAL_DAILY_DAYS
    )

    +
    TOTAL_DAILY_DAYS

  )

  %

  TOTAL_DAILY_DAYS

  +

  1;

}


/* ==========================================================
   SEEDED RANDOM
   ========================================================== */

function hashString(
  text
) {

  let hash =
    2166136261;

  for (
    let i = 0;
    i < text.length;
    i++
  ) {

    hash ^=
      text.charCodeAt(i);

    hash =
      Math.imul(
        hash,
        16777619
      );

  }

  return hash >>> 0;

}


function rngFrom(
  token
) {

  let seed =
    hashString(
      token
    )
    ||
    1;

  return () => {

    seed ^=
      seed << 13;

    seed ^=
      seed >>> 17;

    seed ^=
      seed << 5;

    return (
      seed >>> 0
    )
    /
    4294967296;

  };

}


function randomInt(
  rng,
  min,
  max
) {

  return (
    min
    +
    Math.floor(
      rng()
      *
      (
        max -
        min +
        1
      )
    )
  );

}


function shuffle(
  array,
  rng
) {

  const copy =
    [...array];

  for (
    let i =
      copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        rng()
        *
        (
          i + 1
        )
      );

    [
      copy[i],
      copy[j]
    ]

    =

    [
      copy[j],
      copy[i]
    ];

  }

  return copy;

}


function clone(
  object
) {

  return JSON.parse(
    JSON.stringify(
      object
    )
  );

}


function puzzleToken(
  gameKey,
  dateKey,
  mode
) {

  if (
    mode === "practice"
  ) {

    return (
      `${gameKey}:practice:${Date.now()}:${state.practiceCounter}`
    );

  }

  return (
    `${gameKey}:day:${dailyNumber(dateKey)}:${dateKey}`
  );

}


/* ==========================================================
   TIMER
   ========================================================== */

function formatTime(
  seconds
) {

  const minutes =
    Math.floor(
      seconds / 60
    );

  const remainder =
    seconds % 60;

  return (

    String(
      minutes
    ).padStart(
      2,
      "0"
    )

    +

    ":"

    +

    String(
      remainder
    ).padStart(
      2,
      "0"
    )

  );

}


function stopTimer() {

  if (
    state.timerId
  ) {

    clearInterval(
      state.timerId
    );

    state.timerId =
      null;

  }

}


function startTimer() {

  stopTimer();

  state.timerBase =
    Date.now()
    -
    state.elapsed * 1000;

  state.timerId =
    setInterval(

      () => {

        state.elapsed =
          Math.floor(

            (
              Date.now()
              -
              state.timerBase
            )

            /
            1000

          );

        $("#timer").textContent =
          formatTime(
            state.elapsed
          );

      },

      250

    );

}


/* ==========================================================
   SCREEN MANAGEMENT
   ========================================================== */

function showScreen(
  name
) {

  Object.values(
    screens
  ).forEach(

    screen =>
      screen.classList.remove(
        "active"
      )

  );

  screens[name]
    .classList.add(
      "active"
    );

  $$(".nav-button")
    .forEach(

      button => {

        const target =
          button.dataset.screen;

        const active =

          (
            name === "home"
            &&
            target === "homeScreen"
          )

          ||

          (
            name === "archive"
            &&
            target === "archiveScreen"
          )

          ||

          (
            name === "stats"
            &&
            target === "statsScreen"
          );

        button.classList.toggle(
          "active",
          active
        );

      }

    );

  if (
    name === "archive"
  ) {

    renderArchive();

  }

  if (
    name === "stats"
  ) {

    renderStats();

  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==========================================================
   FEEDBACK
   ========================================================== */

function clearFeedback() {

  const box =
    $("#feedback");

  box.classList.add(
    "hidden"
  );

  box.classList.remove(
    "error"
  );

  box.textContent =
    "";

}


function setFeedback(
  text,
  error = false
) {

  const box =
    $("#feedback");

  box.textContent =
    text;

  box.classList.remove(
    "hidden"
  );

  box.classList.toggle(
    "error",
    error
  );

}


/* ==========================================================
   HOME
   ========================================================== */

function renderHome() {

  state.dateKey =
    todayKey();

  const now =
    new Date();

  const hour =
    now.getHours();

  let greeting =
    "Good evening, Jack.";

  if (
    hour < 12
  ) {

    greeting =
      "Good morning, Jack.";

  }

  else if (
    hour < 18
  ) {

    greeting =
      "Good afternoon, Jack.";

  }

  $("#greeting").textContent =
    greeting;

  $("#todayLabel").textContent =

    `${now.toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short"
      }
    )} · Day ${dailyNumber(
      state.dateKey
    )}`;

  const grid =
    $("#gameGrid");

  grid.innerHTML =
    "";

  Object.entries(
    GAME_META
  ).forEach(

    ([key, meta]) => {

      const completed =
        Boolean(
          stats
            .completedDaily
            ?.[state.dateKey]
            ?.[key]
        );

      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

      card.className =
        "game-card"
        +
        (
          meta.featured
          ?
          " featured"
          :
          ""
        );

      card.style.background =
        meta.color;

      card.innerHTML = `

        <div class="game-card-top">

          <div>

            <div
              style="
                display:flex;
                align-items:center;
                gap:8px;
                flex-wrap:wrap;
              "
            >

              <h3>
                ${meta.title}
              </h3>

              ${
                completed
                ?
                `
                <span class="mini-pill green">
                  SOLVED
                </span>
                `
                :
                `
                <span class="mini-pill">
                  TODAY
                </span>
                `
              }

            </div>

            <p>
              ${meta.blurb}
            </p>

          </div>

          <div class="game-icon">
            ${meta.icon}
          </div>

        </div>

        <div class="game-card-footer">

          <strong>
            ${meta.tags}
          </strong>

          <span>
            ${meta.time}
          </span>

        </div>

      `;

      card.addEventListener(

        "click",

        () => {

          openGame(
            key,
            "daily",
            state.dateKey
          );

        }

      );

      grid.appendChild(
        card
      );

    }

  );

}


/* ==========================================================
   QUEENS GENERATOR
   ========================================================== */

function createQueensPuzzle(
  token
) {

  const rng =
    rngFrom(
      token + ":queens"
    );

  const size =
    9;

  /*
    Choose one queen per row.
    Columns are a permutation.
    Adjacent rows cannot use adjacent columns.
  */

  let solution =
    null;

  for (
    let attempt = 0;
    attempt < 500;
    attempt++
  ) {

    const candidate =
      shuffle(
        [
          0,1,2,3,4,5,6,7,8
        ],
        rng
      );

    let valid =
      true;

    for (
      let row = 1;
      row < size;
      row++
    ) {

      if (
        Math.abs(
          candidate[row]
          -
          candidate[row - 1]
        )
        ===
        1
      ) {

        valid =
          false;

        break;

      }

    }

    if (
      valid
    ) {

      solution =
        candidate;

      break;

    }

  }

  if (
    !solution
  ) {

    solution =
      [
        0,2,4,6,8,1,3,5,7
      ];

  }


  /*
    Create regions around queen locations.
    Start with each queen cell as its own region,
    then grow regions until all cells are assigned.
  */

  const regions =
    Array(
      size * size
    ).fill(
      -1
    );

  const frontier =
    [];

  for (
    let row = 0;
    row < size;
    row++
  ) {

    const idx =
      row * size
      +
      solution[row];

    regions[idx] =
      row;

    frontier.push(
      idx
    );

  }

  while (
    regions.some(
      value =>
        value === -1
    )
  ) {

    const unassigned =
      [];

    regions.forEach(

      (
        region,
        idx
      ) => {

        if (
          region === -1
        ) {

          unassigned.push(
            idx
          );

        }

      }

    );

    const idx =
      unassigned[
        randomInt(
          rng,
          0,
          unassigned.length - 1
        )
      ];

    const row =
      Math.floor(
        idx / size
      );

    const col =
      idx % size;

    const neighbours =
      [];

    const candidates =
      [
        [row - 1,col],
        [row + 1,col],
        [row,col - 1],
        [row,col + 1]
      ];

    candidates.forEach(

      (
        [r,c]
      ) => {

        if (
          r >= 0
          &&
          r < size
          &&
          c >= 0
          &&
          c < size
        ) {

          const nidx =
            r * size + c;

          if (
            regions[nidx] !== -1
          ) {

            neighbours.push(
              regions[nidx]
            );

          }

        }

      }

    );

    if (
      neighbours.length
    ) {

      regions[idx] =
        neighbours[
          randomInt(
            rng,
            0,
            neighbours.length - 1
          )
        ];

    }

  }

  return {

    type:
      "queens",

    size,

    solution,

    regions,

    prompt:
      "Place 9 queens.",

    description:
      "Exactly one queen in every row, column and coloured region. Queens may not touch diagonally.",

    explanation:
      "Each queen occupies a different row, column and colour region, and neighbouring rows never place queens in adjacent columns."

  };

}


/* ==========================================================
   CIRCUIT GENERATOR
   ========================================================== */

function createCircuitPuzzle(
  token
) {

  const rng =
    rngFrom(
      token + ":circuit"
    );

  const pairs =
    [];

  const target =
    [];

  for (
    let i = 0;
    i < 8;
    i++
  ) {

    pairs.push(
      [
        randomInt(
          rng,
          1,
          9
        ),
        randomInt(
          rng,
          1,
          9
        )
      ]
    );

    target.push(
      randomInt(
        rng,
        0,
        1
      )
    );

  }

  function leftValue(
    index
  ) {

    return (
      target[index] === 0
      ?
      pairs[index][0]
      :
      pairs[index][1]
    );

  }

  function rightValue(
    index
  ) {

    return (
      target[index] === 0
      ?
      pairs[index][1]
      :
      pairs[index][0]
    );

  }

  const leftHalf =
    [0,1,2,3]
      .reduce(
        (
          sum,
          i
        ) =>
          sum
          +
          leftValue(i),
        0
      );

  const rightHalf =
    [4,5,6,7]
      .reduce(
        (
          sum,
          i
        ) =>
          sum
          +
          rightValue(i),
        0
      );

  const allLeft =
    pairs
      .reduce(
        (
          sum,
          _,
          i
        ) =>
          sum
          +
          leftValue(i),
        0
      );

  const oddRight =
    [1,3,5,7]
      .reduce(
        (
          sum,
          i
        ) =>
          sum
          +
          rightValue(i),
        0
      );

  return {

    type:
      "circuit",

    pairs,

    target,

    constraints: [

      `Left values of pieces 1–4 total ${leftHalf}.`,

      `Right values of pieces 5–8 total ${rightHalf}.`,

      `All left-facing values total ${allLeft}.`,

      `Right values of pieces 2, 4, 6 and 8 total ${oddRight}.`

    ],

    prompt:
      "Orient all eight pairs.",

    description:
      "Flip each pair until every network condition is true simultaneously.",

    explanation:
      "Each flip changes which number contributes to the left and right totals, so the constraints have to be solved together."

  };

}


/* ==========================================================
   ROUTE GENERATOR
   ========================================================== */

function createRoutePuzzle(
  token
) {

  const rng =
    rngFrom(
      token + ":route"
    );

  const size =
    7;

  let path =
    [];

  /*
    Build a snake-style valid path,
    then take a long segment from it.
  */

  const snake =
    [];

  for (
    let row = 0;
    row < size;
    row++
  ) {

    const cols =
      row % 2 === 0
      ?
      [
        0,1,2,3,4,5,6
      ]
      :
      [
        6,5,4,3,2,1,0
      ];

    cols.forEach(

      col =>
        snake.push(
          row * size + col
        )

    );

  }

  const startIndex =
    randomInt(
      rng,
      0,
      5
    );

  const length =
    randomInt(
      rng,
      24,
      34
    );

  path =
    snake.slice(
      startIndex,
      startIndex + length
    );

  const start =
    path[0];

  const end =
    path[
      path.length - 1
    ];

  const checkpoints = [

    path[
      Math.floor(
        path.length * 0.25
      )
    ],

    path[
      Math.floor(
        path.length * 0.52
      )
    ],

    path[
      Math.floor(
        path.length * 0.77
      )
    ]

  ];

  const safe =
    new Set(
      path
    );

  const blockedCandidates =
    [];

  for (
    let i = 0;
    i < size * size;
    i++
  ) {

    if (
      !safe.has(i)
    ) {

      blockedCandidates.push(
        i
      );

    }

  }

  const blocked =
    shuffle(
      blockedCandidates,
      rng
    ).slice(
      0,
      8
    );

  return {

    type:
      "route",

    size,

    start,

    end,

    checkpoints,

    blocked,

    requiredLength:
      path.length,

    solution:
      path,

    prompt:
      "Build the exact route.",

    description:
      `Reach B through ①, ② and ③ in order using exactly ${path.length} cells.`,

    explanation:
      "The path works because it reaches every checkpoint in order while meeting the exact length constraint."

  };

}


/* ==========================================================
   CIPHER GENERATOR — VERY HARD
   ========================================================== */

function createCipherPuzzle(token) {

  const rng =
    rngFrom(
      token + ":cipher-hard"
    );

  const symbolSets = [
    ["◆","●","▲","■","✦","⬟"],
    ["☀","☾","✦","◇","○","△"],
    ["A","K","M","R","X","Z"],
    ["♠","♥","♣","♦","●","★"]
  ];

  const symbols =
    clone(
      symbolSets[
        randomInt(
          rng,
          0,
          symbolSets.length - 1
        )
      ]
    );

  const answer =
    shuffle(
      symbols,
      rng
    );

  function permutations(array) {

    if (
      array.length <= 1
    ) {
      return [array];
    }

    const output = [];

    array.forEach(
      (value, index) => {

        const remainder = [
          ...array.slice(0, index),
          ...array.slice(index + 1)
        ];

        permutations(remainder)
          .forEach(
            tail => {
              output.push([
                value,
                ...tail
              ]);
            }
          );

      }
    );

    return output;
  }

  const allCandidates =
    permutations(symbols);

  const cluePool = [];

  function addClue(text, test) {
    if (test(answer)) {
      cluePool.push({text, test});
    }
  }

  for (
    let i = 0;
    i < answer.length;
    i++
  ) {

    for (
      let j = i + 1;
      j < answer.length;
      j++
    ) {

      const a = answer[i];
      const b = answer[j];

      addClue(
        `${a} is before ${b}.`,
        candidate =>
          candidate.indexOf(a) <
          candidate.indexOf(b)
      );

      if (
        j - i === 1
      ) {
        addClue(
          `${a} is immediately before ${b}.`,
          candidate =>
            candidate.indexOf(b) -
            candidate.indexOf(a) === 1
        );
      }

      if (
        j - i === 2
      ) {
        addClue(
          `Exactly one symbol is between ${a} and ${b}.`,
          candidate =>
            Math.abs(
              candidate.indexOf(a) -
              candidate.indexOf(b)
            ) === 2
        );
      }

      if (
        j - i === 3
      ) {
        addClue(
          `Exactly two symbols are between ${a} and ${b}.`,
          candidate =>
            Math.abs(
              candidate.indexOf(a) -
              candidate.indexOf(b)
            ) === 3
        );
      }

      if (
        j - i > 1
      ) {
        addClue(
          `${a} is not next to ${b}.`,
          candidate =>
            Math.abs(
              candidate.indexOf(a) -
              candidate.indexOf(b)
            ) !== 1
        );
      }

    }
  }

  answer.forEach(
    (symbol, index) => {

      const forbidden =
        (index + 2) % answer.length;

      addClue(
        `${symbol} is not in position ${forbidden + 1}.`,
        candidate =>
          candidate[forbidden] !== symbol
      );

    }
  );

  let candidates =
    [...allCandidates];

  const clues = [];
  const used = new Set();

  while (
    candidates.length > 1 &&
    clues.length < 8
  ) {

    let best = null;
    let bestRemaining =
      candidates.length;

    for (
      const clue of cluePool
    ) {

      if (
        used.has(clue.text)
      ) {
        continue;
      }

      const remaining =
        candidates.filter(
          clue.test
        );

      if (
        remaining.length > 0 &&
        remaining.length < bestRemaining
      ) {
        best = clue;
        bestRemaining =
          remaining.length;
      }

    }

    if (!best) {
      break;
    }

    used.add(best.text);
    clues.push(best.text);
    candidates =
      candidates.filter(
        best.test
      );
  }

  let positionIndex = 0;

  while (
    candidates.length > 1 &&
    positionIndex < answer.length
  ) {

    const symbol =
      answer[positionIndex];

    clues.push(
      `${symbol} is in position ${positionIndex + 1}.`
    );

    candidates =
      candidates.filter(
        candidate =>
          candidate[positionIndex] === symbol
      );

    positionIndex++;
  }

  return {
    type: "cipher",
    symbols: shuffle(symbols, rng),
    answer,
    clues,
    prompt:
      "Crack the six-symbol code.",
    description:
      "Arrange every symbol exactly once. Combine ordering, adjacency, distance and forbidden-position clues.",
    explanation:
      "The six-symbol order is forced only when the overlapping positional restrictions are combined."
  };

}

/* ==========================================================
   ECLIPSE GENERATOR
   ========================================================== */

function createEclipsePuzzle(token) {

  const rng =
    rngFrom(
      token + ":eclipse"
    );

  const size = 8;
  const half = size / 2;

  /*
    Eclipse uses the same core logic as the sun/moon game:
    - every cell is Sun or Moon
    - no three identical symbols consecutively
    - every row and column has an equal number of each symbol

    There is deliberately NO "all rows/columns must be unique" rule.
  */

  function lineOkay(line) {

    let suns = 0;
    let moons = 0;

    for (
      let i = 0;
      i < line.length;
      i++
    ) {

      if (line[i] === 1) suns++;
      if (line[i] === 2) moons++;

      if (
        i >= 2 &&
        line[i] !== 0 &&
        line[i] === line[i - 1] &&
        line[i] === line[i - 2]
      ) {
        return false;
      }

    }

    if (
      suns > half ||
      moons > half
    ) {
      return false;
    }

    if (
      !line.includes(0) &&
      (
        suns !== half ||
        moons !== half
      )
    ) {
      return false;
    }

    return true;
  }

  function generateSolvedBoard() {

    const board =
      Array(size * size).fill(0);

    function rowValues(row) {
      return board.slice(
        row * size,
        row * size + size
      );
    }

    function colValues(col) {

      const values = [];

      for (
        let row = 0;
        row < size;
        row++
      ) {
        values.push(
          board[row * size + col]
        );
      }

      return values;
    }

    function fill(index = 0) {

      if (
        index === board.length
      ) {
        return true;
      }

      const row =
        Math.floor(index / size);

      const col =
        index % size;

      const values =
        rng() < 0.5
        ? [1, 2]
        : [2, 1];

      for (
        const value of values
      ) {

        board[index] = value;

        if (
          lineOkay(rowValues(row)) &&
          lineOkay(colValues(col)) &&
          fill(index + 1)
        ) {
          return true;
        }

        board[index] = 0;
      }

      return false;
    }

    return fill()
      ? board
      : null;
  }

  let solution = null;

  for (
    let attempt = 0;
    attempt < 120 && !solution;
    attempt++
  ) {
    solution =
      generateSolvedBoard();
  }

  if (!solution) {
    throw new Error(
      "Could not generate Eclipse solution."
    );
  }

  /*
    Count valid solutions using ONLY the real Eclipse rules.
    This is used while removing clues so the final puzzle has
    exactly one answer without inventing any extra rule.
  */

  function countSolutions(
    starting,
    limit = 2
  ) {

    const board =
      [...starting];

    let count = 0;

    function rowValues(row) {
      return board.slice(
        row * size,
        row * size + size
      );
    }

    function colValues(col) {

      const values = [];

      for (
        let row = 0;
        row < size;
        row++
      ) {
        values.push(
          board[row * size + col]
        );
      }

      return values;
    }

    function search() {

      if (
        count >= limit
      ) {
        return;
      }

      let bestIndex = -1;
      let bestValues = null;

      for (
        let index = 0;
        index < board.length;
        index++
      ) {

        if (
          board[index] !== 0
        ) {
          continue;
        }

        const row =
          Math.floor(index / size);

        const col =
          index % size;

        const possible = [];

        for (
          const value of [1, 2]
        ) {

          board[index] = value;

          if (
            lineOkay(rowValues(row)) &&
            lineOkay(colValues(col))
          ) {
            possible.push(value);
          }

          board[index] = 0;
        }

        if (
          possible.length === 0
        ) {
          return;
        }

        if (
          bestValues === null ||
          possible.length < bestValues.length
        ) {
          bestIndex = index;
          bestValues = possible;
        }

        if (
          possible.length === 1
        ) {
          break;
        }
      }

      if (
        bestIndex === -1
      ) {
        count++;
        return;
      }

      for (
        const value of bestValues
      ) {

        board[bestIndex] = value;
        search();
        board[bestIndex] = 0;

        if (
          count >= limit
        ) {
          return;
        }
      }
    }

    search();
    return count;
  }

  const clues =
    [...solution];

  const positions =
    shuffle(
      [...Array(size * size).keys()],
      rng
    );

  /*
    Hard mode: aim for roughly 20-24 fixed cells.
    A clue is removed only when the puzzle still has exactly
    one solution under the real sun/moon rules.
  */
  const targetClues =
    randomInt(
      rng,
      20,
      24
    );

  for (
    const index of positions
  ) {

    const clueCount =
      clues.filter(
        value => value !== 0
      ).length;

    if (
      clueCount <= targetClues
    ) {
      break;
    }

    const previous =
      clues[index];

    clues[index] = 0;

    if (
      countSolutions(clues, 2) !== 1
    ) {
      clues[index] = previous;
    }
  }

  return {
    type: "eclipse",
    size,
    solution,
    clues,
    prompt:
      "Balance the suns and moons.",
    description:
      "Fill the 8×8 grid with suns and moons. Every row and column must contain four of each, and three matching symbols can never appear consecutively horizontally or vertically.",
    explanation:
      "The unique solution follows only from the fixed clues, equal sun/moon counts in every row and column, and the rule that no three identical symbols may appear consecutively."
  };
}

/* ==========================================================
   BALANCE GENERATOR — VERY HARD
   ========================================================== */

function createBalancePuzzle(token) {

  const rng =
    rngFrom(
      token + ":balance-hard"
    );

  let weights = [];

  while (
    weights.length < 8
  ) {

    const value =
      randomInt(
        rng,
        2,
        24
      );

    if (
      !weights.includes(value)
    ) {
      weights.push(value);
    }
  }

  weights =
    shuffle(weights, rng);

  const shuffledIndices =
    shuffle(
      [...Array(8).keys()],
      rng
    );

  const leftIndices =
    shuffledIndices.slice(0, 4);

  const leftSet =
    new Set(leftIndices);

  const rightIndices =
    [...Array(8).keys()]
      .filter(
        index =>
          !leftSet.has(index)
      );

  function valuesFor(indices) {
    return indices.map(
      index => weights[index]
    );
  }

  function sum(values) {
    return values.reduce(
      (total, value) =>
        total + value,
      0
    );
  }

  function oddCount(values) {
    return values.filter(
      value =>
        value % 2 !== 0
    ).length;
  }

  function spread(values) {
    return (
      Math.max(...values) -
      Math.min(...values)
    );
  }

  const leftValues =
    valuesFor(leftIndices);

  const rightValues =
    valuesFor(rightIndices);

  const leftTarget =
    sum(leftValues);

  const rightTarget =
    sum(rightValues);

  const leftOdd =
    oddCount(leftValues);

  const rightOdd =
    oddCount(rightValues);

  const leftSpread =
    spread(leftValues);

  const rightSpread =
    spread(rightValues);

  return {
    type: "balance",
    weights,
    leftTarget,
    rightTarget,
    leftOdd,
    rightOdd,
    leftSpread,
    rightSpread,
    solutionLeft:
      [...leftValues].sort((a,b) => a-b),
    solutionRight:
      [...rightValues].sort((a,b) => a-b),
    prompt:
      "Split all eight weights.",
    description:
      `LEFT: total ${leftTarget}, ${leftOdd} odd, spread ${leftSpread}. RIGHT: total ${rightTarget}, ${rightOdd} odd, spread ${rightSpread}. Four weights per tray.`,
    explanation:
      "The totals are only part of the puzzle: parity and spread constraints eliminate alternative four-and-four partitions."
  };
}

/* ==========================================================
   SIGNAL GENERATOR — VERY HARD
   ========================================================== */

function createSignalPuzzle(token) {

  const rng =
    rngFrom(
      token + ":signal-hard"
    );

  const mode =
    randomInt(
      rng,
      0,
      4
    );

  if (
    mode === 0
  ) {

    const start =
      randomInt(rng, 2, 12);

    const firstDifference =
      randomInt(rng, 2, 7);

    const secondDifference =
      randomInt(rng, 2, 5);

    const sequence = [start];
    let difference =
      firstDifference;

    for (
      let i = 1;
      i < 6;
      i++
    ) {
      sequence.push(
        sequence[i - 1] +
        difference
      );
      difference +=
        secondDifference;
    }

    const answer =
      sequence.pop();

    return {
      type: "signal",
      mode: "number",
      display:
        sequence.join("  ·  ") +
        "  ·  ?",
      answer: String(answer),
      prompt:
        "Find the next signal.",
      description:
        "The gaps are changing too. Work out the pattern beneath the pattern.",
      hint:
        "Write down the difference between each neighbouring pair, then compare those differences.",
      explanation:
        `The first differences increase by ${secondDifference} each time, giving a constant second difference.`
    };
  }

  if (
    mode === 1
  ) {

    let value =
      randomInt(rng, 3, 8);

    const multiply =
      randomInt(rng, 2, 3);

    const add =
      randomInt(rng, 2, 7);

    const sequence = [value];

    for (
      let step = 0;
      step < 5;
      step++
    ) {

      value =
        step % 2 === 0
        ? value * multiply
        : value + add;

      sequence.push(value);
    }

    const answer =
      sequence.pop();

    return {
      type: "signal",
      mode: "number",
      display:
        sequence.join("  ·  ") +
        "  ·  ?",
      answer: String(answer),
      prompt:
        "Decode the alternating signal.",
      description:
        "The operation changes every step.",
      hint:
        "Try separating the odd-numbered transitions from the even-numbered transitions.",
      explanation:
        `The sequence alternates ×${multiply} and +${add}.`
    };
  }

  if (
    mode === 2
  ) {

    const a =
      randomInt(rng, 2, 7);

    const b =
      randomInt(rng, 14, 24);

    const addA =
      randomInt(rng, 3, 6);

    const subtractB =
      randomInt(rng, 1, 4);

    const shown = [
      a,
      b,
      a + addA,
      b - subtractB,
      a + addA * 2,
      b - subtractB * 2
    ];

    const answer =
      a + addA * 3;

    return {
      type: "signal",
      mode: "number",
      display:
        shown.join("  ·  ") +
        "  ·  ?",
      answer: String(answer),
      prompt:
        "Separate the two hidden signals.",
      description:
        "Odd and even positions follow different rules.",
      hint:
        "Read positions 1, 3, 5 separately from positions 2, 4, 6.",
      explanation:
        `The odd-position sequence rises by ${addA}; the even-position sequence falls by ${subtractB}.`
    };
  }

  if (
    mode === 3
  ) {

    const alphabet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const start =
      randomInt(rng, 0, 8);

    const jumps =
      shuffle(
        [2,3,4,5],
        rng
      ).slice(0, 3);

    let position = start;
    const letters = [
      alphabet[position]
    ];

    for (
      let i = 0;
      i < 5;
      i++
    ) {
      const jump =
        jumps[i % jumps.length];
      position =
        (position + jump) %
        alphabet.length;
      letters.push(
        alphabet[position]
      );
    }

    const answer =
      letters.pop();

    return {
      type: "signal",
      mode: "text",
      display:
        letters.join("  →  ") +
        "  →  ?",
      answer,
      prompt:
        "Follow the letter signal.",
      description:
        "The alphabet jumps repeat in a hidden cycle.",
      hint:
        "Convert each letter to its alphabet position and compare the jumps.",
      explanation:
        `The repeated jump cycle is +${jumps[0]}, +${jumps[1]}, +${jumps[2]}.`
    };
  }

  const items =
    shuffle(
      ["A","B","C","D","E"],
      rng
    );

  const solution =
    shuffle(items, rng);

  const clues = [
    `${solution[0]} is before ${solution[2]}.`,
    `${solution[1]} is immediately before ${solution[2]}.`,
    `${solution[4]} is after ${solution[3]}.`,
    `${solution[0]} is not beside ${solution[4]}.`,
    `${solution[2]} appears before ${solution[4]}.`
  ];

  return {
    type: "signal",
    mode: "ordering",
    items,
    clues,
    solution,
    answer:
      solution.join(""),
    prompt:
      "Reconstruct the signal order.",
    description:
      "Arrange A–E so every ordering clue is true.",
    hint:
      `Start with the immediate relationship: ${clues[1]}`,
    explanation:
      "Immediate adjacency and before/after restrictions combine to force the final order."
  };
}

/* ==========================================================
   SPECIALS
   ========================================================== */

const SPECIAL_BANK = [

  {
    title:
      "Grid Legends",

    prompt:
      "Which four belong on a modern Formula 1 grid?",

    items:
      [
        "FERRARI",
        "MCLAREN",
        "MERCEDES",
        "RED BULL",
        "BUGATTI",
        "PAGANI",
        "BENTLEY",
        "KOENIGSEGG",
        "VOLVO",
        "LEXUS",
        "JEEP",
        "MINI"
      ],

    answer:
      [
        "FERRARI",
        "MCLAREN",
        "MERCEDES",
        "RED BULL"
      ],

    description:
      "Select the four Formula 1 names.",

    explanation:
      "Ferrari, McLaren, Mercedes and Red Bull are major Formula 1 team or constructor names.",

    hint:
      "Think race grid, not road-car brands."
  },

  {
    title:
      "Seven Kingdoms",

    prompt:
      "Find the four major Westeros houses.",

    items:
      [
        "STARK",
        "LANNISTER",
        "TARGARYEN",
        "BARATHEON",
        "BAGGINS",
        "POTTER",
        "SKYWALKER",
        "CORLEONE",
        "WAYNE",
        "BOND",
        "DRAKE",
        "SHELBY"
      ],

    answer:
      [
        "STARK",
        "LANNISTER",
        "TARGARYEN",
        "BARATHEON"
      ],

    description:
      "Select four names belonging to the same fantasy world.",

    explanation:
      "Stark, Lannister, Targaryen and Baratheon are major noble houses in Westeros.",

    hint:
      "Think Game of Thrones."
  },

  {
    title:
      "Italian Icons",

    prompt:
      "Find four Italian performance marques.",

    items:
      [
        "FERRARI",
        "LAMBORGHINI",
        "PAGANI",
        "MASERATI",
        "PORSCHE",
        "MCLAREN",
        "ASTON MARTIN",
        "BUGATTI",
        "BMW",
        "AUDI",
        "LEXUS",
        "VOLVO"
      ],

    answer:
      [
        "FERRARI",
        "LAMBORGHINI",
        "PAGANI",
        "MASERATI"
      ],

    description:
      "Select the four Italian marques.",

    explanation:
      "Ferrari, Lamborghini, Pagani and Maserati are Italian performance-car marques.",

    hint:
      "Country of origin matters."
  }

];


/* ==========================================================
   GET PUZZLE
   ========================================================== */

function getPuzzle(
  gameKey,
  dateKey,
  mode
) {

  if (
    mode === "practice"
  ) {
    state.practiceCounter += 1;
  }

  const token =
    puzzleToken(
      gameKey,
      dateKey,
      mode
    );

  if (
    gameKey === "queens"
  ) {
    return createQueensPuzzle(token);
  }

  if (
    gameKey === "circuit"
  ) {
    return createCircuitPuzzle(token);
  }

  if (
    gameKey === "route"
  ) {
    return createRoutePuzzle(token);
  }

  if (
    gameKey === "cipher"
  ) {
    return createCipherPuzzle(token);
  }

  if (
    gameKey === "eclipse"
  ) {
    return createEclipsePuzzle(token);
  }

  if (
    gameKey === "balance"
  ) {
    return createBalancePuzzle(token);
  }

  if (
    gameKey === "signal"
  ) {
    return createSignalPuzzle(token);
  }

  const rng =
    rngFrom(token);

  return clone(
    SPECIAL_BANK[
      randomInt(
        rng,
        0,
        SPECIAL_BANK.length - 1
      )
    ]
  );
}

/* ==========================================================
   OPEN GAME
   ========================================================== */

function openGame(

  gameKey,

  mode = "daily",

  dateKey = todayKey()

) {

  stopTimer();

  state.gameKey =
    gameKey;

  state.mode =
    mode;

  state.dateKey =
    dateKey;

  state.puzzle =
    getPuzzle(
      gameKey,
      dateKey,
      mode
    );

  state.selected =
    [];

  state.attempts =
    0;

  state.hints =
    0;

  state.elapsed =
    0;

    state.queensMarks =
  null;

    state.circuitRotations =
    null;

    state.routePath =
    null;

    state.cipherGuess =
    null;

    state.eclipseMarks =
    null;

    state.balanceLeft =
    [];

    state.balanceRight =
    [];

    state.signalAnswer =
    "";

  $("#timer").textContent =
    "00:00";

  $("#gameTitle").textContent =

    gameKey === "special"

    ?

    state.puzzle.title

    :

    GAME_META[
      gameKey
    ].title;

  $("#gameModeLabel").textContent =

    mode === "practice"

    ?

    "UNLIMITED ROUND"

    :

    `DAY ${dailyNumber(
      dateKey
    )} · ${prettyDate(
      dateKey
    ).toUpperCase()}`;

  $("#difficultyChip").textContent =

    gameKey === "special"

    ?

    "SPECIAL"

    :

    GAME_META[
      gameKey
    ].difficulty;

  $("#attemptsChip").textContent =
    "0 checks";

  clearFeedback();

  renderCurrentGame();

  showScreen(
    "game"
  );

  openRulesModal(
    true
  );

}


/* ==========================================================
   RENDER CURRENT GAME
   ========================================================== */

function renderCurrentGame() {

  const area =
    $("#gameArea");

  area.innerHTML = "";

  if (
    state.gameKey === "queens"
  ) {
    renderQueens(area);
  }

  else if (
    state.gameKey === "circuit"
  ) {
    renderCircuit(area);
  }

  else if (
    state.gameKey === "route"
  ) {
    renderRoute(area);
  }

  else if (
    state.gameKey === "cipher"
  ) {
    renderCipher(area);
  }

  else if (
    state.gameKey === "eclipse"
  ) {
    renderEclipse(area);
  }

  else if (
    state.gameKey === "balance"
  ) {
    renderBalance(area);
  }

  else if (
    state.gameKey === "signal"
  ) {
    renderSignal(area);
  }

  else if (
    state.gameKey === "special"
  ) {
    renderSpecial(area);
  }
}

/* ==========================================================
   QUEENS
   ========================================================== */

function renderQueens(
  area
) {

  const puzzle =
    state.puzzle;

  $("#puzzlePrompt").textContent =
    puzzle.prompt;

  $("#puzzleDescription").textContent =
    puzzle.description;

  if (
    !state.queensMarks
  ) {

    state.queensMarks =
      Array(
        puzzle.size
        *
        puzzle.size
      ).fill(
        0
      );

  }

  const board =
    document.createElement(
      "div"
    );

  board.className =
    "queens-board";

  board.style.setProperty(
    "--queens-size",
    puzzle.size
  );

  for (
    let i = 0;
    i <
    puzzle.size * puzzle.size;
    i++
  ) {

    const cell =
      document.createElement(
        "button"
      );

    cell.type =
      "button";

    cell.className =
      `queens-cell queen-region-${puzzle.regions[i]}`;
                        const row = Math.floor(i / puzzle.size);
                        const col = i % puzzle.size;
                        const region = puzzle.regions[i];

                        /* Black boundary whenever the neighbouring cell
                        belongs to a different region. */

                        if (
                        row === 0 ||
                        puzzle.regions[(row - 1) * puzzle.size + col] !== region
                        ) {
                        cell.classList.add("region-border-top");
                        }

                        if (
                        row === puzzle.size - 1 ||
                        puzzle.regions[(row + 1) * puzzle.size + col] !== region
                        ) {
                        cell.classList.add("region-border-bottom");
                        }

                        if (
                        col === 0 ||
                        puzzle.regions[row * puzzle.size + (col - 1)] !== region
                        ) {
                        cell.classList.add("region-border-left");
                        }

                        if (
                        col === puzzle.size - 1 ||
                        puzzle.regions[row * puzzle.size + (col + 1)] !== region
                        ) {
                        cell.classList.add("region-border-right");
                        }

    const mark =
      state.queensMarks[i];

    if (
      mark === 1
    ) {

      cell.classList.add(
        "has-queen"
      );

      cell.textContent =
        "♛";

    }

    else if (
      mark === 2
    ) {

      cell.classList.add(
        "has-cross"
      );

      cell.textContent =
        "×";

    }

    cell.addEventListener(

      "click",

      () => {

        state.queensMarks[i] =
        state.queensMarks[i] === 0
            ? 2       // first click = X
            : state.queensMarks[i] === 2
            ? 1     // second click = Queen
            : 0;    // third click = empty
        

        renderCurrentGame();

      }

    );

    board.appendChild(
      cell
    );

  }

  area.appendChild(
    board
  );

  const info =
    document.createElement(
      "div"
    );

  info.className =
    "queens-counter";

  info.textContent =
    `${
      state.queensMarks.filter(
        value =>
          value === 1
      ).length
    } / ${puzzle.size} queens placed`;

  area.appendChild(
    info
  );

}


function checkQueens() {

  const puzzle =
    state.puzzle;

  const queens =
    state.queensMarks
      .map(
        (
          value,
          index
        ) =>
          value === 1
          ?
          index
          :
          -1
      )
      .filter(
        index =>
          index >= 0
      );

  if (
    queens.length !==
    puzzle.size
  ) {

    return false;

  }

  const rows =
    new Set();

  const columns =
    new Set();

  const regions =
    new Set();

  for (
    const idx of queens
  ) {

    const row =
      Math.floor(
        idx /
        puzzle.size
      );

    const col =
      idx %
      puzzle.size;

    const region =
      puzzle.regions[idx];

    if (
      rows.has(
        row
      )
      ||
      columns.has(
        col
      )
      ||
      regions.has(
        region
      )
    ) {

      return false;

    }

    rows.add(
      row
    );

    columns.add(
      col
    );

    regions.add(
      region
    );

  }

  for (
    let i = 0;
    i < queens.length;
    i++
  ) {

    const r1 =
      Math.floor(
        queens[i] /
        puzzle.size
      );

    const c1 =
      queens[i]
      %
      puzzle.size;

    for (
      let j = i + 1;
      j < queens.length;
      j++
    ) {

      const r2 =
        Math.floor(
          queens[j] /
          puzzle.size
        );

      const c2 =
        queens[j]
        %
        puzzle.size;

      if (
        Math.abs(
          r1 - r2
        )
        ===
        1
        &&
        Math.abs(
          c1 - c2
        )
        ===
        1
      ) {

        return false;

      }

    }

  }

  return (
    rows.size === puzzle.size
    &&
    columns.size === puzzle.size
    &&
    regions.size === puzzle.size
  );

}


/* ==========================================================
   CIRCUIT
   ========================================================== */

function renderCircuit(
  area
) {

  const puzzle =
    state.puzzle;

  $("#puzzlePrompt").textContent =
    puzzle.prompt;

  $("#puzzleDescription").textContent =
    puzzle.description;

  if (
    !state.circuitRotations
  ) {

    state.circuitRotations =
      Array(
        puzzle.pairs.length
      ).fill(
        0
      );

  }

  const rules =
    document.createElement(
      "div"
    );

  rules.className =
    "logic-list";

  puzzle.constraints.forEach(

    text => {

      const rule =
        document.createElement(
          "div"
        );

      rule.className =
        "logic-note";

      rule.textContent =
        text;

      rules.appendChild(
        rule
      );

    }

  );

  area.appendChild(
    rules
  );

  const pieces =
    document.createElement(
      "div"
    );

  pieces.className =
    "circuit-hard-grid";

  puzzle.pairs.forEach(

    (
      pair,
      index
    ) => {

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "circuit-pair";

      const flipped =
        state.circuitRotations[index]
        ===
        1;

      const left =
        flipped
        ?
        pair[1]
        :
        pair[0];

      const right =
        flipped
        ?
        pair[0]
        :
        pair[1];

      button.innerHTML = `
        <span>${left}</span>
        <i></i>
        <span>${right}</span>
      `;

      button.addEventListener(

        "click",

        () => {

          state.circuitRotations[index] =
            state.circuitRotations[index]
            ?
            0
            :
            1;

          renderCurrentGame();

        }

      );

      pieces.appendChild(
        button
      );

    }

  );

  area.appendChild(
    pieces
  );

}


function checkCircuit() {

  return state
    .circuitRotations
    .every(

      (
        value,
        index
      ) =>
        value ===
        state.puzzle.target[index]

    );

}


/* ==========================================================
   ROUTE
   ========================================================== */

function renderRoute(
  area
) {

  const puzzle =
    state.puzzle;

  $("#puzzlePrompt").textContent =
    puzzle.prompt;

  $("#puzzleDescription").textContent =
    puzzle.description;

  if (
    !state.routePath
  ) {

    state.routePath =
      [
        puzzle.start
      ];

  }

  const board =
    document.createElement(
      "div"
    );

  board.className =
    "route-board";

  board.style.gridTemplateColumns =
    `repeat(${puzzle.size},1fr)`;

  for (
    let i = 0;
    i < puzzle.size * puzzle.size;
    i++
  ) {

    const cell =
      document.createElement(
        "button"
      );

    cell.type =
      "button";

    cell.className =
      "route-cell";

    if (
      puzzle.blocked.includes(
        i
      )
    ) {

      cell.classList.add(
        "blocked"
      );

      cell.textContent =
        "■";

      cell.disabled =
        true;

    }

    else if (
      i === puzzle.start
    ) {

      cell.classList.add(
        "start"
      );

      cell.textContent =
        "A";

    }

    else if (
      i === puzzle.end
    ) {

      cell.classList.add(
        "end"
      );

      cell.textContent =
        "B";

    }

    else {

      const checkpointIndex =
        puzzle.checkpoints.indexOf(
          i
        );

      if (
        checkpointIndex >= 0
      ) {

        cell.classList.add(
          "checkpoint"
        );

        cell.textContent =
          String(
            checkpointIndex + 1
          );

      }

      else {

        cell.textContent =
          "·";

      }

    }

    if (
      state.routePath.includes(
        i
      )
    ) {

      cell.classList.add(
        "path"
      );

    }

    if (
      !puzzle.blocked.includes(
        i
      )
    ) {

      cell.addEventListener(

        "click",

        () => {

          const current =
            state.routePath[
              state.routePath.length - 1
            ];

          if (
            i === current
          ) {

            return;

          }

          if (
            state.routePath.length > 1
            &&
            i ===
            state.routePath[
              state.routePath.length - 2
            ]
          ) {

            state.routePath.pop();

            renderCurrentGame();

            return;

          }

          const currentRow =
            Math.floor(
              current /
              puzzle.size
            );

          const currentCol =
            current %
            puzzle.size;

          const row =
            Math.floor(
              i /
              puzzle.size
            );

          const col =
            i %
            puzzle.size;

          const adjacent =
            Math.abs(
              currentRow - row
            )
            +
            Math.abs(
              currentCol - col
            )
            ===
            1;

          if (
            adjacent
            &&
            !state.routePath.includes(
              i
            )
          ) {

            state.routePath.push(
              i
            );

            renderCurrentGame();

          }

        }

      );

    }

    board.appendChild(
      cell
    );

  }

  area.appendChild(
    board
  );

  const counter =
    document.createElement(
      "div"
    );

  counter.className =
    "route-counter";

  counter.textContent =
    `${state.routePath.length} / ${puzzle.requiredLength} cells`;

  area.appendChild(
    counter
  );

}


function checkRoute() {

  const puzzle =
    state.puzzle;

  const path =
    state.routePath;

  if (
    path[
      path.length - 1
    ]
    !==
    puzzle.end
  ) {

    return false;

  }

  if (
    path.length !==
    puzzle.requiredLength
  ) {

    return false;

  }

  let previousPosition =
    -1;

  for (
    const checkpoint
    of
    puzzle.checkpoints
  ) {

    const position =
      path.indexOf(
        checkpoint
      );

    if (
      position === -1
      ||
      position <= previousPosition
    ) {

      return false;

    }

    previousPosition =
      position;

  }

  return true;

}


/* ==========================================================
   CIPHER
   ========================================================== */

function renderCipher(area) {

  const puzzle =
    state.puzzle;

  $("#puzzlePrompt").textContent =
    puzzle.prompt;

  $("#puzzleDescription").textContent =
    puzzle.description;

  if (
    !state.cipherGuess
  ) {
    state.cipherGuess = [];
  }

  const clues =
    document.createElement("div");

  clues.className =
    "clue-list";

  puzzle.clues.forEach(
    clue => {
      const row =
        document.createElement("div");
      row.className =
        "cipher-clue";
      row.textContent = clue;
      clues.appendChild(row);
    }
  );

  area.appendChild(clues);

  const display =
    document.createElement("button");

  display.type = "button";
  display.className =
    "code-display cipher-six";

  display.textContent =
    state.cipherGuess.length
    ? state.cipherGuess.join(" ")
    : "• • • • • •";

  display.setAttribute(
    "aria-label",
    "Current six symbol guess. Tap to clear."
  );

  display.addEventListener(
    "click",
    () => {
      state.cipherGuess = [];
      renderCurrentGame();
    }
  );

  area.appendChild(display);

  const keypad =
    document.createElement("div");

  keypad.className =
    "keypad cipher-six-keypad";

  puzzle.symbols.forEach(
    symbol => {

      const button =
        document.createElement("button");

      button.type = "button";
      button.className =
        "symbol-key";
      button.textContent = symbol;

      if (
        state.cipherGuess.includes(symbol)
      ) {
        button.classList.add(
          "selected"
        );
      }

      button.addEventListener(
        "click",
        () => {

          if (
            state.cipherGuess.includes(symbol)
          ) {
            return;
          }

          if (
            state.cipherGuess.length < 6
          ) {
            state.cipherGuess.push(symbol);
            renderCurrentGame();
          }
        }
      );

      keypad.appendChild(button);
    }
  );

  area.appendChild(keypad);
}

function checkCipher() {
  return (
    JSON.stringify(
      state.cipherGuess
    ) ===
    JSON.stringify(
      state.puzzle.answer
    )
  );
}

/* ==========================================================
   ECLIPSE
   ========================================================== */

function renderEclipse(area) {

  const puzzle =
    state.puzzle;

  $("#puzzlePrompt").textContent =
    puzzle.prompt;

  $("#puzzleDescription").textContent =
    puzzle.description;

  if (
    !state.eclipseMarks
  ) {
    state.eclipseMarks =
      [...puzzle.clues];
  }

  const board =
    document.createElement("div");

  board.className =
    "eclipse-board";

  board.style.gridTemplateColumns =
    `repeat(${puzzle.size}, 1fr)`;

  state.eclipseMarks.forEach(
    (value, index) => {

      const cell =
        document.createElement("button");

      cell.type = "button";
      cell.className =
        "eclipse-cell";

      const fixed =
        puzzle.clues[index] !== 0;

      if (fixed) {
        cell.classList.add("fixed");
      }

      if (
        value === 1
      ) {
        cell.classList.add("sun");
        cell.innerHTML =
          '<span class="sun-symbol" aria-hidden="true"></span>';
        cell.setAttribute(
          "aria-label",
          fixed ? "Given sun" : "Sun"
        );
      }

      else if (
        value === 2
      ) {
        cell.classList.add("moon");
        cell.innerHTML =
          '<span class="moon-symbol" aria-hidden="true"></span>';
        cell.setAttribute(
          "aria-label",
          fixed ? "Given moon" : "Moon"
        );
      }

      else {
        cell.textContent = "";
        cell.setAttribute(
          "aria-label",
          "Empty square"
        );
      }

      if (fixed) {
        cell.disabled = true;
      }

      else {
        cell.addEventListener(
          "click",
          () => {
            const current =
              state.eclipseMarks[index];

            state.eclipseMarks[index] =
              current === 0
              ? 1
              : current === 1
              ? 2
              : 0;

            renderCurrentGame();
          }
        );
      }

      board.appendChild(cell);
    }
  );

  area.appendChild(board);

  const key =
    document.createElement("div");

  key.className =
    "eclipse-key";

  key.innerHTML = `
    <span>
      <i class="eclipse-key-sun" aria-hidden="true"></i>
      Sun
    </span>
    <span>
      <i class="eclipse-key-moon" aria-hidden="true"></i>
      Moon
    </span>
    <span>Tap: Sun → Moon → Clear</span>
  `;

  area.appendChild(key);
}

function checkEclipse() {

  const puzzle =
    state.puzzle;

  const size =
    puzzle.size;

  const marks =
    state.eclipseMarks;

  if (
    !marks ||
    marks.includes(0)
  ) {
    return false;
  }

  function validLine(line) {

    const suns =
      line.filter(
        value => value === 1
      ).length;

    const moons =
      line.filter(
        value => value === 2
      ).length;

    if (
      suns !== size / 2 ||
      moons !== size / 2
    ) {
      return false;
    }

    for (
      let i = 0;
      i < line.length - 2;
      i++
    ) {
      if (
        line[i] === line[i + 1] &&
        line[i] === line[i + 2]
      ) {
        return false;
      }
    }

    return true;
  }

  for (
    let row = 0;
    row < size;
    row++
  ) {

    const values =
      marks.slice(
        row * size,
        row * size + size
      );

    if (!validLine(values)) {
      return false;
    }
  }

  for (
    let col = 0;
    col < size;
    col++
  ) {

    const values = [];

    for (
      let row = 0;
      row < size;
      row++
    ) {
      values.push(
        marks[row * size + col]
      );
    }

    if (!validLine(values)) {
      return false;
    }
  }

  return true;
}

/* ==========================================================
   BALANCE
   ========================================================== */

function renderBalance(area) {

  const puzzle =
    state.puzzle;

  $("#puzzlePrompt").textContent =
    puzzle.prompt;

  $("#puzzleDescription").textContent =
    puzzle.description;

  const clueBox =
    document.createElement("div");

  clueBox.className =
    "balance-hard-clues";

  clueBox.innerHTML = `
    <div>
      <strong>LEFT</strong>
      <span>Total ${puzzle.leftTarget}</span>
      <span>${puzzle.leftOdd} odd number${puzzle.leftOdd === 1 ? "" : "s"}</span>
      <span>Spread ${puzzle.leftSpread}</span>
    </div>

    <div>
      <strong>RIGHT</strong>
      <span>Total ${puzzle.rightTarget}</span>
      <span>${puzzle.rightOdd} odd number${puzzle.rightOdd === 1 ? "" : "s"}</span>
      <span>Spread ${puzzle.rightSpread}</span>
    </div>
  `;

  area.appendChild(clueBox);

  const trays =
    document.createElement("div");

  trays.className =
    "balance-trays";

  function trayMarkup(
    title,
    values,
    target
  ) {

    const total =
      values.reduce(
        (a,b) => a + b,
        0
      );

    return `
      <strong>${title} = ${target}</strong>
      <div class="tray-values">
        ${
          values.length
          ? values.join(" + ")
          : "—"
        }
      </div>
      <small>
        ${values.length}/4 weights · total ${total}
      </small>
    `;
  }

  const left =
    document.createElement("div");

  left.className =
    "tray balance-hard-tray";

  left.innerHTML =
    trayMarkup(
      "LEFT",
      state.balanceLeft,
      puzzle.leftTarget
    );

  const right =
    document.createElement("div");

  right.className =
    "tray balance-hard-tray";

  right.innerHTML =
    trayMarkup(
      "RIGHT",
      state.balanceRight,
      puzzle.rightTarget
    );

  trays.appendChild(left);
  trays.appendChild(right);
  area.appendChild(trays);

  const weights =
    document.createElement("div");

  weights.className =
    "weight-grid";

  puzzle.weights.forEach(
    value => {

      const button =
        document.createElement("button");

      button.type = "button";
      button.className =
        "weight-button";
      button.textContent = value;

      const inLeft =
        state.balanceLeft.includes(value);

      const inRight =
        state.balanceRight.includes(value);

      if (
        inLeft || inRight
      ) {
        button.classList.add("selected");
      }

      button.addEventListener(
        "click",
        () => {

          const leftIndex =
            state.balanceLeft.indexOf(value);

          const rightIndex =
            state.balanceRight.indexOf(value);

          if (
            leftIndex >= 0
          ) {
            state.balanceLeft.splice(
              leftIndex,
              1
            );
          }

          else if (
            rightIndex >= 0
          ) {
            state.balanceRight.splice(
              rightIndex,
              1
            );
          }

          else if (
            state.balanceLeft.length < 4
          ) {
            state.balanceLeft.push(value);
          }

          else if (
            state.balanceRight.length < 4
          ) {
            state.balanceRight.push(value);
          }

          renderCurrentGame();
        }
      );

      weights.appendChild(button);
    }
  );

  area.appendChild(weights);
}

function checkBalance() {

  const puzzle =
    state.puzzle;

  if (
    state.balanceLeft.length !== 4 ||
    state.balanceRight.length !== 4
  ) {
    return false;
  }

  function sum(values) {
    return values.reduce(
      (a,b) => a + b,
      0
    );
  }

  function oddCount(values) {
    return values.filter(
      value => value % 2 !== 0
    ).length;
  }

  function spread(values) {
    return (
      Math.max(...values) -
      Math.min(...values)
    );
  }

  return (
    sum(state.balanceLeft) === puzzle.leftTarget &&
    sum(state.balanceRight) === puzzle.rightTarget &&
    oddCount(state.balanceLeft) === puzzle.leftOdd &&
    oddCount(state.balanceRight) === puzzle.rightOdd &&
    spread(state.balanceLeft) === puzzle.leftSpread &&
    spread(state.balanceRight) === puzzle.rightSpread
  );
}

/* ==========================================================
   SIGNAL
   ========================================================== */

function renderSignal(area) {

  const puzzle =
    state.puzzle;

  $("#puzzlePrompt").textContent =
    puzzle.prompt;

  $("#puzzleDescription").textContent =
    puzzle.description;

  if (
    puzzle.mode === "number" ||
    puzzle.mode === "text"
  ) {

    const display =
      document.createElement("div");

    display.className =
      "signal-display";

    display.textContent =
      puzzle.display;

    area.appendChild(display);

    const input =
      document.createElement("input");

    input.className =
      "signal-input";

    input.type =
      puzzle.mode === "number"
      ? "number"
      : "text";

    input.inputMode =
      puzzle.mode === "number"
      ? "numeric"
      : "text";

    input.placeholder =
      "Your answer";

    input.value =
      state.signalAnswer;

    input.addEventListener(
      "input",
      () => {
        state.signalAnswer =
          input.value
            .trim()
            .toUpperCase();
      }
    );

    area.appendChild(input);
    return;
  }

  if (
    puzzle.mode === "ordering"
  ) {

    const clueList =
      document.createElement("div");

    clueList.className =
      "signal-clue-list";

    puzzle.clues.forEach(
      clue => {
        const row =
          document.createElement("div");
        row.textContent = clue;
        clueList.appendChild(row);
      }
    );

    area.appendChild(clueList);

    if (
      !state.selected.length
    ) {
      state.selected =
        [...puzzle.items];
    }

    const list =
      document.createElement("div");

    list.className =
      "signal-order";

    state.selected.forEach(
      (item, index) => {

        const row =
          document.createElement("div");

        row.className =
          "signal-order-row";

        row.innerHTML = `
          <strong>${index + 1}. ${item}</strong>
          <div>
            <button type="button" data-dir="-1" aria-label="Move ${item} up">↑</button>
            <button type="button" data-dir="1" aria-label="Move ${item} down">↓</button>
          </div>
        `;

        row.querySelectorAll("button")
          .forEach(
            button => {
              button.addEventListener(
                "click",
                () => {

                  const direction =
                    Number(
                      button.dataset.dir
                    );

                  const target =
                    index + direction;

                  if (
                    target < 0 ||
                    target >= state.selected.length
                  ) {
                    return;
                  }

                  [
                    state.selected[index],
                    state.selected[target]
                  ] = [
                    state.selected[target],
                    state.selected[index]
                  ];

                  renderCurrentGame();
                }
              );
            }
          );

        list.appendChild(row);
      }
    );

    area.appendChild(list);
  }
}

function checkSignal() {

  const puzzle =
    state.puzzle;

  if (
    puzzle.mode === "ordering"
  ) {
    return (
      state.selected.join("") ===
      puzzle.answer
    );
  }

  return (
    String(state.signalAnswer)
      .trim()
      .toUpperCase() ===
    String(puzzle.answer)
      .trim()
      .toUpperCase()
  );
}

/* ==========================================================
   SPECIAL
   ========================================================== */

function renderSpecial(
  area
) {

  const puzzle =
    state.puzzle;

  $("#puzzlePrompt").textContent =
    puzzle.prompt;

  $("#puzzleDescription").textContent =
    puzzle.description;

  const rng =
    rngFrom(
      state.dateKey
      +
      state.gameKey
    );

  const items =
    shuffle(
      puzzle.items,
      rng
    );

  const grid =
    document.createElement(
      "div"
    );

  grid.className =
    "choice-grid";

  items.forEach(

    item => {

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "choice-tile";

      button.textContent =
        item;

      if (
        state.selected.includes(
          item
        )
      ) {

        button.classList.add(
          "selected"
        );

      }

      button.addEventListener(

        "click",

        () => {

          const position =
            state.selected.indexOf(
              item
            );

          if (
            position >= 0
          ) {

            state.selected.splice(
              position,
              1
            );

          }

          else if (
            state.selected.length <
            4
          ) {

            state.selected.push(
              item
            );

          }

          renderCurrentGame();

        }

      );

      grid.appendChild(
        button
      );

    }

  );

  area.appendChild(
    grid
  );

}


function checkSpecial() {

  const selected =
    [...state.selected]
      .sort();

  const answer =
    [...state.puzzle.answer]
      .sort();

  return (
    JSON.stringify(
      selected
    )
    ===
    JSON.stringify(
      answer
    )
  );

}


/* ==========================================================
   SOLUTION
   ========================================================== */

function revealSolution() {

  if (!state.puzzle) {
    return;
  }

  stopTimer();

  if (state.gameKey === "queens") {

    state.queensMarks =
      Array(
        state.puzzle.size * state.puzzle.size
      ).fill(2);

    state.puzzle.solution.forEach(
      (col, row) => {
        state.queensMarks[
          row * state.puzzle.size + col
        ] = 1;
      }
    );

  }

  else if (state.gameKey === "circuit") {
    state.circuitRotations =
      [...state.puzzle.target];
  }

  else if (state.gameKey === "route") {
    state.routePath =
      [...state.puzzle.solution];
  }

  else if (state.gameKey === "cipher") {
    state.cipherGuess =
      [...state.puzzle.answer];
  }

  else if (state.gameKey === "eclipse") {
    state.eclipseMarks =
      [...state.puzzle.solution];
  }

  else if (state.gameKey === "balance") {
    state.balanceLeft =
      [...state.puzzle.solutionLeft];

    state.balanceRight =
      [...state.puzzle.solutionRight];
  }

  else if (state.gameKey === "signal") {

    if (
      state.puzzle.mode ===
      "ordering"
    ) {
      state.selected =
        [...state.puzzle.solution];
    }
    else {
      state.signalAnswer =
        String(state.puzzle.answer);
    }

  }

  else if (state.gameKey === "special") {
    state.selected =
      [...state.puzzle.answer];
  }

  renderCurrentGame();

  setFeedback(
    "Solution revealed. You can study it, reset the puzzle, or move on to another round."
  );

}

/* ==========================================================
   CHECK ANSWER
   ========================================================== */

function checkPuzzle() {

  state.attempts += 1;

  $("#attemptsChip").textContent =
    `${state.attempts} check${state.attempts === 1 ? "" : "s"}`;

  let solved = false;

  if (
    state.gameKey === "queens"
  ) {
    solved = checkQueens();
  }

  else if (
    state.gameKey === "circuit"
  ) {
    solved = checkCircuit();
  }

  else if (
    state.gameKey === "route"
  ) {
    solved = checkRoute();
  }

  else if (
    state.gameKey === "cipher"
  ) {
    solved = checkCipher();
  }

  else if (
    state.gameKey === "eclipse"
  ) {
    solved = checkEclipse();
  }

  else if (
    state.gameKey === "balance"
  ) {
    solved = checkBalance();
  }

  else if (
    state.gameKey === "signal"
  ) {
    solved = checkSignal();
  }

  else if (
    state.gameKey === "special"
  ) {
    solved = checkSpecial();
  }

  if (solved) {
    finishPuzzle();
  }

  else {
    setFeedback(
      "Not quite. At least one condition is still broken.",
      true
    );
  }
}

/* ==========================================================
   HINTS
   ========================================================== */

function useHint() {

  state.hints += 1;

  const puzzle =
    state.puzzle;

  if (
    state.gameKey === "queens"
  ) {

    const size =
      puzzle.size;

    let emptyRow = -1;

    for (
      let row = 0;
      row < size;
      row++
    ) {

      const values =
        state.queensMarks.slice(
          row * size,
          row * size + size
        );

      if (
        !values.includes(1)
      ) {
        emptyRow = row;
        break;
      }
    }

    if (
      emptyRow >= 0
    ) {
      const col =
        puzzle.solution[emptyRow];

      setFeedback(
        `Focus on row ${emptyRow + 1}. Its queen belongs in the region containing column ${col + 1}.`
      );
    }

    return;
  }

  if (
    state.gameKey === "circuit"
  ) {

    const wrong =
      state.circuitRotations
        .findIndex(
          (value, index) =>
            value !==
            puzzle.target[index]
        );

    setFeedback(
      wrong >= 0
      ? `Piece ${wrong + 1} is currently facing the wrong way.`
      : "Re-check all four totals."
    );

    return;
  }

  if (
    state.gameKey === "route"
  ) {
    setFeedback(
      `The final route uses exactly ${puzzle.requiredLength} cells. Check checkpoint order before heading for B.`
    );
    return;
  }

  if (
    state.gameKey === "cipher"
  ) {
    setFeedback(
      `Start by combining these two clues: ${puzzle.clues[0]} ${puzzle.clues[1] || ""}`
    );
    return;
  }

  if (
    state.gameKey === "eclipse"
  ) {

    const size =
      puzzle.size;

    const marks =
      state.eclipseMarks;

    for (
      let row = 0;
      row < size;
      row++
    ) {

      const start =
        row * size;

      for (
        let col = 0;
        col < size - 2;
        col++
      ) {

        const a = marks[start + col];
        const b = marks[start + col + 1];
        const c = marks[start + col + 2];

        if (
          a !== 0 &&
          a === b &&
          c === 0
        ) {
          setFeedback(
            `Row ${row + 1}: two matching symbols together force the next square to be the opposite symbol.`
          );
          return;
        }

        if (
          b !== 0 &&
          b === c &&
          a === 0
        ) {
          setFeedback(
            `Row ${row + 1}: two matching symbols together force the square before them to be the opposite symbol.`
          );
          return;
        }

        if (
          a !== 0 &&
          a === c &&
          b === 0
        ) {
          setFeedback(
            `Row ${row + 1}: matching symbols with one gap force the middle square to be the opposite symbol.`
          );
          return;
        }
      }
    }

    for (
      let row = 0;
      row < size;
      row++
    ) {

      const line =
        marks.slice(
          row * size,
          row * size + size
        );

      const suns =
        line.filter(
          value => value === 1
        ).length;

      const moons =
        line.filter(
          value => value === 2
        ).length;

      if (
        line.includes(0) &&
        (
          suns === size / 2 ||
          moons === size / 2
        )
      ) {
        setFeedback(
          `Row ${row + 1} already has all four ${suns === size / 2 ? "suns" : "moons"}. Every remaining square must be the other symbol.`
        );
        return;
      }
    }

    setFeedback(
      "Check columns for a forced opposite symbol, then compare nearly completed rows so you do not create duplicates."
    );
    return;
  }

  if (
    state.gameKey === "balance"
  ) {
    setFeedback(
      `LEFT needs exactly four weights totalling ${puzzle.leftTarget}, with ${puzzle.leftOdd} odd and spread ${puzzle.leftSpread}. Use all three constraints together.`
    );
    return;
  }

  if (
    state.gameKey === "signal"
  ) {
    setFeedback(
      puzzle.hint ||
      "Try separating the information into two interacting patterns."
    );
    return;
  }

  if (
    state.gameKey === "special"
  ) {
    setFeedback(
      puzzle.hint
    );
  }
}

/* ==========================================================
   FINISH
   ========================================================== */

function finishPuzzle() {

  stopTimer();

  stats.solved +=
    1;

  stats.played +=
    1;

  if (
    state.hints === 0
    &&
    state.attempts === 1
  ) {

    stats.perfect +=
      1;

  }

  if (
    stats.bestSeconds === null
    ||
    state.elapsed <
    stats.bestSeconds
  ) {

    stats.bestSeconds =
      state.elapsed;

  }

  if (
    state.mode ===
    "daily"
  ) {

    if (
      !stats.completedDaily[
        state.dateKey
      ]
    ) {

      stats.completedDaily[
        state.dateKey
      ] =
        {};

    }

    stats.completedDaily[
      state.dateKey
    ][
      state.gameKey
    ] =
      true;

    updateStreak(
      state.dateKey
    );

  }

  saveStats();

  $("#winHeadline").textContent =

    state.gameKey ===
    "queens"

    ?

    "Crowned."

    :

    "Brilliant.";

  $("#winMeta").textContent =
    `${formatTime(
      state.elapsed
    )} · ${state.hints} hint${
      state.hints === 1
      ?
      ""
      :
      "s"
    } · ${state.attempts} check${
      state.attempts === 1
      ?
      ""
      :
      "s"
    }`;

  $("#winExplanation").textContent =
    state.puzzle.explanation;

  showScreen(
    "win"
  );

  launchConfetti();

}


function updateStreak(
  dateKey
) {

  if (
    !stats.lastSolvedDate
  ) {

    stats.lastSolvedDate =
      dateKey;

    stats.streak =
      1;

    return;

  }

  if (
    stats.lastSolvedDate ===
    dateKey
  ) {

    return;

  }

  const previous =
    dateFromKey(
      stats.lastSolvedDate
    );

  const current =
    dateFromKey(
      dateKey
    );

  const difference =
    Math.round(

      (
        current -
        previous
      )

      /

      86400000

    );

  stats.streak =

    difference === 1

    ?

    stats.streak + 1

    :

    1;

  stats.lastSolvedDate =
    dateKey;

}


/* ==========================================================
   CONFETTI
   ========================================================== */

function launchConfetti() {

  const layer =
    $("#confettiLayer");

  layer.innerHTML =
    "";

  const colors = [

    "#103c2d",

    "#236c50",

    "#a8cbb8",

    "#c8aa5e",

    "#e8e0f1",

    "#efdcd7"

  ];

  for (
    let i = 0;
    i < 54;
    i++
  ) {

    const piece =
      document.createElement(
        "i"
      );

    piece.className =
      "confetti-piece";

    piece.style.left =
      `${Math.random() * 100}%`;

    piece.style.top =
      `${
        -20
        -
        Math.random() * 50
      }px`;

    piece.style.background =
      colors[
        i % colors.length
      ];

    piece.style.animationDelay =
      `${Math.random() * 0.35}s`;

    layer.appendChild(
      piece
    );

  }

}


/* ==========================================================
   STATS
   ========================================================== */

function renderStats() {

  $("#statSolved").textContent =
    stats.solved;

  $("#statPlayed").textContent =
    stats.played;

  $("#statPerfect").textContent =
    stats.perfect;

  $("#statStreak").textContent =
    stats.streak;

  $("#statBest").textContent =

    stats.bestSeconds === null

    ?

    "—"

    :

    formatTime(
      stats.bestSeconds
    );

}


/* ==========================================================
   ARCHIVE
   ========================================================== */

function renderArchive() {

  const container =
    $("#archiveList");

  container.innerHTML =
    "";

  const start =
    dateFromKey(
      START_DATE
    );

  const today =
    dateFromKey(
      todayKey()
    );

  const elapsedDays =
    Math.floor(

      (
        today -
        start
      )

      /

      86400000

    );

  const maxOffset =
    Math.min(

      TOTAL_DAILY_DAYS - 1,

      Math.max(
        elapsedDays,
        0
      )

    );

  for (
    let offset = 0;
    offset <= maxOffset;
    offset++
  ) {

    const date =
      new Date(
        today
      );

    date.setDate(
      date.getDate()
      -
      offset
    );

    if (
      date <
      start
    ) {

      break;

    }

    const key =
      todayKey(
        date
      );

    const day =
      document.createElement(
        "article"
      );

    day.className =
      "archive-day";

    day.innerHTML = `

      <h3>

        Day ${dailyNumber(
          key
        )}
        ·
        ${prettyDate(
          key
        )}

        ${
          offset === 0
          ?
          " · Today"
          :
          ""
        }

      </h3>

    `;

    const games =
      document.createElement(
        "div"
      );

    games.className =
      "archive-games";

    Object.keys(
      GAME_META
    ).forEach(

      gameKey => {

        const completed =
          Boolean(

            stats
              .completedDaily
              ?.[key]
              ?.[gameKey]

          );

        const button =
          document.createElement(
            "button"
          );

        button.type =
          "button";

        button.className =
          "archive-game-button";

        button.innerHTML = `

          <strong>
            ${GAME_META[
              gameKey
            ].title}
          </strong>

          <span>
            ${
              completed
              ?
              "✓ Solved"
              :
              "Replay"
            }
          </span>

        `;

        button.addEventListener(

          "click",

          () => {

            openGame(
              gameKey,
              "daily",
              key
            );

          }

        );

        games.appendChild(
          button
        );

      }

    );

    day.appendChild(
      games
    );

    container.appendChild(
      day
    );

  }

}


/* ==========================================================
   RULES
   ========================================================== */

function openRulesModal(
  initial
) {

  stopTimer();

  const ruleKey =

    state.gameKey ===
    "special"

    ?

    "special"

    :

    state.gameKey;

  $("#rulesHeading").textContent =

    state.gameKey ===
    "special"

    ?

    state.puzzle.title

    :

    GAME_META[
      state.gameKey
    ].title;

  $("#rulesBody").innerHTML =
    RULES[
      ruleKey
    ];

  $("#startFromRulesButton").textContent =

    initial

    ?

    "Got it — play"

    :

    "Back to puzzle";

  $("#rulesOverlay")
    .classList.remove(
      "hidden"
    );

}


function closeRulesAndPlay() {

  $("#rulesOverlay")
    .classList.add(
      "hidden"
    );

  showScreen(
    "game"
  );

  startTimer();

}


/* ==========================================================
   CONFIRM
   ========================================================== */

let confirmAction =
  null;


function openConfirm(
  title,
  text,
  action
) {

  $("#confirmTitle").textContent =
    title;

  $("#confirmText").textContent =
    text;

  confirmAction =
    action;

  $("#confirmOverlay")
    .classList.remove(
      "hidden"
    );

}


function closeConfirm() {

  $("#confirmOverlay")
    .classList.add(
      "hidden"
    );

  confirmAction =
    null;

}


/* ==========================================================
   EVENTS
   ========================================================== */

$("#logoButton")
  .addEventListener(

    "click",

    () => {

      stopTimer();

      renderHome();

      showScreen(
        "home"
      );

    }

  );


$("#profileButton")
  .addEventListener(

    "click",

    () => {

      stopTimer();

      showScreen(
        "stats"
      );

    }

  );


$$(".nav-button")
  .forEach(

    button => {

      button.addEventListener(

        "click",

        () => {

          stopTimer();

          const target =
            button.dataset.screen;

          if (
            target ===
            "homeScreen"
          ) {

            renderHome();

            showScreen(
              "home"
            );

          }

          if (
            target ===
            "archiveScreen"
          ) {

            showScreen(
              "archive"
            );

          }

          if (
            target ===
            "statsScreen"
          ) {

            showScreen(
              "stats"
            );

          }

        }

      );

    }

  );


$("#specialButton")
  .addEventListener(

    "click",

    () => {

      openGame(
        "special",
        "daily",
        todayKey()
      );

    }

  );


$("#rulesButton")
  .addEventListener(

    "click",

    () => {

      openRulesModal(
        false
      );

    }

  );


$("#closeRulesButton")
  .addEventListener(
    "click",
    closeRulesAndPlay
  );


$("#startFromRulesButton")
  .addEventListener(
    "click",
    closeRulesAndPlay
  );


$("#checkButton")
  .addEventListener(
    "click",
    checkPuzzle
  );


$("#hintButton")
  .addEventListener(
    "click",
    useHint
  );


$("#solutionButton")
  .addEventListener(
    "click",
    revealSolution
  );


$("#pauseButton")
  .addEventListener(

    "click",

    () => {

      stopTimer();

      showScreen(
        "pause"
      );

    }

  );


$("#resumeButton")
  .addEventListener(

    "click",

    () => {

      showScreen(
        "game"
      );

      startTimer();

    }

  );


$("#resetButton")
  .addEventListener(

    "click",

    () => {

      openGame(
        state.gameKey,
        state.mode,
        state.dateKey
      );

    }

  );


$("#restartFromPause")
  .addEventListener(

    "click",

    () => {

      openGame(
        state.gameKey,
        state.mode,
        state.dateKey
      );

    }

  );


$("#leaveGame")
  .addEventListener(

    "click",

    () => {

      stopTimer();

      openConfirm(

        "Leave this round?",

        "Starting another puzzle will replace this unfinished round.",

        () => {

          renderHome();

          showScreen(
            "home"
          );

        }

      );

    }

  );


$("#leaveFromPause")
  .addEventListener(

    "click",

    () => {

      stopTimer();

      renderHome();

      showScreen(
        "home"
      );

    }

  );


$("#confirmCancel")
  .addEventListener(

    "click",

    () => {

      closeConfirm();

      if (
        screens.game
          .classList.contains(
            "active"
          )
      ) {

        startTimer();

      }

    }

  );


$("#confirmOkay")
  .addEventListener(

    "click",

    () => {

      const action =
        confirmAction;

      closeConfirm();

      if (
        action
      ) {

        action();

      }

    }

  );


$("#playAnotherButton")
  .addEventListener(

    "click",

    () => {

      openGame(
        state.gameKey,
        "practice",
        todayKey()
      );

    }

  );


$("#replayButton")
  .addEventListener(

    "click",

    () => {

      openGame(
        state.gameKey,
        state.mode,
        state.dateKey
      );

    }

  );


$("#winHomeButton")
  .addEventListener(

    "click",

    () => {

      renderHome();

      showScreen(
        "home"
      );

    }

  );


$("#resetStatsButton")
  .addEventListener(

    "click",

    () => {

      openConfirm(

        "Reset local stats?",

        "This removes solved counts, streak and best time from this browser.",

        () => {

          stats =
            defaultStats();

          saveStats();

          renderStats();

        }

      );

    }

  );


/* ==========================================================
   START
   ========================================================== */

renderHome();

})();