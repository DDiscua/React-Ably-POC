import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from "ably/react";
import { useCustomAbly } from "../../hooks/useCustomAbly";

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
      <ChannelProvider channelName={channelName}>
        <ChannelWrapper>{children}</ChannelWrapper>
      </ChannelProvider>
    </AblyProvider>
  );
};

const ChannelWrapper = ({ children }: { children: React.ReactNode }) => {
  // Listen to connection state changes
  const { useConnectionStateListener } = useCustomAbly();
  useConnectionStateListener((connectionState) => {
    console.log("Connection state changed:", connectionState);
  });

  return children;
};
