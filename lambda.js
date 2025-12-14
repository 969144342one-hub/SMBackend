import serverless from "serverless-http";
import app from "./index.js";

export const handler = serverless(app, {
  request: (req, event) => {
    // 🔑 Normalize body from API Gateway
    if (event?.body) {
      try {
        req.body =
          typeof event.body === "string"
            ? JSON.parse(event.body)
            : event.body;
      } catch (err) {
        // fallback (non-JSON payload)
        req.body = event.body;
      }
    }
  },
});
