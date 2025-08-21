/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export default function FloatingLabelInput({
  label,
  value,
  onChange,
  onFocus,
  onBlur
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          setFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (onBlur) onBlur(e);
        }}
        className={`peer w-full border-2 rounded-lg px-3 pt-5 pb-2 outline-none 
          transition-colors duration-200 z-1 
          ${focused ? "border-blue-800" : "border-gray-300"}
        `}
      />
      <label
        className={`absolute left-3 transition-all duration-200 z-0
          ${
            focused || value
              ? "-top-2 text-xs text-blue-800 bg-white px-1"
              : "top-3 text-gray-500"
          }
        `}
        onClick={() => {
          setFocused(true);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {label}
      </label>
    </div>
  );
}
