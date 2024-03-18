import "./PlayQueue.css";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getQueue } from "../../api/QueuesAPI";
import { getActivity } from "../../api/ActivitiesAPI";
import { useEffect, useState } from "react";
import { Activity, Queue } from "../../types/Types";
import ExpandedActivity from "../../components/ExpandedActivity/ExpandedActivity";
import ActivityCard from "../../components/ActivityCard";
import Timer from "../../components/Timer/Timer";
import { useStopwatch } from "react-timer-hook";
const PlayQueue = () => {
  const { queueId } = useParams();
  const [queue, setQueue] = useState<Queue>();
  const [activity, setActivity] = useState<Activity>();
  const {
    seconds,
    minutes,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  useEffect(() => {
    getQueue(queueId || "").then((queue) => {
      //TODO:  
      setQueue(queue);
      //FIX: temporary solution
      const a = getActivity("3QsiXh7iKekUr1pkp0hB")
      getActivity("3QsiXh7iKekUr1pkp0hB").then(a => {
        setActivity(a);
      })

    }
    )
  }, []);
  return (<>
    <Navbar />
    <div className="content-container">
      {activity ? <ActivityCard key={activity.id} {...activity} /> : null}
      <p>{activity?.description}</p>
      <Timer minutes={minutes} seconds={seconds} />
    </div>
  </>)
}


export default PlayQueue;
