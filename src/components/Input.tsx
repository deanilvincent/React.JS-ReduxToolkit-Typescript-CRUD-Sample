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
  type: string
}) => {
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
            className="input is-small"
            placeholder={placeholder}
          />
        </div>
        {value === "" && showValidation ? (
          <span className="is-size-7 has-text-centered has-text-danger">
            Name is required.
          </span>
        ) : null}
      </div>
    </>
  );
};
