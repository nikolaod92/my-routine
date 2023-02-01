import { createServerClient } from "@/utils/supabase-server";
import Image from "next/image";

export default async function ExerciseSelect() {
  const supabase = createServerClient();

  const { data: bodyParts } = await supabase.from("distinct_body_part").select();

  const { data: exercises } = await supabase
    .from("exercise")
    .select()
    .eq("bodyPart", "chest")
    .limit(12);

  return (
    <div>
      <select className="select select-primary w-full  capitalize">
        <option disabled selected>
          Pick a target muscle group:
        </option>
        {bodyParts?.map((bodyPart) => (
          <option className="capitalize">{bodyPart.bodyPart}</option>
        ))}
      </select>
      <div className="grid grid-cols-4 gap-2 ">
        {exercises?.map((e) => (
          <div className="flex items-center justify-center">
            <p className="text-xs capitalize">{e.name}</p>
            {/* <Image
                  className="hidden"
                  src={e.gif}
                  alt="Exercise .gif"
                  width={100}
                  height={100}
                /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
