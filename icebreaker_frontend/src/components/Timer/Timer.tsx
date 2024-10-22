import { useStopwatch } from "react-timer-hook";
import FabButton from "../FabButton/FabButton";
import PauseIcon from '@mui/icons-material/Pause';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import { IconButton } from "@mui/material";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

const Timer = () => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const handlePlayButton = () => {

    (isRunning ? pause() : start());
  }

  const handleResetButton = () => {
    reset();
    pause();
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2rem' }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button className="icon-button-wrapper" onClick={handlePlayButton}>
        <IconButton aria-label="play">
          {isRunning ? <PauseIcon onClick={handlePlayButton} /> : <PlayCircleOutlineRoundedIcon onClick={handlePlayButton} />}
        </IconButton>

      </button>
      <button className="reset-btn" onClick={handleResetButton}>
        <IconButton aria-label="play">
          <RestartAltOutlinedIcon />
        </IconButton>


      </button>
    </div >

  );
}

export default Timer;
