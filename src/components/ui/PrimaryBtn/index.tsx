import classes from "./PrimaryBtn.module.css";
function PrimaryBtn({
  text,
  disabled,
  onClick,
}: {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: disabled ? "#F5F5F5" : "#328AEE",
      }}
      className={classes.container}
    >
      <p
        style={{ color: disabled ? "#848484" : "#FFFFFF" }}
        className={classes.text}
      >
        {text}
      </p>
    </div>
  );
}

export default PrimaryBtn;
