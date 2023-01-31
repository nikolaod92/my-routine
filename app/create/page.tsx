import Slider from "@/components/slider";
import { createServerClient } from "@/utils/supabase-server";

const getData = async () => {
  const supabase = createServerClient();
};

export default async function Create() {
  return (
    <div>
      <Slider />
    </div>
  );
}
