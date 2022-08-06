import { useState, useRef } from "react";
import VideoJS from "./VideoJS";
import { Isource } from "types/playerTypes";
interface PlayerProps {
  source: Isource;
  poster: string;
  setStatus?: (status: string) => void;
}

const Player = ({ source, poster }: PlayerProps) => {
  // if (!src) return <img width={'100%'} src={poster ?? '/posters/default.png'} alt="poster" />
  console.log(source)
  const playerRef = useRef(null);
  const videoJsOptions = {
    poster: poster || "",
    autoplay: true,
    controls: true,
    responsive: true,
    sources: [source],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.reloadSourceOnError({
      // getSource allows you to override the source object used when an error occurs
      getSource: function (reload: any) {
        console.log("Reloading because of an error");
        // onStreamError() // this should automatically trigger player reload
      },
      errorInterval: 1,
    });

    player.on("error", (e: any) => {
      console.log("error", player.error());
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
