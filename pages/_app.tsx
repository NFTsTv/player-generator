import "styles/globals.css";
import { PlayerContextProvider } from "hooks/playerContext";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <Component {...pageProps} />
    </PlayerContextProvider>
  );
}

export default MyApp;
