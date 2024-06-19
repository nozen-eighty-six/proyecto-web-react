import React, { useEffect, useState } from "react";

const LoaderComponent = ({ page }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!page) {
      document.body.style.overflow = "hidden";
      const timeout = setTimeout(() => {
        setLoading(false);
        document.body.style.overflowY = "visible";
      }, 2000);

      return () => clearTimeout(timeout);
    } else {
      document.body.style.overflowY = "hidden";
      const timeout = setTimeout(() => {
        setLoading(false);
        document.body.style.overflowY = "visible";
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [loading, page]);

  return (
    <div
      className={`loader-component absolute bg-gray-400  top-0 left-0 
      w-full h-screen justify-center items-center  ${
        loading ? "flex" : "hidden"
      }`}
    >
      <div>
        <svg
          width="100"
          height="100"
          viewBox="0 0 44 44"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000"
        >
          <g fill="none" fillRule="evenodd" strokeWidth="2">
            <circle cx="22" cy="22" r="1">
              <animate
                attributeName="r"
                begin="0s"
                dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="0s"
                dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="22" cy="22" r="1">
              <animate
                attributeName="r"
                begin="-0.9s"
                dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="-0.9s"
                dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default LoaderComponent;
