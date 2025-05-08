import Link from "next/link";
import classes from "./Header.module.css";
function LangBtn() {
  return (
    <div className={classes.btn}>
      <div className={classes.langContent}>
        <svg
          style={{ flexShrink: 0, width: "22px", height: "22px" }}
          viewBox="0 0 18 12"
          width="22"
          height="22"
        >
          <g fill="none" fillRule="evenodd">
            <path fill="#5A91E5" d="M0 0h18v12H0z"></path>
            <path
              fill="#FFF"
              fillRule="nonzero"
              d="M9 2.25C6.93 2.25 5.25 3.93 5.25 6c0 2.07 1.68 3.75 3.75 3.75 2.07 0 3.75-1.68 3.75-3.75 0-2.07-1.68-3.75-3.75-3.75zm3.18 3.472h-.972c-.041-1.028-.32-1.93-.75-2.555a3.176 3.176 0 011.723 2.555zM8.723 2.847v2.875H7.347c.056-1.43.64-2.625 1.375-2.875zm0 3.43v2.876c-.736-.25-1.32-1.445-1.375-2.875h1.375zm.556 2.876V6.278h1.375c-.056 1.43-.64 2.625-1.375 2.875zm0-3.43V2.846c.736.25 1.32 1.445 1.375 2.875H9.278zm-1.75-2.556c-.43.625-.709 1.527-.75 2.555h-.972a3.238 3.238 0 011.722-2.555zm-1.709 3.11h.973c.041 1.029.32 1.931.75 2.556a3.176 3.176 0 01-1.723-2.555zm4.653 2.556c.43-.625.709-1.527.75-2.555h.972a3.238 3.238 0 01-1.722 2.555z"
            ></path>
          </g>
        </svg>
        <span data-v-2a94e252="" className={classes.dropDown}>
          <svg width="12" height="12" viewBox="0 0 48 48" fill="none">
            <path
              d="M22.5409 31.4437L10.5787 18.6839C9.97995 18.0453 10.4328 17 11.3082 17L36.6918 17C37.5672 17 38.0201 18.0453 37.4213 18.6839L25.4591 31.4437C24.6689 32.2865 23.3311 32.2865 22.5409 31.4437Z"
              fill="#757575"
              stroke="#757575"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
}

export default LangBtn;
