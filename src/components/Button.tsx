export const Button = ({
  loading,
  type,
  title,
  onClick,
  disabled,
}: {
  loading?: boolean;
  type?: string;
  title: string;
  onClick: React.SyntheticEvent | any;
  disabled?: boolean;
}) => {
  return (
    <button
      className={
        loading ? "button is-small is-loading " : "button is-small " + type
      }
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
