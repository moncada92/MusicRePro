import React from 'react'

const LibrarySong = ({songs, song, setCurrentSong, audioRef, isPlay, setSong}) => {

  const selectSongHandler = async () => {
    const selectedSong = song;
    await setCurrentSong(selectedSong);

    //add active state
    const activeSong = songs.map((s) => {
      if(s.id === song.id) {
        return {
          ...s,
          active: true
        }
      } else {
        return {
          ...s,
          active: false
        }
      }
    })
    setSong(activeSong);
    
    if (isPlay) audioRef.current.play();
  }

  return ( 
    <div onClick={selectSongHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
      <img src={song.cover} alt={song.name}/>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
   );
}
 
export default LibrarySong;