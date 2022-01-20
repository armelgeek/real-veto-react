import React, { useEffect, useState, useRef } from "react";
export const CheckboxFilter = ({
  attribute,
  label,
  reset,
  setReset,
  action,
}) => {
  const ref = useRef();
  useEffect(() => {
    if (reset == true) {
      let datam = ["true", "false"];
      action({ [attribute]: datam });
      setReset(false);
      ref.current.checked = false;
    }
  }, [attribute, reset]);
  const [state, setState] = useState(false);
  React.useEffect(() => {
    if (reset) {
      setState(false);
    } else {
      setState(true);
    }
  }, [attribute, reset]);
  return (
    <>
      <label>
        <input
          type="checkbox"
          defaultChecked={false}
          name={attribute}
          ref={ref}
          onChange={(e) => {
            e.stopPropagation();
            action({ [attribute]: [e.target.checked] });
            setState(e.target.checked);
            setReset(false);
          }}
        />
        {"  "}
        <span className="mr-2">{label}</span>
      </label>
    </>
  );
};
