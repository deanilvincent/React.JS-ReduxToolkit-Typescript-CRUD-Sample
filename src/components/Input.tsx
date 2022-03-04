import React from "react";

export const Input = ({
  name,
  value,
  inputChange,
  placeholder,
  title,
  showValidation,
  type,
  isRequired,
}: {
  name: string;
  value: any;
  inputChange: void | any;
  placeholder?: string;
  title: string;
  showValidation?: boolean;
  type: string;
  isRequired?: boolean;
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
          isRequired ? (
            <span className="is-size-7 has-text-centered has-text-danger">
              {title} is required.
            </span>
          ) : null
        ) : null}
      </div>
    </>
  );
};
