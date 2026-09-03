import { DropDown } from "@/shared/ui/components/drop-down";
import s from "./Header.module.scss";
import Link from "next/link";
import { INFO_CARDS } from "@/shared/data/info-cards-data";

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <Link href="/" className={s.logo} aria-label="Filezeno home">
          <span className={s.logoMark}>F</span>
          <span>Filezeno</span>
        </Link>
        <nav className={s.nav} aria-label="Main navigation">
          <DropDown data={INFO_CARDS} />
          <Link href="/#about">About</Link>
        </nav>
        <div className={s.actions}>
          <button className={s.language} type="button">
            EN <span aria-hidden="true">⌄</span>
          </button>
          <Link className={s.getStarted} href="/#tools">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
};
