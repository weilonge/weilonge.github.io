window.addEventListener('load', () => {
  const yt = document.getElementsByClassName('youtube-video')[0];
  if (yt.requestFullscreen) {
    yt.requestFullscreen();
  } else if (yt.webkitRequestFullscreen) { /* Safari */
    yt.webkitRequestFullscreen();
  } else if (yt.msRequestFullscreen) { /* IE11 */
    yt.msRequestFullscreen();
  }
});
