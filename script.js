let songs = [
    {
        name: 'song1',
        path: 'music/passo.mp3',
        artist: 'artist 1',
        cover: 'assets/passo.jpg'
    },
    {
        name: 'song2',
        path: 'music/phonk.mp3',
        artist: 'artist 2',
        cover: 'assets/phonk.jpg'
    },
    {
        name: 'song3',
        path: 'music/govhooker.mp3',
        artist: 'artist 3',
        cover: 'assets/toji.jpg'
    },
    {
        name: 'song4',
        path: 'music/solo.mp3',
        artist: 'artist 4',
        cover: 'assets/solo.jpg'
    },
    {
        name: 'song5',
        path: 'music/song5.mp3',
        artist: 'artist 5',
        cover: 'assets/photo5.jpg'
    },
    {
        name: 'song6',
        path: 'music/song6.mp3',
        artist: 'artist 6',
        cover: 'assets/photo6.jpg'
    },
    {
        name: 'song7',
        path: 'music/song7.mp3',
        artist: 'artist 7',
        cover: 'assets/photo7.jpg'
    },
    {
        name: 'song8',
        path: 'music/song8.mp3',
        artist: 'artist 8',
        cover: 'assets/photo8.jpg'
    },
    {
        name: 'song9',
        path: 'music/song9.mp3',
        artist: 'artist 9',
        cover: 'assets/photo9.jpg'
    },
    {
        name: 'song10',
        path: 'music/song10.mp3',
        artist: 'artist 10',
        cover: 'assets/photo10.jpg'
    }
];

let currentMusic = 0;

const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const musicDuration = document.querySelector('.music-duration');
const currentTime = document.querySelector('.current-time'); // ✅ Added this
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.next-btn');
const backwardBtn = document.querySelector('.prev-btn');

// setup music
const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;
    currentTime.innerHTML = '00:00';

    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
};

// play/pause toggle
playBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        playBtn.classList.add('paused');
        disk.classList.add('play');
    } else {
        music.pause();
        playBtn.classList.remove('paused');
        disk.classList.remove('play');
    }
});

// format time mm:ss
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
};

// update seek bar while playing
music.addEventListener('timeupdate', () => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
});

// change music with seekbar
seekBar.addEventListener('input', () => {
    music.currentTime = seekBar.value;
});

// next button
forwardBtn.addEventListener('click', () => {
    if (currentMusic < songs.length - 1) {
        currentMusic++;
    } else {
        currentMusic = 0;
    }
    setMusic(currentMusic);
    music.play();
    playBtn.classList.add('paused');
    disk.classList.add('play');
});

// previous button
backwardBtn.addEventListener('click', () => {
    if (currentMusic > 0) {
        currentMusic--;
    } else {
        currentMusic = songs.length - 1;
    }
    setMusic(currentMusic);
    music.play();
    playBtn.classList.add('paused');
    disk.classList.add('play');
});

setMusic(0);



