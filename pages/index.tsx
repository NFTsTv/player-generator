import React from "react";
import useFailover from "hooks/useFailover";
import { playerContext } from "hooks/playerContext";
import DataCard from "components/InputDataCard";
import Player from "components/Player";
export default function Home() {
  const { playerSettings } = React.useContext(playerContext);
  const { sources, poster } = playerSettings;
  const { activeSource } = useFailover(playerSettings);

  return (
    <div className="flex flex-row bg:black justify-center h-screen w-screen">
      <DataCard />
      <Player source={activeSource} poster={poster} />
    </div>
  );
}
