import { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
// import 'videojs-mux'
// import 'videojs-youtube'

// TODO: Need to change types
export const VideoJS = (props: any) => {
  const videoRef = useRef(null);
  const playerRef = useRef<videojs.Player | null>(null);
  const { options, onReady } = props;

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current && options.sources) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      // videojs.registerPlugin('hlsQualitySelector', qualitySelector)
      // videojs.registerPlugin('qualityLevels', contribQualityLevels)
      const initTime = Date.now();
      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          errorDisplay: false,
          html5: {
            vhs: {
              customTagParsers: [
                {
                  expression: /#EXT-X-ERROR/,
                  customType: "livepeerError",
                },
              ],
            },
          },
        },
        () => {
          onReady && onReady(player);
        }
      ));
    } else {
      if (playerRef.current) {
        const player = playerRef.current;
        if (player.src() !== options.sources) {
          player.src(options.sources);
        }
      }
      if (!options.sources) {
        playerRef.current?.dispose();
        playerRef.current = null;
      }
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current
    if (player) player.hlsQualitySelector({ displayCurrentQuality: true })
    return () => {
      if (player) {
        playerRef.current?.dispose();
        playerRef.current = null;
      }
    }
  }, [playerRef])

  if (!options.sources) return <img width={'100%'} src={props.options.poster ?? '/posters/default.png'} alt="poster" />;

  return (
    <div data-vjs-player style={{ height: "100%", width: "100%" }}>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default VideoJS;
