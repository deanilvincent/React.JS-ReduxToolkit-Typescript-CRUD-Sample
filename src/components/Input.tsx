import React from "react";

export const Input = ({
  name,
  value,
  inputChange,
  placeholder,
  title,
  showValidation,
  type,
}: {
  name: string;
  value: any;
  inputChange: void | any;
  placeholder?: string;
  title: string;
  showValidation?: boolean;
  type: string;
}) => {
  const showValidationUi = value === "" && showValidation;
  return (
    <>
      <div className="field">
        <label className="label is-small">{title}</label>
        <div className="control">
          <input
            type={type}
            name={name}
            onChange={inputChange}
            value={value}
            className={
              showValidationUi ? "input is-small is-danger" : "input is-small"
            }
            placeholder={placeholder}
          />
        </div>
        {showValidationUi ? (
          <span className="is-size-7 has-text-centered has-text-danger">
            Name is required.
          </span>
        ) : null}
      </div>
    </>
  );
};
