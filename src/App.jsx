import  { useState } from "react";
import LoginPage from "./Components/LoginPage";
import DsaSheet from "./Components/DsaSheet";
import {BrowserRouter} from "react-router-dom"

//import './App.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('username') || null);

  const handleLogin = (username) => {
    setLoggedInUser(username);
    localStorage.setItem("username", username);
    // Persist login data (e.g., localStorage/sessionStorage)
  };

  const handleLogout = () =>{
    setLoggedInUser(null);
    localStorage.removeItem("username");
  }

  return (
    <BrowserRouter>
    <div className="App">
    
      {loggedInUser ? <DsaSheet user={loggedInUser} onLogout={handleLogout}/> : <LoginPage onLogin={handleLogin} />}

    </div>
    </BrowserRouter>
  );
  }


export default App;