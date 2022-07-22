// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { predictionRouter } from "./prediction";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("predictions.", predictionRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
