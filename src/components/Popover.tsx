import {
  useState,
  useEffect,
  useRef,
} from "react";
// styles
import "../styles/Popover.css";

export default function Popover({
  icon,
  className,
  children,
}: {
  icon: JSX.Element;
  className?: string;
  children: JSX.Element;
}) {
  const [showPopover, setShowPopover] =
    useState(false);

  const togglePopover = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    setShowPopover(!showPopover);
  };
  const wrapperRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setShowPopover(false);
      }
    };
    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );
  }, [wrapperRef]);

  return (
    <div
      className={`popover ${className}`}
      ref={wrapperRef}
    >
      <div className="popover-content">
        {showPopover && (
          <div
            className={"popover-body"}
            onTransitionEnd={() =>
              togglePopover
            }
          >
            {children}
          </div>
        )}
        <button onClick={togglePopover}>
          {icon}
        </button>
      </div>
    </div>
  );
}
