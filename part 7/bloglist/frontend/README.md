# Full Stack Open – Part 7

## BlogList Application

This part focused on improving the architecture of the BlogList application by introducing better project structure, routing, global state management, reusable logic, and cleaner code organization.

---

# Exercises Completed

- ✅ 7.7 Frontend and backend in the same repository
- ✅ 7.8 Error Boundary
- ✅ 7.9 Nonexisting routes
- ✅ 7.10 Automatic Code Formatting (Prettier)
- ✅ 7.11 Zustand – Notifications
- ✅ 7.12 Zustand – Blog state
- ✅ 7.13 Zustand – Like & Delete
- ✅ 7.14 Zustand – User state
- ✅ 7.15 Cleaning the code
- ✅ 7.16 Users view
- ✅ 7.17 Individual user view
- ✅ 7.18 Comments (Display)
- ✅ 7.19 Comments (Create)
- ✅ 7.20 Styling

---

# What I Learned

## 1. Frontend & Backend in the Same Repository

- Combined frontend and backend into one project repository.
- Kept separate `package.json` files for both applications.
- Improved project organization and deployment workflow.

---

## 2. Error Boundaries

Implemented an Error Boundary to prevent the application from crashing completely when rendering errors occur.

**Concepts learned**

- React Error Boundary
- Graceful error handling
- Better user experience

---

## 3. React Router

Improved application navigation by implementing:

- Nested routes
- Dynamic routes
- Wildcard (`*`) routes for 404 pages

Routes added:

```
/
/login
/users
/users/:id
/blogs/:id
```

---

## 4. Zustand State Management

Refactored the application to use Zustand instead of local component state.

### Notification Store

Global notification management.

Features:

- Success notifications
- Error notifications
- Automatic dismissal

---

### Blog Store

Moved all blog operations into Zustand.

Store responsibilities:

- Fetch blogs
- Create blog
- Like blog
- Delete blog
- Keep blogs sorted by likes

---

### User Store

Moved authentication into Zustand.

Store responsibilities:

- Login
- Logout
- Restore logged-in user
- Store authenticated user globally

---

## 5. Persistent User Service

Created a reusable service:

```
src/services/persistentUser.js
```

Instead of accessing `localStorage` throughout the application.

Functions:

```javascript
getUser()
saveUser()
removeUser()
```

This reduced duplicated code and improved maintainability.

---

## 6. Custom Hooks

Created and used the reusable `useField` hook.

Instead of repeating:

```jsx
const [value, setValue] = useState('')
```

everywhere, forms became much cleaner.

Example:

```jsx
const username = useField('text')
const password = useField('password')
```

---

## 7. Users View

Added a page displaying every registered user.

Each user shows:

- Name
- Number of blogs created

---

## 8. Individual User View

Added dynamic routing for users.

Each user now has their own page showing:

- User information
- Blogs created by that user

Route:

```
/users/:id
```

---

## 9. Blog Comments

Implemented blog comments.

### Step 1

Display comments received from the backend.

### Step 2

Allow users to submit new comments.

Endpoint used:

```
POST /api/blogs/:id/comments
```

---

## 10. Styling

Improved the visual appearance of the application.

Changes include:

- Better spacing
- Improved layout
- Dark theme styling
- Cleaner buttons
- Responsive design
- Better user experience

---

# Project Structure

```
src
│
├── components
├── hooks
├── pages
├── services
├── stores
│
├── App.jsx
└── main.jsx
```

---

# Zustand Stores

```
Notification Store
│
├── notification
└── showNotification()

Blog Store
│
├── blogs
├── initializeBlogs()
├── createBlog()
├── likeBlog()
└── deleteBlog()

User Store
│
├── user
├── initializeUser()
├── login()
└── logout()
```

---

# Skills Gained

- React Router
- Nested Routing
- Dynamic Routing
- Error Boundaries
- Zustand
- Global State Management
- Custom Hooks
- Persistent Login
- localStorage Abstraction
- Component Reusability
- Separation of Concerns
- Code Organization
- REST API Integration
- Comments System
- Responsive UI Design

---

# Key Takeaways

Part 7 was focused on making the application resemble a real-world React project.

The biggest lessons were:

- Keep business logic outside components.
- Use global state only when necessary.
- Separate reusable logic into hooks and services.
- Keep components focused on rendering UI.
- Organize code into clear folders.
- Improve maintainability before adding new features.

---

# Final Thoughts

Part 7 transformed the BlogList application from a collection of React components into a more scalable, maintainable, and production-oriented application.

This part introduced many of the architectural patterns commonly used in modern React development, laying a strong foundation for larger applications.

---

**Course:** Full Stack Open  
**Part:** 7 – React Router, Custom Hooks, Styling & State Management  
**Application:** BlogListbbbbbbbbbbbbbbbbbbbbbbbbbbb