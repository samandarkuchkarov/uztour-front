"use client";
import useStore from "@/store/useStore";
import Search from "../Search";
import classes from "./Header.module.css";
import LangBtn from "./LangBtn";
import Image from "next/image";
import { useState } from "react";
import LoginModal from "../LoginModal";

function Header() {
  const handleLogin = () => {
    setIsLoginModalOpen(true);
    // window.location.href = "http://localhost:8008/auth/google";
  };

  const user = useStore((state) => state.user);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.leftSide}>
            <div className={classes.logo}>
              <span>Uz</span>Tours
            </div>
            <Search />
          </div>
          <div className={classes.leftSide}>
            <LangBtn />
            <div className={classes.btn}>
              <div className={classes.langContent}>
                <div className={classes.btnText}>USD</div>
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
            <div className={classes.btn}>
              <div className={classes.langContent}>
                <div className={classes.btnText}>Help</div>
              </div>
            </div>
            {!user ? (
              <>
                <div style={{ marginRight: "8px" }} className={classes.btn}>
                  <div className={classes.langContent}>
                    <div className={classes.loginText}>Sign up</div>
                  </div>
                </div>
                <div
                  onClick={handleLogin}
                  style={{ marginRight: "8px" }}
                  className={classes.login}
                >
                  <div className={classes.langContent}>
                    <div className={classes.loginTextActive}>Log in</div>
                  </div>
                </div>
              </>
            ) : (
              <Image
                width={30}
                height={30}
                alt="avatar"
                className={classes.avatar}
                src="/images/avatar.png"
              />
            )}
          </div>
        </div>
      </div>
      {isLoginModalOpen && <LoginModal />}
    </>
  );
}

export default Header;
