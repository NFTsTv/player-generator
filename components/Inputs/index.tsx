import React from "react";

const TextInput = () => {
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

export default TextInput;