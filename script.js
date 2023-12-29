const songName = document.getElementById('name-of-music');
const bandName = document.getElementById('name-of-band');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');
const likeButton = document.getElementById('heart');
const soundButton = document.getElementById('sound');
const volBarContainer = document.getElementById('vol-bar-container');
const volContainer = document.getElementById('vol-container');
const volBar = document.getElementById('vol-bar');
const currentVol = document.getElementById('current-vol');
const progressBar = document.getElementById('progress-bar');

const asItWas = {
    songName:'As It Was',
    artist: 'Harry Styles',
    musicFile: 'As_It_Was',
    coverFile: 'gato1',
    liked: false
};

const flower = {
    songName:'Flower',
    artist: 'Johnny Stimson',
    musicFile: 'Johnny_Stimson-Flower(Official-Lyric-Video)',
    coverFile: 'gato2',
    liked: false
};

const youAreSorry = {
    songName:"You're Sorry",
    artist: 'Victor Lundberg',
    musicFile: "You're_Sorry",
    coverFile: 'gato3',
    liked: false
};

const flyMeToTheMoon = {
    songName:"Fly Me To The Moon",
    artist: 'Frank Sinatra',
    musicFile: "Fly Me To The Moon (2008 Remastered)",
    coverFile: 'gato4',
    liked: false
}

const gimmeGimme = {
    songName:"Gimme Gimme",
    artist: 'Johnny Stimson',
    musicFile: "Johnny Stimson - Gimme Gimme (Official Lyric Video)",
    coverFile: 'gato5',
    liked: false
}

const everySecond = {
    songName:"Every Second",
    artist: 'Mina Okabe',
    musicFile: "Mina Okabe - Every Second (Lyric Video)",
    coverFile: 'gato6',
    liked: false
}

const youCanDoIt = {
    songName:"You Can Do It",
    artist: 'Johnny Stimson',
    musicFile: "Johnny Stimson - You Can Do It (Official Lyric Video)",
    coverFile: 'gato7',
    liked: false
}

const theGirlFromIpanema = {
    songName:"The Girl From Ipanema",
    artist: 'Frank Sinatra',
    musicFile: "The Girl From Ipanema (2008 Remastered)",
    coverFile: 'gato8',
    liked: false
}

const sunroof = {
    songName:"Sunroof",
    artist: 'Nicky Youre, dazy',
    musicFile: "Nicky Youre, dazy - Sunroof (Official Music Video) (1)",
    coverFile: 'gato9',
    liked: false
}

const butterflies = {
    songName:"Butterflies",
    artist: 'Johnny Stimson',
    musicFile: "Johnny Stimson - Butterflies (Official Lyric Video)",
    coverFile: 'gato10',
    liked: false
}

const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [youCanDoIt, asItWas, flower, youAreSorry, flyMeToTheMoon, gimmeGimme, everySecond, theGirlFromIpanema, sunroof, butterflies];
let index = 0;
let isPlaying = false;
let isShuffled = false;
let sortedPlaylist = [...originalPlaylist];
let repeatOn = false;
let isShowed = false;


function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill'); 
    song.play();
    isPlaying=true;
}
function pauseSong(){
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill'); 
    song.pause();
    isPlaying=false;
}

function playPauseDecider(){
    if(isPlaying == false){
        playSong(); 
    }
    else{
        pauseSong();
    }
} 

function inicializeSong(){
    cover.src = `images/${sortedPlaylist[index].coverFile}.png`;
    song.src = `songs/${sortedPlaylist[index].musicFile}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}

function previousSong(){
    if(index == 0){
        index=sortedPlaylist.length-1;
    }
    else{
    index -= 1;
    }
    inicializeSong();
    playSong();
}

function nextSong(){
    if(index == sortedPlaylist.length-1){
        index=0;
    }
    else{
    index += 1;
    }
    inicializeSong();
    playSong();
}

function updateProgressBar(){
    const barWidth = (song.currentTime*100)/song.duration;
    currentProgress.style.setProperty('--progress',`${barWidth}%`);
}


function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = clickPosition/width*song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size-1;
    while(currentIndex > 0){
       let randomIndex = Math.floor(Math.random()*(currentIndex+1));
       let aux = preShuffleArray[currentIndex];
       preShuffleArray[currentIndex]=preShuffleArray[randomIndex];
       preShuffleArray[randomIndex]=aux;
       currentIndex-=1;
    }
}

function shuffleButtonClicked(){
    if(isShuffled==false){
        isShuffled=true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
        inicializeSong();
        playSong();
    }
    else{
        isShuffled=false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
        
    }
}

function repeatButtonClicked(){
    if(repeatOn==false){
        repeatOn=true;
        repeatButton.classList.add('button-active');
    }
    else{
        repeatOn=false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat(){
    if(repeatOn==true){
        playSong();
        repeatOn=false;
        repeatButton.classList.remove('button-active');
    }
    else{
        nextSong();
    }
}
 
function updateTimeSong(){
    songTime.innerText=`${Math.floor(song.currentTime/60)}:${Math.floor(song.currentTime%60).toString().padStart(2, '0')}`;
}

function updateTotalTime(){
     totalTime.innerText=`${Math.floor(song.duration/60)}:${Math.floor(song.duration%60).toString().padStart(2, '0')}`;
}

function likeButtonRender(){
    if(sortedPlaylist[index].liked==true){
        likeButton.querySelector('.bi').classList.remove('bi-suit-heart');
        likeButton.querySelector('.bi').classList.add('bi-suit-heart-fill');
        likeButton.classList.add('button-like-active');
    }
    else{
        likeButton.querySelector('.bi').classList.add('bi-suit-heart');
        likeButton.querySelector('.bi').classList.remove('bi-suit-heart-fill');
        likeButton.classList.remove('button-like-active');
    }
}

function likeButtonClicked(){
    if(sortedPlaylist[index].liked==false){
        sortedPlaylist[index].liked=true;
    }
    else{
        sortedPlaylist[index].liked=false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}

function hideVolBar(){
    volBarContainer.style.opacity = '0';
    soundButton.style.opacity = '0.4';
}

function showVolBar(){
    volBarContainer.style.opacity = '1';
    soundButton.style.opacity = '1';
}

function adjustVolume(event){
    const barWidth = volBar.clientWidth;
    const volumeLevel = (event.offsetX)/barWidth;
    song.volume = volumeLevel;
    currentVol.style.width = `${volumeLevel*100}%`;
}

function incVolBar(){
    volBar.style.height= '7px';
}

function decVolBar(){
    volBar.style.height = `5px`;
}


function incProgressBar(){
    progressBar.style.height= '5px';
}

function decProgressBar(){
    progressBar.style.height = `3px`;
}


inicializeSong();


play.addEventListener('click',playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
song.addEventListener('timeupdate', updateTimeSong);
progressContainer.addEventListener('click', jumpTo);
progressContainer.addEventListener('pointerenter', incProgressBar);
progressContainer.addEventListener('pointerleave', decProgressBar);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);
soundButton.addEventListener('pointerenter', showVolBar);
volContainer.addEventListener('pointerleave', hideVolBar);
volBar.addEventListener('pointerenter', incVolBar);
volBar.addEventListener('pointerleave', decVolBar);
volBar.addEventListener('click', adjustVolume);



