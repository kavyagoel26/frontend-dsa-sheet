//import React from "react";
import { Youtube, ExternalLink } from 'lucide-react'; // Importing icons from Lucide React

// Badge Component for showing the problem difficulty
const DifficultyBadge = ({ difficulty }) => {
  const badgeColor =
    difficulty === "Easy"
      ? "bg-green-500"
      : difficulty === "Medium"
      ? "bg-yellow-500"
      : "bg-red-500";
  return (
    <span className={`text-white px-2 py-1 rounded-md ${badgeColor}`}>
      {difficulty || "null"} 
    </span>
  );
};

// DSAChapter in Table Format with YouTube, LeetCode, and Article columns
const DSAChapter = ({ chapter, toggleCompletion, searchTerm }) => {
  // Filter the problems based on the search term
  const filteredProblems = chapter.problems.filter((problem) =>
    problem.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-6 mt-4">
      {filteredProblems.length > 0 ? (
        <table className="min-w-full bg-white table-auto border-teal-950">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-left">Done</th>
              <th className="p-4 text-left">Problem</th>
              <th className="p-4 text-left">YouTube</th>
              <th className="p-4 text-left">Practice</th>
              <th className="p-4 text-left">Article</th>
              <th className="p-4 text-left">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem) => (
              <tr key={problem.id} className="border-b">
                {/* Checkbox for marking completion */}
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={problem.completed}
                    onChange={() => toggleCompletion(problem.id)}
                  />
                </td>

                {/* Problem Name */}
                <td className="p-4">{problem.name || "null"}</td> {/* Handle null */}

                {/* YouTube Tutorial Link with Icon */}
                <td className="p-4">
                  {problem.youtubeLink ? (
                    <a
                      href={problem.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      <Youtube
                        className="w-6 h-6 mr-2"
                        style={{ color: "#FF0000" }} // YouTube Red Color
                      />
                      YouTube
                    </a>
                  ) : (
                    "null"
                  )} {/* Handle null */}
                </td>

                {/* LeetCode or Codeforces Link with Icon */}
                <td className="p-4">
                  {problem.leetcodeLink ? (
                    <a
                      href={problem.leetcodeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      <ExternalLink
                        className="w-6 h-6 mr-2"
                        style={{ color: "#FFA116" }} 
                      />
                      LeetCode
                    </a>
                  ) : (
                    "null"
                  )} {/* Handle null */}
                </td>

                {/* Article Link with Icon */}
                <td className="p-4">
                  {problem.articleLink ? (
                    <a
                      href={problem.articleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      <ExternalLink
                        className="w-6 h-6 mr-2"
                        style={{ color: "#00BFFF" }} 
                        />
                      Article
                    </a>
                  ) : (
                    "null"
                  )} 
                </td>

                {/* Difficulty Badge */}
                <td className="p-4">
                  <DifficultyBadge difficulty={problem.difficulty} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No problems found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default DSAChapter;