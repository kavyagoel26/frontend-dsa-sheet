import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DSAChapter from "./DSAChapter";
import topicData from "../payload/topicData.json";
import NavBar from "./NavBar";

// Reusable AccordionHeader Component
const AccordionHeader = ({ topic, isOpen, onToggle, progress }) => (
  <div
    onClick={onToggle}
    className="flex items-center cursor-pointer p-4 bg-slate-300 text-black rounded-md hover:bg-green-200"
  >
    <h3 className="text-lg font-semibold flex-1">
      {topic.id}. {topic.name}
    </h3>
    {/* Progress bar */}
    <div className="w-52 bg-gray-200 h-2 ml-4 mr-4 rounded-md">
      <div
        className="bg-green-500 h-2 rounded-md"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    {isOpen ? (
      <ChevronUp className="w-5 h-5 text-white ml-auto" />
    ) : (
      <ChevronDown className="w-5 h-5 text-white ml-auto" />
    )}
  </div>
);

// function DSASheet() {
//   const [topics, setTopics] = useState([]);
//   const [openTopic, setOpenTopic] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setTopics(topicData.topics);
//   }, []);
function DSASheet() {
    const [topics, setTopics] = useState(() => {
      const storedTopics = localStorage.getItem('dsaSheetTopics');
      return storedTopics ? JSON.parse(storedTopics) : topicData.topics;
    });
  
    const [openTopic, setOpenTopic] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      localStorage.setItem('dsaSheetTopics', JSON.stringify(topics));
    }, [topics]);
  

 

  const toggleAccordion = (topicId) => {
    setOpenTopic(openTopic === topicId ? null : topicId);
  };

  const toggleCompletion = (topicId, problemId) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              chapters: topic.chapters.map((chapter) => ({
                ...chapter,
                problems: chapter.problems.map((problem) =>
                  problem.id === problemId
                    ? { ...problem, completed: !problem.completed }
                    : problem
                ),
              })),
            }
          : topic
      )
    );

}

  const calculateProgress = (problems) => {
    const completed = problems.filter((problem) => problem.completed).length;
    return (completed / problems.length) * 100;
  };

  // Optimized Search Logic: Memoized to avoid unnecessary recalculations
  const filteredTopics = useMemo(() => {
    if (!searchTerm) return topics;

    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return topics.filter((topic) => {
      const matchesTopicName = topic.name.toLowerCase().includes(lowercasedSearchTerm);

      const matchesProblem = topic.chapters.some((chapter) =>
        chapter.problems.some((problem) =>
          problem.name.toLowerCase().includes(lowercasedSearchTerm)
        )
      );

      return matchesTopicName || matchesProblem;
    });
  }, [topics, searchTerm]);

  return (
    <div>
    <NavBar/>
    <div className="h-full bg-gray-100">
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-center text-green-950 mb-4">DSA Sheet</h2>

        {/* Search Filter */}
        <div className="mb-6 flex justify-center" >
          <input
            type="text"
            placeholder="Search problems or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-96"
          />
        </div>

        {/* Accordion Structure */}
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => (
            <div key={topic.id} className="mb-4">
              <AccordionHeader
                topic={topic}
                isOpen={openTopic === topic.id}
                onToggle={() => toggleAccordion(topic.id)}
                progress={calculateProgress(topic.chapters[0].problems)}
              />

              {/* Accordion Body (when open) */}
              {openTopic === topic.id && (
                <div className="p-4 bg-white border rounded-md">
                  {topic.chapters.map((chapter, index) => (
                    <DSAChapter
                      key={index}
                      chapter={chapter}
                      toggleCompletion={(problemId) =>
                        toggleCompletion(topic.id, problemId)
                      }
                      searchTerm={searchTerm}/>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No topics or problems found.</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default DSASheet;