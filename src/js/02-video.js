var throttle = require('lodash.throttle');

const player = new Vimeo.Player('vimeo-player');
const VIDEOPLAYER = 'videoplayer-current-time';

player.on('timeupdate', throttle(updateTime, 1000));
const time = localStorage.getItem(VIDEOPLAYER) || 0;
player.setCurrentTime(time);

function updateTime(dataTime = {}) {
  videoplayerCurrentTime = dataTime.seconds;
  localStorage.setItem(VIDEOPLAYER, videoplayerCurrentTime);
}

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });
