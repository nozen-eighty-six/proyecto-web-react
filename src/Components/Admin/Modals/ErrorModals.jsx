import React from "react";

const   ErrorModals = ({ error, seccion }) => {
  return (
    <div className={"content-error-modal-" + seccion}>
      <div className={"error-modal-"+seccion}>
        {Object.keys(error).length != 0 &&
          Object.keys(error).map((key, index) => {
            return (
                <span key={index}>{key + ": " + error[key]}</span>
            );
          })}
        
      </div>
    </div>
  );
};

export default ErrorModals;
