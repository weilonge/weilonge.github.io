var videoDom = document.querySelector('video');

var FILE = 'test.mp4';
var NUM_CHUNKS = 5;

VideoPlayer.init(videoDom,'video/mp4', function (){
  var self = this;

  var sourceBuffer = VideoPlayer.initSourceBuffer();

  console.log('mediaSource readyState: ' + this.readyState);

  GET(FILE, function(uInt8Array) {
    var file = new Blob([uInt8Array], {type: 'video/mp4'});
    var chunkSize = Math.ceil(file.size / NUM_CHUNKS);

    console.log('num chunks:' + NUM_CHUNKS);
    console.log('chunkSize:' + chunkSize + ', totalSize:' + file.size);

    // Slice the video into NUM_CHUNKS and append each to the media element.
    var i = 0;

    (function readChunk_(i) {
      var reader = new FileReader();

      // Reads aren't guaranteed to finish in the same order they're started in,
      // so we need to read + append the next chunk after the previous reader
      // is done (onload is fired).
      reader.onload = function(e) {
        sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
        console.log('appending chunk:' + i);
        if (i == NUM_CHUNKS - 1) {
          // Wait for sourceBuffer.updating === false
          console.log(sourceBuffer.updating);
        } else {
          if (videoDom.paused) {
            videoDom.play(); // Start playing after 1st chunk is appended.
          }
          readChunk_(++i);
        }
      };

      var startByte = chunkSize * i;
      var chunk = file.slice(startByte, startByte + chunkSize);

      reader.readAsArrayBuffer(chunk);
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
