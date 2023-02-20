import "styles/globals.css";
import { PlayerContextProvider } from "hooks/playerContext";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

function MyApp({ Component, pageProps }) {
  console.log(process.env.NEXT_PUBLIC_LIVEPEER_API_KEY)
  const client = createReactClient({
    provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY }),
    storage: {
      getItem: async (key, defaultState) => {
        return defaultState;
      },
      setItem: async (key, value) => {
        
      },
      removeItem: async (key) => {},
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
