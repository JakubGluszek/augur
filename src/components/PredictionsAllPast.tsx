import React from "react";
import { useGetAllPastPredictions } from "../hooks/predictions";
import Prediction from "./Prediction";

const PredictionsAllPast: React.FC = () => {
  const queryAllPast = useGetAllPastPredictions();

  return (
    <div className="w-full flex flex-col items-center">
      {queryAllPast.data?.pages.map(p =>
        <div
          className="w-full flex flex-col gap-2"
          key={p.nextCursor}
        >
          {p.items.map(v =>
            <Prediction
              key={v.id}
              data={v}
              showRemove={false}
              displayTimeLeft={false}
            />
          )}
        </div>
      )}
      {queryAllPast.hasNextPage &&
        <button
          className="btn btn-ghost"
          onClick={() => queryAllPast.fetchNextPage()}
        >
          View more
        </button>
      }
    </div>
  )
};

export default PredictionsAllPast;
