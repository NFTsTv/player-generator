import "styles/globals.css";
import { PlayerContextProvider } from "hooks/playerContext";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
  noopStorage,
  createStorage,
} from "@livepeer/react";

function MyApp({ Component, pageProps }) {
  console.log(process.env.NEXT_PUBLIC_LIVEPEER_API_KEY);
  const client = createReactClient({
    provider: studioProvider({
      apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY,
    }),
    storage: createStorage({
      storage: noopStorage,
    }),
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
