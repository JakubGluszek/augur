// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { predictionRouter } from "./prediction";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("predictions.", predictionRouter)
  .merge("user.", userRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
