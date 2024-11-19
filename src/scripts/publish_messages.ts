import { validateEnv } from "./helpers";
import * as Ably from 'ably';
// script to simulate a publisher sending messages to a channel
const ABLY_KEY = process.env.REACT_APP_ABLY_KEY;

validateEnv();

const publishMessages = async (client: Ably, messageCount: number) => {
  console.log("Publishing messages to Ably...");
};

// Run the script
(async () => {
  const args = process.argv.slice(2);
  if (!args[0]) {
    throw new Error("Please provide a channel name");
  }

  if (!args[1] || isNaN(Number(args[1]))) {
    throw new Error(
      "Please provide a valid number of a message to be published"
    );
  }

  const channelName = args[0];
  const messageCount = Number(args[1]);

  // Lets connect to Ably and publish messages]
  const client = new Ably.Realtime({
    key: ABLY_KEY,
    channel: channelName,
  });

  await publishMessages();
})();
