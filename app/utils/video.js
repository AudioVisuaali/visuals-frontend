import ReactPlayer from 'react-player';

const MATCH_TWITCH_CLIP_URL = /(?:clips\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/;

export function canPlayVideo(url) {
  return ReactPlayer.canPlay(url) || MATCH_TWITCH_CLIP_URL.test(url);
}

export function base64URLDecode(URL) {
  try {
    const decoded = atob(URL);
    const json = JSON.parse(decoded);

    if (!json.url) {
      return null;
    }

    return json;
  } catch (e) {
    return null;
  }
}
