export const Checkbox = ({
  title,
  name,
  value,
  inputChange,
}: {
  title: string;
  name: string;
  value: boolean;
  inputChange: void | any;
}) => {
  return (
    <>
      <div className="control">
        <label className="checkbox">
          <input
            type="checkbox"
            name={name}
            onChange={inputChange}
            checked={value}
          />
          &nbsp;
          <span style={{ fontWeight: "bold", fontSize: "12px" }}>{title}</span>
        </label>
      </div>
    </>
  );
};
