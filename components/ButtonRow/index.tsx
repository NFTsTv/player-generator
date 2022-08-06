import React from "react";
import { playerContext } from "hooks/playerContext";
import useFailover from "hooks/useFailover";

const generateIframeString = () => {
  // generate Iframe String and compy to clipboard
  // const iframeString = `<iframe width="560" height="315" src="${validSources[activeIndex].src}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  // navigator.clipboard.writeText(iframeString);
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
const ButtonRow = ({failover, error}) => {

  return (
    <div className="flex flex-row space-x-1">
      <CustomButton onClick={failover} text="Failover" />
      <CustomButton onClick={generateIframeString} text="Get Iframe" />
      <CustomButton onClick={error} text="Src 1" />
      <CustomButton onClick={playSrc2} text="Src 2" />
    </div>
  );
};

export default ButtonRow;
