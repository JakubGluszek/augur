import React from "react";
import { useGetPersonalPredictions } from "../hooks/predictions";
import Prediction from "./Prediction";

const PredictionsPersonal: React.FC = () => {
  const q = useGetPersonalPredictions();

  return (
    <>
      <p>My predictions</p>
      <div className="w-full flex flex-col gap-2">
        {q.data?.map(p =>
          <Prediction
            key={p.id}
            data={p}
            showRemove={true}
          />
        )}
      </div>
    </>
  )
};

export default PredictionsPersonal;
