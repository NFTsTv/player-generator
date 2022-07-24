export enum EsrcLables {
  HLS = "hls",
  MP4 = "mp4",
  WEBM = "webm",
  YOUTUBE = "youtube",
}

export enum EsrcTypes {
  HLS = "application/x-mpegURL",
  MP4 = "video/mp4",
  YOUTUBE = "video/youtube",
}

export interface Isource {
  src: string | null;
  type: EsrcTypes | EsrcLables;
}

export type TUpdateSource = (source: Isource, index: number) => void;

export interface IplayerSettings {
  sources: Isource[];
  poster: string;
}

export type TupdatePoster = (poster: IplayerSettings["poster"]) => void;

export interface IplayerContext {
  playerSettings: IplayerSettings;
  updateSource: TUpdateSource;
  updatePoster: TupdatePoster;
}
