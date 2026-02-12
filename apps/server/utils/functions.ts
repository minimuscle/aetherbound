import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { AuthedRouteHandler, RouteHandler } from "./types";

function getBearerToken(request: Request): string | null {
  const authorizationHeader = request.headers.get("authorization");
  if (!authorizationHeader) return null;
  const match = authorizationHeader.match(/^Bearer\s+(.+)$/i);
  return match?.[1] ?? null;
}

const requireUser = async (request: Request): Promise<{ ok: true; supabase: SupabaseClient; userId: string } | { ok: false; response: Response }> => {
  const accessToken = getBearerToken(request);
  if (!accessToken) return { ok: false, response: new Response("Unauthorized", { status: 401 }) };

  const supabase = createClient(process.env.DATABASE_URL!, process.env.DATABASE_SECRET_KEY!, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return { ok: false, response: new Response("Unauthorized", { status: 401 }) };

  return { ok: true, supabase, userId: data.user.id };
};

export const withAuth = (handler: AuthedRouteHandler): RouteHandler => {
  return async (request: Request) => {
    const authResult = await requireUser(request);
    if (!authResult.ok) return authResult.response;

    return handler({
      request,
      supabase: authResult.supabase,
      userId: authResult.userId,
    });
  };
};
