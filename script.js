console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlays = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    { songName: "Do I Wanna Know", filePath: "songs/1.mp3", coverPath: "./images/1.bg.jpg" },
    { songName: "505", filePath: "songs/2.mp3", coverPath: "./images/2.bg.jpg" },
    { songName: "Arabella", filePath: "songs/3.mp3", coverPath: "./images/3.bg.jpg" },
    { songName: "I Wanna Be Yours", filePath: "songs/4.mp3", coverPath: "./images/4.bg.jpg" },
    { songName: "Knee Socks", filePath: "songs/5.mp3", coverPath: "./images/5.bg.jpg" },
    { songName: "Snap Out of It", filePath: "songs/6.mp3", coverPath: "./images/6.bg.jpg" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.src = './images/icons8-play-50.png';
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.src = './images/icons8-play-50.png';
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    songItemPlays.forEach((element) => {
        element.src = './images/icons8-play-50.png';
    });
};

songItemPlays.forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = i;
        e.target.src = './images/icons8-play-50.png';
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.src = './images/icons8-play-50.png';
        gif.style.opacity = 1;
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 5) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = './images/icons8-play-50.png';
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('./images/icons8-play-50.png');
    masterPlay.classList.add('./images/icons8-play-50.png');
});
