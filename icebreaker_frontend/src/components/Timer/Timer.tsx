interface TimerProps {
  minutes: number;
  seconds: number;
}
const Timer = ({ minutes, seconds }: TimerProps) => {
  return (<>
    <div className="timer-container">
      <div>{minutes}:{seconds}</div>
    </div></>)
}

export default Timer;
