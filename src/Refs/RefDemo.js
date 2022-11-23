import React, { useRef, useEffect } from "react";
import Input from "./Input";

export default function RefDemo() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChangeBorder = () => {
    inputRef.current.style.border = "1px solid red";
    inputRef.current.value = "Tech2";
  };

  return (
    <div>
      <Input name="Tech2" ref={inputRef} />
      <button type="button" onClick={handleChangeBorder}>
        Change Border
      </button>
    </div>
  );
}
