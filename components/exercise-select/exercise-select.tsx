import { Database } from "@/lib/database.types";
import { createServerClient } from "@/utils/supabase-server";

export default async function ExerciseSelect() {
  const supabase = createServerClient();

  const { data: bodyParts } = await supabase.from("distinct_body_part").select();

  return (
    <div>
      <select className="select select-primary w-full capitalize">
        <option disabled selected>
          Pick a target muscle group:
        </option>
        {bodyParts?.map((bodyPart) => (
          <option key={bodyPart.bodyPart} className="capitalize">
            {bodyPart.bodyPart}
          </option>
        ))}
      </select>
    </div>
  );
}
