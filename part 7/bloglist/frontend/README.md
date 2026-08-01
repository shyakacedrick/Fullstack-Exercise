# Part 7 – State Management with Zustand (Exercises 7.11–7.14)

This version of the Blog List application uses **Zustand** for global state management. The application was refactored to move state management out of React components and into dedicated Zustand stores.

---

## Exercise 7.11 – Zustand Step 1

Created a global blog store to manage blog data.

### Implemented

- Created `src/stores/blogStore.js`
- Moved blog state from `App.jsx` into Zustand
- Added:
  - `blogs`
  - `initializeBlogs()`
  - `createBlog()`
- Blog fetching is now handled by the store instead of React state.

---

## Exercise 7.12 – Zustand Step 2

Created a notification store.

### Implemented

- Created `src/stores/notificationStore.js`
- Moved notification state out of `App.jsx`
- Added:
  - `notification`
  - `showNotification(message, type)`
- Notifications automatically disappear after 5 seconds.
- `Notification.jsx` now reads directly from the Zustand store.

---

## Exercise 7.13 – Zustand Step 3

Expanded the blog store to support updating and deleting blogs.

### Implemented

Added the following actions to `blogStore.js`:

- `likeBlog(blog)`
- `deleteBlog(blog)`

The application now:

- Likes blogs through the Zustand store
- Deletes blogs through the Zustand store
- Automatically updates the UI without manually updating component state

`App.jsx` now delegates all blog operations to the blog store.

---

## Exercise 7.14 – Zustand Step 4

Created a user store to manage authentication.

### Implemented

Created `src/stores/userStore.js`.

Added:

- `user`
- `initializeUser()`
- `login(user)`
- `logout()`

The store is responsible for:

- Persisting the logged-in user in `localStorage`
- Restoring the user on page refresh
- Setting the authentication token for API requests
- Removing the user and token on logout

`App.jsx` now reads the authenticated user directly from the Zustand store instead of using local component state.

---

# Zustand Store Structure

```
src/
└── stores/
    ├── blogStore.js
    ├── notificationStore.js
    └── userStore.js
```

---

# Features

- Global blog state
- Global notification state
- Global authentication state
- Persistent login using localStorage
- Automatic notification timeout
- Blog creation
- Blog liking
- Blog deletion
- Automatic blog sorting by likes
- Cleaner and more maintainable component structure

---

# Technologies Used

- React
- React Router
- Zustand
- Axios
- Material UI
- Vite

---

# Learning Outcomes

Through these exercises I learned how to:

- Create Zustand stores
- Manage global application state
- Replace React component state with Zustand
- Separate business logic from UI components
- Persist authentication using localStorage
- Handle CRUD operations through a centralized store
- Improve code organization and maintainability