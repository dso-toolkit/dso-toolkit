import { createProxyMiddleware } from "http-proxy-middleware";

export default function middleware(app) {
  app.use(
    "/~dev-server",
    createProxyMiddleware({
      target: "http://127.0.0.1:45333",
      changeOrigin: true,
      logLevel: "silent",
      ws: true,
    }),
  );
}
