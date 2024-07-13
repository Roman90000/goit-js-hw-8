import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(evt) {
  localStorage.setItem(KEY_TIME, JSON.stringify(evt.seconds));
}

player.setCurrentTime(JSON.parse(localStorage.getItem(KEY_TIME)));
