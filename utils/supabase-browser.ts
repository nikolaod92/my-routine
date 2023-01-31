import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../supabase/database.types";

export const createClient = () => createBrowserSupabaseClient<Database>();
