import { PublishMessages } from "../../components";
import { ABLY_CHANNEL } from "../../config/ably";

export const Publisher: React.FC = () => {
  const channelName = ABLY_CHANNEL;

  return (
    <div className="w-full">
      <PublishMessages channelName={channelName} />
    </div>
  );
};
