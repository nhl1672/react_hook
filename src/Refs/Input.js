import React, { forwardRef } from "react";

const Input = forwardRef(({ name }, ref) => {
  return (
    <>
      <h2>{name}</h2>
      <input type={"text"} ref={ref} placeholder="Please fill" />
    </>
  );
});

export default Input;
