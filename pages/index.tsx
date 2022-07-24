import React from "react";
import { playerContext } from "hooks/playerContext";
import DataCard from "components/InputDataCard";
import Player from "components/Player";

export default function Home() {
  const { playerSettings } = React.useContext(playerContext);
  const {sources, poster} = playerSettings;
  const onStreamError = (error: Error) => {
    alert(error.message);
  }

  return (
      <div className="flex flex-row bg:black justify-center h-screen w-screen">
        <DataCard />
        <Player src={sources[0]} poster={poster} onStreamError={onStreamError}/>
      </div>
  );
}
