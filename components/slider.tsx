"use client";

import { useState } from "react";

const Slider = () => {
  const [value, setValue] = useState(1);

  return (
    <div className="max-w-md">
      <input
        type="range"
        min={1}
        max={7}
        value={value}
        className="range range-primary"
        step={1}
        onChange={(e) => setValue(+e.target.value)}
      />
      <div className="w-full flex justify-between text-xs px-2">
        {[...Array(7)].map((_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
