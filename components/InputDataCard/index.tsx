
import React from "react";
import Draggable from "react-draggable";
import TextInput from "components/Inputs";


const DataCard = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" >
      <Draggable>
        {!isOpen ? (
          <div className="border-2 border-green-600 rounded-lg px-3 py-2 text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-200"
            onClick={() => setIsOpen(true)}
          
          >
            Lets go!
          </div>
        ) : (
          <div className="items-center justify-center w-96 bg-white p-6 rounded-lg border-2 border-gray-50 shadow-white shadow-sm">
            <div id="settings" className="flex flex-col">
              <TextInput />
              <TextInput />
              <TextInput />
              <label>Style</label>
              <input type="select" id="style" />
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default DataCard;