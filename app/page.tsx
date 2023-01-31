import type { Database } from "@/lib/database.types";
import { createServerClient } from "@/utils/supabase-server";

type Exercise = Database["public"]["Tables"]["Exercise"]["Row"];

const getData = async () => {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("exercise").select("*").range(0, 9);
  return data as Exercise[];
};

export default async function Home() {
  const exercises = await getData();

  return (
    <div className=" flex flex-col flex-1 items-center justify-center space-y-2">
      <p className="text-xl font-bold">Welcome.</p>
      <p>We are a unique company. Please get started.</p>
      <button className="btn btn-secondary">Create Routine</button>
    </div>
  );
}
