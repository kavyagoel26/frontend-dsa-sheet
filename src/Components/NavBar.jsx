import { useState, useEffect } from "react";
import { User } from "lucide-react"; // Importing User icon from Lucide
//import {useNavigate} from "react-router-dom"

// Navbar Component with Account Icon and Username
const Navbar = () => {
  const [username, setUsername] = useState("");
 

  useEffect(() => {
    // Get the username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

 

  return (
    <nav className="bg-teal-950 p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Website Title */}
        <div className="text-white text-lg font-bold">DSA Sheet Tracker</div>

        {/* Account Section */}
        <div className="flex items-center text-white">
          <User className="w-6 h-6 mr-2" />
          {/* Display Username */}
          <span className="mr-6">{username ? username : "Guest"}</span>
         
          
        </div>
        
     
        
      </div>
    </nav>
  );
};

export default Navbar;