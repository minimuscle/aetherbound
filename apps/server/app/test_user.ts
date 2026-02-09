import { supabase } from "../utils/database";

export const testUser = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  throw new Error("test");
};
