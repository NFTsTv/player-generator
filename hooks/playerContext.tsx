import React from "react";
import {
  IplayerContext,
  IplayerSettings,
  EsrcTypes,
  TUpdateSource,
  TupdatePoster,
} from "types/playerTypes"

const playerContext = React.createContext<IplayerContext>(null);

const PlayerContextProvider = ({ children }) => {
  const [playerSettings, setPlayerSettings] =
    React.useState<IplayerSettings | null>({
      sources: [
        { src: "", type: EsrcTypes.HLS },
        { src: "", type: EsrcTypes.HLS },
      ],
      poster: "",
    });

  const updateSource: TUpdateSource = (source, index) => {
    const newSources = [...playerSettings.sources];
    newSources[index] = source;
    setPlayerSettings({ ...playerSettings, sources: newSources });
  };

  const updatePoster: TupdatePoster = (poster) => {
    setPlayerSettings({
      ...playerSettings,
      poster,
    });
  };

  const value = {
    playerSettings,
    updateSource,
    updatePoster,
  };

  return (
    <playerContext.Provider value={value}>{children}</playerContext.Provider>
  );
};

export { playerContext, PlayerContextProvider };
