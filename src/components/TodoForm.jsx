import { Check, Plus } from "lucide-react";

const TodoForm = ({handleCreateTask,task, setTask, editingId,handleCancelEdit,darkMode,}) => {
  return (
    <form
      onSubmit={handleCreateTask}
      className="flex gap-3 mb-6"
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Buy groceries..."
        className={`flex-1 rounded-lg px-4 py-2.5 border transition-colors duration-300 focus:outline-none ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-400"
            : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
        }`}
      />

      {editingId !== null && (
        <button
          type="button"
          onClick={handleCancelEdit}
          className={`rounded-lg px-4 py-2.5 border transition-colors duration-300 ${
            darkMode
              ? "border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
              : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
          }`}
        >
          Cancel
        </button>
      )}

      <button
        type="submit"
        disabled={task.trim() === ""}
        className={`rounded-lg px-5 py-2.5 transition-colors duration-300 disabled:cursor-not-allowed ${
          darkMode
            ? "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-700"
            : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
        }`}
      >
        {editingId !== null ? (
          <Check className="w-5 h-5" />
        ) : (
          <Plus className="w-5 h-5" />
        )}
      </button>
    </form>
  );
};

export default TodoForm;