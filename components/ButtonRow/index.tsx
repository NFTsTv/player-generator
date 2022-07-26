import React from "react";
import { playerContext } from "hooks/playerContext";
import useFailover from "hooks/useFailover";
const CustomButton = ({ text, onClick }: { text: string; onClick: any }) => (
  <div
    role="CustomButton"
    className="bg-white rounded-sm border flex items-center px-4 py-1 cursor-pointer"
    onClick={onClick}
  >
    <span className="text-gray-600">{text}</span>
  </div>
);

const ButtonRow = () => {
  const { playerSettings, updateSource, updatePoster } =
    React.useContext(playerContext);
  const { failover } = useFailover(playerSettings);
  return (
    <div className="flex flex-row space-x-1">
      <CustomButton onClick={failover} text="Failover" />
      <CustomButton text="Get Iframe" />
      <CustomButton text="Src 1" />
      <CustomButton text="Src 2" />
    </div>
  );
};

export default ButtonRow;
