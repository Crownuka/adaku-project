import { Moon, Sun } from "lucide-react";

const Header = ({ darkMode, handleToggleTheme }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold">
          Adaku
        </h1>

        <p className="text-gray-500">
          Stay organized. Stay productive.
        </p>
      </div>

      <button
        onClick={handleToggleTheme}
        className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
      >
        {darkMode ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </header>
  );
};

export default Header;