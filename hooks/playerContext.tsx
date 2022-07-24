import React from "react";

export enum EsrcLables {
  HLS = "hls",
  MP4 = "mp4",
  WEBM = "webm",
  YOUTUBE = "youtube",
}

export enum EsrcTypes {
  HLS = "application/x-mpegURL",
  MP4 = "video/mp4",
  YOUTUBE = "video/youtube",
}

export interface Isource {
  src: string | null;
  type: EsrcTypes | EsrcLables;
}

export type TUpdateSource = (source: Isource, index: number) => void;

export interface IplayerSettings {
  sources: Isource[];
  poster: string;
}

export type TupdatePoster = (poster: IplayerSettings["poster"]) => void;

export interface IplayerContext {
  playerSettings: IplayerSettings;
  updateSource: TUpdateSource;
  updatePoster: TupdatePoster;
}

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
