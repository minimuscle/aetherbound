import { supabase } from "../utils/database";

export const testUser = async () => {
  const { data, error } = await supabase.from("users").select("*");
  console.log(data);
  if (error) throw error;
  return new Response(JSON.stringify(data), { status: 200 });
};
