import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { App } from "./App";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { CommentProvider } from "./context/CommentContext";
import { DashboardProvider } from "./context/DashboardContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProjectProvider>
      <TaskProvider>
        <CommentProvider>
          <DashboardProvider>
            <App />
          </DashboardProvider>
        </CommentProvider>
      </TaskProvider>
    </ProjectProvider>
  </React.StrictMode>,
);

reportWebVitals();
