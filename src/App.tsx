import reactLogo from "./assets/react.svg";
import { AblyWrapper } from "./components";
import { Outlet } from "react-router-dom";
import { useCustomAbly } from "./hooks/useCustomAbly";
import "./App.css";

function App() {
  const channelName = "react-ably-poc";
  const { client } = useCustomAbly();

  return (
    <div className="min-h-screen min-w-screen flex flex-col w-full">
      <header className="text-white py-4 shadow-md bg-[#242424] w-full">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={reactLogo} alt="Logo" className="react logo" />
            <span className="text-xl font-bold">React Ably POC</span>
          </div>

          <nav className="space-x-4">
            <a href="#" className="hover:underline">
              Home
            </a>
            <a href="#features" className="hover:underline">
              Publisher
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow min-h-[90vh] max-w-6xl mx-auto px-4 py-8 flex flex-col flex-start">
        <AblyWrapper channelName={channelName} client={client}>
          <Outlet />
        </AblyWrapper>
      </main>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>
            Built with <span className="text-red-500">♥</span> using Ably and
            React.
          </p>
          <p id="contact" className="text-sm mt-2">
            &copy; {new Date().getFullYear()} Your Name or Company. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
