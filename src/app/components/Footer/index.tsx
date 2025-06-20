import Image from "next/image";
import classes from "./Footer.module.css";
function Footer() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div></div>
        <div className={classes.footer}>
          <div className={classes.footerContent}>
            <Image
              src={"/images/logo.svg"}
              alt="logo"
              width={124.7}
              className={classes.logo}
              height={28}
            />
            <p className={classes.footerText}></p>
            <p className={classes.footerText}>Публичная оферта</p>
            <p className={classes.footerText}>Политика конфиденциальности</p>
          </div>
          <div className={classes.footerContent}>
            <p className={classes.footerText}>Экскурсии</p>
            <p className={classes.footerText}>Заказать трансфер</p>
            <p className={classes.footerText}>Помощь</p>
          </div>
          <div className={classes.footerContent}>
            <p className={classes.footerText}>Экскурсии</p>
            <p className={classes.footerText}>Заказать трансфер</p>
            <p className={classes.footerText}>Помощь</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
