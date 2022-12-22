import { useState, useRef } from "react";
import VideoJS from "./VideoJS";
import { Isource } from "types/playerTypes";
interface PlayerProps {
  source: Isource;
  poster: string;
  setStatus?: (status: string) => void;
  onError: () => void;
}

const Player = ({ source, poster, onError }: PlayerProps) => {
  console.log(poster)
  const playerRef = useRef(null);
  const videoJsOptions = {
    poster: poster || "",
    autoplay: true,
    controls: true,
    responsive: true,
    sources: source ? [source] : null,
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.on("error", (e: any) => {
      console.log("error", player.error());
      onError();
    });

    player.on("waiting", () => {
      console.log("player is waiting");
      const currentPlaylist = player.tech().vhs.playlists.media();
      if (currentPlaylist?.custom?.livepeerError) {
        player.error({ code: "4" });
      }
    });
  };
  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />;
};

export default Player;
