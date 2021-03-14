// Its better to attach a `Media Source JS Object instead of video source`
// Gives more control as its backed by (n) "SourceBuffers" for (1...n) instances of audio & video `types`.
// “type” is defined by its MIME type, which may also include information about the media codec(s) used

const videoTag = document.getElementById("my-video");
const myMediaSource = new MediaSource();
const url = URL.createObjectURL(myMediaSource);
// Attaching the MediaSource to the video tag
videoTag.src = url;

// 1. add source buffers
const audioSourceBuffer = myMediaSource.addSourceBuffer('audio/mp4; codecs="mp4a.40.2"');
const videoSourceBuffer = myMediaSource.addSourceBuffer('video/mp4; codecs="avc1.64001e"');

// 2. download and add our audio/video to the SourceBuffers for the audio SourceBuffer
// OPTION 1 - fetch in one go
fetch("http://server.com/audio.mp4")
	.then(function(response) {
		return response.arrayBuffer(); // needs JavaScript ArrayBuffer
	}).then(function(audioData) {
  		audioSourceBuffer.appendBuffer(audioData);
	});

// the same for the video SourceBuffer
fetch("http://server.com/video.mp4")
	.then(function(response) {
		return response.arrayBuffer(); // needs JavaScript ArrayBuffer
	}).then(function(videoData) {
		videoSourceBuffer.appendBuffer(videoData);
	});

// OPTION 2 - Instead of fetch(...  use fetchSegment(... e.g.
// This is `OLD` and the Range HTTP header might be used instead by the client to obtain those files segmented
/*
// Defined
function fetchSegment(url) {
  return fetch(url).then(function(response) {
    return response.arrayBuffer();
  });
}
// Used
fetchSegment("http://server.com/audio/segment0.mp4")
    .then(function(audioSegment0) {
      audioSourceBuffer.appendBuffer(audioSegment0);
    })
  	.then(function() {
    	return fetchSegment("http://server.com/audio/segment1.mp4");
  	})
  	.then(function(audioSegment1) {
    	audioSourceBuffer.appendBuffer(audioSegment1);
  	})
    .then(function() {
      return fetchSegment("http://server.com/audio/segment2.mp4");
  	})
  	.then(function(audioSegment2) {
    	audioSourceBuffer.appendBuffer(audioSegment2);
  	})

// same thing for video segments
fetchSegment("http://server.com/video/segment0.mp4")
  	.then(function(videoSegment0) {
    	videoSourceBuffer.appendBuffer(videoSegment0);
  	});
    //...
*/    