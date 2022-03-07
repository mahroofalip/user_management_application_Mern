import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./forms.css";
import styled from "styled-components";

function App() {
  const history = useHistory();
  const token = localStorage.getItem("token");

  if (token) {
    history.replace("/");
  }

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  let [Existerr, setExistErr] = useState(null);
  let [nameErr, setNameErr] = useState(null);
  let [emailErr, setEmailErr] = useState(null);
  let [passwordErr, setPasswordErr] = useState(null);
  async function registerUser(event) {
    event.preventDefault();
    setExistErr(null);

    let aprove = true;
    if (!name) {
      setNameErr("Please Enter your name");
      aprove = false;
    } else {
      setNameErr(null);
    }

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
      const response = await fetch("http://localhost:2000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === "ok") {
        history.push("/login");
      }
      if (data.status === "existUser") {
        setExistErr("You are exist user");
      }
    }
  }

  return (
    <div>
      <div className="heddingBox">
        <h1 className="hedding">Register</h1>
      </div>
      <div className="fomParent">
        <div className="registerForm">
          <p className="errmessage">{Existerr ? Existerr : null}</p>
          <form onSubmit={registerUser}>
            <p className="errmessage">{nameErr ? nameErr : null}</p>
            <input
              className="inputArea"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <br />
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
            <input className="submitbutton" type="submit" value="Register" />
          </form>
          <small
            className="existAccountText"
            onClick={() => {
              history.push("/login");
            }}
          >
            {" "}
            Already have account?{" "}
          </small>
        </div>
      </div>
    </div>
  );
}

export default App;
