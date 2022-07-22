import { trpc } from "../utils/trpc";

export const useCreatePrediction = () => {
  const allPastQuery = useGetAllPastPredictions();
  const personalQuery = useGetPersonalPredictions();

  const mutation = trpc.useMutation(["predictions.create"], {
    onSuccess: () => {
      allPastQuery.refetch()
      personalQuery.refetch()
    }
  })

  return mutation;
};

export const useRemovePrediction = () => {
  const allPastQuery = useGetAllPastPredictions();
  const personalQuery = useGetPersonalPredictions();

  const mutation = trpc.useMutation(["predictions.remove"], {
    onSuccess: () => {
      allPastQuery.refetch()
      personalQuery.refetch()
    }
  })

  return mutation;
}

export const useGetAllPastPredictions = () => {
  const query = trpc.useInfiniteQuery(
    [
      "predictions.all-past",
      {
        limit: 40,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  return query
};

export const useGetPersonalPredictions = () => {
  const query = trpc.useQuery(["predictions.personal"])

  return query;
};
