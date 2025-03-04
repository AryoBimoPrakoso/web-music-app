document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const cover = document.getElementById('cover');
    const progressContainer = document.querySelector('.progress-container');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const playlistContainer = document.getElementById('playlist');

    // Song list from assets folder
    const songs = [
        {
            path: 'assets/Deafheaven - Magnolia (Official Music Video).mp3',
            title: 'Magnolia',
            artist: 'Deafheaven',
            cover: 'assets/cover/magnolia.png'
        },
        {
            path: 'assets/I Will (Remastered 2009).mp3',
            title: 'I Will',
            artist: 'The Beatles',
            cover: 'assets/cover/the-beatles.png'
        },
        {
            path: 'assets/Slipknot - (Sic) (Audio).mp3',
            title: '(sic)',
            artist: 'Slipknot',
            cover: 'assets/cover/slipknot.png'
        },
        {
            path: 'assets/Soldier of Fortune.mp3',
            title: 'Soldier of Fortune',
            artist: 'Deep Purple',
            cover: 'assets/cover/opeth.png'
        },
        {
            path: 'assets/Deafheaven - Heathen.mp3',
            title: 'Heathen',
            artist: 'Deafheaven',
            cover: 'assets/cover/magnolia.png'
        }
    ];

    // Current song index
    let songIndex = 0;

    // Initialize player
    function loadSong(index) {
        const song = songs[index];
        title.textContent = song.title;
        artist.textContent = song.artist;
        audio.src = song.path;
        cover.src = song.cover;
        
        // Update active class in playlist
        document.querySelectorAll('.playlist li').forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Play song
    function playSong() {
        playBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
        playBtn.title = 'Pause';
        audio.play();
    }

    // Pause song
    function pauseSong() {
        playBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
        playBtn.title = 'Play';
        audio.pause();
    }

    // Previous song
    function prevSong() {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }
        loadSong(songIndex);
        playSong();
    }

    // Next song
    function nextSong() {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }
        loadSong(songIndex);
        playSong();
    }

    // Update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.target;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Update time display
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }

    // Set progress bar
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    // Create playlist items
    function createPlaylist() {
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
            `;
            li.addEventListener('click', () => {
                songIndex = index;
                loadSong(songIndex);
                playSong();
            });
            playlistContainer.appendChild(li);
        });
    }

    // Event Listeners
    playBtn.addEventListener('click', () => {
        const isPlaying = playBtn.querySelector('i').classList.contains('fa-pause');
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    audio.addEventListener('ended', nextSong);

    // Initialize the player
    createPlaylist();
    loadSong(songIndex);
});