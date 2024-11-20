import reactLogo from "./assets/react.svg";
import { AblyWrapper } from "./components";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useCustomAbly } from "./hooks/useCustomAbly";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import { ROUTES } from "./routes";
import "./App.css";
import { ABLY_CHANNEL } from "./config/ably";

export const App: React.FC = () => {
  const channelName = ABLY_CHANNEL;
  const location = useLocation();
  const { client } = useCustomAbly();

  const handleActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  console.log("App", location);
  return (
    <div className="min-h-screen min-w-screen flex flex-col w-full">
      <header className="text-white  w-full">
        <Navbar fluid rounded className=" py-4 shadow-md">
          <Navbar.Brand >
            <img src={reactLogo} className="mr-3 h-6 sm:h-9" alt="React Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              React Ably POC
            </span>
            <DarkThemeToggle className="ml-5" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link active={handleActiveRoute(ROUTES.dashboard.base)}>
              <Link to={ROUTES.dashboard.base}>Dashboard</Link>
            </Navbar.Link>
            <Navbar.Link active={handleActiveRoute(ROUTES.publisher.base)}>
              <Link to={ROUTES.publisher.base}>Publisher</Link>
            </Navbar.Link>
            <Navbar.Link active={handleActiveRoute(ROUTES.about.base)}>
              <Link to={ROUTES.about.base}>About</Link>
            </Navbar.Link>
            <Navbar.Link></Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </header>

      {/* Main Content */}
      <main className="flex-grow min-h-[80vh] max-w-6xl mx-auto px-4 py-8 flex flex-col flex-start w-full">
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
            &copy; {new Date().getFullYear()} DD. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
