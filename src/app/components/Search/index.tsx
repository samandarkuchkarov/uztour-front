import classes from "./Search.module.css";
function Search() {
  return (
    <div className={classes.search}>
      <svg
        className={classes.searchIcon}
        width="20"
        height="20"
        viewBox="0 0 48 48"
        fill="none"
      >
        <circle
          cx="22"
          cy="22"
          r="18"
          stroke="#212121"
          strokeWidth="3.6"
        ></circle>
        <path
          d="M35 35L44 44"
          stroke="#212121"
          strokeWidth="3.6"
          strokeLinecap="round"
        ></path>
      </svg>
      <input
        autoComplete="off"
        type="text"
        placeholder="Search destinations or activities"
        className={classes.input}
      ></input>
    </div>
  );
}

export default Search;
