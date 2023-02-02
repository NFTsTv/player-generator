import React from "react";
import Player from "components/Player";
import { Isource, EsrcTypes } from "types/playerTypes";
import { Player as LivepeerPlayer } from "@livepeer/react";
import { useRouter } from "next/router";
import useLivepeer from "hooks/useLivepeer";

const ChatButton = ({ chatId }: { chatId: string }) => {
  const [showChat, setShowChat] = React.useState(false);

  if (!showChat) {
    return (
      <div
        className="absolute top-0 right-0 p-2 z-30 rounded bg-opacity-80 bg-blue-900 text-white m-4 cursor-pointer w-16 text-center animate-bounce"
        onClick={() => setShowChat(true)}
      >
        Chat
      </div>
    );
  }

  return (
    <>
      <div
        className="absolute top-0 right-0 p-2 z-30 rounded bg-opacity-80 bg-blue-900 text-white m-4 cursor-pointer w-16 text-center"
        onClick={() => setShowChat(false)}
      >
        Close
      </div>
      <iframe
        className="md:w-1/4 md:h-full h-1/2 bg-white"
        src={`https://stingray-app-u9f8x.ondigitalocean.app/${chatId}`}
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </>
  );
};

export default function Iframe() {
  const router = useRouter();
  const { query } = router;
  let activeSource: Isource;
  const { streamid, poster, sources } = query;
  const { activeSource: livepeerSrc } = useLivepeer(streamid as string);
  activeSource = livepeerSrc;
  if (!activeSource && sources) {
    activeSource = { src: sources as string, type: EsrcTypes.HLS };
  }

  const onError = () => {};

  return (
    <div className="flex flex-col md:flex-row bg:black justify-center h-screen w-screen">
      <LivepeerPlayer
        objectFit="cover"
        src={activeSource?.src}
        poster={poster as string}
        autoPlay
      />
      <ChatButton chatId={streamid as string} />
    </div>
  );
}
