import { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import { Pencil, Trash2 } from "lucide-react";

const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");

 
  //when the todos state changes, it will save the updated list of todos to local storage. This way, any changes you make to your tasks (adding, editing, completing, or deleting) will be saved and persist across browser sessions.
useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // CREATE & UPDATE
  const handleCreateTask = (e) => {
    e.preventDefault();

    const trimmedTask = task.trim();

    if (trimmedTask === "") return;

    if (editingId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId
            ? { ...todo, text: trimmedTask }
            : todo
        )
      );

      setEditingId(null);
      setTask("");
      return;
    }

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: trimmedTask,
        completed: false,
      },
    ]);

    setTask("");
  };

  // COMPLETE
  const handleToggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // DELETE
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // EDIT
  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setTask(todo.text);
  };

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingId(null);
    setTask("");
  };

  // THEME
  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };
// FILTER
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true; // for "all" filter
  });
  return (
    <div
      className={`min-h-screen px-4 py-10 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="w-full max-w-lg mx-auto">

        <Header
          darkMode={darkMode}
          handleToggleTheme={handleToggleTheme}
        />

        <TodoForm
          handleCreateTask={handleCreateTask}
          task={task}
          setTask={setTask}
          editingId={editingId}
          handleCancelEdit={handleCancelEdit}
          darkMode={darkMode}
        />
        <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("incomplete")}
              className={`px-4 py-2 rounded-lg ${
                filter === "incomplete"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg ${
                filter === "completed"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              Completed
            </button>
          </div>
        {todos.length === 0 ? (
          <p
            className={`text-center ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Create your first task to get started..
          </p>
        ) : (
          <ul className="flex flex-col gap-3">

            {filteredTodos.map((todo) => (

              <li
                key={todo.id}
                className={`group flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >

                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    handleToggleCompleted(todo.id)
                  }
                  className="h-5 w-5 cursor-pointer"
                />

                <span
                  className={`flex-1 transition-colors ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : darkMode
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => handleEdit(todo)}
                  className={`rounded p-2 transition-colors ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className={`rounded p-2 transition-colors ${
                    darkMode
                      ? "text-red-400 hover:bg-red-900"
                      : "text-red-500 hover:bg-red-100"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </li>

            ))}

          </ul>
        )}

      </div>
    </div>
  );
};

export default App;