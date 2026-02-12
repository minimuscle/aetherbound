import { user } from "./routes/user";

export const routes = {
  /***** PUBLIC ROUTES *****/
  "/": {
    GET: () => new Response("Connection Successful"),
  },

  /***** PRIVATE ROUTES *****/
  "/api/user": {
    GET: user.GET,
  },
  "/api/user/signup": {
    POST: user.signup.POST,
  },
} satisfies Bun.Serve.Options<undefined>["routes"];
