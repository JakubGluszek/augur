import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { Prediction } from "@prisma/client";
import { trpc } from "../utils/trpc";

const LoginView = () => {
  return (
    <div>
      <p>Sign in to create a prediction</p>
      <button
        className="btn btn-primary"
        onClick={() => signIn("twitch")}
      >
        Twitch
      </button>
      <button
        className="btn btn-primary"
        onClick={() => signIn("discord")}
      >
        Discord
      </button>
    </div>
  )
};

interface CreateProps {
  refetch: () => void
}

const PredictionCreate: React.FC<CreateProps> = ({ refetch }) => {
  const queryAll = useGetAllPredictions()

  const { register, handleSubmit } = useForm();
  const mutate = trpc.useMutation(["predictions.create"], {
    onSuccess: () => {
      refetch()
      queryAll.refetch()
    }
  })

  const onSubmit = handleSubmit(data => {
    var date = new Date(data.eventAt);
    mutate.mutate({ body: data.body, eventAt: date })
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
}

interface PersonalProps {
  data: Prediction[]
}

const PredictionsPersonal: React.FC<PersonalProps> = ({ data }) => {
  return (
    <>
      <p>My predictions</p>
      <div className="w-full flex flex-col gap-2">
        {data.map(p =>
          <div
            className="flex flex-col p-4 border-2"
            key={p.id}
          >
            <p>{p.userId}</p>
            <p>{p.body}</p>
          </div>
        )}
      </div>
    </>
  )
};

const useGetAllPredictions = () => {
  const q = trpc.useInfiniteQuery(
    [
      "predictions.all",
      {
        limit: 20,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  return q
}

const PredictionsAll: React.FC = () => {
  const q = useGetAllPredictions();

  return (
    <div className="flex flex-col">
      <p>All Predictions</p>
      {q.data?.pages.map(p =>
        <div
          className="flex flex-col gap-2"
          key={p.nextCursor}
        >
          {p.items.map(v =>
            <div key={v.id}>
              <p>{v.userId}</p>
              <p>{v.body}</p>
            </div>
          )}
        </div>
      )}
      <button
        className="btn btn-ghost"
        onClick={() => q.fetchNextPage()}
      >
        more
      </button>
    </div>
  )
}

const PredictionsView: React.FC = () => {
  const { data, isLoading, refetch } = trpc.useQuery(["predictions.personal"])

  return (
    <div className="flex flex-col items-center gap-4">
      <PredictionCreate refetch={refetch} />
      {isLoading || !data
        ? <div>loading</div>
        : <PredictionsPersonal data={data} />
      }
    </div>
  )
}

const Home: NextPage = () => {
  const { data, status } = useSession();

  return (
    <>
      <Head>
        <title>Augur</title>
        <meta name="description" content="A place for users to place predictions about the future" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full max-w-screen-md mx-auto h-fit flex flex-col gap-4 p-2">
        <main className="flex flex-col items-center gap-2 p-4 border-2">
          <h1>Augur</h1>
          <p>A place for users to place predictions about the future</p>
        </main>

        {status === "loading"
          ? <div>loading</div>
          : data
            ? <PredictionsView />
            : <LoginView />
        }

        <PredictionsAll />
      </div>
    </>
  );
};

export default Home;
