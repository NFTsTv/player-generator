import React, { useContext } from "react";
import { playerContext } from "hooks/playerContext";
import Draggable from "react-draggable";
import { TextInput, SelectInput, SourceInput } from "components/Inputs";
import ButtonRow from "components/ButtonRow";
import LogoRow from "components/LogoRow";

const DataCard = ({ error }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { playerSettings, updateSource, updatePoster } =
    useContext(playerContext);

  return (
    <Draggable bounds="parent">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="items-center justify-center  w-96 bg-white p-3 rounded-lg border-2 border-gray-50 shadow-white shadow-sm">
          <div id="settings" className="flex flex-col space-y-6">
            {isOpen && (
              <>
                {playerSettings.sources.map((source, index) => (
                  <SourceInput
                    key={index}
                    index={index}
                    source={source}
                    setSource={updateSource}
                    lable={"input src " + index}
                    placeholder={"input your video source"}
                  />
                ))}
                <TextInput
                  placeholder="poster image"
                  lable="poster"
                  value={playerSettings.poster}
                  setValue={updatePoster}
                />
                <ButtonRow error={error} />
              </>
            )}
            <>
              <LogoRow
                onClick={() => {
                  setIsOpen(true);
                }}
              />
            </>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default DataCard;
