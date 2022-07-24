import React from "react";

interface Isource {
  src: string | null;
  type: string;
}

interface IplayerSettings {
  sources: Isource[];
  poster: string;
  onStreamError: () => void;
}

const playerContext = React.createContext(null);

const PlayerContextProvider = ({ children }) => {
  const [playerSettings, setPlayerSettings] =
    React.useState<IplayerSettings | null>(null);

  const updateSource = (source: Isource): void => {
    setPlayerSettings({
      ...playerSettings,
      sources: [...playerSettings.sources, source],
    });
  };

  const updatePoster = ({poster}: IplayerSettings): void => {
    setPlayerSettings({
      ...playerSettings,
      poster,
    });
  }

  const value = {
    playerSettings,
    updateSource,
    updatePoster
  };


  return (
    <playerContext.Provider value={value}>
      {children}
    </playerContext.Provider>
  );
};


export { playerContext, PlayerContextProvider };