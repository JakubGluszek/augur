import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";

export const userRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }
    return next();
  })
  .mutation("delete", {
    async resolve({ ctx }) {
      await ctx.prisma.user.delete({
        where: {
          id: ctx.session?.user?.id
        },
        include: {
          accounts: true,
          predictions: true,
          sessions: true
        }
      })
      return
    }
  })