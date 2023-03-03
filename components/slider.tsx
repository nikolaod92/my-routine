/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */

'use client'

const Slider = ({ ...field }) => (
  <div className="max-w-md">
    <input
      {...field}
      min={1}
      max={7}
      type="range"
      className="range range-primary"
      step={1}
    />
    <div className="w-full flex justify-between text-xs px-2">
      {[...Array(7)].map((_, i) => (
        <span key={i}>{i + 1}</span>
      ))}
    </div>
  </div>
)

export default Slider
