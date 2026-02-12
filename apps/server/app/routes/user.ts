import { supabase } from "../../utils/database";
import { withAuth } from "../../utils/functions";

export const user = {
  GET: withAuth(async () => {
    const { data, error } = await supabase.from("users").select("*");
    return new Response("Hello World");
  }),
  signup: {
    POST: async (request: Request) => {
      const { email, password } = await request.json();
      console.log(email, password);
      return new Response("Hello ");
    },
  },
};
