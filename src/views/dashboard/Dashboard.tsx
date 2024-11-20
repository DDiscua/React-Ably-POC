import Ably from "ably";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Table, TableData } from "../../components";
import { useCustomAbly } from "../../hooks/useCustomAbly";
import { ABLY_CHANNEL } from "../../config/ably";
import debounce from "lodash/debounce";

export const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { useChannel, useConnectionStateListener } = useCustomAbly();
  const [data, setData] = useState<TableData[]>([]);
  const channelName = ABLY_CHANNEL;

  useConnectionStateListener((connectionState) => {
    console.log("Connection state changed:", connectionState);
  });

  // Debounce the search term update
  const updateDebouncedSearchTerm = useCallback(
    debounce((value) => setDebouncedSearchTerm(value), 300),
    [searchTerm]
  );

  useEffect(() => {
    updateDebouncedSearchTerm(searchTerm);
    return () => updateDebouncedSearchTerm.cancel();
  }, [searchTerm, updateDebouncedSearchTerm]);

  useChannel(channelName, (message: Ably.Message) => {
    const { data } = message;
    setData((previousMessages) => [
      {
        ...data,
        eventId: message.id,
        connectionId: message.connectionId,
      },
      ...previousMessages,
    ]);
  });

  const handleUpdate = (id: string, newDescription: string) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id
          ? {
              ...row,
              description: newDescription,
              updatedAt: new Date().toISOString(),
            }
          : row
      )
    );
  };

  const handleDelete = (eventId: string) => {
    setData((prevData) => prevData.filter((row) => row.eventId !== eventId));
  };

  // Filter logic
  const filteredData = useMemo(() => {
    // NO a 100% realistic filter for huge amount of data.
    if (!debouncedSearchTerm) return data;

    const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();

    return data.filter((item) =>
      Object.values(item).some((value) => {
        if (Array.isArray(value)) {
          return value.some((arrayItem) =>
            arrayItem.toLowerCase().includes(lowerCaseSearchTerm)
          );
        }
        return String(value).toLowerCase().includes(lowerCaseSearchTerm);
      })
    );
  }, [data, debouncedSearchTerm]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <section className="bg-white text-gray-800 px-8 max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Welcome to the ABLY POC
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          This Proof of Concept demonstrates the seamless integration of Ably
          with React to build a responsive, real-time application. It showcases
          how to leverage Ably's real-time messaging capabilities to render data
          dynamically and ensure a smooth user experience. The table is designed
          to always display the most recent event at the top, enabling users to
          view updates in real time without needing to refresh the page.
        </p>
      </section>
      <div className="space-y-10 w-full">
        <div className="w-full flex flex-col space-y-54">
          <h2 className="text-2xl font-semibold mb-4">Filters</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="w-full flex flex-col space-y-10">
          <Table
            data={filteredData}
            channelName={channelName}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
