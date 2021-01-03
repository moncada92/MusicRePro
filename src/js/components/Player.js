import React from 'react';
import { 
  FaPlay,
  FaAngleLeft,
  FaAngleRight,
  FaPause,
  FaVolumeDown
} from "react-icons/fa";

const Player = ({
  isPlay, setIsPlay, audioRef,
  setInfoSong, infoSong, songs,
  currentSong, setCurrentSong,
  setSong
}) => {

  //const [activeVolume, setActiveVolume] = useState(false);

  const playSongHandler = () => {
    
    if (isPlay){
      audioRef.current.pause();
      setIsPlay(!isPlay);
    } else {
      audioRef.current.play();
      setIsPlay(!isPlay);
    } 
  }

  const getTime = (time) => {
    return(
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

  const dragHandler = (e) => {
    setInfoSong({...infoSong, currentTime: e.target.value})
    audioRef.current.currentTime = e.target.value;
  }

  const skipTrapckHandler =  async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length -1]);
        activeLibraryHandler(songs[songs.length -1]);
        if (isPlay) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlay) audioRef.current.play();
  }

  const activeLibraryHandler = (nextPrev) => {
    const activeSong = songs.map((s) => {
      if(s.id === nextPrev.id) {
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
  }


  //add style
  const trackAnim = {
    transform: `translateX(${infoSong.animationPersentage}%)`
  }

  const changeVolume = (e) => {
    let value = e.target.value
    audioRef.current.volume = value;
    setInfoSong({...infoSong, volume: value});

  }

  return ( 
    <div className="player">
      <div className="time-control">
        <p>{getTime(infoSong.currentTime)}</p>
        <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
          <input 
          min={0} 
          max={infoSong.duration || 0}
          value={infoSong.currentTime}
          onChange={dragHandler}
          type="range"/>
          <div style={trackAnim} className="animate-track"></div>
        </div>
        
        <p>{infoSong.duration ? getTime(infoSong.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FaAngleLeft onClick={() => skipTrapckHandler("skip-back")} className="skip-back"/>
        {
        isPlay ? 
          <FaPause onClick={playSongHandler} className="play"/> 
        : 
          <FaPlay onClick={playSongHandler} className="play"/> 
        }
        
        <FaAngleRight onClick={() => skipTrapckHandler("skip-forward")} className="skip-forward"/>        
      </div>
      <div className="volume-control">
      <FaVolumeDown />
          <input 
            className="volume"
            onChange={changeVolume}
            value={infoSong.volume}
            max="1"
            min="0"
            step="0.01"
            type="range"
          />
      </div>
    </div>
   );
}
 
export default Player;