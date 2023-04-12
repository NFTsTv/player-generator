import React from "react";
import { useRouter } from "next/router";
import OfflineView from "components/Offline";
import {
  Player,
  useStream,
} from "@livepeer/react";
import PoweredBy from "components/PoweredBy";
export default function Iframe() {
  const router = useRouter();
  const { query } = router;
  const { streamid, poster } = query;

  const { data: stream } = useStream({
    streamId: streamid as string,
    refetchInterval: (stream) => (!stream?.isActive ? 5000 : false),
  });

  if (!stream?.playbackUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <OfflineView />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row bg:black justify-center h-screen w-screen">
      <PoweredBy />
      <Player autoPlay src={stream.playbackUrl} poster={poster as string} />
    </div>
  );
}
