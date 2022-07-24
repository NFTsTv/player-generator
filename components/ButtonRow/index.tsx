import React from "react";


const CustomButton = ({text}:{text:string}) =>(
  <div role="CustomButton" className="bg-white rounded-sm border flex items-center px-4 py-1 cursor-pointer">
    <span className="text-gray-600">{text}</span>
  </div>
) 

const ButtonRow = () => {

  return (
    <div className="flex flex-row space-x-1">
      <CustomButton text="Failover" />
      <CustomButton text="Get Iframe" />
      <CustomButton text="Src 1" />
      <CustomButton text="Src 2" />

    </div>
  );
}


export default ButtonRow;