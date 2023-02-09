import { useState, useEffect } from "react";
import {
  useStream,
  useStreamSessions,
  useStreamSession,
} from "@livepeer/react";

const useLivepeer = (livepeerId: string) => {
  const [activeSource, setActiveSource] = useState<string | null>(null);
  const [playBackRecording, setPlayBackRecording] = useState<boolean>(false);

  const { data: stream } = useStream({
    streamId: livepeerId,
    refetchInterval: (stream) => (!playBackRecording && !stream?.isActive ? 5000 : false),
  });

  const { data: sessions } = useStreamSessions({
    streamId: livepeerId,
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
      setActiveSource(latestSession.recordingUrl);
    }
  }, [sessions, playBackRecording]);

  useEffect(() => {
    if (stream?.isActive) {
      setActiveSource(stream.playbackUrl);
      setPlayBackRecording(false);
    }
  }, [stream]);

  return {
    activeSource,
    setPlayBackRecording,
  };
};

export default useLivepeer;