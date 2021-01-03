export const playAudio = (isPlay, audioRef) => {
  if (isPlay) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then((audio) => {
        audioRef.current.play();
      })
    }
  }
}
 