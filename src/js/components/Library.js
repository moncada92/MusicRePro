import React from 'react'
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, audioRef, isPlay, setSong, libraryStatus}) => {
  return ( 
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {
          songs.map( song => (
            <LibrarySong 
              setCurrentSong={setCurrentSong}
              key={song.id}
              song={song}
              songs={songs}
              audioRef={audioRef}
              isPlay={isPlay}
              setSong={setSong}
            />
          ))
        }
      </div>
    </div>
   );
}
 
export default Library;