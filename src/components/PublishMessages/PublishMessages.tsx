import { useState } from "react";
import { useCustomAbly } from "../../hooks/useCustomAbly";
import { v4 as uuidv4 } from "uuid";
import { Button } from "flowbite-react";
import JsonView from "@uiw/react-json-view";
import { generateRandomObjects } from "./util";

const LIMIT = 100;

export interface PublishMessagesProps {
  onPublish?: () => void;
  channelName: string;
}

export const PublishMessages: React.FC<PublishMessagesProps> = ({
  onPublish,
  channelName,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [sequentialId, setSequentialId] = useState<number>(1);
  const [publishedData, setPublishedData] = useState<object[]>([]);

  const { publishToChannel, getChannel } = useCustomAbly();

  // Handle input change and validate
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const numberValue = parseFloat(value);

    // Validation: Check if input is a valid number and <= 500
    if (isNaN(numberValue)) {
      setError("Please enter a valid number.");
      return;
    }

    if (numberValue > LIMIT) {
      setError(`The number cannot be greater than ${LIMIT}.`);
      return;
    }

    setError(null);
  };

  const handlePublish = () => {
    const numberValue = parseFloat(inputValue);

    if (!isNaN(numberValue) && numberValue <= LIMIT) {
      if (onPublish) {
        onPublish();
      }
    }
    // Publish the message
    const channel = getChannel(channelName);
    let tempSequentialId = sequentialId;

    const publishedData = generateRandomObjects(numberValue);
    for (const objectToPublish of publishedData) {
      publishToChannel(channel, `INSERT_DATA_PUBLISHER`, {
        ...objectToPublish,
        sequentialId: tempSequentialId++,
        id: uuidv4(),
      });
    }

    //set the new sequentialId
    setSequentialId(tempSequentialId);
    setPublishedData(publishedData);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white text-gray-800 p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">Publisher</h1>
        <p className="text-lg leading-7 mb-6">
          The <span className="font-semibold text-purple-600">Publisher</span>{" "}
          is a dynamic tool that allows users to generate and push{" "}
          <span className="font-semibold text-purple-600">
            pseudo-random objects
          </span>{" "}
          to the Ably messaging system. By specifying the number of events in
          the input field, the Publisher will create the corresponding number of
          randomized data objects and send them to the designated Ably channel.
        </p>
      </div>
      <div className="flex justify-between">
        <div className="max-w-4xl w-full">
          <div className="flex justify-center align-top items-start space-x-16 w-full">
            <div className="w-full max-w-md">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter a number to publish"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
            <Button
              color={`${error || inputValue === "" ? "gray" : "success"}`}
              onClick={handlePublish}
              disabled={!!error || inputValue === ""}
              className={`font-semibold text-lg rounded-lg shadow-lg transition duration-300`}
            >
              Publish
            </Button>
          </div>
          <div className="bg-white text-gray-800 p-8">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <ul className="list-disc list-inside space-y-3 mb-6">
              <li>
                <span className="font-semibold text-indigo-600">
                  Input-Based Generation:
                </span>{" "}
                Users specify the number of objects to be generated. Each object
                is assigned a{" "}
                <span className="font-semibold">sequential ID</span> and
                populated with random data such as titles, descriptions, and
                timestamps.
              </li>
              <li>
                <span className="font-semibold text-indigo-600">
                  Real-Time Event Propagation:
                </span>{" "}
                Generated objects are immediately pushed to the{" "}
                <span className="font-semibold text-purple-600">
                  Ably channel
                </span>
                , ensuring instant updates in the Dashboard.
              </li>
              <li>
                <span className="font-semibold text-indigo-600">
                  Non-Persistent Data:
                </span>{" "}
                All data exists only for the current session and resets upon app
                reload, making it ideal for demonstrations.
              </li>
            </ul>
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg text-gray-800">
                  Sequential IDs
                </h3>
                <p className="text-gray-600">
                  Each generated object is assigned a unique, incremental ID for
                  easy identification and tracking.
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg text-gray-800">
                  Randomized Data
                </h3>
                <p className="text-gray-600">
                  Objects are enriched with pseudo-random values for attributes
                  like title, description, and timestamps to simulate diverse
                  inputs.
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg text-gray-800">
                  Ably Integration
                </h3>
                <p className="text-gray-600">
                  Real-time messaging ensures that data pushed by the Publisher
                  is instantly reflected in the Dashboard.
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg text-gray-800">
                  Session-Based
                </h3>
                <p className="text-gray-600">
                  Data exists only for the current session, making this ideal
                  for demonstrations or proof-of-concept scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl w-full ">
          <h2 className="text-lg font-semibold mb-4 px-8">
            Data to Publish : {!error ? inputValue : ""}
          </h2>
          <div className="p-8 max-h-[800px] overflow-auto scrollable-container ">
            <JsonView value={publishedData} />
          </div>
        </div>
      </div>
    </div>
  );
};
