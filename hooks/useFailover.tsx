import React from "react";
import { IplayerSettings, Isource } from "types/playerTypes";


const validateUrl = (url: string) => {
  const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return urlRegex.test(url);
}

const useFailover = ({ sources }: IplayerSettings) => {
  const [currentSource, setCurrentSource] = React.useState<Isource>(null);


  const pingUrl = (url: string) => {}

  const failover = () => {}




  return {
    currentSource,
  };
};
