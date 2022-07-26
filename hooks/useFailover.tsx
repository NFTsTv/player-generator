import React from "react";
import { IplayerSettings, Isource } from "types/playerTypes";

const validateUrl = (url: string) => {
  const urlRegex =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return urlRegex.test(url);
};

enum EState {
  IDLE = "IDLE",
  ACTIVE = "ACTIVE",
  ERROR = "ERROR",
  POLLING = "POLLING",
}

enum EAction {
  TO_ACTIVE = "TO_ACTIVE",
  TO_IDLE = "TO_IDLE",
  TO_ERROR = "TO_ERROR",
  TO_POLLING = "TO_POLLING",
}

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

// ping endpoints to see if they exist
const pingUrl = (url: string) => {
  return fetch(url, { method: "HEAD" })
    .then((response) => response.ok)
    .catch(() => false);
};

const useFailover = ({ sources }: IplayerSettings) => {
  const [validSources, setValidSources] = React.useState<Isource[]>([]);
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);
  const [streamState, setStreamState] = React.useReducer(
    switchState,
    EState.IDLE
  );

  React.useEffect(() => {
    // validate sources
    const validSources = sources.filter((source) => validateUrl(source.src));
    console.log(validSources);
    setValidSources([...validSources]);
  }, [sources]);

  React.useEffect(() => {
    // start polling
    console.log(streamState)
    if (streamState === EState.IDLE) {
      //gsetStreamState(EAction.TO_POLLING);
      // for each source, ping it and if it's valid, set it as the active source
      validSources.forEach((source, index) => {
        console.log(source, "sourceeeeeeeeeeeeeeeeeeee")
        pingUrl(source.src).then((isValid) => {
          if (isValid) {
            setActiveIndex(index);
            setStreamState(EAction.TO_ACTIVE);
            return;
          }
        });
      });
    }
  }, [validSources]);

  const failover = () => {
    // return whatever is active and not activeIndex
    if (streamState === EState.ACTIVE) {
      setStreamState(EAction.TO_POLLING);
      validSources.forEach((source, index) => {
        if (index !== activeIndex) {
          pingUrl(source.src).then((isValid) => {
            if (isValid) {
              setActiveIndex(index);
              setStreamState(EAction.TO_ACTIVE);
              return;
            }
          });
        }
      });
    }
  };

  return {
    streamState,
    currentActiveSource: validSources[activeIndex],
    failover,
  };
};
export default useFailover;