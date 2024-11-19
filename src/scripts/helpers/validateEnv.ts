const ABLY_KEY = process.env.REACT_APP_ABLY_KEY;

export const validateEnv = () => {
  if (!ABLY_KEY) {
    throw new Error("REACT_APP_ABLY_KEY is not defined");
  }
};
