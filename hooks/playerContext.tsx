import React from "react";
import useFailover from "./useFailover";
import {
  IplayerContext,
  IplayerSettings,
  TUpdateSource,
  TupdatePoster,
  EAction,
  EsrcTypes,
  EState,
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

  const [streamState, setStreamState] = React.useReducer(
    switchState,
    EState.IDLE
  );

  const [playerSettings, setPlayerSettings] =
    React.useState<IplayerSettings | null>({
      sources: [
        {
          src: "",
          type: EsrcTypes.HLS,
        },
        {
          src: "",
          type: EsrcTypes.HLS,
        },
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
    streamState,
    setStreamState,
    setPlayerSettings
  };

  return (
    <playerContext.Provider value={value}>{children}</playerContext.Provider>
  );
};

export { playerContext, PlayerContextProvider };
