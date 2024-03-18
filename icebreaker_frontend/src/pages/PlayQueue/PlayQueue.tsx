import "./PlayQueue.css";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getQueue } from "../../api/QueuesAPI";
import { getActivitiesWithIds, getActivity } from "../../api/ActivitiesAPI";
import { useEffect, useState } from "react";
import { Activity, Queue } from "../../types/Types";
import ExpandedActivity from "../../components/ExpandedActivity/ExpandedActivity";
import ActivityCard from "../../components/ActivityCard";
import Timer from "../../components/Timer/Timer";
import { useStopwatch } from "react-timer-hook";
import FabButton from "../../components/FabButton/FabButton";

const PlayQueue = () => {
  const [running, setPlay] = useState(false);
  const { queueId } = useParams();
  const [queue, setQueue] = useState<Activity[]>([]);
  const [activity, setActivity] = useState<Activity>();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    getQueue(queueId || "").then((q) => {
      //TODO:  
      setQueue(q.activities);
      if (queue.length > 0) {
        selectActivity(queue[0].id)
      }
    }
    )
  }, []);

  const selectActivity = (activiyId: string) => {
    queue?.forEach(a => {
      if (a.id === activiyId) {
        setActivity(a);
      }
    });
  }

  //Used for selecting an activity based on the current index and an offset.
  //For example if index is 5 you can do offset -5 to select the first activity in the queue.
  const selectRelativeActivity = (offset: number) => {
    const a = queue[index + offset]
    setActivity(a)
  }

  return (<>
    <Navbar />
    <div className="play-container">
      <div className="activity-bar">
        <div className="prev-btn" onClick={() => selectRelativeActivity(-1)}>{"<"}</div>
        {activity ? <ActivityCard key={activity.id} {...activity} /> : null}
        <div className="next-btn" onClick={() => selectRelativeActivity(1)}>{">"}</div>
      </div>
      <Timer />

    </div>
  </>)
}


export default PlayQueue;
