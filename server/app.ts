import express, { type Express } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import type { Server } from "http";
import { registerOAuthRoutes } from "./_core/oauth";
import { publicPlatformScript } from "./_core/publicConfig";
import { serveStatic, setupVite } from "./_core/vite";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";

export async function createApp(server?: Server): Promise<Express> {
  const app = express();

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/platform/config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript());
  });

  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  if (process.env.NODE_ENV === "development") {
    if (!server) throw new Error("A development HTTP server is required for Vite middleware");
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  return app;
}
