import React from "react";
import { useForm } from "react-hook-form";
import { useCreatePrediction } from "../hooks/predictions";


const PredictionCreate: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const create = useCreatePrediction();

  const onSubmit = handleSubmit(data => {
    var date = new Date(data.eventAt);
    create.mutate({ body: data.body, eventAt: date })
  })

  return (
    <form
      className="form-control w-full max-w-sm gap-2"
      onSubmit={onSubmit}
    >
      <textarea
        className="textarea textarea-bordered"
        minLength={16}
        maxLength={256}
        placeholder="Enter your prediction here"
        {...register("body", { minLength: 16, maxLength: 256 })}
      />
      <input
        className="input input-bordered"
        type="date"
        {...register("eventAt")}
      />
      <input
        className="btn btn-sm btn-primary w-fit self-end"
        type="submit"
      />
    </form>
  )
};

export default PredictionCreate;
