import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import { toast,ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  
import {useNavigate} from 'react-router-dom'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const navigate=useNavigate();

  const priorityColors = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200",
  };

  const statusColors = {
    pending: "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-emerald-100 text-emerald-800",
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://taskify-backend-7gvy.onrender.com/api/task",
        {
          withCredentials: true,
        }
      );
      setTasks(response.data);
    } catch (err) {
      setError("Failed to fetch tasks");
      toast.error("Failed to fetch tasks"); 
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://taskify-backend-7gvy.onrender.com/api/task/delete-task/${id}`,
        {
          withCredentials: true,
        }
      );
      fetchTasks();
      toast.success("Task deleted successfully!");  
    } catch (err) {
      setError("Failed to delete task");
      toast.error("Failed to delete task");  
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete(
        "https://taskify-backend-7gvy.onrender.com/api/task/delete-all",
        {
          withCredentials: true,
        }
      );
      setTasks([]);
      toast.success("All tasks deleted successfully!");  
    } catch (err) {
      setError("Failed to delete all tasks");
      toast.error("Failed to delete all tasks"); 
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://taskify-backend-7gvy.onrender.com/api/auth/logout",
        {
          withCredentials: true,
        }
      );
      toast.success("Logged out successfully!");  
    
    
    navigate("/login")
    } catch (err) {
      setError("Failed to log out");
      toast.error("Failed to log out");  
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add New Task
            </button>
            {tasks.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete All
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {task.title}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{task.description}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    statusColors[task.status]
                  }`}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
                {task.dueDate && (
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {(showForm || editingTask) && (
          <TaskForm
            task={editingTask}
            onClose={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
            onTasksUpdate={fetchTasks}
            setError={setError}
          />
        )}
      </div>

     
      <ToastContainer />
    </div>
  );
};

export default TaskList;
