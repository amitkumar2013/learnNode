document.addEventListener('DOMContentLoaded', init, false);

// Manipulate the video here
function init() {
	// Player
	const VP = document.getElementById('videoPlayer')
	const VPToggle = document.getElementById('toggleButton')
	// Start/Stop button
	VPToggle.addEventListener('click', function() {
		if (VP.paused) 
			VP.play()
		else 
			VP.pause()
	})
	// Other fuctions are VP.currentTime=10;
}