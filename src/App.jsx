import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import TaskForm from './component/TaskForm';
import TaskList from './component/TaskList';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/task-form" element={<TaskForm />} />
          <Route path="/task-list" element={<TaskList />} />
        </Routes>
      </Router>
    </div>
  );
}
