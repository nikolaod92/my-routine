import type { Database } from "@/lib/database.types";
import { createServerClient } from "@/utils/supabase-server";
import Link from "next/link";

type Exercise = Database["public"]["Tables"]["exercise"]["Row"];

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
      <Link href="/create" className="btn btn-secondary">
        Create Routine
      </Link>
    </div>
  );
}
