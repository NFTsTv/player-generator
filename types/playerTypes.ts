export interface Isource {
  src: string | null;
  type: EsrcTypes | EsrcLables;
}

export interface IplayerSettings {
  sources: Isource[];
  poster: string;
}

export interface IplayerContext {
  playerSettings: IplayerSettings;
  updateSource: TUpdateSource;
  updatePoster: TupdatePoster;
  streamState: EState;
  setStreamState: React.Dispatch<EAction>;
  setPlayerSettings: React.Dispatch<IplayerSettings>;
}

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

export enum EState {
  IDLE = "IDLE",
  ACTIVE = "ACTIVE",
  ERROR = "ERROR",
  POLLING = "POLLING",
}

export enum EAction {
  TO_ACTIVE = "TO_ACTIVE",
  TO_IDLE = "TO_IDLE",
  TO_ERROR = "TO_ERROR",
  TO_POLLING = "TO_POLLING",
}

export type TupdatePoster = (poster: IplayerSettings["poster"]) => void;

export type TUpdateSource = (source: Isource, index: number) => void;
