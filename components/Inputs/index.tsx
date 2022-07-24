import React from "react";

interface Iinput {
  value: string;
  lable: string;
  placeholder: string;
  setValue: (value: string) => void;
}

interface IselectInput extends Iinput {
  options: string[];
}

export const SelectInput = ({
  value,
  lable,
  options,
  setValue,
}: IselectInput): JSX.Element => (
  <>
    {lable && <label>{lable}</label>}
    <div className="bg-white rounded-sm border flex items-center px-4 py-1 cursor-pointer">
      <select
        className="bg-transparent border-none w-full focus:outline-none"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  </>
);

export const TextInput = () => {
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

// const SourceInput = () => {
//   const [value, setValue] = React.useState("");
//   const [src, setSrc] = React.useState("");

//   return (
//     <>
//       <label>Input source 2</label>
//       <div className="bg-white rounded-sm border flex items-center px-4 py-1 cursor-pointer">
//         <TextInput />
