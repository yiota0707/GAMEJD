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
    time: "6–15 min",
    tags: "Deduction · Codes",
    blurb:
      "Decode a five-symbol system from positional evidence."
  },

  shift: {
    title: "Shift",
    icon: "↔",
    color: "#efdcd7",
    difficulty: "HARD",
    time: "5–12 min",
    tags: "Transformation · Patterns",
    blurb:
      "Shift complete rows until a scrambled pattern locks into place."
  },

  balance: {
    title: "Balance",
    icon: "⚖",
    color: "#efe4d3",
    difficulty: "HARD",
    time: "5–12 min",
    tags: "Numbers · Combinations",
    blurb:
      "Partition six weights across two constrained trays."
  },

  signal: {
    title: "Signal",
    icon: "⌁",
    color: "linear-gradient(135deg,#dfece4,#b8d4c5)",
    difficulty: "HARD",
    time: "4–12 min",
    tags: "Patterns · Maths · Lateral",
    blurb:
      "Infer a hidden transformation, sequence or ordering rule."
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
      <div class="rule-icon">5</div>
      <div>
        <strong>Find the five-symbol code.</strong>
        <br>
        Every symbol appears exactly once.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">◎</div>
      <div>
        <strong>Use the positional clues.</strong>
        <br>
        Some clues say before, after, adjacent or forbidden positions.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">⌫</div>
      <div>
        <strong>Tap the code to clear.</strong>
        <br>
        Use deduction rather than trying every permutation.
      </div>
    </div>
  `,

  shift: `
    <div class="rule-row">
      <div class="rule-icon">↔</div>
      <div>
        <strong>Shift whole rows.</strong>
        <br>
        Symbols wrap around from one side to the other.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">▦</div>
      <div>
        <strong>Match the target pattern.</strong>
        <br>
        Every row must become identical to the target.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">#</div>
      <div>
        <strong>Watch your move count.</strong>
        <br>
        Hard rounds use larger patterns than before.
      </div>
    </div>
  `,

  balance: `
    <div class="rule-row">
      <div class="rule-icon">⚖</div>
      <div>
        <strong>Fill both trays.</strong>
        <br>
        Each tray requires exactly three weights.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">Σ</div>
      <div>
        <strong>Hit both target totals.</strong>
        <br>
        LEFT and RIGHT can have different targets.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">1×</div>
      <div>
        <strong>Each weight can be used once.</strong>
        <br>
        Tap a selected weight to remove it.
      </div>
    </div>
  `,

  signal: `
    <div class="rule-row">
      <div class="rule-icon">?</div>
      <div>
        <strong>Find the hidden rule.</strong>
        <br>
        Signal now changes puzzle format rather than always asking for four tiles.
      </div>
    </div>

    <div class="rule-row">
      <div class="rule-icon">→</div>
      <div>
        <strong>Look for transformations.</strong>
        <br>
        Numbers, letters, sequences and ordering can all appear.
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

  shiftRows: null,

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
   CIPHER GENERATOR
   ========================================================== */

function createCipherPuzzle(
  token
) {

  const rng =
    rngFrom(
      token + ":cipher"
    );

  const symbolSets = [

    ["▲","●","■","◆","★"],

    ["☀","☾","✦","◇","○"],

    ["A","K","M","R","X"],

    ["♠","♥","♣","♦","●"]

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

  const clues =
    [];

  clues.push(
    `${answer[0]} is first.`
  );

  clues.push(
    `${answer[4]} is last.`
  );

  clues.push(
    `${answer[1]} is immediately after ${answer[0]}.`
  );

  clues.push(
    `${answer[3]} is immediately before ${answer[4]}.`
  );

  clues.push(
    `${answer[2]} sits between ${answer[1]} and ${answer[3]}.`
  );

  return {

    type:
      "cipher",

    symbols,

    answer,

    clues,

    prompt:
      "Decode the five-symbol sequence.",

    description:
      "Use all positional clues to determine the only valid ordering.",

    explanation:
      "The clues lock the two ends first, then force the remaining symbols into the only positions that satisfy adjacency and ordering."

  };

}


/* ==========================================================
   SHIFT GENERATOR
   ========================================================== */

function createShiftPuzzle(
  token
) {

  const rng =
    rngFrom(
      token + ":shift"
    );

  const symbols =
    shuffle(
      [
        "●",
        "▲",
        "■",
        "◆",
        "✦",
        "○"
      ],
      rng
    );

  const target =
    [];

  const start =
    [];

  for (
    let row = 0;
    row < 6;
    row++
  ) {

    target.push(
      [...symbols]
    );

    const amount =
      randomInt(
        rng,
        1,
        5
      );

    start.push(
      [
        ...symbols.slice(
          amount
        ),
        ...symbols.slice(
          0,
          amount
        )
      ]
    );

  }

  return {

    type:
      "shift",

    target,

    start,

    prompt:
      "Reconstruct the six-row pattern.",

    description:
      "Shift whole rows left or right. Symbols wrap around.",

    explanation:
      "Each row is a cyclic permutation of the same sequence; finding its offset restores the full grid."

  };

}


/* ==========================================================
   BALANCE GENERATOR
   ========================================================== */

function createBalancePuzzle(
  token
) {

  const rng =
    rngFrom(
      token + ":balance"
    );

  const weights =
    shuffle(

      [
        randomInt(rng,2,8),
        randomInt(rng,3,10),
        randomInt(rng,5,12),
        randomInt(rng,7,14),
        randomInt(rng,9,16),
        randomInt(rng,11,18)
      ],

      rng

    );

  const leftAnswer =
    [
      weights[0],
      weights[2],
      weights[5]
    ];

  const rightAnswer =
    [
      weights[1],
      weights[3],
      weights[4]
    ];

  const leftTarget =
    leftAnswer.reduce(
      (
        a,
        b
      ) =>
        a + b,
      0
    );

  const rightTarget =
    rightAnswer.reduce(
      (
        a,
        b
      ) =>
        a + b,
      0
    );

  return {

    type:
      "balance",

    weights,

    leftTarget,

    rightTarget,

    prompt:
      "Build both target trays.",

    description:
      `Choose three weights for LEFT = ${leftTarget} and three for RIGHT = ${rightTarget}.`,

    explanation:
      "Every weight must be used exactly once, turning two independent sums into one linked partition problem."

  };

}


/* ==========================================================
   SIGNAL GENERATOR
   ========================================================== */

function createSignalPuzzle(
  token
) {

  const rng =
    rngFrom(
      token + ":signal"
    );

  const type =
    randomInt(
      rng,
      0,
      2
    );

  if (
    type === 0
  ) {

    const n =
      randomInt(
        rng,
        2,
        6
      );

    const sequence =
      [];

    for (
      let i = 1;
      i <= 5;
      i++
    ) {

      sequence.push(
        i * (
          i + n
        )
      );

    }

    const answer =
      6 * (
        6 + n
      );

    return {

      type:
        "signal-input",

      prompt:
        `${sequence.join(" · ")} · ?`,

      description:
        "Find the next number in the sequence.",

      answer:
        String(
          answer
        ),

      hint:
        "Look at each position number as part of the calculation.",

      explanation:
        `The nth term is n × (n + ${n}).`

    };

  }


  if (
    type === 1
  ) {

    const shift =
      randomInt(
        rng,
        1,
        3
      );

    const source =
      [
        "CAR",
        "DOG",
        "MAP"
      ];

    const encode =
      word =>
        word
          .split("")
          .map(

            letter => {

              const base =
                letter.charCodeAt(
                  0
                )
                -
                65;

              return String.fromCharCode(
                65
                +
                (
                  base
                  +
                  shift
                )
                %
                26
              );

            }

          )
          .join("");

    return {

      type:
        "signal-input",

      prompt:
        `${source[0]} → ${encode(source[0])}
${source[1]} → ${encode(source[1])}
${source[2]} → ?`,

      description:
        "Infer the letter transformation.",

      answer:
        encode(
          source[2]
        ),

      hint:
        "Every letter moves by the same amount.",

      explanation:
        `Each letter shifts forward ${shift} place${shift === 1 ? "" : "s"} in the alphabet.`

    };

  }


  const words =
    shuffle(
      [
        "EMBER",
        "FROST",
        "IVORY",
        "MOSS",
        "SLATE"
      ],
      rng
    );

  const answer =
    [
      "EMBER",
      "FROST",
      "IVORY",
      "MOSS",
      "SLATE"
    ];

  return {

    type:
      "signal-order",

    words,

    answer,

    prompt:
      "Put the five signals in the only valid order.",

    description:
      "EMBER is before IVORY. FROST is immediately after EMBER. SLATE is last. MOSS is immediately before SLATE.",

    hint:
      "Start with the two forced adjacent pairs.",

    explanation:
      "EMBER–FROST and MOSS–SLATE form locked pairs. IVORY is forced between those pairs."

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

    state.practiceCounter +=
      1;

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

    return createQueensPuzzle(
      token
    );

  }

  if (
    gameKey === "circuit"
  ) {

    return createCircuitPuzzle(
      token
    );

  }

  if (
    gameKey === "route"
  ) {

    return createRoutePuzzle(
      token
    );

  }

  if (
    gameKey === "cipher"
  ) {

    return createCipherPuzzle(
      token
    );

  }

  if (
    gameKey === "shift"
  ) {

    return createShiftPuzzle(
      token
    );

  }

  if (
    gameKey === "balance"
  ) {

    return createBalancePuzzle(
      token
    );

  }

  if (
    gameKey === "signal"
  ) {

    return createSignalPuzzle(
      token
    );

  }

  if (
    gameKey === "special"
  ) {

    const rng =
      rngFrom(
        token
      );

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

  state.shiftRows =
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

  area.innerHTML =
    "";

  if (
    state.gameKey === "queens"
  ) {

    renderQueens(
      area
    );

  }

  else if (
    state.gameKey === "circuit"
  ) {

    renderCircuit(
      area
    );

  }

  else if (
    state.gameKey === "route"
  ) {

    renderRoute(
      area
    );

  }

  else if (
    state.gameKey === "cipher"
  ) {

    renderCipher(
      area
    );

  }

  else if (
    state.gameKey === "shift"
  ) {

    renderShift(
      area
    );

  }

  else if (
    state.gameKey === "balance"
  ) {

    renderBalance(
      area
    );

  }

  else if (
    state.gameKey === "signal"
  ) {

    renderSignal(
      area
    );

  }

  else if (
    state.gameKey === "special"
  ) {

    renderSpecial(
      area
    );

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

function renderCipher(
  area
) {

  const puzzle =
    state.puzzle;

  $("#puzzlePrompt").textContent =
    puzzle.prompt;

  $("#puzzleDescription").textContent =
    puzzle.description;

  if (
    !state.cipherGuess
  ) {

    state.cipherGuess =
      [];

  }

  const clues =
    document.createElement(
      "div"
    );

  clues.className =
    "clue-list";

  puzzle.clues.forEach(

    clue => {

      const row =
        document.createElement(
          "div"
        );

      row.className =
        "cipher-clue";

      row.textContent =
        clue;

      clues.appendChild(
        row
      );

    }

  );

  area.appendChild(
    clues
  );

  const display =
    document.createElement(
      "button"
    );

  display.type =
    "button";

  display.className =
    "code-display cipher-five";

  display.textContent =
    state.cipherGuess.length
    ?
    state.cipherGuess.join(
      " "
    )
    :
    "• • • • •";

  display.addEventListener(

    "click",

    () => {

      state.cipherGuess =
        [];

      renderCurrentGame();

    }

  );

  area.appendChild(
    display
  );

  const keypad =
    document.createElement(
      "div"
    );

  keypad.className =
    "keypad cipher-five-keypad";

  puzzle.symbols.forEach(

    symbol => {

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "symbol-key";

      button.textContent =
        symbol;

      if (
        state.cipherGuess.includes(
          symbol
        )
      ) {

        button.classList.add(
          "selected"
        );

      }

      button.addEventListener(

        "click",

        () => {

          if (
            state.cipherGuess.includes(
              symbol
            )
          ) {

            return;

          }

          if (
            state.cipherGuess.length <
            5
          ) {

            state.cipherGuess.push(
              symbol
            );

            renderCurrentGame();

          }

        }

      );

      keypad.appendChild(
        button
      );

    }

  );

  area.appendChild(
    keypad
  );

}


function checkCipher() {

  return (
    JSON.stringify(
      state.cipherGuess
    )
    ===
    JSON.stringify(
      state.puzzle.answer
    )
  );

}


/* ==========================================================
   SHIFT
   ========================================================== */

function renderShift(
  area
) {

  const puzzle =
    state.puzzle;

  $("#puzzlePrompt").textContent =
    puzzle.prompt;

  $("#puzzleDescription").textContent =
    puzzle.description;

  if (
    !state.shiftRows
  ) {

    state.shiftRows =
      clone(
        puzzle.start
      );

  }

  const target =
    document.createElement(
      "div"
    );

  target.className =
    "shift-target";

  target.innerHTML =
    `
      <span>TARGET</span>
      <strong>
        ${puzzle.target[0].join(" ")}
      </strong>
    `;

  area.appendChild(
    target
  );

  const board =
    document.createElement(
      "div"
    );

  board.className =
    "shift-board";

  state.shiftRows.forEach(

    (
      row,
      rowIndex
    ) => {

      const wrapper =
        document.createElement(
          "div"
        );

      wrapper.className =
        "shift-row";

      const left =
        document.createElement(
          "button"
        );

      left.type =
        "button";

      left.className =
        "shift-button";

      left.textContent =
        "←";

      left.addEventListener(

        "click",

        () => {

          const first =
            state.shiftRows[
              rowIndex
            ].shift();

          state.shiftRows[
            rowIndex
          ].push(
            first
          );

          renderCurrentGame();

        }

      );


      const cells =
        document.createElement(
          "div"
        );

      cells.className =
        "shift-cells shift-six";

      row.forEach(

        symbol => {

          const cell =
            document.createElement(
              "div"
            );

          cell.className =
            "shift-cell";

          cell.textContent =
            symbol;

          cells.appendChild(
            cell
          );

        }

      );


      const right =
        document.createElement(
          "button"
        );

      right.type =
        "button";

      right.className =
        "shift-button";

      right.textContent =
        "→";

      right.addEventListener(

        "click",

        () => {

          const last =
            state.shiftRows[
              rowIndex
            ].pop();

          state.shiftRows[
            rowIndex
          ].unshift(
            last
          );

          renderCurrentGame();

        }

      );

      wrapper.appendChild(
        left
      );

      wrapper.appendChild(
        cells
      );

      wrapper.appendChild(
        right
      );

      board.appendChild(
        wrapper
      );

    }

  );

  area.appendChild(
    board
  );

}


function checkShift() {

  return (
    JSON.stringify(
      state.shiftRows
    )
    ===
    JSON.stringify(
      state.puzzle.target
    )
  );

}


/* ==========================================================
   BALANCE
   ========================================================== */

function renderBalance(
  area
) {

  const puzzle =
    state.puzzle;

  $("#puzzlePrompt").textContent =
    puzzle.prompt;

  $("#puzzleDescription").textContent =
    puzzle.description;

  const trays =
    document.createElement(
      "div"
    );

  trays.className =
    "balance-trays";

  const left =
    document.createElement(
      "div"
    );

  left.className =
    "tray balance-hard-tray";

  left.innerHTML = `
    <strong>
      LEFT = ${puzzle.leftTarget}
    </strong>

    <div class="tray-values">
      ${
        state.balanceLeft.length
        ?
        state.balanceLeft.join(
          " + "
        )
        :
        "—"
      }
    </div>

    <small>
      total ${
        state.balanceLeft.reduce(
          (
            a,
            b
          ) =>
            a + b,
          0
        )
      }
    </small>
  `;


  const right =
    document.createElement(
      "div"
    );

  right.className =
    "tray balance-hard-tray";

  right.innerHTML = `
    <strong>
      RIGHT = ${puzzle.rightTarget}
    </strong>

    <div class="tray-values">
      ${
        state.balanceRight.length
        ?
        state.balanceRight.join(
          " + "
        )
        :
        "—"
      }
    </div>

    <small>
      total ${
        state.balanceRight.reduce(
          (
            a,
            b
          ) =>
            a + b,
          0
        )
      }
    </small>
  `;

  trays.appendChild(
    left
  );

  trays.appendChild(
    right
  );

  area.appendChild(
    trays
  );


  const weights =
    document.createElement(
      "div"
    );

  weights.className =
    "weight-grid";

  puzzle.weights.forEach(

    (
      value,
      index
    ) => {

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "weight-button";

      button.textContent =
        value;

      const leftIndex =
        state.balanceLeft.indexOf(
          value
        );

      const rightIndex =
        state.balanceRight.indexOf(
          value
        );

      if (
        leftIndex >= 0
        ||
        rightIndex >= 0
      ) {

        button.classList.add(
          "selected"
        );

      }

      button.addEventListener(

        "click",

        () => {

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
            state.balanceLeft.length <
            3
          ) {

            state.balanceLeft.push(
              value
            );

          }

          else if (
            state.balanceRight.length <
            3
          ) {

            state.balanceRight.push(
              value
            );

          }

          renderCurrentGame();

        }

      );

      weights.appendChild(
        button
      );

    }

  );

  area.appendChild(
    weights
  );

}


function checkBalance() {

  if (
    state.balanceLeft.length !==
    3
    ||
    state.balanceRight.length !==
    3
  ) {

    return false;

  }

  const leftTotal =
    state.balanceLeft.reduce(
      (
        a,
        b
      ) =>
        a + b,
      0
    );

  const rightTotal =
    state.balanceRight.reduce(
      (
        a,
        b
      ) =>
        a + b,
      0
    );

  return (
    leftTotal ===
    state.puzzle.leftTarget
    &&
    rightTotal ===
    state.puzzle.rightTarget
  );

}


/* ==========================================================
   SIGNAL
   ========================================================== */

function renderSignal(
  area
) {

  const puzzle =
    state.puzzle;

  $("#puzzlePrompt").textContent =
    puzzle.prompt;

  $("#puzzleDescription").textContent =
    puzzle.description;

  if (
    puzzle.type ===
    "signal-input"
  ) {

    const input =
      document.createElement(
        "input"
      );

    input.className =
      "signal-input";

    input.type =
      "text";

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

    area.appendChild(
      input
    );

    return;

  }


  if (
    puzzle.type ===
    "signal-order"
  ) {

    if (
      !state.selected.length
    ) {

      state.selected =
        [...puzzle.words];

    }

    const list =
      document.createElement(
        "div"
      );

    list.className =
      "signal-order";

    state.selected.forEach(

      (
        word,
        index
      ) => {

        const row =
          document.createElement(
            "div"
          );

        row.className =
          "signal-order-row";

        row.innerHTML = `

          <strong>
            ${index + 1}.
            ${word}
          </strong>

          <div>

            <button
              type="button"
              data-dir="-1"
            >
              ↑
            </button>

            <button
              type="button"
              data-dir="1"
            >
              ↓
            </button>

          </div>

        `;

        row.querySelectorAll(
          "button"
        ).forEach(

          button => {

            button.addEventListener(

              "click",

              () => {

                const direction =
                  Number(
                    button.dataset.dir
                  );

                const target =
                  index
                  +
                  direction;

                if (
                  target < 0
                  ||
                  target >=
                  state.selected.length
                ) {

                  return;

                }

                [
                  state.selected[index],
                  state.selected[target]
                ]

                =

                [
                  state.selected[target],
                  state.selected[index]
                ];

                renderCurrentGame();

              }

            );

          }

        );

        list.appendChild(
          row
        );

      }

    );

    area.appendChild(
      list
    );

  }

}


function checkSignal() {

  const puzzle =
    state.puzzle;

  if (
    puzzle.type ===
    "signal-input"
  ) {

    return (
      state.signalAnswer
        .trim()
        .toUpperCase()
      ===
      puzzle.answer
        .trim()
        .toUpperCase()
    );

  }

  if (
    puzzle.type ===
    "signal-order"
  ) {

    return (
      JSON.stringify(
        state.selected
      )
      ===
      JSON.stringify(
        puzzle.answer
      )
    );

  }

  return false;

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
   CHECK ANSWER
   ========================================================== */

function checkPuzzle() {

  state.attempts +=
    1;

  $("#attemptsChip").textContent =
    `${state.attempts} check${
      state.attempts === 1
      ?
      ""
      :
      "s"
    }`;

  let solved =
    false;

  if (
    state.gameKey === "queens"
  ) {

    solved =
      checkQueens();

  }

  else if (
    state.gameKey === "circuit"
  ) {

    solved =
      checkCircuit();

  }

  else if (
    state.gameKey === "route"
  ) {

    solved =
      checkRoute();

  }

  else if (
    state.gameKey === "cipher"
  ) {

    solved =
      checkCipher();

  }

  else if (
    state.gameKey === "shift"
  ) {

    solved =
      checkShift();

  }

  else if (
    state.gameKey === "balance"
  ) {

    solved =
      checkBalance();

  }

  else if (
    state.gameKey === "signal"
  ) {

    solved =
      checkSignal();

  }

  else if (
    state.gameKey === "special"
  ) {

    solved =
      checkSpecial();

  }

  if (
    solved
  ) {

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

  state.hints +=
    1;

  const puzzle =
    state.puzzle;

  if (
    state.gameKey ===
    "queens"
  ) {

    const size =
      puzzle.size;

    let emptyRow =
      -1;

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
        !values.includes(
          1
        )
      ) {

        emptyRow =
          row;

        break;

      }

    }

    if (
      emptyRow >= 0
    ) {

      const col =
        puzzle.solution[
          emptyRow
        ];

      setFeedback(
        `Focus on row ${emptyRow + 1}. Its queen belongs in the region containing column ${col + 1}.`
      );

    }

    return;

  }


  if (
    state.gameKey ===
    "circuit"
  ) {

    const wrong =
      state.circuitRotations
        .findIndex(
          (
            value,
            index
          ) =>
            value !==
            puzzle.target[index]
        );

    setFeedback(
      wrong >= 0
      ?
      `Piece ${wrong + 1} is currently facing the wrong way.`
      :
      "Re-check all four totals."
    );

    return;

  }


  if (
    state.gameKey ===
    "route"
  ) {

    setFeedback(
      `The final route uses exactly ${puzzle.requiredLength} cells. Check checkpoint order before heading for B.`
    );

    return;

  }


  if (
    state.gameKey ===
    "cipher"
  ) {

    setFeedback(
      `Start with: ${puzzle.clues[0]}`
    );

    return;

  }


  if (
    state.gameKey ===
    "shift"
  ) {

    setFeedback(
      "Compare the first symbol in each row with the first symbol of the target."
    );

    return;

  }


  if (
    state.gameKey ===
    "balance"
  ) {

    setFeedback(
      `LEFT must total ${puzzle.leftTarget} using exactly three weights.`
    );

    return;

  }


  if (
    state.gameKey ===
    "signal"
  ) {

    setFeedback(
      puzzle.hint
      ||
      "Look for the smallest rule that explains every example."
    );

    return;

  }


  if (
    state.gameKey ===
    "special"
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