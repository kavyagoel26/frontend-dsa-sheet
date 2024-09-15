import { useState, useEffect } from "react";
import { User } from "lucide-react"; // Importing User icon from Lucide
import {useNavigate} from "react-router-dom"

// Navbar Component with Account Icon and Username
const Navbar = ({onLogout}) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");// Get the username from localStorage
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout =() =>{
    localStorage.removeItem("username"); // clear current username
    onLogout(); //trigger parent logout function
    navigate("/"); //Redirect to login
  }

  return (
    <nav className="bg-teal-950 p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">DSA Sheet Tracker</div>

        {/* Account Section */}
        <div className="flex items-center text-white">
          <User className="w-6 h-6 mr-2" />
          {/* Display Username */}
          <span className="mr-6">{username ? username : "Guest"}</span>

          {username && (
            <button onClick={handleLogout} className="bg-green-200 text-black px-4 py-2 rounded-md hover:bg-red-600">
                Logout
            </button>
          )}          
        </div>        
      </div>
    </nav>
  );
};

export default Navbar;