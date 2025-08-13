const eventsData = [
  {
    id: 1,
    title: "Hawkin's High Papers",
    slug: "hawkins-high-papers",
    description: "Paper Presentation event focusing on academic writing and research works.",
    image: "/events/hole.png",
    pdfUrl: "/pdfs/sample.pdf",
    rules: `
Rules:
  1. Maximum number of participants in a team is 3.
  2. Only Engineering students are allowed.
  3. Bring your College ID and Bonafide Certificate.
  4. Submitted papers must be in IEEE format.
  5. Papers must not be published before anywhere or be under consideration for publication in any journal or conference.
  6. Each team presents their paper for 7 minutes followed by a Q&A session for 3 minutes.
  7. Plagiarism is not allowed (above 40%). Original works only.
  8. Abstract should not exceed more than 250 words.
  9. Paper should have a minimum of 6 pages and should not exceed 15 pages.
  10. Soft-copies of the submitted paper must be in standard document formats (docx, doc, pdf).
  11. Paper must be preceded by a cover page specifying the title of the paper, names of authors and their college names as also their contact numbers and email ids
  12. Persons from different institutions can be a part of the same team. However, one person may not be a part of multiple teams for the same event.
  13. The paper is to be attached to the mail flairit@licet.ac.in with the subject as the title of the paper.
  14. The mail must contain - name of authors, college names and departments, phone numbers, and email addresses. 
    `,
    date: "16th September 2023",
    time: "10:00 am to 11:30 am",
    location: "Case Tools Lab (H23) and CIS Lab (J14)",
    organizers: "Ashik S and Rithika R (Contact No: 9445387601)",
    registerationlink: "https://docs.google.com/forms/d/e/1FAIpQLSfrG7uSLaSLP3EHutd59-OCYY4SsMLoj0X-O1Eiwgp0ppo6Ew/viewform?usp=sf_link"
  },
  { 
    id: 2,
    title: "Arcade of Answers",
    slug: "arcade-of-answers",
    description: "Technical quiz challenging your knowledge across various domains.",
    image: "/events/ray.png",
    rules: `
Rules:
  1. Teams of 2-3 members
  2. Multiple choice questions across various tech domains
  3. No external resources allowed
  4. Three rounds: Elimination, Rapid Fire, and Final Showdown
  5. Decisions of quiz masters are final
    `,
    date: "16th September 2023",
    time: "1:30 pm to 3:00 pm",
    location: "RDBMS Laboratory (A21)",
    organizers: "Regis R and Arul Danica (Contact: 9150206627)",
    registerationlink: "https://docs.google.com/forms/d/e/1FAIpQLSd_DfIN1W9c-YCo04bByXb6rmDJahOAm4K1p7z15ypjFygAEg/viewform?usp=sf_link"
  },
  {
    id: 3,
    title: "The Hellfire Hunt",
    slug: "the-hellfire-hunt",
    description: "Treasure hunt with technical puzzles and challenges.",
    image: "/events/copter.png",
    rules: `
Rules:
  1. Teams of 2-4 members
  2. Solve technical puzzles to find clues
  3. Time-bound challenges
  4. No internet access allowed
  5. Winners determined by fastest completion time
    `,
    date: "16th September 2023",
    time: "11:00 am to 12:30 pm",
    location: "RDBMS Laboratory (A21)",
    organizers: "Keerthanaa B and Nadheedha S (Contact: 7871123619)",
    registerationlink: "https://docs.google.com/forms/d/e/1FAIpQLScCc2ou-uXwPyWMGsAjmHh6nBqPSwPwapl8Wrxd-IXuWVrAjQ/viewform?usp=sf_link"
  },
  {
    id: 4,
    title: "Demogorgon's Debug",
    slug: "demogorgons-debug",
    description: "Code debugging competition to find and fix errors.",
    image: "/events/experiment.png",
    rules: `
Rules:
  1. Individual participation
  2. Two rounds: preliminary and final
  3. Fix bugs in provided code snippets
  4. Points based on number of bugs fixed and efficiency
  5. Strict time limits for each round
    `,
    date: "16th September 2023",
    time: "10:00 am to 11:30 am",
    location: "Data Structures Laboratory (A22)",
    organizers: "Afrid Ariff H and Avanthika Y (Contact: 9360959577)",
    registerationlink: "https://docs.google.com/forms/d/e/1FAIpQLSeBly1RdeFS9MjobcJWaQXGh8hygeTnRopbKOpSQfXMwg012Q/viewform?usp=sf_link"
  },
  {
    id: 5,
    title: "The Wall of Whispers",
    slug: "the-wall-of-whispers",
    description: "Tech Charades game acting out technical terms.",
    image: "/events/lab.png",
    rules: `
Rules:
  1. Teams of 2 members
  2. Act out technical terms without speaking
  3. Three rounds with increasing difficulty
  4. No gestures or symbols for letters
  5. Time limits for each round
    `,
    date: "16th September 2023",
    time: "11:30 am to 1:00 pm",
    location: "Drawing Room (G32)",
    organizers: "Kaviena Sharon and Judith (Contact: 7871123619)",
    registerationlink: "https://docs.google.com/forms/d/e/1FAIpQLSczkvSwIE_21_FSsdxbe-19ajKIvb9GqaWuhTKwM8PUSyzy7g/viewform?usp=sf_link"
  },
  {
    id: 6,
    title: "Vecna's Vision",
    slug: "vecnas-vision",
    description: "AI prompting challenge to generate effective prompts.",
    image: "/events/red%20house.png",
    rules: `
Rules:
  1. Individual participation
  2. Create effective prompts for AI models
  3. Three rounds: text, image, and code generation
  4. Judged on creativity, effectiveness, and results
  5. Strict time limits for each challenge
    `,
    date: "16th September 2023",
    time: "1:30 pm to 3:00 pm",
    location: "CIS Laboratory (J14)",
    organizers: "Sowmya B and Ludo Kirsten Roy V (Contact: 8925050777)",
    registerationlink: "https://docs.google.com/forms/d/e/1FAIpQLSdirCgnjoq4UlO_bnkhFfcTJLjtVLdR5vmbjtpmen4cLq5N4g/viewform?usp=sf_link"
  },
  {
    id: 7,
    title: "MindFlayer Grid",
    slug: "mindflayer-grid",
    description: "Technical connection game matching clues with images.",
    image: "/events/mall.png",
    rules: `
Rules:
  1. Teams of 3 members
  2. Match technical clues with images
  3. Two rounds: easy clues and complex patterns
  4. Points based on accuracy and speed
  5. No electronic devices allowed
    `,
    date: "16th September 2023",
    time: "1:30 pm to 3:00 pm",
    location: "Classroom (I32)",
    organizers: "Nivedita Ramatoti and Chrispin Sheena (Contact: 7418921212)",
    registerationlink: "https://docs.google.com/forms/d/e/1FAIpQLSc0WFuedTBhq-WCORqNML5eraM5zMO662WWVirtcMnvh-Ttbg/viewform?usp=sf_link"
  },
  {
    id: 8,
    title: "The Upside Down",
    slug: "the-upside-down",
    description: "Cyber ciphers challenge to solve encrypted puzzles.",
    image: "/events/house.png",
    rules: `
Rules:
  1. Individual participation
  2. Three rounds of increasing difficulty
  3. Solve encrypted puzzles and ciphers
  4. No internet access allowed
  5. Winners decided by fastest correct solutions
    `,
    date: "16th September 2023",
    time: "11:30 am to 1:00 pm",
    location: "Classroom (I31)",
    organizers: "Ananth and Ajay Roshan (Contact: 7200126971)",
    registerationlink: "https://docs.google.com/forms/d/e/1FAIpQLSc0JVbRMkg0Xg9EZAUXxIvhC4mhHeBt24pgbJl6kovYjSjmgg/viewform?usp=sf_link"
  }
];

export default eventsData;