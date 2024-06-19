import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  return (
    <div className="absolute w-16 top-4 left-4">
      <div>
        <button onClick={back} className="w-16 text-5xl text-black p-2">
          {" "}
          <ion-icon className="text-lg" name="arrow-back"></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default Back;
