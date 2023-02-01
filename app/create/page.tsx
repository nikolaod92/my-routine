import "server-only";

import ExerciseSelect from "@/components/exercise-select/exercise-select";
import Slider from "@/components/slider";
import { createServerClient } from "@/utils/supabase-server";

const getData = async () => {
  const supabase = createServerClient();
};

export default async function Create() {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* @ts-ignore ignore server components error */}
      <form className="form-control ">
        <label className="label">
          <span className="label-text">Routine name:</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-primary input-bordered input-sm w-full "
        />
        <label className="label">
          <span className="label-text">Routine description (optional):</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-primary input-bordered input-sm w-full  mb-4"
        />
        <p className="text-sm mb-2">Days per week</p>
        <Slider />
      </form>
    </div>
  );
}
