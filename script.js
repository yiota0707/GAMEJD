console.log("Deans Games loaded 💚");(() => {

"use strict";


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

  home:
    $("#homeScreen"),

  game:
    $("#gameScreen"),

  pause:
    $("#pauseScreen"),

  archive:
    $("#archiveScreen"),

  stats:
    $("#statsScreen"),

  win:
    $("#winScreen")

};



/* ==========================================================
   GAME INFORMATION
   ========================================================== */

const GAME_META = {

  circuit: {

    title:
      "Circuit",

    icon:
      "◫",

    color:
      "linear-gradient(135deg,#e3efce,#c7dda5)",

    featured:
      true,

    difficulty:
      "VERY HARD",

    time:
      "8–20 min",

    tags:
      "Spatial · Deduction · Numbers",

    blurb:
      "Rotate number-pairs until every region condition works at the same time."

  },


  route: {

    title:
      "Route",

    icon:
      "↗",

    color:
      "#ddebef",

    difficulty:
      "HARD",

    time:
      "4–12 min",

    tags:
      "Pathfinding · Planning",

    blurb:
      "Draw one legal path through every checkpoint without trapping yourself."

  },


  cipher: {

    title:
      "Cipher",

    icon:
      "⌨",

    color:
      "#e8e0f1",

    difficulty:
      "HARD",

    time:
      "5–12 min",

    tags:
      "Deduction · Codes",

    blurb:
      "Decode a hidden four-symbol system using only partial evidence."

  },


  shift: {

    title:
      "Shift",

    icon:
      "↔",

    color:
      "#efdcd7",

    difficulty:
      "CHALLENGING",

    time:
      "3–10 min",

    tags:
      "Transformation · Patterns",

    blurb:
      "Slide rows cyclically until the whole board reconstructs the target."

  },


  balance: {

    title:
      "Balance",

    icon:
      "⚖",

    color:
      "#efe4d3",

    difficulty:
      "CHALLENGING",

    time:
      "3–8 min",

    tags:
      "Numbers · Combinations",

    blurb:
      "Assign weights to both trays so multiple totals hold simultaneously."

  },


  signal: {

    title:
      "Signal",

    icon:
      "⌁",

    color:
      "linear-gradient(135deg,#dfece4,#b8d4c5)",

    difficulty:
      "HARD",

    time:
      "2–10 min",

    tags:
      "Language · Science · Lateral",

    blurb:
      "Infer a hidden rule that is never directly explained."

  }

};



/* ==========================================================
   SIGNAL PUZZLES
   ========================================================== */

const SIGNAL_BANK = [

  {

    items: [

      "MERCURY",
      "VENUS",
      "EARTH",
      "MARS",

      "JUPITER",
      "SATURN",
      "EUROPA",
      "TITAN",

      "PLUTO",
      "COMET",
      "SUN",
      "MOON"

    ],

    answer: [

      "MERCURY",
      "VENUS",
      "EARTH",
      "MARS"

    ],

    prompt:
      "Find the hidden scientific signal.",

    explanation:
      "Mercury, Venus, Earth and Mars are the four terrestrial, or rocky, planets.",

    hints: [

      "Think about categories of planets.",

      "Rocky is the important word."

    ]

  },


  {

    items: [

      "HELIUM",
      "NEON",
      "ARGON",
      "KRYPTON",

      "OXYGEN",
      "CARBON",
      "IRON",
      "SODIUM",

      "SILICON",
      "COPPER",
      "NITROGEN",
      "GOLD"

    ],

    answer: [

      "HELIUM",
      "NEON",
      "ARGON",
      "KRYPTON"

    ],

    prompt:
      "Find the hidden chemistry signal.",

    explanation:
      "Helium, neon, argon and krypton are noble gases.",

    hints: [

      "Look at the periodic table.",

      "Their outer electron shells are unusually stable."

    ]

  },


  {

    items: [

      "VIOLIN",
      "VIOLA",
      "CELLO",
      "DOUBLE BASS",

      "TRUMPET",
      "FLUTE",
      "OBOE",
      "PIANO",

      "HARP",
      "TUBA",
      "CLARINET",
      "DRUM"

    ],

    answer: [

      "VIOLIN",
      "VIOLA",
      "CELLO",
      "DOUBLE BASS"

    ],

    prompt:
      "Find the hidden musical family.",

    explanation:
      "Violin, viola, cello and double bass are the principal bowed string instruments of the modern orchestra.",

    hints: [

      "Think orchestra sections.",

      "All four are usually played with a bow."

    ]

  },


  {

    items: [

      "LIMA",
      "SANTIAGO",
      "BOGOTÁ",
      "QUITO",

      "ROME",
      "PARIS",
      "TOKYO",
      "CAIRO",

      "SEOUL",
      "OSLO",
      "NAIROBI",
      "OTTAWA"

    ],

    answer: [

      "LIMA",
      "SANTIAGO",
      "BOGOTÁ",
      "QUITO"

    ],

    prompt:
      "Find the geographic signal.",

    explanation:
      "Lima, Santiago, Bogotá and Quito are national capitals in South America.",

    hints: [

      "Start with continents.",

      "Think South America."

    ]

  },


  {

    items: [

      "2",
      "3",
      "5",
      "7",

      "9",
      "15",
      "21",
      "25",

      "27",
      "33",
      "35",
      "49"

    ],

    answer: [

      "2",
      "3",
      "5",
      "7"

    ],

    prompt:
      "Find the mathematical signal.",

    explanation:
      "2, 3, 5 and 7 are the first four prime numbers.",

    hints: [

      "Think divisibility.",

      "Each has exactly two positive divisors."

    ]

  }

];



/* ==========================================================
   JACK SPECIAL PUZZLES
   ========================================================== */

const SPECIAL_BANK = [

  {

    title:
      "Grid Legends",

    prompt:
      "Find the Formula 1 signal.",

    items: [

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

    answer: [

      "FERRARI",
      "MCLAREN",
      "MERCEDES",
      "RED BULL"

    ],

    explanation:
      "Ferrari, McLaren, Mercedes and Red Bull are strongly associated with Formula 1 teams or constructors.",

    hints: [

      "Think race grid rather than road cars.",

      "These are major Formula 1 names."

    ]

  },


  {

    title:
      "Seven Kingdoms",

    prompt:
      "Find the Westeros signal.",

    items: [

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

    answer: [

      "STARK",
      "LANNISTER",
      "TARGARYEN",
      "BARATHEON"

    ],

    explanation:
      "Stark, Lannister, Targaryen and Baratheon are major noble houses in Game of Thrones.",

    hints: [

      "Think Westeros.",

      "These are family or house names."

    ]

  },


  {

    title:
      "Italian Icons",

    prompt:
      "Find the Italian performance marques.",

    items: [

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

    answer: [

      "FERRARI",
      "LAMBORGHINI",
      "PAGANI",
      "MASERATI"

    ],

    explanation:
      "Ferrari, Lamborghini, Pagani and Maserati are Italian performance-car marques.",

    hints: [

      "Think country of origin.",

      "All four are Italian."

    ]

  }

];



/* ==========================================================
   SHIFT PUZZLES
   ========================================================== */

const SHIFT_BANK = [

  {

    start: [

      ["●","▲","■","◆"],

      ["■","◆","●","▲"],

      ["▲","■","◆","●"],

      ["◆","●","▲","■"]

    ],

    target: [

      ["●","▲","■","◆"],

      ["●","▲","■","◆"],

      ["●","▲","■","◆"],

      ["●","▲","■","◆"]

    ],

    explanation:
      "Each row contains the same four symbols in cyclic order. Shifting rows aligns identical patterns."

  },


  {

    start: [

      ["A","B","C","D"],

      ["C","D","A","B"],

      ["B","C","D","A"],

      ["D","A","B","C"]

    ],

    target: [

      ["A","B","C","D"],

      ["A","B","C","D"],

      ["A","B","C","D"],

      ["A","B","C","D"]

    ],

    explanation:
      "Because each row is a cyclic permutation, every row can be restored using only left and right shifts."

  }

];



/* ==========================================================
   BALANCE PUZZLES
   ========================================================== */

const BALANCE_BANK = [

  {

    weights:
      [2,3,4,5,6,7],

    target:
      9,

    explanation:
      "There are several ways to make 9, but the puzzle requires two disjoint pairs simultaneously."

  },


  {

    weights:
      [1,4,5,6,7,9],

    target:
      10,

    explanation:
      "The two trays must each total 10 using four distinct weights."

  },


  {

    weights:
      [2,5,6,7,8,11],

    target:
      13,

    explanation:
      "The trick is to find two non-overlapping pairs that both make 13."

  }

];



/* ==========================================================
   ROUTE PUZZLES
   ========================================================== */

const ROUTE_BANK = [

  {

    size:
      5,

    blocked:
      [2,7,16],

    checkpoints:
      [9,12],

    start:
      0,

    end:
      24,

    explanation:
      "The successful route reaches both checkpoints while remaining orthogonally connected and avoiding blocked cells."

  },


  {

    size:
      5,

    blocked:
      [5,6,18],

    checkpoints:
      [3,17],

    start:
      20,

    end:
      4,

    explanation:
      "Planning around the blocked cells avoids creating a dead end before the second checkpoint."

  }

];



/* ==========================================================
   CIPHER PUZZLES
   ========================================================== */

const CIPHER_BANK = [

  {

    symbols:
      ["▲","●","■","◆"],

    answer:
      ["●","◆","▲","■"],

    clues: [

      {

        guess:
          ["▲","●","■","◆"],

        correct:
          4,

        placed:
          0

      },


      {

        guess:
          ["◆","■","●","▲"],

        correct:
          4,

        placed:
          0

      },


      {

        guess:
          ["●","◆","■","▲"],

        correct:
          4,

        placed:
          2

      }

    ],

    explanation:
      "Every clue constrains symbol position. Combining the clues leaves only one possible arrangement."

  },


  {

    symbols:
      ["☀","☾","★","◆"],

    answer:
      ["★","☀","◆","☾"],

    clues: [

      {

        guess:
          ["☀","☾","★","◆"],

        correct:
          4,

        placed:
          0

      },


      {

        guess:
          ["★","◆","☀","☾"],

        correct:
          4,

        placed:
          2

      },


      {

        guess:
          ["★","☀","☾","◆"],

        correct:
          4,

        placed:
          2

      }

    ],

    explanation:
      "The code is solved by combining the positional information from each clue."

  }

];



/* ==========================================================
   CIRCUIT PUZZLES
   ========================================================== */

const CIRCUIT_BANK = [

  {

    pairs: [

      [5,1],

      [4,2],

      [3,3]

    ],

    target:
      [0,1,0],

    regions: [

      {

        label:
          "LEFT",

        rule:
          "First values total 10",

        className:
          "region-green"

      },


      {

        label:
          "RIGHT",

        rule:
          "Second values total 8",

        className:
          "region-lime"

      },


      {

        label:
          "MIDDLE",

        rule:
          "Middle domino orientation matters",

        className:
          "region-sand"

      }

    ],

    explanation:
      "Rotating one pair changes multiple constraints at once. Circuit is about coordinating local choices so the whole system works."

  },


  {

    pairs: [

      [6,2],

      [1,5],

      [4,4]

    ],

    target:
      [0,1,0],

    regions: [

      {

        label:
          "LEFT",

        rule:
          "Match the required orientation",

        className:
          "region-green"

      },


      {

        label:
          "RIGHT",

        rule:
          "Balance the opposite side",

        className:
          "region-lime"

      },


      {

        label:
          "MIDDLE",

        rule:
          "Equal pair remains stable",

        className:
          "region-sand"

      }

    ],

    explanation:
      "Each rotation affects the larger configuration, so the puzzle requires constraint propagation rather than isolated calculation."

  }

];



/* ==========================================================
   RULES
   ========================================================== */

const RULES = {

  circuit: `

    <div class="rule-row">

      <div class="rule-icon">
        ↻
      </div>

      <div>
        <strong>Rotate the pieces.</strong>
        <br>
        Tap a number-pair to flip its orientation.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        ◆
      </div>

      <div>
        <strong>Read all constraints.</strong>
        <br>
        One move can affect several conditions.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        ✓
      </div>

      <div>
        <strong>Satisfy everything at once.</strong>
        <br>
        The board is solved only when every condition is true.
      </div>

    </div>

  `,


  route: `

    <div class="rule-row">

      <div class="rule-icon">
        A→B
      </div>

      <div>
        <strong>Build one continuous path.</strong>
        <br>
        Begin at A and finish at B.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        ★
      </div>

      <div>
        <strong>Visit every checkpoint.</strong>
        <br>
        You must pass through every star.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        ■
      </div>

      <div>
        <strong>Avoid blocked cells.</strong>
        <br>
        Move only up, down, left or right.
      </div>

    </div>

  `,


  cipher: `

    <div class="rule-row">

      <div class="rule-icon">
        4
      </div>

      <div>
        <strong>Find the four-symbol code.</strong>
        <br>
        Each symbol appears once.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        ◎
      </div>

      <div>
        <strong>Use every clue.</strong>
        <br>
        “Placed” means the symbol is in the correct position.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        ⌫
      </div>

      <div>
        <strong>Tap your answer to clear it.</strong>
        <br>
        Deduce rather than brute-force.
      </div>

    </div>

  `,


  shift: `

    <div class="rule-row">

      <div class="rule-icon">
        ↔
      </div>

      <div>
        <strong>Shift entire rows.</strong>
        <br>
        Symbols wrap around from one side to the other.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        ▦
      </div>

      <div>
        <strong>Match the target.</strong>
        <br>
        Every row must become the target sequence.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        ↺
      </div>

      <div>
        <strong>Think efficiently.</strong>
        <br>
        Try to solve it using as few shifts as possible.
      </div>

    </div>

  `,


  balance: `

    <div class="rule-row">

      <div class="rule-icon">
        ⚖
      </div>

      <div>
        <strong>Build two trays.</strong>
        <br>
        Choose two weights for LEFT and two for RIGHT.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        =
      </div>

      <div>
        <strong>Both trays must reach the target.</strong>
        <br>
        A weight cannot be used twice.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        ↻
      </div>

      <div>
        <strong>Tap again to remove.</strong>
        <br>
        The first two choices go left and the next two go right.
      </div>

    </div>

  `,


  signal: `

    <div class="rule-row">

      <div class="rule-icon">
        ?
      </div>

      <div>
        <strong>The rule is hidden.</strong>
        <br>
        It could involve science, language, maths, geography or structure.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        4
      </div>

      <div>
        <strong>Select exactly four.</strong>
        <br>
        Every chosen tile must share one precise property.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        💡
      </div>

      <div>
        <strong>Hints are optional.</strong>
        <br>
        Perfect solves are completed with no hints and one check.
      </div>

    </div>

  `,


  special: `

    <div class="rule-row">

      <div class="rule-icon">
        🏁
      </div>

      <div>
        <strong>This is a Jack Special.</strong>
        <br>
        These occasional rounds can involve Formula 1,
        cars, brands or fantasy worlds.
      </div>

    </div>


    <div class="rule-row">

      <div class="rule-icon">
        4
      </div>

      <div>
        <strong>Select four related answers.</strong>
        <br>
        Specials use the Signal mechanic in this first version.
      </div>

    </div>

  `

};



/* ==========================================================
   STATE
   ========================================================== */

const state = {

  gameKey:
    null,

  mode:
    "daily",

  dateKey:
    todayKey(),

  puzzle:
    null,

  selected:
    [],

  attempts:
    0,

  hints:
    0,

  elapsed:
    0,

  timerId:
    null,

  timerBase:
    0,

  practiceCounter:
    0,

  shiftRows:
    null,

  balanceSelected:
    null,

  circuitRotations:
    null

};



/* ==========================================================
   LOCAL STATS
   ========================================================== */

const storageKey =
  "deansGamesStatsV1";


let stats =
  loadStats();



function loadStats() {

  try {

    return (

      JSON.parse(
        localStorage.getItem(
          storageKey
        )
      )

      ||

      {

        solved:
          0,

        played:
          0,

        perfect:
          0,

        bestSeconds:
          null,

        completedDaily:
          {},

        lastSolvedDate:
          null,

        streak:
          0

      }

    );

  }

  catch {

    return {

      solved:
        0,

      played:
        0,

      perfect:
        0,

      bestSeconds:
        null,

      completedDaily:
        {},

      lastSolvedDate:
        null,

      streak:
        0

    };

  }

}



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



function prettyDate(
  dateKey
) {

  const [year,month,day] =
    dateKey
      .split("-")
      .map(Number);


  return new Date(
    year,
    month - 1,
    day
  )
  .toLocaleDateString(

    "en-GB",

    {

      weekday:
        "short",

      day:
        "numeric",

      month:
        "short"

    }

  );

}



/* ==========================================================
   DETERMINISTIC DAILY PUZZLES
   ========================================================== */

function hashString(
  string
) {

  let hash =
    2166136261;


  for (
    let i = 0;
    i < string.length;
    i++
  ) {

    hash ^=
      string.charCodeAt(i);

    hash =
      Math.imul(
        hash,
        16777619
      );

  }


  return hash >>> 0;

}



function seededIndex(
  key,
  length
) {

  return (
    hashString(key)
    %
    length
  );

}



function shuffleSeeded(
  items,
  seedText
) {

  const array =
    [...items];


  let seed =
    hashString(seedText)
    ||
    1;


  function random() {

    seed ^=
      seed << 13;

    seed ^=
      seed >>> 17;

    seed ^=
      seed << 5;


    return (

      (
        seed >>> 0
      )

      %
      100000

    )

    /
    100000;

  }


  for (

    let i =
      array.length - 1;

    i > 0;

    i--

  ) {

    const j =
      Math.floor(
        random()
        *
        (i + 1)
      );


    [
      array[i],
      array[j]
    ]

    =

    [
      array[j],
      array[i]
    ];

  }


  return array;

}



function clone(
  object
) {

  return JSON.parse(
    JSON.stringify(object)
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

    String(minutes)
      .padStart(
        2,
        "0"
      )

    +

    ":"

    +

    String(remainder)
      .padStart(
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
  )
  .forEach(

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

  const now =
    new Date();


  const hour =
    now.getHours();


  let greeting;


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

  else {

    greeting =
      "Good evening, Jack.";

  }


  $("#greeting").textContent =
    greeting;


  $("#todayLabel").textContent =
    now.toLocaleDateString(

      "en-GB",

      {

        day:
          "numeric",

        month:
          "short"

      }

    );


  const grid =
    $("#gameGrid");


  grid.innerHTML =
    "";


  Object.entries(
    GAME_META
  )
  .forEach(

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
            ? " featured"
            : ""
        );


      card.style.background =
        meta.color;


      card.innerHTML = `

        <div class="game-card-top">

          <div>

            <div style="
              display:flex;
              align-items:center;
              gap:8px;
              flex-wrap:wrap;
            ">

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
   GET PUZZLES
   ========================================================== */

function getDailyPuzzle(
  gameKey,
  dateKey
) {

  const token =
    `${dateKey}:${gameKey}`;


  if (
    gameKey === "signal"
  ) {

    return clone(

      SIGNAL_BANK[

        seededIndex(
          token,
          SIGNAL_BANK.length
        )

      ]

    );

  }


  if (
    gameKey === "shift"
  ) {

    return clone(

      SHIFT_BANK[

        seededIndex(
          token,
          SHIFT_BANK.length
        )

      ]

    );

  }


  if (
    gameKey === "balance"
  ) {

    return clone(

      BALANCE_BANK[

        seededIndex(
          token,
          BALANCE_BANK.length
        )

      ]

    );

  }


  if (
    gameKey === "route"
  ) {

    return clone(

      ROUTE_BANK[

        seededIndex(
          token,
          ROUTE_BANK.length
        )

      ]

    );

  }


  if (
    gameKey === "cipher"
  ) {

    return clone(

      CIPHER_BANK[

        seededIndex(
          token,
          CIPHER_BANK.length
        )

      ]

    );

  }


  if (
    gameKey === "circuit"
  ) {

    return clone(

      CIRCUIT_BANK[

        seededIndex(
          token,
          CIRCUIT_BANK.length
        )

      ]

    );

  }


  if (
    gameKey === "special"
  ) {

    return clone(

      SPECIAL_BANK[

        seededIndex(
          token,
          SPECIAL_BANK.length
        )

      ]

    );

  }

}



function getPracticePuzzle(
  gameKey
) {

  state.practiceCounter +=
    1;


  const token =
    `${Date.now()}:${gameKey}:${state.practiceCounter}`;


  let bank;


  if (
    gameKey === "signal"
  ) {

    bank =
      SIGNAL_BANK;

  }

  else if (
    gameKey === "shift"
  ) {

    bank =
      SHIFT_BANK;

  }

  else if (
    gameKey === "balance"
  ) {

    bank =
      BALANCE_BANK;

  }

  else if (
    gameKey === "route"
  ) {

    bank =
      ROUTE_BANK;

  }

  else if (
    gameKey === "cipher"
  ) {

    bank =
      CIPHER_BANK;

  }

  else if (
    gameKey === "circuit"
  ) {

    bank =
      CIRCUIT_BANK;

  }

  else {

    bank =
      SPECIAL_BANK;

  }


  return clone(

    bank[

      seededIndex(
        token,
        bank.length
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

  dateKey = state.dateKey

) {

  stopTimer();


  state.gameKey =
    gameKey;


  state.mode =
    mode;


  state.dateKey =
    dateKey;


  if (
    mode === "practice"
  ) {

    state.puzzle =
      getPracticePuzzle(
        gameKey
      );

  }

  else {

    state.puzzle =
      getDailyPuzzle(
        gameKey,
        dateKey
      );

  }


  state.selected =
    [];


  state.attempts =
    0;


  state.hints =
    0;


  state.elapsed =
    0;


  state.shiftRows =
    null;


  state.balanceSelected =
    null;


  state.circuitRotations =
    null;


  $("#timer").textContent =
    "00:00";


  if (
    gameKey === "special"
  ) {

    $("#gameTitle").textContent =
      state.puzzle.title;

  }

  else {

    $("#gameTitle").textContent =
      GAME_META[gameKey].title;

  }


  $("#gameModeLabel").textContent =

    mode === "practice"

    ?

    "UNLIMITED ROUND"

    :

    prettyDate(
      dateKey
    ).toUpperCase();


  $("#difficultyChip").textContent =

    gameKey === "special"

    ?

    "SPECIAL"

    :

    GAME_META[gameKey].difficulty;


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
    state.gameKey === "signal"
    ||
    state.gameKey === "special"
  ) {

    renderSignal(
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
    state.gameKey === "circuit"
  ) {

    renderCircuit(
      area
    );

  }

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
    "Select exactly four tiles that share one precise hidden property.";


  const grid =
    document.createElement(
      "div"
    );


  grid.className =
    "choice-grid";


  const items =
    shuffleSeeded(

      puzzle.items,

      `${state.dateKey}:${state.gameKey}:${state.mode}`

    );


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


      button.addEventListener(

        "click",

        () => {

          const index =
            state.selected.indexOf(
              item
            );


          if (
            index >= 0
          ) {

            state.selected.splice(
              index,
              1
            );


            button.classList.remove(
              "selected"
            );

          }


          else if (
            state.selected.length < 4
          ) {

            state.selected.push(
              item
            );


            button.classList.add(
              "selected"
            );

          }

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



/* ==========================================================
   ROUTE
   ========================================================== */

function renderRoute(
  area
) {

  const puzzle =
    state.puzzle;


  $("#puzzlePrompt").textContent =
    "Connect A to B through every ★.";


  $("#puzzleDescription").textContent =
    "Tap adjacent cells to grow one continuous path. Blocked cells cannot be used.";


  state.selected =
    [puzzle.start];


  const board =
    document.createElement(
      "div"
    );


  board.className =
    "route-board";


  for (

    let i = 0;

    i <
    puzzle.size
    *
    puzzle.size;

    i++

  ) {

    const button =
      document.createElement(
        "button"
      );


    button.type =
      "button";


    button.className =
      "route-cell";


    button.dataset.index =
      String(i);


    if (
      puzzle.blocked.includes(i)
    ) {

      button.classList.add(
        "blocked"
      );


      button.textContent =
        "■";


      button.disabled =
        true;

    }


    else if (
      i === puzzle.start
    ) {

      button.classList.add(
        "start",
        "path"
      );


      button.textContent =
        "A";

    }


    else if (
      i === puzzle.end
    ) {

      button.classList.add(
        "end"
      );


      button.textContent =
        "B";

    }


    else if (
      puzzle.checkpoints.includes(i)
    ) {

      button.classList.add(
        "checkpoint"
      );


      button.textContent =
        "★";

    }


    else {

      button.textContent =
        "·";

    }


    if (
      !puzzle.blocked.includes(i)
    ) {

      button.addEventListener(

        "click",

        () => {

          const index =
            Number(
              button.dataset.index
            );


          const current =
            state.selected[
              state.selected.length - 1
            ];


          if (
            index === current
          ) {

            return;

          }


          if (

            state.selected.length > 1

            &&

            index ===
            state.selected[
              state.selected.length - 2
            ]

          ) {

            state.selected.pop();


            redrawRoute(
              board,
              puzzle
            );


            return;

          }


          if (
            state.selected.includes(index)
          ) {

            setFeedback(
              "Your path cannot cross itself.",
              true
            );


            return;

          }


          if (

            !isAdjacent(
              current,
              index,
              puzzle.size
            )

          ) {

            setFeedback(
              "Move one cell at a time: up, down, left or right.",
              true
            );


            return;

          }


          state.selected.push(
            index
          );


          clearFeedback();


          redrawRoute(
            board,
            puzzle
          );

        }

      );

    }


    board.appendChild(
      button
    );

  }


  area.appendChild(
    board
  );


  const note =
    document.createElement(
      "div"
    );


  note.className =
    "logic-note";


  note.style.marginTop =
    "14px";


  note.textContent =
    "Tip: tapping the previous cell removes your last step.";


  area.appendChild(
    note
  );

}



function redrawRoute(
  board,
  puzzle
) {

  [...board.children]
    .forEach(

      (cell,index) => {

        cell.classList.toggle(

          "path",

          state.selected.includes(
            index
          )

        );


        if (
          index === puzzle.start
        ) {

          cell.classList.add(
            "start"
          );

        }


        if (
          index === puzzle.end
        ) {

          cell.classList.add(
            "end"
          );

        }

      }

    );

}



function isAdjacent(
  first,
  second,
  size
) {

  const firstRow =
    Math.floor(
      first / size
    );


  const firstColumn =
    first % size;


  const secondRow =
    Math.floor(
      second / size
    );


  const secondColumn =
    second % size;


  return (

    Math.abs(
      firstRow - secondRow
    )

    +

    Math.abs(
      firstColumn - secondColumn
    )

    ===
    1

  );

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
    "Decode the four-symbol code.";


  $("#puzzleDescription").textContent =
    "Every clue uses all four symbols. Placed means correct symbol in the correct position.";


  state.selected =
    [];


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


      row.innerHTML = `

        <strong>
          ${clue.guess.join(" ")}
        </strong>

        <br>

        <span class="muted">

          ${clue.correct}
          correct symbols

          ·

          ${clue.placed}
          correctly placed

        </span>

      `;


      clues.appendChild(
        row
      );

    }

  );


  const display =
    document.createElement(
      "button"
    );


  display.type =
    "button";


  display.id =
    "codeDisplay";


  display.className =
    "code-display";


  display.textContent =
    "_ _ _ _";


  display.addEventListener(

    "click",

    () => {

      state.selected =
        [];


      updateCodeDisplay();

    }

  );


  const keypad =
    document.createElement(
      "div"
    );


  keypad.className =
    "keypad";


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


      button.addEventListener(

        "click",

        () => {

          if (

            state.selected.length < 4

            &&

            !state.selected.includes(
              symbol
            )

          ) {

            state.selected.push(
              symbol
            );


            updateCodeDisplay();

          }

        }

      );


      keypad.appendChild(
        button
      );

    }

  );


  area.append(
    clues,
    display,
    keypad
  );

}



function updateCodeDisplay() {

  const display =
    $("#codeDisplay");


  if (
    !display
  ) {

    return;

  }


  const blanks =
    Array(

      Math.max(
        0,
        4 - state.selected.length
      )

    )
    .fill("_");


  display.textContent =
    [
      ...state.selected,
      ...blanks
    ]
    .join(" ");

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
    "Rebuild the target pattern.";


  $("#puzzleDescription").textContent =
    "Shift entire rows left or right. Symbols wrap around the row.";


  if (
    !state.shiftRows
  ) {

    state.shiftRows =
      clone(
        puzzle.start
      );

  }


  const board =
    document.createElement(
      "div"
    );


  board.className =
    "shift-board";


  state.shiftRows.forEach(

    (rowData,rowIndex) => {

      const row =
        document.createElement(
          "div"
        );


      row.className =
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

          state.shiftRows[
            rowIndex
          ].push(

            state.shiftRows[
              rowIndex
            ].shift()

          );


          renderCurrentGame();

        }

      );


      const cells =
        document.createElement(
          "div"
        );


      cells.className =
        "shift-cells";


      rowData.forEach(

        value => {

          const cell =
            document.createElement(
              "div"
            );


          cell.className =
            "shift-cell";


          cell.textContent =
            value;


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

          state.shiftRows[
            rowIndex
          ].unshift(

            state.shiftRows[
              rowIndex
            ].pop()

          );


          renderCurrentGame();

        }

      );


      row.append(
        left,
        cells,
        right
      );


      board.appendChild(
        row
      );

    }

  );


  const target =
    document.createElement(
      "div"
    );


  target.className =
    "logic-note";


  target.style.marginTop =
    "14px";


  target.innerHTML = `

    <strong>
      Target row:
    </strong>

    ${puzzle.target[0].join("  ")}

  `;


  area.append(
    board,
    target
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
    `Make both trays equal ${puzzle.target}.`;


  $("#puzzleDescription").textContent =
    "Select four different weights. The first two go LEFT and the next two go RIGHT.";


  if (
    !state.balanceSelected
  ) {

    state.balanceSelected =
      [];

  }


  const trays =
    document.createElement(
      "div"
    );


  trays.className =
    "balance-trays";


  trays.innerHTML = `

    <div class="tray">

      <strong>
        LEFT = ${puzzle.target}
      </strong>

      <div
        id="leftTrayValues"
        class="tray-values"
      >
        —
      </div>

    </div>


    <div class="tray">

      <strong>
        RIGHT = ${puzzle.target}
      </strong>

      <div
        id="rightTrayValues"
        class="tray-values"
      >
        —
      </div>

    </div>

  `;


  const grid =
    document.createElement(
      "div"
    );


  grid.className =
    "weight-grid";


  puzzle.weights.forEach(

    weight => {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "weight-button";


      button.textContent =
        String(weight);


      if (

        state.balanceSelected.includes(
          weight
        )

      ) {

        button.classList.add(
          "selected"
        );

      }


      button.addEventListener(

        "click",

        () => {

          const index =
            state.balanceSelected.indexOf(
              weight
            );


          if (
            index >= 0
          ) {

            state.balanceSelected.splice(
              index,
              1
            );

          }

          else if (
            state.balanceSelected.length < 4
          ) {

            state.balanceSelected.push(
              weight
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


  area.append(
    trays,
    grid
  );


  updateBalanceTrays();

}



function updateBalanceTrays() {

  const left =
    $("#leftTrayValues");


  const right =
    $("#rightTrayValues");


  if (
    !left
    ||
    !right
  ) {

    return;

  }


  const firstPair =
    state.balanceSelected.slice(
      0,
      2
    );


  const secondPair =
    state.balanceSelected.slice(
      2,
      4
    );


  left.textContent =

    firstPair.length

    ?

    firstPair.join(" + ")

    :

    "—";


  right.textContent =

    secondPair.length

    ?

    secondPair.join(" + ")

    :

    "—";

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
    "Make every region true.";


  $("#puzzleDescription").textContent =
    "Tap each number-pair to rotate it. All listed conditions must be satisfied simultaneously.";


  if (
    !state.circuitRotations
  ) {

    state.circuitRotations =
      puzzle.pairs.map(
        () => 0
      );

  }


  const regions =
    document.createElement(
      "div"
    );


  regions.className =
    "circuit-board";


  puzzle.regions.forEach(

    region => {

      const box =
        document.createElement(
          "div"
        );


      box.className =
        `circuit-region ${region.className}`;


      box.innerHTML = `

        <div>

          <strong>
            ${region.label}
          </strong>

          <span>
            ${region.rule}
          </span>

        </div>

      `;


      regions.appendChild(
        box
      );

    }

  );


  const dominoes =
    document.createElement(
      "div"
    );


  dominoes.className =
    "domino-list";


  puzzle.pairs.forEach(

    (pair,index) => {

      const rotation =
        state.circuitRotations[index];


      const values =

        rotation === 0

        ?

        pair

        :

        [
          pair[1],
          pair[0]
        ];


      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "domino-button";


      button.innerHTML = `

        <span>
          ${values[0]}
        </span>

        <span>
          ${values[1]}
        </span>

      `;


      button.addEventListener(

        "click",

        () => {

          state.circuitRotations[
            index
          ]

          =

          state.circuitRotations[
            index
          ]

          ?

          0

          :

          1;


          renderCurrentGame();

        }

      );


      dominoes.appendChild(
        button
      );

    }

  );


  const note =
    document.createElement(
      "div"
    );


  note.className =
    "logic-note";


  note.style.marginTop =
    "14px";


  note.textContent =
    "Tap the dominoes to rotate them. One orientation combination satisfies the complete system.";


  area.append(
    regions,
    dominoes,
    note
  );

}



/* ==========================================================
   RULES MODAL
   ========================================================== */

function openRulesModal(
  initial = false
) {

  stopTimer();


  let ruleKey;


  if (
    state.gameKey === "special"
  ) {

    ruleKey =
      "special";

  }

  else {

    ruleKey =
      state.gameKey;

  }


  if (
    state.gameKey === "special"
  ) {

    $("#rulesHeading").textContent =
      state.puzzle.title;

  }

  else {

    $("#rulesHeading").textContent =
      GAME_META[
        state.gameKey
      ].title;

  }


  $("#rulesBody").innerHTML =
    RULES[ruleKey];


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
   CHECK ANSWER
   ========================================================== */

function checkPuzzle() {

  state.attempts +=
    1;


  $("#attemptsChip").textContent =

    `${state.attempts} check`

    +

    (
      state.attempts === 1
      ?
      ""
      :
      "s"
    );


  let solved =
    false;



  /* SIGNAL */

  if (

    state.gameKey === "signal"

    ||

    state.gameKey === "special"

  ) {

    const answer =
      state.puzzle.answer;


    if (
      state.selected.length !== answer.length
    ) {

      setFeedback(
        `Select exactly ${answer.length} tiles first.`,
        true
      );


      return;

    }


    solved =

      state.selected.every(

        value =>
          answer.includes(
            value
          )

      );

  }



  /* ROUTE */

  if (
    state.gameKey === "route"
  ) {

    const puzzle =
      state.puzzle;


    const endsAtB =

      state.selected[
        state.selected.length - 1
      ]

      ===
      puzzle.end;


    const hasAllCheckpoints =

      puzzle.checkpoints.every(

        checkpoint =>
          state.selected.includes(
            checkpoint
          )

      );


    if (
      !endsAtB
    ) {

      setFeedback(
        "Your route has not reached B yet.",
        true
      );


      return;

    }


    if (
      !hasAllCheckpoints
    ) {

      setFeedback(
        "You reached B but missed at least one ★ checkpoint.",
        true
      );


      return;

    }


    solved =
      true;

  }



  /* CIPHER */

  if (
    state.gameKey === "cipher"
  ) {

    if (
      state.selected.length !== 4
    ) {

      setFeedback(
        "Enter all four symbols first.",
        true
      );


      return;

    }


    solved =

      state.selected.join("|")

      ===

      state.puzzle.answer.join("|");

  }



  /* SHIFT */

  if (
    state.gameKey === "shift"
  ) {

    solved =

      state.shiftRows.every(

        (row,index) =>

          row.join("|")

          ===

          state.puzzle
            .target[index]
            .join("|")

      );

  }



  /* BALANCE */

  if (
    state.gameKey === "balance"
  ) {

    const chosen =
      state.balanceSelected
      ||
      [];


    if (
      chosen.length !== 4
    ) {

      setFeedback(
        "Choose exactly four weights first.",
        true
      );


      return;

    }


    const left =
      chosen[0]
      +
      chosen[1];


    const right =
      chosen[2]
      +
      chosen[3];


    solved =

      left ===
      state.puzzle.target

      &&

      right ===
      state.puzzle.target;

  }



  /* CIRCUIT */

  if (
    state.gameKey === "circuit"
  ) {

    solved =

      state.circuitRotations.every(

        (rotation,index) =>

          rotation

          ===

          state.puzzle.target[index]

      );

  }



  if (
    solved
  ) {

    completePuzzle();

  }

  else {

    setFeedback(
      "Not solved yet — at least one condition still fails.",
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


  if (

    state.gameKey === "signal"

    ||

    state.gameKey === "special"

  ) {

    const hints =
      state.puzzle.hints
      ||
      [];


    const hint =

      hints[

        Math.min(

          state.hints - 1,

          hints.length - 1

        )

      ]

      ||

      "Look for the most restrictive relationship first.";


    setFeedback(
      `Hint: ${hint}`
    );


    return;

  }


  const hintMap = {

    route:
      "Hint: work backwards from B as well as forwards from A. Avoid creating a pocket you cannot escape.",


    cipher:
      "Hint: compare the clue rows position by position. A clue with zero correctly placed symbols is especially useful.",


    shift:
      "Hint: compare each row directly to the target. Every row is only a cyclic shift away.",


    balance:
      "Hint: write down all number pairs that make the target, then choose two pairs that do not reuse a number.",


    circuit:
      "Hint: begin with the condition that leaves the fewest possible orientations."

  };


  setFeedback(

    hintMap[
      state.gameKey
    ]

    ||

    "Try the most restrictive clue first."

  );

}



/* ==========================================================
   COMPLETE PUZZLE
   ========================================================== */

function completePuzzle() {

  stopTimer();


  stats.solved +=
    1;


  stats.played +=
    1;


  if (

    state.attempts === 1

    &&

    state.hints === 0

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
    state.mode === "daily"
  ) {

    if (
      !stats.completedDaily[
        state.dateKey
      ]
    ) {

      stats.completedDaily[
        state.dateKey
      ]
      =
      {};

    }


    stats.completedDaily[
      state.dateKey
    ][
      state.gameKey
    ]
    =
    true;


    updateStreak(
      state.dateKey
    );

  }


  saveStats();


  if (

    state.attempts === 1

    &&

    state.hints === 0

  ) {

    $("#winHeadline").textContent =
      "Perfect solve.";

  }

  else {

    $("#winHeadline").textContent =
      "Nicely done, Deans.";

  }


  $("#winMeta").textContent =

    `${formatTime(state.elapsed)}`

    +

    ` · ${state.attempts} check`

    +

    (
      state.attempts === 1
      ?
      ""
      :
      "s"
    )

    +

    ` · ${state.hints} hint`

    +

    (
      state.hints === 1
      ?
      ""
      :
      "s"
    );


  $("#winExplanation").textContent =
    state.puzzle.explanation;


  showScreen(
    "win"
  );


  launchConfetti();

}



/* ==========================================================
   STREAK
   ========================================================== */

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
    stats.lastSolvedDate === dateKey
  ) {

    return;

  }


  const previous =
    new Date(
      `${stats.lastSolvedDate}T12:00:00`
    );


  const current =
    new Date(
      `${dateKey}T12:00:00`
    );


  const difference =
    Math.round(

      (
        current
        -
        previous
      )

      /
      86400000

    );


  if (
    difference === 1
  ) {

    stats.streak +=
      1;

  }

  else {

    stats.streak =
      1;

  }


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
      `${-20 - Math.random() * 50}px`;


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
   STATS PAGE
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


  for (
    let offset = 0;
    offset < 14;
    offset++
  ) {

    const date =
      new Date();


    date.setDate(

      date.getDate()
      -
      offset

    );


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

        ${prettyDate(key)}

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
    )
    .forEach(

      gameKey => {

        const completed =
          Boolean(

            stats.completedDaily
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
            ${GAME_META[gameKey].title}
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
   CONFIRM DIALOG
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


/* Logo */

$("#logoButton")
.addEventListener(

  "click",

  () => {

    stopTimer();


    state.dateKey =
      todayKey();


    renderHome();


    showScreen(
      "home"
    );

  }

);



/* Profile */

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



/* Bottom navigation */

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
          target === "homeScreen"
        ) {

          state.dateKey =
            todayKey();


          renderHome();


          showScreen(
            "home"
          );

        }


        if (
          target === "archiveScreen"
        ) {

          showScreen(
            "archive"
          );

        }


        if (
          target === "statsScreen"
        ) {

          showScreen(
            "stats"
          );

        }

      }

    );

  }

);



/* Jack special */

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



/* Rules */

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



/* Check */

$("#checkButton")
.addEventListener(

  "click",

  checkPuzzle

);



/* Hint */

$("#hintButton")
.addEventListener(

  "click",

  useHint

);



/* Pause */

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



/* Resume */

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



/* Reset */

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



/* Restart from pause */

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



/* Leave game */

$("#leaveGame")
.addEventListener(

  "click",

  () => {

    stopTimer();


    openConfirm(

      "Leave this round?",

      "You can leave whenever you want. Starting another puzzle will replace this unfinished round.",

      () => {

        state.dateKey =
          todayKey();


        renderHome();


        showScreen(
          "home"
        );

      }

    );

  }

);



/* Leave pause */

$("#leaveFromPause")
.addEventListener(

  "click",

  () => {

    stopTimer();


    state.dateKey =
      todayKey();


    renderHome();


    showScreen(
      "home"
    );

  }

);



/* Confirmation cancel */

$("#confirmCancel")
.addEventListener(

  "click",

  () => {

    closeConfirm();


    if (
      screens.game.classList.contains(
        "active"
      )
    ) {

      startTimer();

    }

  }

);



/* Confirmation OK */

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



/* Unlimited new round */

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



/* Replay */

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



/* Win → home */

$("#winHomeButton")
.addEventListener(

  "click",

  () => {

    state.dateKey =
      todayKey();


    renderHome();


    showScreen(
      "home"
    );

  }

);



/* Reset stats */

$("#resetStatsButton")
.addEventListener(

  "click",

  () => {

    openConfirm(

      "Reset all stats?",

      "This removes saved times, streaks and completion marks from this browser.",

      () => {

        stats = {

          solved:
            0,

          played:
            0,

          perfect:
            0,

          bestSeconds:
            null,

          completedDaily:
            {},

          lastSolvedDate:
            null,

          streak:
            0

        };


        saveStats();


        renderStats();


        renderHome();

      }

    );

  }

);



/* ==========================================================
   INITIALIZE APP
   ========================================================== */

state.dateKey =
  todayKey();


renderHome();


renderStats();


})(); 