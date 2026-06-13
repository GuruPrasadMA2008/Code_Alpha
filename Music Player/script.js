// List of songs
// To use real songs, replace the 'src' with a path to an actual .mp3 file
// Example: src: "songs/mysong.mp3"
var songs = [
  { title: "Song One",   artist: "Artist A", src: "" },
  { title: "Song Two",   artist: "Artist B", src: "" },
  { title: "Song Three", artist: "Artist C", src: "" }
];

// Keep track of which song is playing
var currentIndex = 0;
var isPlaying = false;

// Get elements from the page
var audio      = document.getElementById("audio");
var playBtn    = document.getElementById("play-btn");
var progress   = document.getElementById("progress");
var volumeBar  = document.getElementById("volume");
var currentTimeEl = document.getElementById("current-time");
var durationEl    = document.getElementById("duration");
var titleEl    = document.getElementById("song-title");
var artistEl   = document.getElementById("song-artist");
var playlistEl = document.getElementById("playlist");

// Build the playlist on the page
function buildPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach(function(song, index) {
    var li = document.createElement("li");
    li.textContent = song.title + " — " + song.artist;
    li.onclick = function() { loadSong(index); playAudio(); };
    playlistEl.appendChild(li);
  });
}

// Load a song into the player
function loadSong(index) {
  currentIndex = index;
  var song = songs[index];

  titleEl.textContent  = song.title;
  artistEl.textContent = song.artist;
  audio.src = song.src;
  progress.value = 0;

  // Highlight active song in playlist
  var items = playlistEl.querySelectorAll("li");
  items.forEach(function(li) { li.classList.remove("active"); });
  items[index].classList.add("active");
}

// Play the audio
function playAudio() {
  if (audio.src && audio.src !== window.location.href) {
    audio.play();
  }
  isPlaying = true;
  playBtn.textContent = "⏸ Pause";
}

// Pause the audio
function pauseAudio() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶ Play";
}

// Toggle play / pause
function playPause() {
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

// Go to next song
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  if (isPlaying) playAudio();
}

// Go to previous song
function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  if (isPlaying) playAudio();
}

// Update progress bar as song plays
audio.addEventListener("timeupdate", function() {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent    = formatTime(audio.duration);
  }
});

// When user drags the progress bar
progress.addEventListener("input", function() {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

// Volume control
volumeBar.addEventListener("input", function() {
  audio.volume = volumeBar.value;
});

// Auto play next song when current one ends
audio.addEventListener("ended", function() {
  nextSong();
});

// Format seconds into m:ss
function formatTime(seconds) {
  var mins = Math.floor(seconds / 60);
  var secs = Math.floor(seconds % 60);
  if (secs < 10) secs = "0" + secs;
  return mins + ":" + secs;
}

// Start the player
buildPlaylist();
loadSong(0);