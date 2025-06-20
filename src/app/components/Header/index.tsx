"use client";
import useStore from "@/store/useStore";
import Search from "../Search";
import classes from "./Header.module.css";
import LangBtn from "./LangBtn";
import Image from "next/image";
import LoginModal from "../LoginModal";
import Currency from "./Currency";
import { useRouter, useSearchParams } from "next/navigation";

function Header({ lang }: { lang: string }) {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("?login=true", { scroll: false });
  };

  const user = useStore((state) => state.user);
  const searchParams = useSearchParams();
  const modalVisible = searchParams.get("login");

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.leftSide}>
            <div className={classes.logo}>
              <Image
                src={"/images/logo.svg"}
                alt="logo"
                width={98}
                height={22}
              />
            </div>
            <Search />
          </div>
          <div className={classes.center}>
            <LangBtn lang={lang} />
            <Currency />
            <div className={classes.links}>Экскурсии</div>
            <div className={classes.links}>Заказать трансфер</div>
            <div className={classes.links}>Помощь</div>
          </div>
          <div className={classes.leftSide}>
            {!user ? (
              <>
                <div className={classes.secondaryBtn}>
                  <p className={classes.secondaryBtnText}>Стать гидом</p>
                </div>
                <div onClick={handleLogin} className={classes.mainBtn}>
                  <p className={classes.mainBtnText}>Войти</p>
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
      {modalVisible && <LoginModal router={router} />}
    </>
  );
}

export default Header;
