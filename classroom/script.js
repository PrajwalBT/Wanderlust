const express = require("express");
const app = express();
const users = require("./routes/users");
const posts = require("./routes/posts");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
}

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.sucessMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/register", (req, res) => {
  let { name="anonymous"} = req.query;
  req.session.name = name;

  if(name === "anonymous") {
    req.flash("error", "user not registered");
  } else {
    req.flash("success", "user registered successfully");
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  // res.locals.sucessMsg = req.flash("success");
  // res.locals.errorMsg = req.flash("error");
  res.render("page.ejs", {name: req.session.name});
  // res.render("page.ejs", {name: req.session.name, msg : req.flash("success")});
});

// app.get("/reqcount", (req, res) => {
//   if(req.session.count) {
//     req.session.count++;
//   }
//   else {
//     req.session.count = 1;
//   }
//   res.send(`session request count ${ req.session.count }`);
//   console.log(req.session);
// });



/*
// app.use(cookieParser());
app.use(cookieParser("secretcode"));  //check  for any {Tamparing / changes} is done.

app.get("/getsignedcookie", (req, res) => {
  res.cookie("made-in", "india", {signed: true});
  res.send("signed cookie sent");
});

// req.cookies => prints all unsigned cookies
// req.signedCookies => prints all signed cookies
app.get("/verify", (req, res) => {
  console.log(req.signedCookies);
  res.send("verified");
});

app.get("/getcookies", (req, res) => {
  res.cookie("greet", "namaste");
  res.cookie("madeIn", "india");
  res.send("sent you some cookies");
});

app.get("/greet", (req, res) => {
  let {name = "anonymous"} = req.cookies;
  res.send(`Hii, ${name}`);
});

app.use("/users", users);
app.use("/posts", posts);

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("contacted root path");
});
*/



app.listen(3000, () => {
  console.log("app is listening on port 3000");
});