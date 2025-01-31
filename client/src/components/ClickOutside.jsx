import React, { useRef, useEffect } from "react";

const ClickOutside = ({
  children,
  exceptionRef,
  onClick = () => {}, // Default to no-op function
  className = "", // Default to an empty string
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickListener = (event) => {
      // Debugging logs to inspect issues
      console.log("Event Target:", event.target);
      console.log("Wrapper Ref:", wrapperRef.current);
      console.log("Exception Ref:", exceptionRef?.current);

      const clickedInside =
        (wrapperRef.current &&
          wrapperRef.current.contains(event.target)) ||
        (exceptionRef?.current &&
          (exceptionRef.current === event.target ||
            exceptionRef.current.contains(event.target)));

      if (!clickedInside && typeof onClick === "function") {
        onClick();
      }
    };

    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export default ClickOutside;
