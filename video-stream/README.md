This is a basic sample of how to do video streaming using Node.js and HTML5

# RUN

		- npm install followed by npm start

## ASPECTS

- manifest
- network bandwidth
- user preferences
- segment or range
- subtitles
- thumbnails
- DRM

## SERVER

Adaptive streaming structure:

On the server-side, the segments are actually encoded in multiple qualities. 
For example, 

- ./audio/
	- ./esperanto/
		- ./128kbps/
			- segment0.mp4
			- segment1.mp4
		- ./320kbps/
			- segment0.mp4
			- segment1.mp4
	- ./french/
		- ./128kbps/
			- segment0.mp4
			- segment1.mp4
		- ./320kbps/
			- segment0.mp4
			- segment1.mp4
- ./video/
	- ./240p/
		- segment0.mp4
		- segment1.mp4
	- ./480p/
		- segment0.mp4
		- segment1.mp4

PS - guess the language; estimate the bandwidth 
say from the time it took to download the last segments then
	use return bandwidth > 320e3 ? "320kpbs" : "128kbps";

Disadv: So many files; multiple downloads on switching - better use range from Server.

Live Streaming is done by various Streaming Media Protocol. A Manifest is a file describing which segments are available on the server.

- DASH - protocol used by YouTube, Netflix & Prime - manifest: Media Presentation Description (or MPD)
- HLS - Apple - manifest: m3u8 playlist
- Smooth Streaming - Microsoft - manifest: Manifests

Open source Video.js; hls.js; Google shaka-player; dash.js; WordPress Video Gallery






