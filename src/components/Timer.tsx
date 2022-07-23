import React from "react";
import useCountdown from "../hooks/useCountdown";

interface Props {
  targetDate: Date
};

const Timer: React.FC<Props> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <>
      {days! < 0 && hours! < 0 && minutes! < 0 && seconds! < 0
        ? <span>time has come</span>
        : <span>{days} days : {hours} hours : {minutes} min : {seconds} sec</span>
      }
    </>
  )
};

export default Timer;
