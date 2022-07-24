import React from "react";
import { PlayerContextProvider } from "hooks/playerContext";
import DataCard from "components/InputDataCard";
import Player from "components/Player";

export default function Home() {
  return (
    <PlayerContextProvider>
      <div className="flex flex-row bg:black justify-center h-screen w-screen">
        <DataCard />
        <Player />
      </div>
    </PlayerContextProvider>
  );
}
