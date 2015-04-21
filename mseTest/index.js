var videoDom = document.querySelector('video');

var FILE = 'test.mp4';
var NUM_CHUNKS = 5;

VideoPlayer.init(videoDom,'video/mp4', function (){
  var self = this;

  var sourceBuffer = VideoPlayer.initSourceBuffer();

  console.log('mediaSource readyState: ' + this.readyState);

  GET(FILE, function(uInt8Array) {
    var chunkSize = Math.ceil(uInt8Array.byteLength / NUM_CHUNKS);

    console.log('num chunks:' + NUM_CHUNKS);
    console.log('chunkSize:' + chunkSize + ', totalSize:' + uInt8Array.byteLength);

    var i = 0;

    (function readChunk_(i) {
      function updateHandler(){
        sourceBuffer.removeEventListener('update', updateHandler);
        if (i == NUM_CHUNKS - 1) {
          // Wait for sourceBuffer.updating === false
          console.log(sourceBuffer.updating);
        } else {
          if (videoDom.paused) {
            videoDom.play(); // Start playing after 1st chunk is appended.
          }
          readChunk_(++i);
        }
      }

      sourceBuffer.addEventListener('update', updateHandler);

      var startByte = chunkSize * i;
      var chunk = uInt8Array.subarray(startByte, startByte + chunkSize);
      sourceBuffer.appendBuffer(chunk);
    })(i);  // Start the recursive call by self calling.
  });

});

function GET(url, callback) {
  console.log(url);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.send();

  xhr.onload = function(e) {
    if (xhr.status != 200) {
      alert("Unexpected status code " + xhr.status + " for " + url);
      return false;
    }
    callback(new Uint8Array(xhr.response));
  };
}
