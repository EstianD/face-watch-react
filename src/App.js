import React, { useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Compoonents
import Signin from "./components/signin";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";

// Authentication
import isAuthenticated from "./services/checkAuth";

const App = () => {
  // APP STATES
  const [jwtState, setjwtState] = useState(null);
  const [user, setUser] = useState(isAuthenticated());

  const handleLogout = (e) => {
    localStorage.removeItem("jwt-auth");
    setUser(isAuthenticated());
  };

  // Toggle signin/signup
  const [signupStatus, setsignupStatus] = useState({
    page: "signin",
    status: null,
  });
  // Handle signin/signup toggle
  const handleToggleSign = (componentValue) => {
    setsignupStatus({ page: componentValue });
  };

  //Components
  // Generate login form
  const signForm = () => {
    if (signupStatus.page === "signin") {
      return (
        <Signin
          handleToggleSign={handleToggleSign}
          signupStatus={signupStatus}
          setUser={setUser}
        />
      );
    } else {
      return (
        <Signup
          handleToggleSign={handleToggleSign}
          setsignupStatus={setsignupStatus}
          signupStatus={signupStatus}
        />
      );
    }
  };

  // Generate Dashboard
  const dashboardPage = () => (
    <Dashboard user={user} handleLogout={handleLogout} />
  );

  // Render
  return <div>{user === null ? signForm() : <div>{dashboardPage()}</div>}</div>;
};

export default App;
