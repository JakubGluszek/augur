import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const predictionRouter = createRouter()
  .query("all", {
    input: z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.string().nullish(),
    }),
    async resolve({ ctx, input }) {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.prisma.prediction.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "desc",
        },
      })
      let nextCursor: typeof cursor | null = null;
      if (items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }
  })
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
        },
        orderBy: {
          id: "desc"
        }
      });

      return predictions;
    }
  })