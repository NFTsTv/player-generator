import React from "react";
import {
  IplayerContext,
  IplayerSettings,
  EsrcTypes,
  TUpdateSource,
  TupdatePoster,
  EAction,
  EState,
  Isource,
} from "types/playerTypes";

const playerContext = React.createContext<IplayerContext>(null);

const switchState = (currentState: EState, action: EAction) => {
  switch (currentState) {
    case EState.IDLE:
      switch (action) {
        case EAction.TO_ACTIVE:
          return EState.ACTIVE;
        case EAction.TO_ERROR:
          return EState.ERROR;
      }
    case EState.ACTIVE:
      switch (action) {
        case EAction.TO_IDLE:
          return EState.IDLE;
        case EAction.TO_ERROR:
          return EState.ERROR;
      }
    case EState.ERROR:
      switch (action) {
        case EAction.TO_IDLE:
          return EState.IDLE;
      }
    case EState.POLLING:
      switch (action) {
        case EAction.TO_ACTIVE:
          return EState.ACTIVE;
        case EAction.TO_IDLE:
          return EState.IDLE;
        case EAction.TO_ERROR:
          return EState.ERROR;
        case EAction.TO_POLLING:
          return EState.POLLING;
      }
  }
};

const PlayerContextProvider = ({ children }) => {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
    undefined
  );
  const [streamState, setStreamState] = React.useReducer(
    switchState,
    EState.IDLE
  );
  const [playerSettings, setPlayerSettings] =
    React.useState<IplayerSettings | null>({
      sources: [
        { src: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8", type: EsrcTypes.HLS },
        { src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", type: EsrcTypes.HLS },
      ],
      poster: "",
    });

  const [validSources, setValidSources] = React.useState<Isource[]>([]);

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
    streamState,
    setActiveIndex,
    setStreamState,
    activeIndex,
    validSources,
    setValidSources,
  };

  return (
    <playerContext.Provider value={value}>{children}</playerContext.Provider>
  );
};

export { playerContext, PlayerContextProvider };
