import type { SupabaseClient } from "@supabase/supabase-js";

export type AuthedContext = {
  request: Request;
  supabase: SupabaseClient;
  userId: string;
};

export type AuthedRouteHandler = (context: AuthedContext) => Response | Promise<Response>;
export type RouteHandler = (request: Request) => Response | Promise<Response>;
