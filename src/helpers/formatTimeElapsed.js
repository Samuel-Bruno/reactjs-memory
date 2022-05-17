const formatTimeElapsed = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  seconds -= (minutes * 60);

  let minStr = minutes.toString().padStart(2, '0');
  let secStr = seconds.toString().padStart(2, '0');

  return `${minStr}:${secStr}`;
}


export default formatTimeElapsed;