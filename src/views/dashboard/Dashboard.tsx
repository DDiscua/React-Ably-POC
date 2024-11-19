import Ably from "ably";
import { useState } from "react";
import { ListCards } from "../../components";
import { useCustomAbly } from "../../hooks/useCustomAbly";

import { CardProps } from "../../components/Card";

export const Dashboard = () => {
  const { useChannel } = useCustomAbly();
  const [messages, setMessages] = useState<CardProps[]>([]);
  const channelName = "react-ably-poc";

  const { channel } = useChannel(channelName, (message: Ably.Message) => {
    console.log("Received message:", message);
    const { data } = message;
    setMessages((previousMessages) => [...previousMessages, data]);
  });
  return (
    <div>
      <section>
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4">
          Welcome to the ABLY POC
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          This Proof of Concept demonstrates the integration of Ably with React
          to build a responsive and real-time app.
        </p>
      </section>
      <div className="w-full flex flex-col space-y-10">
        <ListCards
          title="Features"
          cards={messages}
          cols={2}
          className="max-w-6xl w-full"
        />
      </div>
    </div>
  );
};
