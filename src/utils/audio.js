const audioCache = new Map();
let currentlyPlaying = null;
const BASE_URL = import.meta.env.BASE_URL;

const stopCurrentlyPlaying = () => {
  if (currentlyPlaying) {
    currentlyPlaying.pause();
    currentlyPlaying.currentTime = 0;
    currentlyPlaying = null;
  }
};

const loadAudio = (path) => {
  if (!audioCache.has(path)) {
    console.log('Loading audio:', path);
    const audio = new Audio(path);
    
    audio.addEventListener('canplaythrough', () => {
      console.log(`Audio ready to play: ${path}`);
    });
    
    audio.addEventListener('error', (e) => {
      console.error(`Error loading audio ${path}:`, e);
    });

    audio.addEventListener('ended', () => {
      if (currentlyPlaying === audio) {
        currentlyPlaying = null;
      }
    });
    
    audioCache.set(path, audio);
  }
  return audioCache.get(path);
};

export const playCustomerAudio = (customerName, type) => {
  console.log(`Attempting to play audio for ${customerName} ${type}`);
  stopCurrentlyPlaying();
  const audioPath = `${BASE_URL}audio/${customerName.toLowerCase()}-${type}.mp3`;
  const audio = loadAudio(audioPath);
  audio.currentTime = 0;
  
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log(`Successfully playing audio for ${customerName} ${type}`);
        currentlyPlaying = audio;
      })
      .catch(error => {
        console.error(`Error playing audio for ${customerName} ${type}:`, error);
      });
  }
};

export const playGenericAudio = (soundName) => {
  console.log(`Attempting to play generic audio: ${soundName}`);
  stopCurrentlyPlaying();
  const audioPath = `${BASE_URL}audio/${soundName}.mp3`;
  const audio = loadAudio(audioPath);
  audio.currentTime = 0;

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log(`Successfully playing generic audio: ${soundName}`);
        currentlyPlaying = audio;
      })
      .catch(error => {
        console.error(`Error playing generic audio ${soundName}:`, error);
      });
  }
}; 