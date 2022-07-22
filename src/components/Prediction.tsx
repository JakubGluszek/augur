import React, { useState } from "react";
import { Prediction as IPrediction } from "@prisma/client";
import { useRemovePrediction } from "../hooks/predictions";
import Image from "next/image";
import { Loader, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

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
  displayTimeLeft: boolean,
}

const Prediction: React.FC<Props> = ({ data, showRemove }) => {
  const [viewDelete, setViewDelete] = useState(false);
  const { id, body, predictedAt, eventAt, user: author, } = data;

  const remove = useRemovePrediction();

  const handleRemove = async () => {
    try {
      await remove.mutateAsync({ id })
      showNotification({
        color: "green",
        message: "Prediction deleted"
      })
    } catch (error) {
      console.log(error)
    }
    setViewDelete(false)
  }

  return (
    <>
      <div className="w-full flex flex-col p-4 gap-4 border-[1px] rounded">
        <div className="flex flex-row gap-2 items-center">
          <Image
            className="rounded"
            src={author.image ? author.image : "./default_avatar.png"}
            alt={author.name ? author.name : "unknown user"}
            width={48}
            height={48}
          />
          <span className="md:text-xl">{author.name ? author.name : "hooman"}</span>
        </div>
        <p className="bg-neutral text-neutral-content p-4 rounded">{body}</p>
        <div>
          <p>Predicted at: <span className="font-semibold">{predictedAt.toDateString()}</span></p>
          <p>Event at: <span className="font-semibold">{eventAt.toDateString()}</span></p>
          {/* TODO - Display countdown to event date from now */}
        </div>
        {showRemove &&
          <button
            className="absolute btn hover:btn-error w-fit btn-sm btn-outline self-end"
            onClick={() => setViewDelete(!viewDelete)}
          >
            Delete
          </button>
        }
      </div>
      <Modal
        opened={viewDelete}
        onClose={() => setViewDelete(false)}
      >
        <div className="flex flex-col gap-4">
          <p className="text-center">Are you sure you want to delete this prediction?</p>
          <div className="flex flex-row justify-evenly">
            {remove.isLoading
              ? <Loader />
              :
              <>
                <button
                  className="btn btn-error"
                  onClick={() => handleRemove()}
                >
                  Delete
                </button>
                <button
                  className="btn"
                  onClick={() => setViewDelete(false)}
                >
                  Cancel
                </button>
              </>
            }
          </div>
        </div>
      </Modal>
    </>
  )
};

export default Prediction;
