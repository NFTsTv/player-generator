import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Chat from "components/Chat";
import OfflineView from "components/Offline";
import {
  Player,
  useStream,
  useStreamSession,
  useStreamSessions,
} from "@livepeer/react";

export default function Iframe() {
  const router = useRouter();
  const { query } = router;
  const { streamid, poster, sources, chat } = query;
  const [activeSource, setActiveSource] = useState<string | null>(null);
  const [playBackRecording, setPlayBackRecording] = useState<boolean>(false);

  const { data: stream } = useStream({
    streamId: streamid as string,
    refetchInterval: (stream) => (!stream?.isActive ? 5000 : false),
  });

  const { data: sessions } = useStreamSessions({
    streamId: streamid as string,
  });

  useEffect(() => {
    if (sessions && sessions?.length > 0 && playBackRecording) {
      const allReadySessions = sessions.filter(
        (s) => s.recordingStatus === "ready"
      );
      if (!allReadySessions || allReadySessions.length == 0) return;
      // find latest session
      const latestSession = allReadySessions.reduce((prev, current) =>
        prev.createdAt > current.createdAt ? prev : current
      );
      console.log(latestSession);
      setActiveSource(latestSession.mp4Url);
    }

    if (stream?.isActive) {
      setActiveSource(stream.playbackUrl);
      setPlayBackRecording(false);
    }

  }, [sessions, playBackRecording, stream]);




  if (!activeSource) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <OfflineView />
        {sessions && sessions?.length > 0 && (
          <button
            className="absolute bottom-1/2 mt-5 p-2 z-30 rounded bg-opacity-80 bg-blue-900 text-white m-4 cursor-pointer text-center w-64"
            onClick={() => setPlayBackRecording(true)}
          >
            View latest stream
          </button>
        )}
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
