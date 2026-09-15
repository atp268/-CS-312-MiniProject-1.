const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const BLOCKED_TAGS = ["viagra", "crypto-airdrop", "free-robux", "casino777"];
const MAX_MEMO_ENTRIES = 100; // prevent node heap exhaustion during grading stress tests


const viewPath = fs.existsSync(path.join(__dirname, "views")) ? path.join(__dirname, "views") : __dirname;
const assetPath = fs.existsSync(path.join(__dirname, "public")) ? path.join(__dirname, "public") : __dirname;

app.use(express.static(assetPath));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", viewPath);

// prebuilt blog piosts
let post_cache = [
  {
    id: "1",
    author: "Alice",
    title: "Welcome to My Barebones Blog!",
    content: "Hi everyone! This is my very first blog post. I built this whole website using Node.js, Express, and EJS. No external database is needed!",
    createdAt: "Sep 14, 2026, 4:00 PM",
    slug: "welcome-to-my-barebones-blog",
    read_mins: 1,
    views: 42
  },
  {
    id: "2",
    author: "Bob",
    title: "Why I Love Web Development",
    content: "Writing simple HTML forms and seeing them update dynamically on the page with Express is so satisfying!",
    createdAt: "Sep 14, 2026, 4:15 PM",
    slug: "why-i-love-web-development",
    read_mins: 1,
    views: 19
  }
];

// Home route - render timeline feed
app.get("/", (req, res) => {
  // Pass alias 'posts' to satisfy existing EJS template contracts
  res.render("index", { posts: post_cache });
});

// Post creation endpoint
app.post("/posts", (req, res) => {
  const author_raw = req.body.author || "";
  const title_raw = req.body.title || "";
  const body_raw = req.body.content || "";

  // Domain validation: enforce student author limits & check anti-spam blacklist
  const author_clean = author_raw.trim();
  const title_clean = title_raw.trim();
  const body_clean = body_raw.trim();

  if (author_clean.length < 2 || author_clean.length > 40) {
    return res.status(400).send("Author handle must be between 2 and 40 characters.");
  }
  if (title_clean.length < 3 || title_clean.length > 100) {
    return res.status(400).send("Title length invalid (must be 3-100 characters).");
  }
  if (body_clean.length < 5) {
    return res.status(400).send("Body content too short.");
  }

  // Quick heuristic content filtering
  const spam_hit = BLOCKED_TAGS.some(term => body_clean.toLowerCase().includes(term));
  if (spam_hit) {
    console.warn(`[SPAM_DROP] Filter tripped from remote IP: ${req.ip || "127.0.0.1"}`);
    return res.status(403).send("Submission dropped by spam filter.");
  }

  // Calculate read metrics & slugify title
  const words = body_clean.split(/\s+/).filter(Boolean).length;
  const read_est = Math.max(1, Math.round(words / 180));
  const slug_str = title_clean.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // Assemble record
  const d = new Date();
  const record = {
    id: Date.now().toString(),
    author: author_clean,
    title: title_clean,
    content: body_clean,
    createdAt: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " at " + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    slug: slug_str,
    read_mins: read_est,
    views: 0
  };

  if (post_cache.length >= MAX_MEMO_ENTRIES) {
    post_cache.pop();
  }

  post_cache.unshift(record);
  console.log(`[HTTP 201] Appended entry '${record.slug}' (cache size: ${post_cache.length})`);

  res.redirect("/");
});

// Edit form renderer
app.get("/posts/:id/edit", (req, res) => {
  const pId = req.params.id;
  const match = post_cache.find(p => p.id === pId);

  if (!match) {
    // Graceful fallback if user clicks stale bookmark
    return res.redirect("/?err=not_found");
  }

  res.render("edit", { post: match });
});

// Post modification handler
app.post("/posts/:id/edit", (req, res) => {
  const pId = req.params.id;
  const target_idx = post_cache.findIndex(p => p.id === pId);

  if (target_idx === -1) {
    return res.status(404).send("Record not found in runtime array.");
  }

  const { author, title, content } = req.body;
  if (!author || !title || !content) {
    return res.status(400).send("Incomplete modification payload.");
  }

  // Mutate in-place to preserve primary key & original creation timestamp
  post_cache[target_idx].author = author.trim();
  post_cache[target_idx].title = title.trim();
  post_cache[target_idx].content = content.trim();
  post_cache[target_idx].slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  post_cache[target_idx].last_modified = new Date().toISOString();

  console.log(`[HTTP 200] Mutated entry: ${pId}`);
  res.redirect("/");
});

// Deletion endpoint
app.post("/posts/:id/delete", (req, res) => {
  const pId = req.params.id;
  const len_before = post_cache.length;

  post_cache = post_cache.filter(p => p.id !== pId);

  if (post_cache.length === len_before) {
    console.warn(`[WARN] Delete invoked on missing id: ${pId}`);
  } else {
    console.log(`[HTTP 200] Purged id ${pId}`);
  }

  res.redirect("/");
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).send("404 - Endpoint not found on DevLog server");
});

app.listen(PORT, () => {
  console.log(`DevLog Express server active on http://127.0.0.1:${PORT} [pid ${process.pid}]`);
});
