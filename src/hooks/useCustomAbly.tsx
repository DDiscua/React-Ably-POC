import { useChannel, useConnectionStateListener } from "ably/react";
import ablyClient from "./ablyClient";
import * as Ably from "ably";

export const useCustomAbly = () => {
  const connect = () => {
    ablyClient.connection.on("connected", () => {
      console.log("Connected to Ably!");
    });
  };

  const disconnect = () => {
    ablyClient.connection.off("connected", () => {
      console.log("Disconnected from Ably!");
    });
  };

  const getConnectionState = () => {
    return ablyClient.connection.state;
  };

  const createChannel = (channelName: string) => {
    return ablyClient.channels.get(channelName);
  };

  const getChannel = (channelName: string) => {
    return ablyClient.channels.get(channelName);
  };

  const subscribeToChannel = (
    channel: Ably.RealtimeChannel,
    eventName: string,
    callback: (message: Ably.Message) => void
  ) => {
    channel.subscribe(eventName, callback);
  };

  const publishToChannel = (
    channel: Ably.RealtimeChannel,
    eventName: string,
    data: unknown
  ) => {
    channel.publish(eventName, data);
  };

  return {
    useChannel,
    useConnectionStateListener,
    createChannel,
    subscribeToChannel,
    publishToChannel,
    connect,
    disconnect,
    getConnectionState,
    getChannel,
    client: ablyClient, // Return the singleton client for direct use if needed
  };
};
