import React from "react";
import useFailover from "hooks/useFailover";
import { playerContext } from "hooks/playerContext";
import Player from "components/Player";
import { Isource, EsrcTypes } from "types/playerTypes";

interface AllowedQueryString {
  main?: Isource;
  backup?: Isource;
  poster?: string;
}

export default function Iframe() {
  const {
    playerSettings,
    streamState,
    setStreamState,
    setPlayerSettings,
  } = React.useContext(playerContext);
  const { sources, poster } = playerSettings;
  const { activeSource, error } = useFailover(
    sources,
    streamState,
    setStreamState
  );

  React.useEffect(() => {
    if (window !== undefined) {
      const urlParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlParams.entries());
      const sources: string[] = params.sources.split(",");
      setPlayerSettings({
        sources: sources.map((source) => {
          return { src: source, type: EsrcTypes.HLS };
        }),
        poster: params.poster,
      });
    }
  }, []);

  return (
    <div className="flex flex-row bg:black justify-center h-screen w-screen">
      <Player source={activeSource} poster={poster} onError={error} />
    </div>
  );
}
