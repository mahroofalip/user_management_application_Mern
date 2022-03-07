const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/user-management-react");

app.post("/api/register", async (req, res) => {
  console.log("helloi ok hhhhhhhhhhhhhhhhhhhhh", req.body);

  let existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    return res.json({ status: "existUser" });
  } else {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.json({ status: "ok" });
    } catch (err) {
      console.log(err);
      res.json({ status: "error", errr: "dupicate Email" });
    }
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/api/getUser", async (req, res) => {
  console.log(req.headers["x-access-token"], "THIS IS TOKEN");
  const token = req.headers["x-access-token"];
  console.log(token, "THIS IS TOKEN step2");

  try {
    const decoded = jwt.verify(token, "secret123");
    console.log(decoded, "step 3");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    console.log(user, "jfffffffffffffff");
    if (user) {
      return res.json({ status: "ok", user_name: user.name });
    } else {
      return res.json({ status: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", err: "invalid Token" });
  }
});

app.post("/api/updateUser", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne(
      { email: email },
      {
        $set: {
          quote: req.body.quote,
        },
      }
    );
    console.log(user);
    return { status: "ok", qoute: user.quote };
  } catch (err) {
    console.log(err);
    res.json({ status: "error", err: "invalid Token" });
  }
});

// admin section

app.post("/admin/login", async (req, res) => {
  let admin_name = "mahroof";
  let admin_email = "mahroofali@gmail.com";
  let admin_password = "1234";
  if (req.body.email === admin_email && req.body.password === admin_password) {
    const token = jwt.sign(
      {
        email: admin_email,
        pwd: admin_password,
      },
      "secret199"
    );

    return res.json({ status: true, admin: token, AdminName: admin_name });
  } else {
    return res.json({ status: false, admin: false });
  }
});

app.get("/userDatas", async (req, res) => {
  let users = await User.find();

  res.json(users);
});

app.listen(2000, () => {
  console.log("server running 2000 port");
});
