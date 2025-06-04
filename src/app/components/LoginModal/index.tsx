"use client";
import classes from "./LoginModal.module.css";
function LoginModal() {
  return (
    <>
      <div className={classes.overlay}>
        <div className={classes.modal}></div>
      </div>
    </>
  );
}

export default LoginModal;
