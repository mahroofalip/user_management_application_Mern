import React, { useState } from "react";
import "./admin.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const history = useHistory();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  let [emailErr, setEmailErr] = useState(null);
  let [passwordErr, setPasswordErr] = useState(null);
  let [invalidErr, setInvalidErr] = useState(null);

  const loginAdmin = (event) => {
    event.preventDefault();

    setInvalidErr(null);

    let approved = true;

    if (!email) {
      setEmailErr("Please Enter your email");
      approved = false;
    } else {
      setEmailErr(null);
    }

    if (!password) {
      setPasswordErr("Please Enter Password");
      approved = false;
    } else {
      setPasswordErr(null);
    }

    if (approved) {
      axios
        .post(`http://localhost:2000/admin/login`, { email, password })
        .then((res) => {
          if (res.data.status) {
            localStorage.setItem("AdminToken", res.data.admin);
            localStorage.setItem("admin", res.data.AdminName);
            history.push("/admin-home");
          } else {
            setInvalidErr("Invalid Email Or Pssword");
            history.replace("/admin-Login");
          }
        });
    }
  };

  return (
    <div>
      <div className="adminHeader">
        <h1>Admin Login</h1>
      </div>

      <div className="fomParent">
        <div className="registerForm">
          <p className="errmessage">{invalidErr ? invalidErr : null}</p>
          <form onSubmit={loginAdmin}>
            <p className="errmessage">{emailErr ? emailErr : null}</p>
            <input
              className="inputArea"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <br />
            <p className="errmessage">{passwordErr ? passwordErr : null}</p>
            <input
              className="inputArea"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <br />
            <input className="submitbutton" type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
