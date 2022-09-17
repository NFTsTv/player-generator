import React from "react";
import { playerContext } from "hooks/playerContext";
import useFailover from "hooks/useFailover";
import { Isource } from "types/playerTypes";

const generateIframeString = (sources: Isource[]) => {
  // generate Iframe String and compy to clipboard
  const sourcesAsStrings = sources.map((source) => source.src);
  const sourcesString = sourcesAsStrings.join(",");
  const iframeString = `<iframe src="http://localhost:3000/iframe?sources=${sourcesString}&poster=https://streameth.tv/social.png" width="640" height="360" frameborder="0" allowfullscreen></iframe>`;
  navigator.clipboard.writeText(iframeString);
};

const goToPlayer = (sources: Isource[]) => {
  const sourcesAsStrings = sources.map((source) => source.src);
  const sourcesString = sourcesAsStrings.join(",");
  const route = `/iframe?sources=${sourcesString}&poster=https://streameth.tv/social.png`;
  window.location.href = route;
};

const playSrc1 = () => {
  // check is src is valid
  // if (validSources[0] !== undefined) {
  //   setActiveIndex(0);
  //   setStreamState(EAction.TO_ACTIVE);
  // }
};

const playSrc2 = () => {
  // check is src is valid
  // if (validSources[1] !== undefined) {
  //   setActiveIndex(1);
  //   setStreamState(EAction.TO_ACTIVE);
  // }
};

const CustomButton = ({ text, onClick }: { text: string; onClick: any }) => (
  <div
    role="CustomButton"
    className="bg-white rounded-sm border flex items-center px-4 py-1 cursor-pointer"
    onClick={onClick}
  >
    <span className="text-gray-600">{text}</span>
  </div>
);

// TODO
const ButtonRow = ({ error }) => {
  const { playerSettings } = React.useContext(playerContext);

  const { sources, poster } = playerSettings;

  return (
    <div className="flex flex-row space-x-1">
      <CustomButton
        onClick={() => {
          generateIframeString(sources);
        }}
        text="Get Iframe"
      />
      <CustomButton onClick={error} text="Failover" />
      <CustomButton onClick={() => goToPlayer(sources)} text="Go to player" />
    </div>
  );
};

export default ButtonRow;
