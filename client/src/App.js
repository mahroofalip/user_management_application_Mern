import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin";
import AdminHome from "./pages/admin-home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/admin-Login" exact component={AdminLogin} />
        <Route path="/admin-home" exact component={AdminHome} />
      </BrowserRouter>
    </div>
  );
};

export default App;
