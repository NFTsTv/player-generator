import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useLivepeer from "hooks/useLivepeer";
import Chat from "components/Chat";
import OfflineView from "components/Offline";
import { Player } from "@livepeer/react";
export default function Iframe() {
  const router = useRouter();
  const { query } = router;
  const { streamid, poster, sources } = query;
  const { activeSource, setPlayBackRecording } = useLivepeer(
    streamid as string
  );

  if (!activeSource) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <OfflineView />
        <button
          className="absolute bottom-1/2 mt-5 p-2 z-30 rounded bg-opacity-80 bg-blue-900 text-white m-4 cursor-pointer text-center w-64"
          onClick={() =>
            setPlayBackRecording(true)
          }
        >
          View latest stream
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row bg:black justify-center h-screen w-screen">
      <Player autoPlay src={activeSource} poster={poster as string} />
      <Chat chatId={streamid as string} />
    </div>
  );
}
