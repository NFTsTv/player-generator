import "styles/globals.css";
import { PlayerContextProvider } from "hooks/playerContext";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

function MyApp({ Component, pageProps }) {
  const client = createReactClient({
    provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API }),
    storage: {
      getItem: (key, defaultState) => {
        return defaultState;
      },
      setItem: (key, defaultState) => {
        return defaultState;
      },
      removeItem: (key) => {},
    },
  });

  return (
    <LivepeerConfig client={client}>
      <PlayerContextProvider>
        <Component {...pageProps} />
      </PlayerContextProvider>
    </LivepeerConfig>
  );
}

export default MyApp;
