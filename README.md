# 🚀 Full Stack Open - Part 0: Fundamentals of Web Apps

This directory contains my solutions for **Part 0** of the [Full Stack Open](https://fullstackopen.com/en/part0) course by the University of Helsinki. This section focuses on the foundational mechanics of the web: HTTP requests, browser-server communication, and the Document Object Model (DOM).

## 📋 Learning Objectives
* Understanding **HTTP GET and POST** cycles.
* Distinguishing between **Traditional Web Applications** and **Single Page Applications (SPA)**.
* Visualizing web traffic using **Sequence Diagrams**.
* Mastering the **Chrome Developer Tools** (Network, Console, and Elements tabs).

---

## 📂 Exercises & Solutions

In this part, I analyzed the [Example App](https://studies.cs.helsinki.fi/exampleapp) to understand how data flows between the client and the server.

### 0.4: New Note Diagram
A diagram depicting the flow when a user creates a new note on the traditional web page.
* **Focus:** Understanding the **HTTP 302 Redirect** and how it triggers a page reload.

### 0.5: Single Page App Diagram
A diagram showing the loading of the SPA version of the app.
* **Focus:** How the browser fetches a single HTML file, followed by CSS and JavaScript, which then fetches the JSON data to render the UI.

### 0.6: New Note in SPA Diagram
A diagram of the flow when a new note is created within the SPA.
* **Focus:** **Asynchronous communication** (AJAX/Fetch). The page does not reload; JavaScript handles the data submission and updates the DOM dynamically.
