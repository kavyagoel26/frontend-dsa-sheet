import  { useState } from "react";
import LoginPage from "./components/LoginPage";
import DSASheet from "./components/DSASheet";

//import './App.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    setLoggedInUser(username);
    // Persist login data (e.g., localStorage/sessionStorage)
  };

  return (
    <div className="App">
    
      {loggedInUser ? <DSASheet user={loggedInUser} /> : <LoginPage onLogin={handleLogin} />}

    </div>
  );
  }


export default App;