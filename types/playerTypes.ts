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
  streamState: EState
  setActiveIndex: (index: number) => void;
  setStreamState: React.Dispatch<EAction>
  activeIndex: number | undefined,
  validSources: Isource[],
  setValidSources: React.Dispatch<React.SetStateAction<Isource[]>>
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
