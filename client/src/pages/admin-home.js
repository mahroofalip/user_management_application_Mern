import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import "./admin.css";

const Home = () => {
  let account = "Account";
  let dropdown = "dropdown";
  const [name, setName] = useState(account);
  const [users, setUser] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const adminName = localStorage.getItem("admin");
    console.log(adminName);
    setName(adminName);
  });

  useEffect(async () => {
    await axios.get(`http://localhost:2000/userDatas`).then((res) => {
      let persons = res.data;
      console.log(persons);
      setUser(persons);
    });
  }, []);

  return (
    <div>
      <div className="headerAdminHome">
        <h1 className="hedding"> Admin Home</h1>

        <div className={dropdown}>
          {" "}
          <h1 className="hedding">{name}</h1>
          {name !== "Account" ? (
            <div className="dropdown-content">
              <button
                onClick={() => {
                  setName(account);
                  localStorage.clear();
                  history.push("/admin-Login");
                }}
                className="logoutBtn"
              >
                Log out
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="TableBox">
        <table className="TableData">
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="EditButton"> edit </button>
                  </td>
                  <td>
                    {" "}
                    <button className="deleteButton">delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
