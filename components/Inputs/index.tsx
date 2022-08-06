import React, { useEffect } from "react";
import { Isource, TUpdateSource, EsrcLables } from "types/playerTypes";
interface Iinput {
  value: string;
  lable: string | null;
  placeholder: string | null;
  setValue: (value: string) => void;
}

interface IselectInput extends Iinput {
  options: EsrcLables[];
  setValue: (option: EsrcLables) => void;
}

interface IsrcInput {
  lable: string | null;
  placeholder: string | null;
  source: Isource;
  setSource: TUpdateSource;
  index: number;
}

export const SelectInput = ({
  value,
  lable = null,
  options,
  setValue,
}: IselectInput): JSX.Element => (
  <>
    {lable && <label>{lable}</label>}
    <div className="bg-white rounded-sm border flex items-center px-4 py-1 cursor-pointer w-full">
      <select
        className="bg-transparent border-none w-full focus:outline-none"
        placeholder="Search"
        value={value}
        disabled
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

export const TextInput = ({
  lable = null,
  value,
  setValue,
  placeholder = null,
}: Iinput): JSX.Element => (
  <div>
    {lable && <label>{lable}</label>}
    <div className="bg-white rounded-sm border flex items-center px-4 py-1 cursor-pointer">
      <input
        className="bg-transparent border-none w-full focus:outline-none"
        placeholder={placeholder && placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  </div>
);

export const SourceInput = ({ lable, source, setSource, index }: IsrcInput) => {
  const [srcType, setSrcType] = React.useState(source.type);
  const [src, setSrc] = React.useState(source.src);

  React.useEffect(() => {

    setSource(
      {
        type: srcType,
        src: src,
      },
      index
    );
  }, [srcType, src]);

  return (
    <div>
      {lable && <label>{lable}</label>}

      <div className="flex flex-row">
        <div className="flex w-full">
          <TextInput
            value={src}
            setValue={setSrc}
            lable={null}
            placeholder={"full video src"}
          />
        </div>
        <div className="flex w-1/3">
          <SelectInput
            lable={null}
            placeholder={null}
            value={srcType}
            setValue={setSrcType}
            options={[EsrcLables.HLS, EsrcLables.MP4]}
          />
        </div>
      </div>
    </div>
  );
};
