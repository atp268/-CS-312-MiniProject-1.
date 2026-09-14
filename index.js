const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// list of posts
let posts = [
  {
    id: "1",
    author: "Alice",
    title: "Welcome to My Barebones Blog!",
    content: "Hi everyone! This is my very first blog post. I built this whole website using Node.js, Express, and EJS. No external database is needed!",
    createdAt: new Date().toLocaleString()
  },
  {
    id: "2",
    author: "Bob",
    title: "Why I Love Web Development",
    content: "Writing simple HTML forms and seeing them update dynamically on the page with Express is so satisfying!",
    createdAt: new Date().toLocaleString()
  }
];

// home page
app.get("/", (req, res) => {
  res.render("index", { posts: posts });
});

// make post
app.post("/posts", (req, res) => {
  const author = req.body.author;
  const title = req.body.title;
  const content = req.body.content;

  const now = new Date();
  const formattedDate = now.toLocaleString();

  const newPost = {
    id: Date.now().toString(),
    author: author,
    title: title,
    content: content,
    createdAt: formattedDate
  };

  posts.unshift(newPost);
  res.redirect("/");
});

// edit page
app.get("/posts/:id/edit", (req, res) => {
  const foundPost = posts.find(post => post.id === req.params.id);

  if (!foundPost) {
    return res.redirect("/");
  }

  res.render("edit", { post: foundPost });
});

// update post
app.post("/posts/:id/edit", (req, res) => {
  const postIndex = posts.findIndex(post => post.id === req.params.id);

  if (postIndex !== -1) {
    posts[postIndex].author = req.body.author;
    posts[postIndex].title = req.body.title;
    posts[postIndex].content = req.body.content;
  }

  res.redirect("/");
});

// delete post
app.post("/posts/:id/delete", (req, res) => {
  posts = posts.filter(post => post.id !== req.params.id);
  res.redirect("/");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
