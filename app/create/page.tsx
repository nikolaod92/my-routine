/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import Slider from "@/components/slider";
import { useForm } from "react-hook-form";

export default function Create() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <label className="label">
          <span className="label-text">Routine name:</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-primary input-bordered input-sm w-full "
          {...register("name")}
        />
        <label className="label">
          <span className="label-text">Routine description (optional):</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-primary input-bordered input-sm w-full  mb-4"
          {...register("description")}
        />
        <Slider />
        <button type="submit" className="btn btn-secondary">
          Next
        </button>
      </form>
    </div>
  );
}
