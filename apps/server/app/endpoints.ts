import { testUser } from "./test_user";

export const registerRoutes = {
  "/": {
    GET: () => new Response("Hello World"),
  },
  "/api/test_user": {
    GET: async () => await testUser(),
  },
} satisfies Bun.Serve.Options<undefined>["routes"];
