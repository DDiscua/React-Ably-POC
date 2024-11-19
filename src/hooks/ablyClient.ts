import * as Ably from "ably";

const ABLY_KEY = import.meta.env.VITE_ABLY_KEY;

// Create a singleton Ably client instance
const ablyClient = new Ably.Realtime({
  key: ABLY_KEY,
});

export default ablyClient;
