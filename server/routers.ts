import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createStorefrontCheckout, getStorefrontProduct, getStorefrontProducts } from "./shopify";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  storefront: router({
    products: publicProcedure.query(async () => {
      try {
        return await getStorefrontProducts();
      } catch (error) {
        console.warn("[Shopify] Storefront catalog unavailable:", error);
        return { connected: false as const, products: [] };
      }
    }),
    product: publicProcedure.input(z.object({ handle: z.string().min(1) })).query(async ({ input }) => {
      try {
        return await getStorefrontProduct(input.handle);
      } catch (error) {
        console.warn("[Shopify] Storefront product unavailable:", error);
        return { connected: false as const, product: null };
      }
    }),
    checkout: publicProcedure.input(z.object({
      lines: z.array(z.object({ merchandiseId: z.string().min(1), quantity: z.number().int().positive() })).min(1),
    })).mutation(async ({ input }) => createStorefrontCheckout(input.lines)),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
