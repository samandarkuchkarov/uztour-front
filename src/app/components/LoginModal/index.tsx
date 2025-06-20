"use client";
import classes from "./LoginModal.module.css";
import { useSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import OtpInput from "react-otp-input";

function LoginModal({ router }: { router: AppRouterInstance }) {
  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState(60);
  const timer = useRef<NodeJS.Timeout>(undefined);
  const [pageType, setPageType] = useState<"login" | "comfirmation">("login");
  const [otp, setOtp] = useState("");
  const [tab, setTab] = useState(0);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    startTimer();
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

  const submitCode = () => {
    if (tab == 1) {
    }
    if (!otp && otp.length < 4) {
      setError("Введен неверный код, попробуйте снова");
      return;
    }
  };

  const startTimer = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setTime((prev) => {
        if (prev - 1 === 0) {
          clearInterval(timer.current);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resendCode = () => {
    if (!time) {
      startTimer();
    }
  };

  return (
    <Suspense>
      <div className={classes.overlay}>
        <div ref={modalRef} className={classes.modal}>
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
            <>
              <div className={classes.tab}>
                <div
                  style={{
                    transform: tab == 1 ? `translateX(100%)` : "translateX(0%)",
                  }}
                  className={classes.back}
                ></div>
                <div
                  onClick={() => setTab(0)}
                  style={{ color: tab === 0 ? "#328AEE" : "#BBBBBB" }}
                  className={classes.tabText}
                >
                  Я турист
                </div>
                <div
                  style={{ color: tab === 1 ? "#328AEE" : "#BBBBBB" }}
                  onClick={() => setTab(1)}
                  className={classes.tabText}
                >
                  Я автор тура
                </div>
              </div>
              <div
                style={{ borderColor: error ? "#EB5757" : "#DDDDDD" }}
                className={classes.inputContainer}
              >
                <svg
                  className={classes.emailIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.667 6.66732L10.0003 10.834L3.33366 6.66732V5.00065L10.0003 9.16732L16.667 5.00065V6.66732ZM16.667 3.33398H3.33366C2.40866 3.33398 1.66699 4.07565 1.66699 5.00065V15.0007C1.66699 15.4427 1.84259 15.8666 2.15515 16.1792C2.46771 16.4917 2.89163 16.6673 3.33366 16.6673H16.667C17.109 16.6673 17.5329 16.4917 17.8455 16.1792C18.1581 15.8666 18.3337 15.4427 18.3337 15.0007V5.00065C18.3337 4.07565 17.5837 3.33398 16.667 3.33398Z"
                    fill="#848484"
                  />
                </svg>

                <input
                  alt="email"
                  className={classes.input}
                  type="email"
                  value={email}
                  onChange={handleChange}
                  autoComplete="on"
                  name="email"
                  placeholder="Email"
                />
              </div>

              {error && (
                <div className={classes.errorBlock}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.7 8.7H7.3V4.5H8.7V8.7ZM8.7 11.5H7.3V10.1H8.7V11.5ZM8 1C7.08075 1 6.17049 1.18106 5.32122 1.53284C4.47194 1.88463 3.70026 2.40024 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8C1 9.85651 1.7375 11.637 3.05025 12.9497C3.70026 13.5998 4.47194 14.1154 5.32122 14.4672C6.17049 14.8189 7.08075 15 8 15C9.85651 15 11.637 14.2625 12.9497 12.9497C14.2625 11.637 15 9.85651 15 8C15 7.08075 14.8189 6.17049 14.4672 5.32122C14.1154 4.47194 13.5998 3.70026 12.9497 3.05025C12.2997 2.40024 11.5281 1.88463 10.6788 1.53284C9.8295 1.18106 8.91925 1 8 1Z"
                      fill="#EB5757"
                    />
                  </svg>
                  <p className={classes.errorText}>{error}</p>
                </div>
              )}
              <div onClick={submit} className={classes.submitBtn}>
                <h2 className={classes.submitText}>Продолжить</h2>
              </div>
              <div className={classes.socials}>
                <div className={classes.line}></div>
                <p className={classes.loginBySocial}>Или войти с помощью</p>
                <div className={classes.line}></div>
              </div>
              <div className={classes.socialsContainer}>
                <div className={classes.socialsItem}>
                  <Image
                    alt="google"
                    width={20}
                    height={20}
                    src={"/images/google.svg"}
                  />
                </div>
                <div className={classes.socialsItem}>
                  <Image
                    alt="apple"
                    width={20}
                    height={20}
                    src={"/images/apple.svg"}
                  />
                </div>
              </div>

              {tab == 1 && (
                <div className={classes.signup}>
                  <p className={classes.signupText}>Нет аккаунта?</p>
                  <p className={classes.signupText2}>Регистрация</p>
                </div>
              )}
              <div className={classes.agreement}>
                <p className={classes.agreementText}>
                  Нажимая “Продолжить”, вы соглашаетесь с условиями <br />
                  <span className={classes.link}>
                    публичной оферты и обработкой персональных данных
                  </span>
                </p>
              </div>
            </>
          )}

          {pageType === "comfirmation" && (
            <>
              <p className={classes.comfirmationText}>
                Код отправлен на ваш Email<br></br>Проверьте папку «Входящие» и
                «Спам»
              </p>

              <p className={classes.changeEmail}>Изменить Email</p>

              <p className={classes.enterCode}>Введите код</p>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                containerStyle={{
                  justifyContent: "center",
                  gap: "16px",
                  marginTop: "10px",
                }}
                renderInput={(props) => (
                  <input {...props} className={classes.otpInput} />
                )}
              />
              <div className={classes.errorCode}>
                {error && <p className={classes.errorText}>{error}</p>}
              </div>

              <div onClick={submitCode} className={classes.submitBtn}>
                <h2 className={classes.submitText}>Продолжить</h2>
              </div>
              <div
                onClick={resendCode}
                style={{ backgroundColor: time ? "#F5F5F5" : "#E1EFFF" }}
                className={classes.timerBtn}
              >
                <h2
                  style={{ color: time ? "#848484" : "#328AEE" }}
                  className={classes.timerText}
                >
                  Отправить снова через: {time} сек
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </Suspense>
  );
}

export default LoginModal;
