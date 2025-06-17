let songs = {
  sad: ["mymusic/sad1.mp3", "mymusic/sad2.mp3"],
  calm: ["mymusic/calm1.mp3", "mymusic/calm2.mp3"],
  fun: ["mymusic/fun1.mp3", "mymusic/fun2.mp3"],
  dance: ["mymusic/dance1.mp3", "mymusic/dance2.mp3"]
};

let currentList = [];
let currentIndex = 0;

function getMoodCategory(value) {
  if (value < 25) return "sad";
  if (value < 50) return "calm";
  if (value < 75) return "fun";
  return "dance";
}

function updateBackground(mood) {
  let imageMap = {
    sad: "images/rain.png",
    calm: "images/clouds.png",
    fun: "images/sun.png",
    dance: "images/flowers.png"
  };
  document.body.style.backgroundImage = `url(${imageMap[mood]})`;
}

function playSong() {
  let audio = document.getElementById("audioPlayer");
  audio.src = currentList[currentIndex];
  audio.play();
  document.getElementById("songDisplay").textContent = "Çalan: " + currentList[currentIndex].split("/").pop();
}

function updateSongs(value) {
  let mood = getMoodCategory(value);
  currentList = songs[mood];
  currentIndex = 0;
  updateBackground(mood);
  playSong();
}

function nextSong() {
  if (currentIndex < currentList.length - 1) {
    currentIndex++;
    playSong();
  }
}

function previousSong() {
  if (currentIndex > 0) {
    currentIndex--;
    playSong();
  }
}

function changeTheme() {
  const colors = ["#1db954", "#ff4081", "#2196f3", "#ff9800"];
  const random = colors[Math.floor(Math.random() * colors.length)];
  document.querySelector("header").style.backgroundColor = random;
}

window.onload = function () {
  const range = document.getElementById("emotionRange");
  const label = document.getElementById("emotionValue");

  if (range) {
    range.addEventListener("input", function () {
      const value = parseInt(range.value);
      label.textContent = value + "%";
      updateSongs(value);
    });
    updateSongs(range.value); // İlk yüklemede çalışsın
  }
}
