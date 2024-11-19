import { PublishMessages } from "../../components";
import { CARD_DATA } from "../../mock";

export const Publisher = () => {
  const channelName = "react-ably-poc";

  return (
    <div className="w-full">
      <PublishMessages
        channelName={channelName}
        objectToPublish={CARD_DATA[0]}
      />
    </div>
  );
};
