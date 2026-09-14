# 📝 Barebones Blog Web Application

A lightweight, barebones blog web application developed using **Node.js**, **Express.js**, and **EJS**, styled with clean, minimal CSS designed with a beginner/novice coder aesthetic.

The application allows users to **create**, **view**, **edit**, and **delete** blog posts in real time. In-memory storage is used to keep things simple and dependency-free—no database setup required!

---

## 🚀 Features

- **Create Posts**: Add a new blog post directly from the homepage with author name, title, content, and automatic timestamping using JavaScript's `Date` object.
- **View Posts**: Dynamically rendered list of all posts using EJS templates. Shows creator name, creation date & time, title, and body.
- **Edit Posts**: Dedicated edit page pre-populated with the post's current content, allowing updates that replace the original post in-place.
- **Delete Posts**: Instant one-click deletion with a confirmation prompt.
- **Responsive Layout**: Designed with minimal, clean CSS that automatically adapts smoothly across mobile and desktop screens.
- **In-Memory Storage**: Zero database installation or configuration needed.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Template Engine**: [EJS](https://ejs.co/) (Embedded JavaScript)
- **Styling**: Pure CSS3 (Minimal, lightweight & responsive)

---

## 📁 Project Structure

```text
barebones-blog/
├── index.js          # Express server, in-memory store & CRUD routes
├── package.json      # Node.js dependencies & scripts
├── .gitignore        # Files excluded from git tracking (e.g. node_modules)
├── README.md         # Documentation & GitHub setup instructions
├── public/
│   └── styles.css    # Clean, minimal CSS stylesheet
└── views/
    ├── index.ejs     # Homepage view (feed & post creation form)
    └── edit.ejs      # Edit view (pre-filled post editing form)
```

---

## 💻 Getting Started Locally

### 1. Prerequisites
Ensure you have Node.js (version 18+ or 20+ LTS) installed on your system.

### 2. Installation
Clone or navigate to the repository directory and install dependencies:

```bash
npm install
```

### 3. Running the Server
Start the Express server:

```bash
npm start
```

You should see output similar to:
```text
=========================================
  🚀 Server is running on port 3000!
  Visit: http://localhost:3000
  Press Ctrl + C to stop
=========================================
```

Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

---

## 🌐 Setting Up and Pushing to GitHub

Follow these steps to connect this project to your GitHub account:

### 1. Create a New Repository on GitHub
1. Go to [GitHub.com](https://github.com/new).
2. Create a new repository named `barebones-blog` (do **not** check "Initialize with README", as we already have one!).

### 2. Connect and Push from Your Terminal
Run the following commands in this project directory:

```bash
# Verify git status
git status

# Add your GitHub repository remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/barebones-blog.git

# Rename branch to main
git branch -M main

# Push your code to GitHub
git push -u origin main
```

---

## 📋 Mini-Project Steps Overview

- **Step 1: Planning** - Architecture designed with RESTful routes (`/`, `/posts`, `/posts/:id/edit`, `/posts/:id/delete`).
- **Step 2: Setup** - Initialized Express server, installed EJS and static middleware.
- **Step 3: Post Creation** - Handled form submission with `author`, `title`, `content`, and JS `Date`.
- **Step 4: Post Viewing** - Homepage renders posts dynamically via EJS with title, author, date, and actions.
- **Step 5: Post Editing** - Separate edit form loads existing post and updates array in-place.
- **Step 6: Post Deletion** - POST route removes post from the array and redirects to homepage.
- **Step 7: Styling** - Clean, minimal CSS with friendly novice-coder touches and full mobile responsiveness.
- **Step 8: Testing** - Verified CRUD operations and HTTP response codes.
