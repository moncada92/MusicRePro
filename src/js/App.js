import React, {useState, useRef} from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Library from "./components/Library";
import Nav from './components/Nav';
import '../css/app.scss';
import data from "./data";

function App() {

  const audioRef = useRef(null);

  const [song, setSong] = useState(data());
  const [currentSong, setCurrentSong] = useState(song[0]);
  const [isPlay, setIsPlay] = useState(false);
  const [infoSong, setInfoSong] = useState({
    currentTime: 0,
    duration: 0,
    animationPersentage: 0,
    volume: 0.7,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHadler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // calculate posantage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setInfoSong({ ...infoSong, currentTime: current, duration, animationPersentage: animation})

  }

  const songEndHandler = async () => {
    let currentIndex = song.findIndex((s) => s.id === currentSong.id);
    await setCurrentSong(song[(currentIndex + 1) % song.length]);
    if(isPlay) audioRef.current.play();
  }

    return (
      <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
        <Song currentSong={currentSong}/>
        <Player 
          isPlay={isPlay}
          setIsPlay={setIsPlay}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          setInfoSong={setInfoSong}
          infoSong={infoSong}
          songs={song}
          setSong={setSong}
        />
        <Library 
          libraryStatus={libraryStatus}
          songs={song} 
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlay={isPlay}
          setSong={setSong}
        />
        <audio
          onLoadedMetadata={timeUpdateHadler}
          onTimeUpdate={timeUpdateHadler}
          ref={audioRef} 
          src={currentSong.audio}
          onEnded={songEndHandler}
          ></audio>
      </div>
    );
}

export default App;