import { Audio } from 'expo-av';
import * as WebBrowser from "expo-web-browser"

const Spotify = {
  player: null,

  initializePlayer: async (accessToken) => {
    await WebBrowser.openBrowserAsync('https://sdk.scdn.co/spotify-player.js');

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = `Bearer ${accessToken}`;

      Spotify.player = new Spotify.Player({
        name: 'Your App Name',
        getOAuthToken: (cb) => {
          cb(token);
        },
      });

      Spotify.player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      Spotify.player.connect();
    };
  },

  playSong: async (trackUri) => {
    if (!Spotify.player) {
      console.log('Spotify player not initialized');
      return;
    }

    try {
      await Spotify.player.togglePlay();
      await Spotify.player.resume();
      await Spotify.player.load({
        spotify_uri: trackUri,
      });
      await Spotify.player.seek(0);
    } catch (error) {
      console.log('Error playing song:', error.message);
    }
  },
};

export default Spotify;
