import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Local Storage থেকে ডাটা লোড
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = { id: Date.now(), text: task };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const completeTask = (id) => {
    const filtered = tasks.filter((t) => t.id !== id);
    setTasks(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-6 tracking-wide">
        Task Manager
      </h1>

      {/* Input Field */}
      <div className="flex gap-2 w-full max-w-md bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-lg">
        <input
          type="text"
          className="flex-1 p-3 rounded-xl bg-white/20 placeholder-gray-300 text-white outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="mt-8 w-full max-w-md space-y-3">
        <AnimatePresence>
          {tasks.map((t) => (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg"
            >
              <span className="text-lg">{t.text}</span>
              <button
                onClick={() => completeTask(t.id)}
                className="px-4 py-1 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300"
              >
                Complete
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default App;
