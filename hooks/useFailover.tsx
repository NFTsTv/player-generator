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
  const [activeSource, setActiveSource] = React.useState<Isource | null>(null);

  React.useEffect(() => {
    // validate sources
    validateSources().then((validSources) => {
      setValidSources(validSources);
    });
  }, [sources]);

  React.useEffect(() => {
    if (validSources.length > 0) {
      setActiveSource(validSources[0]);
      setStreamState(EAction.TO_ACTIVE);
    } else {
      setStreamState(EAction.TO_ERROR);
      setActiveSource(null);
    }
  }, [validSources]);

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
    return validSources;
  };

  const pollSources = () => {};

  const error = () => {
    setStreamState(EAction.TO_ERROR);
    // remove current source from validSources and failover to the next one
    const newValidSources = validSources.filter(
      (source) => source.src !== activeSource.src
    );
    console.log(newValidSources);
    setValidSources([...newValidSources]);
  };

  return {
    error,
    activeSource,
  };
};

export default useFailover;
