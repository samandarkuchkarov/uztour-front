"use client";
import classes from "./LoginModal.module.css";
import { useSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import OtpInput from "react-otp-input";
import Login from "./Login";
import Comfirmation from "./Comfirmation";
import GuideForm from "./GuideForm";

function LoginModal({ router }: { router: AppRouterInstance }) {
  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const [pageType, setPageType] = useState<
    "login" | "comfirmation" | "guideForm"
  >("login");
  const [isGuide, setIsGuide] = useState(0);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmail(event.target.value);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const closeModal = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("login");
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const submit = () => {
    setPageType("comfirmation");
    if (!email) {
      setError("Пожалуйста введите свой email");
      return;
    }
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      setError("Введите корректный email");
      return;
    }
    setError("");
  };

  const submitCode = ({ otp }: { otp: string }) => {
    if (isGuide == 1) {
      setPageType("guideForm");
    }
    if (!otp && otp.length < 4) {
      setError("Введен неверный код, попробуйте снова");
      return;
    }
  };

  const resendCode = () => {};

  return (
    <Suspense>
      <div className={classes.overlay}>
        <div
          ref={modalRef}
          className={`${classes.modal} ${
            pageType == "guideForm" && classes.guideFormModal
          }`}
        >
          <div className={classes.header}>
            <div
              style={{ cursor: pageType !== "login" ? "pointer" : "unset" }}
              onClick={() => setPageType("login")}
              className={classes.side}
            >
              {pageType !== "login" && (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="31"
                    height="31"
                    rx="7.5"
                    fill="white"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="31"
                    height="31"
                    rx="7.5"
                    stroke="#DDDDDD"
                  />
                  <path
                    d="M18.843 19.8167L15.0263 16L18.843 12.175L17.668 11L12.668 16L17.668 21L18.843 19.8167Z"
                    fill="black"
                  />
                </svg>
              )}
            </div>
            <h2 className={classes.title}>
              {pageType == "login" && "Войти в аккаунт"}
              {pageType == "comfirmation" && "Подтверждение"}
              {pageType == "guideForm" && "Регистрация автора тура"}
            </h2>
            <div
              onClick={closeModal}
              style={{ cursor: "pointer" }}
              className={classes.side}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6L18 18"
                  stroke="#BBBBBB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 18L18 6"
                  stroke="#BBBBBB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          {pageType == "login" && (
            <Login
              handleChangeEmail={handleChangeEmail}
              setIsGuide={setIsGuide}
              isGuide={isGuide}
              email={email}
              error={error}
              submit={submit}
            />
          )}

          {pageType === "comfirmation" && (
            <Comfirmation
              resendCode={resendCode}
              submitCode={submitCode}
              error={error}
            />
          )}
          {pageType === "guideForm" && <GuideForm />}
        </div>
      </div>
    </Suspense>
  );
}

export default LoginModal;
