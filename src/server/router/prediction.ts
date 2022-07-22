import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const predictionRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }
    return next()
  })
  .mutation("create", {
    input: z.object({
      body: z.string().min(16).max(256),
      eventAt: z.date()
    }),
    async resolve({ ctx, input }) {
      // convert event date to utc
      const utc = Date.UTC(
        input.eventAt.getUTCFullYear(),
        input.eventAt.getUTCMonth(),
        input.eventAt.getUTCDate(),
        input.eventAt.getUTCHours(),
        input.eventAt.getUTCMinutes(),
        input.eventAt.getUTCSeconds()
      );

      const eventAt = new Date(utc)

      const prediction = ctx.prisma.prediction.create({
        data: {
          body: input.body,
          eventAt: eventAt,
          userId: ctx.session?.user?.id!
        }
      })

      return prediction;
    }
  })
  .query("personal", {
    async resolve({ ctx }) {
      const predictions = ctx.prisma.prediction.findMany({
        where: {
          userId: ctx.session?.user?.id
        }
      });

      return predictions;
    }
  })