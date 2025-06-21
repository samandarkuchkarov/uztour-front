import OTPInput from "react-otp-input";
import classes from "./LoginModal.module.css";
import { useEffect, useRef, useState } from "react";
function Comfirmation({
  error,
  submitCode,
  resendCode,
}: {
  error: string;
  submitCode: ({ otp }: { otp: string }) => void;
  resendCode: () => void;
}) {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(60);
  const timer = useRef<NodeJS.Timeout>(undefined);
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

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <>
      <p className={classes.comfirmationText}>
        Код отправлен на ваш Email<br></br>Проверьте папку «Входящие» и «Спам»
      </p>

      <p className={classes.changeEmail}>Изменить Email</p>

      <p className={classes.enterCode}>Введите код</p>
      <OTPInput
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

      <div onClick={() => submitCode({ otp })} className={classes.submitBtn}>
        <h2 className={classes.submitText}>Продолжить</h2>
      </div>
      <div
        onClick={() => {
          startTimer();
          resendCode();
        }}
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
  );
}

export default Comfirmation;
