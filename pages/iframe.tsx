import React from "react";
import { Isource, EsrcTypes } from "types/playerTypes";
import { Player as LivepeerPlayer } from "@livepeer/react";
import { useRouter } from "next/router";
import useLivepeer from "hooks/useLivepeer";
import Chat from "components/Chat";
import OfflineView from "components/Offline";

export default function Iframe() {
  const router = useRouter();
  const { query } = router;
  let activeSource: Isource;
  const { streamid, poster, sources } = query;
  const {
    activeSource: livepeerSrc,
    session,
    setActiveSource,
    stream
  } = useLivepeer(streamid as string);
  activeSource = livepeerSrc;
  if (!activeSource && sources) {
    activeSource = { src: sources as string, type: EsrcTypes.HLS };
  }

  return (
    <div className="flex flex-col md:flex-row bg:black justify-center h-screen w-screen">
      {activeSource ? (
        <>
          <LivepeerPlayer
            objectFit="cover"
            src={activeSource?.src}
            poster={poster as string}
            autoPlay
          />
          {<Chat chatId={streamid as string} />}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <OfflineView />
          <button
            className="absolute bottom-1/2 mt-5 p-2 z-30 rounded bg-opacity-80 bg-blue-900 text-white m-4 cursor-pointer text-center w-64"
            onClick={() =>
              setActiveSource({
                src: session.recordingUrl,
                type: EsrcTypes.HLS,
              })
            }
          >
            View latest stream
          </button>
        </div>
      )}
    </div>
  );
}
