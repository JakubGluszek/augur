import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreatePrediction } from "../hooks/predictions";

interface Props {
  setDisplay: (display: boolean) => void
}

const PredictionCreate: React.FC<Props> = ({ setDisplay }) => {
  const [date, setDate] = useState<Date | null>(null);

  const { register, handleSubmit } = useForm();
  const create = useCreatePrediction();

  const onSubmit = handleSubmit(async data => {
    if (date) {
      try {
        await create.mutateAsync({ body: data.body, eventAt: date })
        setDisplay(false)
        showNotification({
          color: "green",
          message: "Prediction created",
        })
      } catch (error) {
        showNotification({
          color: "red",
          message: "Pick a valid date",
        })
      }
    } else {
      showNotification({
        color: "red",
        message: "Pick a valid date",
      })
    }
  })

  const autoGrow = (e: FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "16px"
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px"
  }

  return (
    <form
      className="form-control gap-2"
      onSubmit={onSubmit}
    >
      <textarea
        className="textarea bg-transparent textarea-bordered overflow-hidden resize-none"
        minLength={16}
        maxLength={256}
        onInput={e => autoGrow(e)}
        placeholder="Enter your prediction here"
        {...register("body", { minLength: 16, maxLength: 256 })}
      />
      <DatePicker
        zIndex={1000000}
        onChange={setDate}
        placeholder="Pick date"
        label="Predicted event date"
      />
      <input
        className={`btn btn-primary w-fit self-end ${create.isLoading && "btn-disabled"}`}
        type="submit"
      />
    </form>
  )
};

export default PredictionCreate;
