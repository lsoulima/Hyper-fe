import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NavBar from "./Inc/NavBar";
import "./css/app.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./Inc/Footer";
import Settings from "./Pages/Settings";
import Library from "./Pages/Library";
import Stream from "./Pages/Stream";
import { useState } from "react";
import Profile from "./Pages/Profile";
import ForgetPwd from "./Pages/ForgetPwd";
import { HyperProvider } from "./Context/context";
import { ThemeProvider } from "styled-components";
import NewPassword from "./Pages/NewPwd";
import Verify from "./Pages/Verify";
import PublicRoute from "./Routing/PublicRoute";
import PrivateRoute from "./Routing/PrivateRoute";
import Notfound from "./Pages/notFound";

const App = () => {
  const [theme, setTheme] = useState({
    background:
      localStorage.getItem("theme") === "light"
        ? "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);"
        : "#202026",
    background_btn:
      localStorage.getItem("theme") === "light" ? "black" : "#fff",
    text_background:
      localStorage.getItem("theme") === "light" ? "#fff" : "black",
    text: localStorage.getItem("theme") === "light" ? "#202026" : "#fff",
    background_grey_2:
      localStorage.getItem("theme") === "light"
        ? "black"
        : "hsla(0,0%,100%,0.2)",
    background_grey_5:
      localStorage.getItem("theme") === "light"
        ? "black"
        : "hsla(0,0%,100%,0.5)",
    cards:
      localStorage.getItem("theme") === "light"
        ? "#fff"
        : "hsla(0,0%,100%,0.13)",
    border:
      localStorage.getItem("theme") === "light"
        ? "#cdcdcd"
        : "hsla(0,0%,100%,0.5)",
  });

  return (
    <HyperProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <NavBar mytheme={theme} settheme={setTheme} />
          <Switch>
            <PublicRoute path='/login' component={Login} />
            <PublicRoute path='/verify' component={Verify} />
            <PublicRoute path='/newpassword' component={NewPassword} />
            <PublicRoute path='/register' component={Register} />
            <PublicRoute path='/forgetpwd' component={ForgetPwd} />
            <PrivateRoute path='/settings' component={Settings} />
            <PrivateRoute path='/library' component={Library} />
            <PrivateRoute path='/stream' component={Stream} />
            <PrivateRoute path='/profile' component={Profile} />
            <PublicRoute path='/' component={Home} />
            <Route component={Notfound} />
          </Switch>
          <Footer />
        </ThemeProvider>
      </Router>
    </HyperProvider>
  );
};

export default App;
