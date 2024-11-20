import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";

export interface AblyWrapperProps {
  children: React.ReactNode;
  client: Ably.Realtime;
  channelName: string;
}

export const AblyWrapper = ({
  client,
  children,
  channelName,
}: AblyWrapperProps) => {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={channelName}>{children}</ChannelProvider>
    </AblyProvider>
  );
};
