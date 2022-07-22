import React from "react";
import { Prediction as IPrediction } from "@prisma/client";
import { useRemovePrediction } from "../hooks/predictions";
import Image from "next/image";

interface PredictionData extends IPrediction {
  user: {
    id: string,
    name: string | null,
    image: string | null
  }
}

interface Props {
  data: PredictionData,
  showRemove: boolean,
}

const Prediction: React.FC<Props> = ({ data, showRemove }) => {
  const { id, body, predictedAt, eventAt, user: author, } = data;

  const remove = useRemovePrediction();

  const handleRemove = async () => {
    await remove.mutateAsync({ id })
  }

  return (
    <div className="flex flex-col p-4 border-2">
      <div className="flex flex-row gap-2 items-center">
        <Image
          src={author.image ? author.image : "./default_avatar.png"}
          alt={author.name ? author.name : "unknown user"}
          width={48}
          height={48}
        />
        <span>{author.name ? author.name : "hooman"}</span>
      </div>
      <p>{body}</p>
      <p>predicted at: {predictedAt.toDateString()}</p>
      <p>event at: {eventAt.toDateString()}</p>
      {showRemove &&
        <button onClick={() => handleRemove()}>remove</button>
      }
    </div>
  )
};

export default Prediction;
