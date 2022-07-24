import React from "react";
import Draggable from "react-draggable";

const Input = () => {
  const [value, setValue] = React.useState("");

  return (
    <>
      <label>Input source 1</label>
      <div className="bg-white rounded-sm border flex items-center px-4 py-1 cursor-pointer">
        <input
          className="bg-transparent border-none w-full focus:outline-none"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </>
  );
};

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
              <Input />
              <Input />
              <Input />
              <label>Style</label>
              <input type="select" id="style" />
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-row w-full h-full bg:black justify-center ">
      <DataCard />
    </div>
  );
}
