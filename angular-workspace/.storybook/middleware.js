const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/~dev-server",
    createProxyMiddleware({
      target: "http://localhost:53333",
      changeOrigin: true,
      logLevel: "silent",
      ws: true,
    })
  );
};
