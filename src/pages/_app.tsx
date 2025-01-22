import '../app/globals.css'; // Adjust the path if needed
import type { AppProps } from 'next/app';
import Game from './Game';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Game/>
  );
}

export default MyApp;
