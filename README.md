#  Project Managment Frontend

A modern, responsive React application built to manage projects, tasks, and comments.
This is the client-side interface for the Task Management system, featuring a sleek UI powered by Tailwind CSS.

---

##  Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/RaviGahire/task-board-frontend
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

---

##  Environment Configuration

Create a `.env` file in the root directory.

### For CRA

```env
REACT_APP_API_BASE_URL=http://localhost:8000/api/
```

### For Vite

```env
VITE_API_BASE_URL=http://localhost:8000/api/
```

---

### 3. Start the application

#### For CRA

```bash
npm start
```

#### For Vite

```bash
npm run dev
```

---

##  Data Flow

1. **User Action:** User interacts with UI (e.g., clicks "Delete Project")
2. **Component Trigger:** React component triggers an async function
3. **Service Layer:** Function calls API service (Axios)
4. **Backend Request:** Request goes to Node/Express backend
5. **Data Processing:** Backend performs database operations (MongoDB)
6. **UI Update:** React state updates → component re-renders

---

##  Folder Structure

```text
/src
  ├── /assets        # Images, icons, global styles
  ├── /components    # Reusable UI elements 
  ├── /context       # Global state 
  ├── /hooks         # Custom React hooks
  ├── /pages
  │     ├── /dashboard   # Dashboard related pages
  │     ├── /projects    # Project management pages
  │     ├── /tasks       # Task management pages
  │     └── /comments    # Comments related pages
  ├── /routes        # Application routing configuration
  ├── /services      # API calls using Axios
  ├── /utils         # Helper functions & utilities
  ├── App.jsx        # Main app layout & routing
  └── main.jsx       # Entry point

---

##  Tech Stack

* React.js
* Create React App
* Tailwind CSS
* Axios
* React Router

---

##  Best Practices

* **Separation of Concerns** → API logic inside `/services`
* **Reusable Components** → UI elements reused across app
* **Custom Hooks** → Business logic separated from UI
* **Responsive Design** → Mobile-first using Tailwind CSS

---

##  Features

* Project Management
* Task Tracking
* Comment System
* Clean UI
* API Integration

---

##  Notes

* Ensure backend server is running before starting frontend
* Update `.env` if API URL changes

---

##  Author

Ravi Gahire
