import React from "react";
import useFailover from "hooks/useFailover";
import { playerContext } from "hooks/playerContext";
import DataCard from "components/InputDataCard";
import Player from "components/Player";
export default function Home() {
  const { playerSettings, streamState, setStreamState } =
    React.useContext(playerContext);
  const { sources, poster } = playerSettings;
  const { activeSource, error } = useFailover(
    sources,
    streamState,
    setStreamState
  );

  return (
    <div className="flex flex-row bg:black justify-center h-screen w-screen">
      <DataCard error={error} />
      <Player source={activeSource} poster={poster} onError={error}/>
      <p className="red">{streamState}</p>
    </div>
  );
}
