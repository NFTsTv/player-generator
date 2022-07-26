import React from "react";
import { IplayerSettings, Isource, EState, EAction } from "types/playerTypes";
import { playerContext } from "./playerContext";

const validateUrl = (url: string) => {
  const urlRegex =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return urlRegex.test(url);
};

// ping endpoints to see if they exist
const pingUrl = (url: string) => {
  return fetch(url, { method: "HEAD" })
    .then((response) => response.ok)
    .catch(() => false);
};

const useFailover = ({ sources }: IplayerSettings) => {
  const {
    activeIndex,
    setActiveIndex,
    streamState,
    setStreamState,
    validSources,
    setValidSources,
  } = React.useContext(playerContext);

  React.useEffect(() => {
    // validate sources
    const validSources = sources.filter((source) => validateUrl(source.src));
    console.log(validSources);
    setValidSources(validSources);
  }, [sources]);

  React.useEffect(() => {
    console.log(streamState, activeIndex);
  }, [streamState, activeIndex]);

  React.useEffect(() => {
    // start polling
    console.log(streamState);
    if (streamState === EState.IDLE) {
      //gsetStreamState(EAction.TO_POLLING);
      // for each source, ping it and if it's valid, set it as the active source
      validSources.forEach((source, index) => {
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
    // if (streamState === EState.ACTIVE) {
      //setStreamState(EAction.TO_POLLING);
      validSources.forEach((source, index) => {
        console.log(source.src, index, activeIndex);
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
    // }
  };

  return {
    streamState,
    failover,
    activeSource: validSources[activeIndex],
  };
};
export default useFailover;
