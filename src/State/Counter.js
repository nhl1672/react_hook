import React, { useState } from "react";
import "./Counter.scss";
import clsx from "clsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count>0){
        setCount(count - 1);
    }else{
        toast.error('Đạt giới hạn nhỏ nhất');
    }
   
  };

  let baseSize = 100;
  
  if (count>10){
    const rate = count - 10;
    baseSize+=rate;
  }

  return (
    <div>
      <h1>
        Count: <span style={{fontSize: `${baseSize}%`}} className={clsx(count >= 10 && "highlight")}>{count}</span>
      </h1>
      <button type="button" onClick={handleDecrement}>
        -
      </button>
      <button type="button" onClick={handleIncrement}>
        +
      </button>
      <ToastContainer />
    </div>
  );
}
