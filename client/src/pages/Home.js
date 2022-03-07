import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router";
import "./Home.css";

const Home = () => {
  let account = "Account";
  let dropdown = "dropdown";
  const [name, setName] = useState(account);
  const history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      let result = await fetch("https://fakestoreapi.com/products");
      result = await result.json();
      setProducts(result);
    }
    fetchProduct();
  }, []);

  async function populateHome() {
    const req = await fetch("http://localhost:2000/api/getUser", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();

    console.log(data);
    if (data.status === "ok") {
      // alert(data.user_name)
      setName(data.user_name);
    } else {
      alert(data.err);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        console.log("UER NOT AUTHONTICATED");
        history.replace("/login");
      } else {
        populateHome();
      }
    }
  }, []);
  return (
    <div>
      <div className="headerHome">
        <h1 className="hedding"> Home</h1>{" "}
        <div className={dropdown}>
          {" "}
          <h1 className="hedding">{name}</h1>
          {name !== "Account" ? (
            <div className="dropdown-content">
              <button
                onClick={() => {
                  localStorage.clear();
                  setName(account);
                }}
                className="logoutBtn"
              >
                Log out
              </button>
              <button className="logoutBtn">Profile</button>
            </div>
          ) : (
            <div className="dropdown-content">
              <button
                onClick={() => {
                  history.push("/login");
                }}
                className="logoutBtn"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="Cards">
        {products.map((product) => {
          return (
            <div className="container">
              <img src={product.image} alt="Pancake" />
              <div className="container__text">
                <h1 className="title">{product.title}</h1>
                <div className="container__text__star">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                </div>
                <span>
                  {" "}
                  <strong>{product.price}</strong>
                </span>
                <p>{product.description}</p>
                <div className="container__text__timing">
                  <div className="container__text__timing_time">
                    <h2>{product.category}</h2>
                  </div>
                  <div className="container__text__timing_time">
                    <h2>
                      Rating <span>{product.rating.rate}</span>
                    </h2>
                  </div>
                </div>
                <button className="btn">
                  add to Cart<i class="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
