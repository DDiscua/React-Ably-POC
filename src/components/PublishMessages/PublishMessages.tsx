import { useState } from "react";
import { useCustomAbly } from "../../hooks/useCustomAbly";

const LIMIT = 10;

export interface PublishMessagesProps {
  onPublish?: () => void;
  channelName: string;
  objectToPublish: unknown;
}

export const PublishMessages: React.FC<PublishMessagesProps> = ({
  onPublish,
  channelName,
  objectToPublish,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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

    for (let i = 0; i < numberValue; i++) {
      publishToChannel(channel, `INSERT_DATA_${i + 1}`, objectToPublish);
    }
  };

  return (
    <div className="flex justify-start align-top items-start space-x-16">
      <div className="w-full max-w-md">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a number to publish"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
      <button
        onClick={handlePublish}
        disabled={!!error || inputValue === ""} // Disable if there's an error or input is empty
        className={`w-[100px] h-[50px] m-0 ${
          error || inputValue === ""
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        } text-white font-semibold text-lg rounded-lg shadow-lg transition duration-300`}
      >
        Publish
      </button>
    </div>
  );
};
