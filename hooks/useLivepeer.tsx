import React from "react";
import { Isource, EsrcTypes } from "types/playerTypes";
import {
  useStream,
  useStreamSessions,
  useStreamSession,
} from "@livepeer/react";

const useLivepeer = (streamId: string) => {
  const [currentStreamSession, setCurrentStreamSession] = React.useState(null);
  const [activeSource, setActiveSource] = React.useState<Isource | null>(null);
  const { data: stream } = useStream({
    streamId,
  });

  const { data: sessions } = useStreamSessions({
    streamId,
  });
 
  const { data: session } = useStreamSession(
    currentStreamSession ? currentStreamSession : ""
  );

  React.useEffect(() => {
    if (sessions && sessions?.length > 0) {
      const allReadySessions = sessions.filter(
        (s) => s.recordingStatus === "ready"
      );
      if (!allReadySessions || allReadySessions.length == 0) return;
      // find latest session
      const latestSession = allReadySessions.reduce((prev, current) =>
        prev.createdAt > current.createdAt ? prev : current
      );

      setCurrentStreamSession(latestSession.id);
    }
  }, [sessions]);

  React.useEffect(() => {
    if (stream?.isActive) {
      setActiveSource({
        ...activeSource,
        src: stream.playbackUrl,
        type: EsrcTypes.HLS,
      });
    } else if (session?.recordingStatus == "ready") {
      setActiveSource({
        ...activeSource,
        src: session.recordingUrl,
        type: EsrcTypes.HLS,
      });
    }
  }, [stream, currentStreamSession]);
  console.log(activeSource);

  return {
    activeSource,
  };
};

export default useLivepeer;
