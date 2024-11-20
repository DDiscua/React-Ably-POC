# React-Ably-POC

This project is a Proof of Concept (POC) demonstrating real-time integration using Ably with React, built on Vite. It showcases how to manage and display real-time data updates efficiently with features like:

- A filterable table with debounced search.
- JSON data handling.
- Tailwind CSS for styling.
- Ably integration for real-time messaging.
- Virtualized rendering for large datasets.

While currently basic, the project lays the groundwork for future enhancements like multi-channel support, advanced data visualization, and more robust real-time features.

## 🚀 Features

- **Real-Time Updates:** Uses Ably for instant updates when events are published.
- **Dynamic Filtering:**
  Includes a search bar to filter data across all fields, with debounce optimization.
- **Virtualized Rendering:**
  Efficiently handles large datasets for performance.
- **Tailwind CSS:** Fully styled for a modern and responsive UI.
- **Ephemeral Data:** Data exists only during the session, making it suitable for demos and POCs.

## 🎥 Demo

https://github.com/user-attachments/assets/0fd1250c-6b16-4b19-b1c3-954a39da4810

## 🛠️ Tech stack

- **Vite:** A fast build tool for modern web apps.
- **React:** The library for building the UI.
- **Ably:** Real-time messaging and event handling.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Lodash:** Used for debounced search.
- **React Virtualization:** Handles efficient rendering of large datasets.

## 🏗️ How It Works

### Publisher:

- Generates and publishes pseudo-random objects to an Ably channel.
- Users can specify the number of objects to publish.

### Dashboard:

- Listens to the Ably channel for real-time updates.
- Displays incoming data in a virtualized, filterable table.

### Debounced Search:

- Allows users to search through table data with minimal performance impact using a debounced input.

### JSON Viewer:

- Renders JSON data interactively for easy inspection.

## How to Run the Project

1. Clone the Repository : https://github.com/DDiscua/React-Ably-POC.git
2. npm install
3. Add into the .env file : VITE_ABLY_KEY=your-ably-api-key
4. npm run dev
5. http://localhost:5173

## 📖 Future Enhancements

This demo is a basic implementation that will be improved with features such as:

- Multi-Channel Support: Publish and listen to multiple Ably channels simultaneously.
- Persistent Data: Add local or cloud-based persistence for real-time data.
- Advanced Filtering: Implement filters for specific fields (e.g., categories or timestamps).
- Pagination: Handle large datasets with server-side pagination.
- Improved UI/UX: Introduce charts, animations, and enhanced visualizations.
-

## 🌟 Acknowledgments

- Built with ❤️ and Vite, React, Tailwind, and Ably.
