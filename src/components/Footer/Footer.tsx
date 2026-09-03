import Link from "next/link";
import s from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={s.footer} id="about">
      <div className={s.footerInner}>
        <Link href="/" className={s.logo}>
          filezeno
        </Link>
        <p>Small tools for everyday file work.</p>
        <span>© 2026 Filezeno</span>
      </div>
    </footer>
  );
};
