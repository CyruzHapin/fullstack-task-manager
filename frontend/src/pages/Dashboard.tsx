import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await axios.post(
      "http://localhost:5000/api/tasks",
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>

      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Task title"
          className="border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={addTask}
          className="bg-black text-white p-2 rounded"
        >
          Add Task
        </button>
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="border p-3 mb-2 flex justify-between"
        >
          <p>{task.title}</p>
          <button
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 text-white p-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
