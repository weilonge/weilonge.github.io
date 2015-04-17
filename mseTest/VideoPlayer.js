
var VideoPlayer = {};

VideoPlayer.init = function (dom, sourceType, callback){
  var self = this;
  this.videoDom = dom;

  window.MediaSource = window.MediaSource || window.WebKitMediaSource;
  if (!!!window.MediaSource) {
    alert('MediaSource API is not available');
  }

  this.mediaSource = new MediaSource();
  this.videoDom.src = window.URL.createObjectURL(this.mediaSource);

  this.mediaSource.addEventListener('sourceopen', callback, false);

  this.mediaSource.addEventListener('sourceended', function(e) {
    console.log('mediaSource readyState: ' + this.readyState);
  }, false);
};

VideoPlayer.initSourceBuffer = function (){
  var self = this;
  this.sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4');

  function endSteam() {
    if(!self.sourceBuffer.updating){
      self.mediaSource.endOfStream();
      self.sourceBuffer.removeEventListener("updateend", endSteam);
    }
  }
  this.sourceBuffer.addEventListener("updateend", endSteam);

  return this.sourceBuffer;
};

