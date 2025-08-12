const eventsData = [
  {
    id: 1,
    title: "Vecna’s Vision",
    slug: "vecnas-vision",
    description: "AI Prompting event",
    image: "",
    rules: `
Individual Participation:
  - Must carry college ID
  - Inform organizers in advance about AI tools
  - Strictly no prompt generator tools
  - Unethical behavior leads to disqualification

Event Flow:
  - 2 rounds with short break

Round 1: Image Generation (Medium)
  - Duration: 20 minutes
  - 2 questions (10 marks each)
  - Max 3 prompts per question
  - Generate images based on provided image
  - Submit images + prompt screenshots

Round 2: Video Generation (Difficult)
  - Duration: 20 minutes
  - 1 question (30 marks)
  - Max 5 prompts
  - Create video (max 3 minutes)
  - Submit through provided form

Judging:
  - Based on output accuracy
  - Tie-breaker: Fewer prompts + faster submission
  - Judges' decisions are final
`,
    date: "",
    time: "",
    location: "",
    organizers: "Lochana P – 9342074152, Maga devi - 8608309503",
    registrationLink: ""
  },
  {
    id: 2,
    title: "Mind Flayer Grid",
    slug: "mind-flayer-grid",
    description: "Technical Connections event",
    image: "",
    rules: `
Team Structure:
  - Max 3 members
  - Cross-institution teams allowed

Rounds:
  Round 1: Sequence Connection
    - Link clues with images
    - Sections: 
        Easy (30s), Medium (45s), Hard (60s)
    - 1 point per question
    - Top teams advance

  Round 2: Image Sequence Challenge
    - Guess answer from image sequence
    - Scoring: 
        1st image: 5pts
        2nd: 4pts
        3rd: 3pts
        4th: 2pts
        5th: 1pt
    - 30s answer time
    - First correct answer counts

Rules:
  - No gadgets
  - Submit answers within time
  - Judges' decisions final

Winning:
  - Top 3 teams by combined points
`,
    date: "",
    time: "",
    location: "",
    organizers: "Akshayaa G – 4th Year",
    registrationLink: ""
  },
  {
    id: 3,
    title: "THE HELLFIRE HUNT",
    slug: "the-hellfire-hunt",
    description: "Treasure Hunt event",
    image: "",
    rules: `
Team Composition:
  - Max 2 members

Rounds:
  Round 1: 
    - Solve 4 clue cards
    - Unlock system password

  Round 2:
    - Log into system
    - Solve technical riddles for blueprint

  Round 3:
    - Search allocated venue
    - Solve final puzzle

Rules:
  - No gadgets
  - Record and report clues
  - Misconduct = disqualification

Winning:
  - Top 3 fastest teams
`,
    date: "",
    time: "",
    location: "A21",
    organizers: "",
    registrationLink: ""
  },
  {
    id: 4,
    title: "Hawkin’s High Papers",
    slug: "hawkins-high-papers",
    description: "Paper Presentation event",
    image: "",
    rules: `
Team:
  - Max 3 members
  - Cross-institution teams allowed

Abstract & Paper:
  - Abstract ≤ 250 words
  - IEEE format required
  - 6 page limit (.pdf/.docx/.doc)
  - Unpublished work only
  - No duplicate submissions

Presentation:
  - 7 min presentation + 3 min Q&A
  - English only
  - No plagiarism
  - No foul language

Submission:
  - Email abstract to flairit@licet.ac.in 
    (Subject: "Abstract - TITLE")
  - Shortlisted teams submit PPT + Paper
  - Include: 
      Authors' names, colleges, departments, 
      phone numbers, emails
  - Bring hard copies

Winning:
  - Top 3 papers selected
`,
    date: "",
    time: "",
    location: "",
    organizers: "",
    registrationLink: ""
  },
  {
    id: 5,
    title: "Arcade of Answers",
    slug: "arcade-of-answers",
    description: "Technical Quiz event",
    image: "",
    rules: `
Team:
  - 2-3 members

Rounds:
  Round 1: Quiz in a Click
    - MCQ on technical concepts
    - Top teams advance

  Round 2: Lightning Quiz
    - Timed questions
    - +5 points per correct answer
    - Top 6 teams advance

  Round 3: Bidding Blitz
    - Bid points before answering
    - Correct = +bid points
    - Incorrect = -bid points
    - Min/max bid limits

Rules:
  - No gadgets
  - Time-bound submissions
  - Rule violations = point deduction
  - Tie-breaker: Rapid-fire round
  - Judges' decisions final
`,
    date: "",
    time: "",
    location: "",
    organizers: "",
    registrationLink: ""
  },
  {
    id: 6,
    title: "The Wall of Whispers",
    slug: "the-wall-of-whispers",
    description: "Tech Charades event",
    image: "",
    rules: `
Team:
  - Max 2 members
  - Cross-institution teams allowed

Rounds:
  Round 1: Minute to Win
    - Act out words in 60s
    - 4 rounds per team
    - 5 points per correct

  Round 2: Pictionary
    - Draw words in 2min
    - 3 guesses per word
    - 3 rounds per team
    - 10 points per correct

  Round 3: Emoji Charades
    - Act out emoji phrases
    - 2min guessing period
    - 15 points per correct

Rules:
  - No spoken words/symbols
  - No gadgets
  - Rule violations = point deduction
  - Judges' decisions final
`,
    date: "",
    time: "",
    location: "",
    organizers: "",
    registrationLink: ""
  },
  {
    id: 7,
    title: "Demogorgan Debug",
    slug: "demogorgan-debug",
    description: "Code Debugging event",
    image: "",
    rules: `
Team:
  - 2 members

Rounds:
  Round 1 (45min):
    - 30 debugging questions
    - First correct answer scores
    - Top 50% advance
    - Tie-breaker: Technical quiz (10 Q)

  Round 2 (15min):
    - Rearrange/execute jumbled code
    - Top 5 teams advance
    - Tie-breaker: Logic quiz (10 Q)

  Round 3 (45min):
    - Fix errors + missing code
    - Extra points for execution
    - Judged on completion/runs

Rules:
  - 10min break between rounds
  - Unfair practices = disqualification
`,
    date: "",
    time: "",
    location: "",
    organizers: "Betina Selvis B, Samuel Johnson",
    registrationLink: ""
  }
];

export default eventsData;