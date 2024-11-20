export const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="bg-white text-gray-800 p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">
          About This Proof of Concept
        </h1>
        <p className="text-lg leading-7 mb-6">
          This Proof of Concept demonstrates the seamless integration of{" "}
          <span className="font-semibold text-indigo-600">Ably</span> with{" "}
          <span className="font-semibold text-indigo-600">React</span> to build
          a responsive and real-time application. It highlights how to leverage
          Ably's real-time messaging capabilities to dynamically render
          components and manipulate data in a performant way.
        </p>
        <p className="text-lg leading-7 mb-6">
          The app features a table that always displays the most recent event at
          the top, with data populated from the{" "}
          <span className="font-semibold text-indigo-600">PUBLISH</span> page.
          The demo uses{" "}
          <span className="font-semibold text-indigo-600">virtualization</span>{" "}
          to efficiently render large datasets and handle updates in real time,
          showcasing a practical approach to building scalable applications.
        </p>
        <p className="text-lg leading-7 mb-6">
          <ol>
            <li>
              <strong>Real-time updates:</strong> Automatically updates the UI
              when new events are received.
            </li>
            <li>
              <strong>Virtualized rendering:</strong> Efficiently renders only
              the visible rows in the viewport for better performance.
            </li>
            <li>
              <strong>Data manipulation:</strong> Provides functionality to
              sort, update, and manage event data dynamically.
            </li>
          </ol>
        </p>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Connect with Me</h2>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/david-discua/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.23 0zM7.09 20.45H3.64V9h3.45v11.45zM5.37 7.64C4.13 7.64 3.1 6.6 3.1 5.37s1.04-2.27 2.27-2.27c1.24 0 2.27 1.03 2.27 2.27 0 1.23-1.03 2.27-2.27 2.27zm15.09 12.81h-3.45V14.5c0-1.42-.03-3.25-1.98-3.25-1.98 0-2.29 1.55-2.29 3.15v6.05H9.29V9h3.31v1.56h.05c.46-.87 1.6-1.78 3.29-1.78 3.52 0 4.17 2.32 4.17 5.34v6.33z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/DDiscua"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg shadow-md flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.607-4.042-1.607-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.304 3.495.997.108-.776.418-1.305.762-1.605-2.665-.306-5.466-1.334-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.305-.535-1.537.117-3.205 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.004-.403c1.02.005 2.045.138 3.003.403 2.292-1.552 3.3-1.23 3.3-1.23.653 1.668.241 2.9.118 3.205.768.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.623-5.48 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.293 0 .32.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
