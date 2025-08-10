import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Event data - same as in Events.js
const eventsData = [
  {
    id: 1,
    title: "Hawkin's High Papers",
    slug: "hawkins-high-papers",
    description: "Paper Presentation event focusing on academic writing and research works.",
    image: "/events/hole.png",
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

const EventDetailPage = () => {
  const navigate = useNavigate();
  const { eventSlug } = useParams();
  const [eventDeets, setEventDeets] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Find event by slug
      const event = eventsData.find(e => e.slug === eventSlug);
      setEventDeets(event || null);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [eventSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
          <p>Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!eventDeets) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Event Not Found</h2>
          <p className="mb-6 text-gray-300">The event you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/events')}
            className="py-2 px-6 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-md hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-red-500/30 font-medium"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Background Video */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src="/space-theme.webm" type="video/webm" />
        </video>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-4 max-w-6xl mx-auto">
        <div className="backdrop-blur-md bg-black/30 border border-red-500/30 rounded-xl p-6 mb-8 shadow-xl shadow-red-900/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {eventDeets.title}
              </h1>
              <p className="text-red-300 font-medium">{eventDeets.description}</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`py-2 px-6 rounded-md font-medium transition-all duration-300 shadow-md ${
                showForm 
                  ? "bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300 hover:from-gray-600 hover:to-gray-800"
                  : "bg-gradient-to-r from-red-700 to-red-900 text-white hover:from-red-600 hover:to-red-800 hover:shadow-red-500/30"
              }`}
            >
              {showForm ? "Close Registration" : "Register Now"}
            </button>
          </div>
          
          {/* Event Details */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-black/20 p-4 rounded-lg mb-6">
              <pre className="whitespace-pre-wrap text-sm md:text-base overflow-x-auto">
                {eventDeets.rules}
              </pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-red-400 font-bold mb-2">When</h3>
                <p className="text-white">
                  {eventDeets.time} {eventDeets.date}
                </p>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-red-400 font-bold mb-2">Where</h3>
                <p className="text-white">{eventDeets.location}</p>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg md:col-span-2">
                <h3 className="text-red-400 font-bold mb-2">Organizers</h3>
                <p className="text-white">{eventDeets.organizers}</p>
              </div>
            </div>
          </div>
          
          {/* Registration Form */}
          {showForm && (
            <div className="mt-8 animate-fadeIn">
              <div className="w-full border border-red-500/30 rounded-lg overflow-hidden">
                <iframe
                  src={eventDeets.registerationlink}
                  className="w-full h-[70vh]"
                  title={`Registration Form for ${eventDeets.title}`}
                />
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowForm(false)}
                  className="py-2 px-6 bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300 rounded-md hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-md font-medium"
                >
                  Close Form
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="py-2 px-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-md hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-md hover:shadow-gray-500/20 font-medium"
          >
            &larr; Back to All Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;