import React from "react";
import { useGetPersonalPredictions } from "../hooks/predictions";
import Prediction from "./Prediction";

const PredictionsPersonal: React.FC = () => {
  const q = useGetPersonalPredictions();

  const predictions = q.data?.map(p =>
    <Prediction
      key={p.id}
      data={p}
      showRemove={true}
      displayTimeLeft={true}
    />
  )

  return (
    <div className="w-full flex flex-col items-center gap-2">
      {q.data && q.data.length > 0
        ? predictions
        : <span>soooo eeempty</span>
      }
    </div>
  )
};

export default PredictionsPersonal;
