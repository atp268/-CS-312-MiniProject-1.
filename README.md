
- **Create Posts**: Add a new blog post directly from the homepage with author name, title, content, and automatic timestamping using JavaScript's `Date` object.
- **View Posts**: Dynamically rendered list of all posts using EJS templates. Shows creator name, creation date & time, title, and body.
- **Edit Posts**: Dedicated edit page pre-populated with the post's current content, allowing updates that replace the original post in-place.
- **Delete Posts**: Instant one-click deletion with a confirmation prompt.
- **Responsive Layout**: Designed with minimal, clean CSS that automatically adapts smoothly across mobile and desktop screens.
- **In-Memory Storage**: Zero database installation or configuration needed.


##  Getting Started Locally

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
 Server is running on port 3000!
  Visit: http://localhost:3000
  Press Ctrl + C to stop
=========================================
```

Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)
