const subjects = {

  Mathematics: [
    "algebra",
    "calculus",
    "derivative",
    "integral",
    "matrix",
    "probability",
    "statistics",
    "trigonometry",
    "geometry",
    "equation"
  ],

  Physics: [
    "force",
    "motion",
    "velocity",
    "acceleration",
    "newton",
    "energy",
    "momentum",
    "electric",
    "magnetic",
    "optics",
    "wave"
  ],

  Chemistry: [
    "atom",
    "molecule",
    "reaction",
    "organic",
    "inorganic",
    "periodic",
    "bond",
    "acid",
    "base",
    "stoichiometry"
  ],

  Biology: [
    "cell",
    "dna",
    "rna",
    "genetics",
    "photosynthesis",
    "respiration",
    "anatomy",
    "ecosystem",
    "evolution"
  ],

  ComputerScience: [
    "algorithm",
    "data structure",
    "array",
    "linked list",
    "tree",
    "graph",
    "database",
    "sql",
    "operating system",
    "network",
    "programming",
    "code",
    "javascript",
    "python",
    "java"
  ],

  English: [
    "grammar",
    "essay",
    "literature",
    "tenses",
    "vocabulary",
    "pronoun",
    "sentence"
  ]

};


function normalize(text) {

  return text
    .toLowerCase()
    .trim();

}


export function tagQuestion(question) {

  const q = normalize(question);

  let subject = "General";

  let hits = 0;


  for (const [name, words] of Object.entries(subjects)) {

    const score = words.reduce(
      (count, word) =>
        count + (q.includes(word) ? 1 : 0),
      0
    );


    if (score > hits) {

      hits = score;
      subject = name;

    }

  }


  let difficulty = "medium";


  if (
    /prove|derive|analyze|compare|implement|optimize|why does|explain why/
      .test(q)
  ) {

    difficulty = "hard";

  }

  else if (
    /what is|define|meaning|formula|syntax/
      .test(q)
  ) {

    difficulty = "easy";

  }


  const tags = [
    subject.toLowerCase(),
    difficulty
  ];


  if (
    q.includes("exam") ||
    q.includes("assignment")
  ) {

    tags.push("academic");

  }


  if (
    q.includes("error") ||
    q.includes("bug")
  ) {

    tags.push("debugging");

  }


  const isValidAcademicQuestion =
    question.trim().length >= 5;


  return {

    isValidAcademicQuestion,

    category: subject,

    subTopic: "General",

    confidence: Math.min(
      0.95,
      0.55 + hits * 0.1
    ),

    explanation:
      "Initial automated categorization based on question content.",

    subject,

    topic: "General",

    difficulty,

    tags

  };

}