
import "./PlayQueue.css";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getQueue } from "../../api/QueuesAPI";
import { useEffect, useState } from "react";
import { Activity } from "../../types/Types";
import PlayActivityCard from "../../components/PlayActiviyCard/PlayActivityCard";
import { useSpring, animated } from "react-spring";
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import { IconButton } from "@mui/material";

const PlayQueue = () => {
  const [queue, setQueue] = useState<Activity[]>([]);
  const [prevActivity, setPrevActivity] = useState<Activity | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [nextActivity, setNextActivity] = useState<Activity | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [spinDirection, setSpinDirection] = useState<'left' | 'right' | null>(null);
  const [shuffle, toggleShuffle] = useState(false);
  const { queueId } = useParams();

  useEffect(() => {
    getQueue(queueId || "").then((q) => {
      setQueue(q.activities);
      setActivity(q.activities[0]);
    });
  }, [queueId]);

  useEffect(() => {
    const prevIndex = (index - 1 + queue.length) % queue.length;
    const nextIndex = (index + 1) % queue.length;

    setPrevActivity(queue[prevIndex]);
    setActivity(queue[index]);
    setNextActivity(queue[nextIndex]);
  }, [index, queue]);

  const selectRelativeActivity = (offset: number) => {
    let newIndex = (index + offset + queue.length) % queue.length;
    setIndex(newIndex);
    setDirection(offset === -1 ? 'left' : 'right');
  };

  const spinTheWheel = () => {
    toggleShuffle(true);
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * queue.length);
      selectRelativeActivity(randomIndex);
    }, 1000);
    setTimeout(() => {
      toggleShuffle(false);
      clearInterval(interval);
    }, 3000);
    selectRelativeActivity(1);
  };

  const slideProps = useSpring({
    from: { transform: `translateX(${direction === 'left' ? '-100%' : '100%'})` },
    to: { transform: 'translateX(0%)' },
    reset: true,
    config: { friction: 20, tension: 50 },
  });

  const spinProps = useSpring(
    {
      from: { transform: `translateX(${direction === 'left' ? '-100%' : '100%'})` },
      to: { transform: 'translateX(0%)' },
      reset: true,
      config: { friction: 10, tension: 40, mass: 12 },

    }
  )
  return (
    <>
      <Navbar />
      <div className="play-container">
        <div className="activity-bar">
          <animated.div style={shuffle ? spinProps : slideProps}>
            {nextActivity && (
              <PlayActivityCard selected={false} activity={nextActivity} />
            )}
          </animated.div>
          <animated.div style={shuffle ? spinProps : slideProps}>
            {prevActivity && (
              <PlayActivityCard selected={false} activity={prevActivity} />
            )}
          </animated.div>
          <button className="prev-btn" onClick={() => selectRelativeActivity(-1)}>
            <IconButton aria-label="prev">
              <NavigateBeforeRoundedIcon />
            </IconButton>

          </button>
          <animated.div style={shuffle ? spinProps : slideProps}>
            {activity && (
              <PlayActivityCard selected={shuffle ? false : true} activity={activity} />
            )}
          </animated.div>
          <button className="next-btn" onClick={() => selectRelativeActivity(1)}>
            <IconButton aria-label="next">
              <NavigateNextRoundedIcon />
            </IconButton>
          </button>
          <animated.div style={shuffle ? spinProps : slideProps}>
            {nextActivity && (
              <PlayActivityCard selected={false} activity={nextActivity} />
            )}
          </animated.div>
          <animated.div style={shuffle ? spinProps : slideProps}>
            {nextActivity && (
              <PlayActivityCard selected={false} activity={nextActivity} />
            )}
          </animated.div>
        </div>
        <button className="shuffle-btn" onClick={spinTheWheel}>
          <IconButton aria-label="shuffle">
            <ShuffleOutlinedIcon />
          </IconButton>
        </button>
      </div>
    </>
  );
};

export default PlayQueue;

