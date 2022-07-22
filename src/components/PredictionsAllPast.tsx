import React from "react";
import { useGetAllPastPredictions } from "../hooks/predictions";
import Prediction from "./Prediction";

const PredictionsAllPast: React.FC = () => {
  const queryAllPast = useGetAllPastPredictions();

  return (
    <div className="flex flex-col">
      <p>All Past Predictions</p>
      {queryAllPast.data?.pages.map(p =>
        <div
          className="flex flex-col gap-2"
          key={p.nextCursor}
        >
          {p.items.map(v =>
            <Prediction
              key={v.id}
              data={v}
              showRemove={false}
            />
          )}
        </div>
      )}
      {queryAllPast.hasNextPage &&
        <button
          className="btn btn-ghost"
          onClick={() => queryAllPast.fetchNextPage()}
        >
          more
        </button>
      }
    </div>
  )
};

export default PredictionsAllPast;
