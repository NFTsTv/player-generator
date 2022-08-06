import React from "react";
import { Isource, EState, EAction } from "types/playerTypes";

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

const useFailover = (
  sources: Isource[],
  streamState: EState,
  setStreamState: (state: EAction) => void
) => {
  const [validSources, setValidSources] = React.useState<Isource[]>([]);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    undefined
  );


  React.useEffect(() => {
    // validate sources
    validateSources().then((validSources) => {
      setValidSources(validSources);
      if (validSources.length > 0) {
        setActiveIndex(0);
      }
    });
  }, []);

  const validateSources = async () => {
    const validSources = sources
      .filter((source) => validateUrl(source.src))
      .map((source, index) => {
        // ping source to see if it exists
        const sourceExists = pingUrl(source.src);
        if (sourceExists) {
          return source;
        }
      });
    return validSources
  };

  const pollSources = () => {};

  const failover = () => {
    // return whatever is active and not activeIndex
    // if (streamState === EState.ACTIVE) {
    //setStreamState(EAction.TO_POLLING);
    validSources.forEach((source, index) => {
      setActiveIndex(index);
      setStreamState(EAction.TO_ACTIVE);
      return;
    });
  };

  const error = () => {
    setStreamState(EAction.TO_ERROR);
    // remove current source from validSources and failover to the next one
    failover();
    const newValidSources = validSources.filter(
      (source, index) => index !== activeIndex
    );
    setValidSources([...newValidSources]);
  };

  return {
    failover,
    error,
    activeSource: validSources[activeIndex],
  };
};

export default useFailover;
