import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./forms.css";
import styled from "styled-components";
import { Jwt } from "jsonwebtoken";

function App() {
  const history = useHistory();
  const token = localStorage.getItem("token");

  if (token) {
    history.replace("/");
  }

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  let [emailErr, setEmailErr] = useState(null);
  let [passwordErr, setPasswordErr] = useState(null);
  let [invalidErr, setInvalidErr] = useState(null);

  async function loginUser(event) {
    event.preventDefault();

    setInvalidErr(null);

    let aprove = true;

    if (!email) {
      setEmailErr("Please Enter your email");
      aprove = false;
    } else {
      setEmailErr(null);
    }

    if (!password) {
      setPasswordErr("Please Enter Password");
      aprove = false;
    } else {
      setPasswordErr(null);
    }

    if (aprove) {
      const response = await fetch("http://localhost:2000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.user) {
        // alert('Login successful')
        localStorage.setItem("token", data.user);

        history.push("/");
      } else {
        setInvalidErr("Invalid Email Or Pssword");
      }
    }
  }

  return (
    <div>
      <div className="heddingBox">
        <h1 className="hedding">Login</h1>
      </div>

      <div className="fomParent">
        <div className="registerForm">
          <p className="errmessage">{invalidErr ? invalidErr : null}</p>
          <form onSubmit={loginUser}>
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

          <small
            onClick={() => {
              history.push("/register");
            }}
            className="existAccountText"
          >
            {" "}
            Create an Account?
          </small>
        </div>
      </div>
    </div>
  );
}

export default App;
