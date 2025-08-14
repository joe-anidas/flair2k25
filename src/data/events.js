const eventsData = [
  // 10:15 AM Events
  {
    id: 1,
    title: "Demogorgon's Debug",
    slug: "demogorgons-debug",
    description: "Code debugging competition with multiple intense rounds",
    image: "/events/red%20house.png",
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
    date: "16th September 2025",
    time: "10:15 - 12:30 PM",
    location: "A22",
    organizers: "Betina, Samuvel Johnson",
    registrationLink: "",
    brochureLink: "/pdf/1.pdf"
  },
  {
    id: 2,
    title: "Hawkin's High Paper",
    slug: "hawkins-high-paper",
    description: "Paper presentation event showcasing innovative research and academic writing skills",
    image: "/events/experiment.png",
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
    date: "16th September 2025",
    time: "10:15 - 11:30 AM",
    location: "H23 & J14",
    organizers: "Pauline Samyuktha, Gavrila",
    registrationLink: "",
    brochureLink: "/pdf/2.pdf"
  },
  {
    id: 3,
    title: "The Hellfire Hunt",
    slug: "the-helfire-hunt",
    description: "Treasure hunt with technical puzzles and real-world challenges",
    image: "/events/copter.png",
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
    date: "16th September 2025",
    time: "10:15 - 12:15 PM",
    location: "A21",
    organizers: "Vasanth, Kavitha Sri",
    registrationLink: "",
    brochureLink: "/pdf/3.pdf"
  },

  // 10:45 AM Event
  {
    id: 4,
    title: "MindFlayer Grid",
    slug: "mindflayer-grid",
    description: "Technical connection game matching clues with images in timed rounds",
    image: "/events/ray.png",
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
    date: "16th September 2025",
    time: "10:45 - 12:30 PM",
    location: "I33",
    organizers: "Akshayaa, Priyanka",
    registrationLink: "",
    brochureLink: "/pdf/4.pdf"
  },

  // 11:30 AM Event
  {
    id: 5,
    title: "The Upside Down",
    slug: "the-upside-down",
    description: "Cyber ciphers event testing cryptography and decoding skills",
    image: "",
    rules: `
(Details to be announced)
`,
    date: "16th September 2025",
    time: "11:30 - 12:30 PM",
    location: "I32",
    organizers: "Lithika",
    registrationLink: "",
    brochureLink: "/pdf/5.pdf"
  },

  // 1:30 PM Events
  {
    id: 6,
    title: "Vecna's Vision",
    slug: "vecnas-vision",
    description: "AI prompting challenge focusing on image and video generation tasks under strict guidelines",
    image: "/events/hole.png",
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
    date: "16th September 2025",
    time: "1:30 - 3:00 PM",
    location: "A21",
    organizers: "Lochana, Maga Devi",
    registrationLink: "",
    brochureLink: "/pdf/6.pdf"
  },
  {
    id: 7,
    title: "Arcade of answers",
    slug: "arcade-of-answers",
    description: "Technical quiz competition testing knowledge, speed, and strategy across multiple domains",
    image: "/events/lab.png",
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
    date: "16th September 2025",
    time: "1:30 - 3:00 PM",
    location: "A22",
    organizers: "Kavinsha, Fathima Teresa",
    registrationLink: "",
    brochureLink: "/pdf/7.pdf"
  },
  {
    id: 8,
    title: "The Wall of Whispers",
    slug: "the-wall-of-whispers",
    description: "Tech charades with acting, drawing, and emoji challenges",
    image: "/events/mall.png",
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
    date: "16th September 2025",
    time: "1:30 - 3:00 PM",
    location: "I33",
    organizers: "Gopika, Mythreyi",
    registrationLink: "",
    brochureLink: "/pdf/8.pdf"
  }
];

export default eventsData;