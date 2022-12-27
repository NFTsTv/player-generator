import React from "react";
import Player from "components/Player";
import { Isource, EsrcTypes } from "types/playerTypes";

import { useRouter } from "next/router";
import useLivepeer from "hooks/useLivepeer";

export default function Iframe() {
  const router = useRouter();
  const { query } = router;
  let activeSource: Isource;
  const { streamid, poster, sources } = query;
  const { activeSource: livepeerSrc } = useLivepeer(streamid as string);
  activeSource = livepeerSrc;
  if (!activeSource && sources) {
    activeSource = { src: sources as string, type: EsrcTypes.HLS };
  }

  const onError = () => {};

  return (
    <div className="flex flex-row bg:black justify-center h-screen w-screen">
      <Player
        source={activeSource}
        poster={poster as string}
        onError={onError}
      />
    </div>
  );
}
